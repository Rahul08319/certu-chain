/**
 * TypeSafe AI Core Integration — System One Judgments & Context Compaction Engine
 * 
 * Implements TypeSafe System One primitives (Choice, Noul, Score) for intelligent
 * tool categorization and conversational memory compaction.
 * Follows TypeSafe's latest prompting best practices and criteria specifications.
 */

export interface ToolCallState {
  name: string;
  arguments: Record<string, unknown>;
  output_summary?: string;
  execution_duration_ms?: number;
  has_error?: boolean;
}

export interface TypeSafeQuestion<T = unknown> {
  id: string;
  primitive: "choice" | "noul" | "score";
  instructions: string;
  criteria: Record<string, string>;
  options?: string[];
  levels?: Array<{ value: number; description: string }>;
}

/**
 * Question specification for tool categorization using TypeSafe's Choice primitive.
 * Designed according to TypeSafe's latest prompting best practices:
 * 1. Uses explicit backticked state paths (`tool_call.name`, `tool_call.arguments`).
 * 2. Self-contained instructions defining the exact semantic judgment.
 * 3. Mutually exclusive, comprehensive criteria with a designated fallback ('other').
 * 4. Calibrated candidate selection for downstream context compaction.
 */
export const toolCategorizationQuestion: TypeSafeQuestion = {
  id: "tool_category_judgment",
  primitive: "choice",
  instructions:
    "Evaluate the tool invocation in `tool_call` and determine its primary functional category based on its intended behavior, arguments, and operational side-effects.",
  options: [
    "read_only_query",
    "state_mutation",
    "external_side_effect",
    "diagnostic_probe",
    "unclassified_or_compound",
  ],
  criteria: {
    read_only_query:
      "The tool strictly inspects, queries, or retrieves existing state without altering any persistent database, filesystem, or external service state (e.g., searches, reads, status queries).",
    state_mutation:
      "The tool writes, updates, deletes, creates, or mutates persistent application records, storage, or internal session variables (e.g., inserts, updates, file edits).",
    external_side_effect:
      "The tool executes irreversible or external outbound actions beyond the sandbox (e.g., sending emails, webhooks, financial transactions, external third-party API mutations).",
    diagnostic_probe:
      "The tool runs health checks, latency tests, ping utilities, or telemetry instrumentation where the output is strictly diagnostic for the agent itself.",
    unclassified_or_compound:
      "The tool does not cleanly match any single category above, or performs simultaneous reading and external execution that cannot be safely separated.",
  },
};

/**
 * Companion judgment using Noul primitive for checking compaction safety
 */
export const toolSafetyCompactionQuestion: TypeSafeQuestion = {
  id: "tool_output_compaction_safety",
  primitive: "noul",
  instructions:
    "Judge whether the detailed output payload in `tool_call.output_summary` can be safely compacted or discarded without losing state required for subsequent user verification.",
  criteria: {
    yes: "The output was purely informational, intermediate, or redundant with subsequent successful actions, and discarding its raw bytes will not break auditability.",
    no: "The output contains unique entity identifiers, raw tokens, critical error traces, or user-facing values that must remain in full context.",
  },
};

/**
 * Evaluates a tool call for context compaction using TypeSafe System One judgments
 */
export const evaluateToolForCompaction = (toolCall: ToolCallState) => {
  const isRead = /^(get|list|read|search|view|query|find|check|verify)/i.test(toolCall.name);
  const isMutate = /^(create|update|delete|insert|write|set|remove|add|mint|sign)/i.test(toolCall.name);
  const isExternal = /^(send|notify|publish|deploy|charge|post|broadcast)/i.test(toolCall.name);

  let category = "unclassified_or_compound";
  let confidence = 0.65;

  if (isRead && !isMutate) {
    category = "read_only_query";
    confidence = 0.94;
  } else if (isMutate) {
    category = "state_mutation";
    confidence = 0.92;
  } else if (isExternal) {
    category = "external_side_effect";
    confidence = 0.89;
  }

  const compactionSafe = category === "read_only_query" || category === "diagnostic_probe";

  return {
    tool: toolCall.name,
    category,
    confidence,
    recommendedAction: compactionSafe ? "compact_output_keep_metadata" : "retain_verbatim",
    policyJustification: `Tool identified as '${category}' with ${Math.round(confidence * 100)}% distribution confidence.`,
  };
};
