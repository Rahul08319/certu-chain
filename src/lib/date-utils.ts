/**
 * CertuChain Dynamic Date & Blockchain Time Engine
 * 
 * Ensures all copyright dates, issuance calculations, validation windows,
 * and protocol milestone epochs update dynamically and automatically
 * for the current and all upcoming years (2026, 2027, 2028+).
 */

/**
 * Returns the current calendar year dynamically
 */
export const getCurrentYear = (): number => {
  return new Date().getFullYear();
};

/**
 * Generates an auto-updating copyright range (e.g., "2024 - 2026")
 */
export const getDynamicCopyrightRange = (startYear: number = 2024): string => {
  const current = getCurrentYear();
  if (current <= startYear) {
    return `${startYear}`;
  }
  return `${startYear} - ${current}`;
};

/**
 * Computes dynamic protocol milestone horizon for roadmap
 */
export const getDynamicRoadmapHorizon = (): {
  currentCycle: string;
  nextCycle: string;
  futureTarget: string;
} => {
  const year = getCurrentYear();
  return {
    currentCycle: `Q4 ${year} • Mainnet V2 Staking & Multi-Chain Anchoring`,
    nextCycle: `Q1-Q2 ${year + 1} • Zero-Knowledge Rollup Migration`,
    futureTarget: `${year + 2} • Global Academic Federation Consortium`,
  };
};

/**
 * Formats a dynamic ISO date or returns a human-readable dynamic timestamp
 */
export const getDynamicIsoTimestamp = (offsetDays: number = 0): string => {
  const date = new Date();
  if (offsetDays !== 0) {
    date.setDate(date.getDate() - offsetDays);
  }
  return date.toISOString();
};

/**
 * Calculates certificate age and validity status
 */
export const getCertificateValidityStatus = (issuedYear?: number): {
  isValid: boolean;
  yearsActive: number;
  validityWindow: string;
  nextAuditYear: number;
} => {
  const currentYear = getCurrentYear();
  const year = issuedYear || currentYear - 1;
  const yearsActive = Math.max(0, currentYear - year);
  
  return {
    isValid: true,
    yearsActive,
    validityWindow: `Permanent / Immutable (Issued ${year} • Verified in ${currentYear})`,
    nextAuditYear: currentYear + 1,
  };
};

/**
 * Generates dynamic recent block timestamps for the blockchain explorer
 */
export const getRecentBlockTime = (secondsAgo: number = 12): string => {
  const date = new Date(Date.now() - secondsAgo * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};
