// Mock portfolio management data for UI/UX development
// Supports TAMP (Turnkey Asset Management Platform) functionality
import type { ApiResponse, PaginationMeta } from '@financial-advisor/shared';

// Asset class types
export type AssetClass =
  | 'domestic_equity'
  | 'international_equity'
  | 'fixed_income'
  | 'alternatives'
  | 'cash'
  | 'real_estate'
  | 'commodities';

// Security holding interface
export interface SecurityHolding {
  symbol: string;
  name: string;
  assetClass: AssetClass;
  targetWeight: number;
  currentWeight?: number;
  shares?: number;
  price?: number;
  value?: number;
  change?: number;
  changePercent?: number;
}

// Model portfolio interface
export interface ModelPortfolio {
  id: string;
  name: string;
  description: string;
  riskLevel:
    | 'conservative'
    | 'moderate_conservative'
    | 'moderate'
    | 'moderate_aggressive'
    | 'aggressive';
  investmentObjectives: string[];
  benchmark: string;
  holdings: SecurityHolding[];
  totalAUM: number;
  clientCount: number;
  performance: {
    mtd: number;
    qtd: number;
    ytd: number;
    oneYear: number;
    threeYear: number;
    fiveYear: number;
    sinceInception: number;
    inceptionDate: Date;
  };
  fees: {
    managementFee: number;
    expenseRatio: number;
  };
  status: 'active' | 'inactive' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

// Client portfolio (assigned to a client)
export interface ClientPortfolio {
  id: string;
  clientId: string;
  clientName: string;
  modelPortfolioId: string;
  modelPortfolioName: string;
  accountNumber: string;
  custodian: string;
  accountType: 'individual' | 'joint' | 'ira' | 'roth_ira' | '401k' | 'trust' | 'corporate';
  holdings: SecurityHolding[];
  totalValue: number;
  cashBalance: number;
  drift: number;
  driftStatus: 'within_tolerance' | 'approaching_threshold' | 'needs_rebalancing';
  lastRebalanceDate?: Date;
  nextRebalanceDate?: Date;
  performance: {
    mtd: number;
    qtd: number;
    ytd: number;
    oneYear: number;
    sinceInception: number;
    inceptionDate: Date;
  };
  status: 'active' | 'pending' | 'closed';
  assignedAt: Date;
  updatedAt: Date;
}

// Rebalancing transaction
export interface RebalancingTransaction {
  id: string;
  clientPortfolioId: string;
  clientName: string;
  accountNumber: string;
  symbol: string;
  securityName: string;
  action: 'buy' | 'sell';
  shares: number;
  estimatedPrice: number;
  estimatedValue: number;
  currentWeight: number;
  targetWeight: number;
  status: 'pending' | 'approved' | 'executed' | 'cancelled';
  createdAt: Date;
  executedAt?: Date;
}

// Rebalancing batch
export interface RebalancingBatch {
  id: string;
  name: string;
  description?: string;
  transactions: RebalancingTransaction[];
  totalBuys: number;
  totalSells: number;
  netCashFlow: number;
  accountsAffected: number;
  status: 'draft' | 'pending_approval' | 'approved' | 'executing' | 'completed' | 'cancelled';
  createdBy: string;
  approvedBy?: string;
  createdAt: Date;
  approvedAt?: Date;
  executedAt?: Date;
}

// Mock model portfolios
export const mockModelPortfolios: ModelPortfolio[] = [
  {
    id: 'model-001',
    name: 'Conservative Income',
    description: 'Focused on capital preservation and income generation with minimal volatility.',
    riskLevel: 'conservative',
    investmentObjectives: ['capital_preservation', 'income'],
    benchmark: 'Bloomberg US Aggregate Bond Index',
    holdings: [
      {
        symbol: 'BND',
        name: 'Vanguard Total Bond Market ETF',
        assetClass: 'fixed_income',
        targetWeight: 40,
      },
      {
        symbol: 'VCSH',
        name: 'Vanguard Short-Term Corporate Bond ETF',
        assetClass: 'fixed_income',
        targetWeight: 20,
      },
      {
        symbol: 'VYM',
        name: 'Vanguard High Dividend Yield ETF',
        assetClass: 'domestic_equity',
        targetWeight: 15,
      },
      {
        symbol: 'VXUS',
        name: 'Vanguard Total International Stock ETF',
        assetClass: 'international_equity',
        targetWeight: 10,
      },
      {
        symbol: 'VNQ',
        name: 'Vanguard Real Estate ETF',
        assetClass: 'real_estate',
        targetWeight: 5,
      },
      {
        symbol: 'VMFXX',
        name: 'Vanguard Federal Money Market Fund',
        assetClass: 'cash',
        targetWeight: 10,
      },
    ],
    totalAUM: 85000000,
    clientCount: 145,
    performance: {
      mtd: 0.8,
      qtd: 1.5,
      ytd: 4.2,
      oneYear: 5.1,
      threeYear: 4.8,
      fiveYear: 5.2,
      sinceInception: 5.5,
      inceptionDate: new Date('2018-01-15'),
    },
    fees: {
      managementFee: 0.25,
      expenseRatio: 0.08,
    },
    status: 'active',
    createdAt: new Date('2018-01-15'),
    updatedAt: new Date('2024-12-01'),
  },
  {
    id: 'model-002',
    name: 'Balanced Growth',
    description:
      'Balanced approach combining growth potential with stability through diversified allocation.',
    riskLevel: 'moderate',
    investmentObjectives: ['growth', 'income'],
    benchmark: '60/40 S&P 500/Bloomberg Aggregate',
    holdings: [
      {
        symbol: 'VTI',
        name: 'Vanguard Total Stock Market ETF',
        assetClass: 'domestic_equity',
        targetWeight: 35,
      },
      {
        symbol: 'VXUS',
        name: 'Vanguard Total International Stock ETF',
        assetClass: 'international_equity',
        targetWeight: 15,
      },
      {
        symbol: 'BND',
        name: 'Vanguard Total Bond Market ETF',
        assetClass: 'fixed_income',
        targetWeight: 30,
      },
      {
        symbol: 'VNQ',
        name: 'Vanguard Real Estate ETF',
        assetClass: 'real_estate',
        targetWeight: 10,
      },
      { symbol: 'IAU', name: 'iShares Gold Trust', assetClass: 'commodities', targetWeight: 5 },
      {
        symbol: 'VMFXX',
        name: 'Vanguard Federal Money Market Fund',
        assetClass: 'cash',
        targetWeight: 5,
      },
    ],
    totalAUM: 210000000,
    clientCount: 380,
    performance: {
      mtd: 1.2,
      qtd: 3.1,
      ytd: 9.5,
      oneYear: 11.2,
      threeYear: 8.7,
      fiveYear: 9.8,
      sinceInception: 10.2,
      inceptionDate: new Date('2017-06-01'),
    },
    fees: {
      managementFee: 0.35,
      expenseRatio: 0.06,
    },
    status: 'active',
    createdAt: new Date('2017-06-01'),
    updatedAt: new Date('2024-12-01'),
  },
  {
    id: 'model-003',
    name: 'Growth Focused',
    description:
      'Aggressive growth strategy with higher equity allocation for long-term wealth accumulation.',
    riskLevel: 'aggressive',
    investmentObjectives: ['growth', 'speculation'],
    benchmark: 'S&P 500 Index',
    holdings: [
      {
        symbol: 'VTI',
        name: 'Vanguard Total Stock Market ETF',
        assetClass: 'domestic_equity',
        targetWeight: 45,
      },
      {
        symbol: 'VGT',
        name: 'Vanguard Information Technology ETF',
        assetClass: 'domestic_equity',
        targetWeight: 15,
      },
      {
        symbol: 'VXUS',
        name: 'Vanguard Total International Stock ETF',
        assetClass: 'international_equity',
        targetWeight: 20,
      },
      {
        symbol: 'VWO',
        name: 'Vanguard Emerging Markets ETF',
        assetClass: 'international_equity',
        targetWeight: 10,
      },
      {
        symbol: 'BND',
        name: 'Vanguard Total Bond Market ETF',
        assetClass: 'fixed_income',
        targetWeight: 7,
      },
      {
        symbol: 'VMFXX',
        name: 'Vanguard Federal Money Market Fund',
        assetClass: 'cash',
        targetWeight: 3,
      },
    ],
    totalAUM: 175000000,
    clientCount: 225,
    performance: {
      mtd: 2.1,
      qtd: 5.8,
      ytd: 18.5,
      oneYear: 22.1,
      threeYear: 12.5,
      fiveYear: 14.8,
      sinceInception: 15.2,
      inceptionDate: new Date('2016-03-15'),
    },
    fees: {
      managementFee: 0.45,
      expenseRatio: 0.07,
    },
    status: 'active',
    createdAt: new Date('2016-03-15'),
    updatedAt: new Date('2024-12-01'),
  },
  {
    id: 'model-004',
    name: 'Tax-Efficient Growth',
    description:
      'Growth-oriented portfolio optimized for tax efficiency with municipal bonds and low-turnover funds.',
    riskLevel: 'moderate_aggressive',
    investmentObjectives: ['growth', 'tax_efficiency'],
    benchmark: 'S&P 500 Index',
    holdings: [
      {
        symbol: 'VTI',
        name: 'Vanguard Total Stock Market ETF',
        assetClass: 'domestic_equity',
        targetWeight: 40,
      },
      {
        symbol: 'VXUS',
        name: 'Vanguard Total International Stock ETF',
        assetClass: 'international_equity',
        targetWeight: 20,
      },
      {
        symbol: 'VTEB',
        name: 'Vanguard Tax-Exempt Bond ETF',
        assetClass: 'fixed_income',
        targetWeight: 25,
      },
      {
        symbol: 'VNQ',
        name: 'Vanguard Real Estate ETF',
        assetClass: 'real_estate',
        targetWeight: 10,
      },
      {
        symbol: 'VMFXX',
        name: 'Vanguard Federal Money Market Fund',
        assetClass: 'cash',
        targetWeight: 5,
      },
    ],
    totalAUM: 95000000,
    clientCount: 120,
    performance: {
      mtd: 1.5,
      qtd: 4.2,
      ytd: 12.8,
      oneYear: 14.5,
      threeYear: 10.2,
      fiveYear: 11.5,
      sinceInception: 11.8,
      inceptionDate: new Date('2019-01-10'),
    },
    fees: {
      managementFee: 0.4,
      expenseRatio: 0.05,
    },
    status: 'active',
    createdAt: new Date('2019-01-10'),
    updatedAt: new Date('2024-12-01'),
  },
  {
    id: 'model-005',
    name: 'ESG Sustainable',
    description:
      'Socially responsible investing focused on environmental, social, and governance factors.',
    riskLevel: 'moderate',
    investmentObjectives: ['growth', 'income'],
    benchmark: 'MSCI USA ESG Leaders Index',
    holdings: [
      {
        symbol: 'ESGU',
        name: 'iShares ESG Aware MSCI USA ETF',
        assetClass: 'domestic_equity',
        targetWeight: 35,
      },
      {
        symbol: 'ESGD',
        name: 'iShares ESG Aware MSCI EAFE ETF',
        assetClass: 'international_equity',
        targetWeight: 20,
      },
      {
        symbol: 'EAGG',
        name: 'iShares ESG Aware U.S. Aggregate Bond ETF',
        assetClass: 'fixed_income',
        targetWeight: 30,
      },
      {
        symbol: 'ICLN',
        name: 'iShares Global Clean Energy ETF',
        assetClass: 'alternatives',
        targetWeight: 10,
      },
      {
        symbol: 'VMFXX',
        name: 'Vanguard Federal Money Market Fund',
        assetClass: 'cash',
        targetWeight: 5,
      },
    ],
    totalAUM: 65000000,
    clientCount: 95,
    performance: {
      mtd: 1.1,
      qtd: 2.8,
      ytd: 8.2,
      oneYear: 9.8,
      threeYear: 7.5,
      fiveYear: 8.9,
      sinceInception: 9.1,
      inceptionDate: new Date('2020-06-15'),
    },
    fees: {
      managementFee: 0.4,
      expenseRatio: 0.12,
    },
    status: 'active',
    createdAt: new Date('2020-06-15'),
    updatedAt: new Date('2024-12-01'),
  },
];

// Mock client portfolios
export const mockClientPortfolios: ClientPortfolio[] = [
  {
    id: 'portfolio-001',
    clientId: 'client-001',
    clientName: 'Robert Anderson',
    modelPortfolioId: 'model-002',
    modelPortfolioName: 'Balanced Growth',
    accountNumber: 'ACC-2023-001',
    custodian: 'Charles Schwab',
    accountType: 'individual',
    holdings: [
      {
        symbol: 'VTI',
        name: 'Vanguard Total Stock Market ETF',
        assetClass: 'domestic_equity',
        targetWeight: 35,
        currentWeight: 36.2,
        shares: 450,
        price: 268.5,
        value: 120825,
        change: 2.15,
        changePercent: 0.81,
      },
      {
        symbol: 'VXUS',
        name: 'Vanguard Total International Stock ETF',
        assetClass: 'international_equity',
        targetWeight: 15,
        currentWeight: 14.5,
        shares: 520,
        price: 58.75,
        value: 30550,
        change: -0.45,
        changePercent: -0.76,
      },
      {
        symbol: 'BND',
        name: 'Vanguard Total Bond Market ETF',
        assetClass: 'fixed_income',
        targetWeight: 30,
        currentWeight: 29.8,
        shares: 420,
        price: 71.25,
        value: 29925,
        change: 0.12,
        changePercent: 0.17,
      },
      {
        symbol: 'VNQ',
        name: 'Vanguard Real Estate ETF',
        assetClass: 'real_estate',
        targetWeight: 10,
        currentWeight: 10.2,
        shares: 125,
        price: 86.5,
        value: 10812.5,
        change: 0.85,
        changePercent: 0.99,
      },
      {
        symbol: 'IAU',
        name: 'iShares Gold Trust',
        assetClass: 'commodities',
        targetWeight: 5,
        currentWeight: 4.8,
        shares: 280,
        price: 45.2,
        value: 12656,
        change: 0.35,
        changePercent: 0.78,
      },
      {
        symbol: 'VMFXX',
        name: 'Vanguard Federal Money Market Fund',
        assetClass: 'cash',
        targetWeight: 5,
        currentWeight: 4.5,
        shares: 4500,
        price: 1.0,
        value: 4500,
        change: 0,
        changePercent: 0,
      },
    ],
    totalValue: 209268.5,
    cashBalance: 4500,
    drift: 1.8,
    driftStatus: 'within_tolerance',
    lastRebalanceDate: new Date('2024-09-15'),
    nextRebalanceDate: new Date('2024-12-15'),
    performance: {
      mtd: 1.3,
      qtd: 3.2,
      ytd: 9.8,
      oneYear: 11.5,
      sinceInception: 24.5,
      inceptionDate: new Date('2023-01-20'),
    },
    status: 'active',
    assignedAt: new Date('2023-01-20'),
    updatedAt: new Date('2024-12-05'),
  },
  {
    id: 'portfolio-002',
    clientId: 'client-002',
    clientName: 'Jennifer Martinez',
    modelPortfolioId: 'model-003',
    modelPortfolioName: 'Growth Focused',
    accountNumber: 'ACC-2022-015',
    custodian: 'Fidelity',
    accountType: 'joint',
    holdings: [
      {
        symbol: 'VTI',
        name: 'Vanguard Total Stock Market ETF',
        assetClass: 'domestic_equity',
        targetWeight: 45,
        currentWeight: 47.5,
        shares: 1250,
        price: 268.5,
        value: 335625,
        change: 2.15,
        changePercent: 0.81,
      },
      {
        symbol: 'VGT',
        name: 'Vanguard Information Technology ETF',
        assetClass: 'domestic_equity',
        targetWeight: 15,
        currentWeight: 16.2,
        shares: 200,
        price: 525.0,
        value: 105000,
        change: 4.5,
        changePercent: 0.86,
      },
      {
        symbol: 'VXUS',
        name: 'Vanguard Total International Stock ETF',
        assetClass: 'international_equity',
        targetWeight: 20,
        currentWeight: 18.8,
        shares: 850,
        price: 58.75,
        value: 49937.5,
        change: -0.45,
        changePercent: -0.76,
      },
      {
        symbol: 'VWO',
        name: 'Vanguard Emerging Markets ETF',
        assetClass: 'international_equity',
        targetWeight: 10,
        currentWeight: 9.5,
        shares: 620,
        price: 45.8,
        value: 28396,
        change: 0.65,
        changePercent: 1.44,
      },
      {
        symbol: 'BND',
        name: 'Vanguard Total Bond Market ETF',
        assetClass: 'fixed_income',
        targetWeight: 7,
        currentWeight: 5.8,
        shares: 220,
        price: 71.25,
        value: 15675,
        change: 0.12,
        changePercent: 0.17,
      },
      {
        symbol: 'VMFXX',
        name: 'Vanguard Federal Money Market Fund',
        assetClass: 'cash',
        targetWeight: 3,
        currentWeight: 2.2,
        shares: 5850,
        price: 1.0,
        value: 5850,
        change: 0,
        changePercent: 0,
      },
    ],
    totalValue: 540483.5,
    cashBalance: 5850,
    drift: 3.2,
    driftStatus: 'approaching_threshold',
    lastRebalanceDate: new Date('2024-06-20'),
    nextRebalanceDate: new Date('2024-12-20'),
    performance: {
      mtd: 2.2,
      qtd: 6.1,
      ytd: 19.2,
      oneYear: 23.5,
      sinceInception: 45.8,
      inceptionDate: new Date('2022-06-15'),
    },
    status: 'active',
    assignedAt: new Date('2022-06-15'),
    updatedAt: new Date('2024-12-05'),
  },
  {
    id: 'portfolio-003',
    clientId: 'client-003',
    clientName: 'William Thompson',
    modelPortfolioId: 'model-001',
    modelPortfolioName: 'Conservative Income',
    accountNumber: 'ACC-2023-042',
    custodian: 'Charles Schwab',
    accountType: 'ira',
    holdings: [
      {
        symbol: 'BND',
        name: 'Vanguard Total Bond Market ETF',
        assetClass: 'fixed_income',
        targetWeight: 40,
        currentWeight: 38.5,
        shares: 680,
        price: 71.25,
        value: 48450,
        change: 0.12,
        changePercent: 0.17,
      },
      {
        symbol: 'VCSH',
        name: 'Vanguard Short-Term Corporate Bond ETF',
        assetClass: 'fixed_income',
        targetWeight: 20,
        currentWeight: 19.2,
        shares: 310,
        price: 78.5,
        value: 24335,
        change: 0.08,
        changePercent: 0.1,
      },
      {
        symbol: 'VYM',
        name: 'Vanguard High Dividend Yield ETF',
        assetClass: 'domestic_equity',
        targetWeight: 15,
        currentWeight: 16.8,
        shares: 185,
        price: 115.2,
        value: 21312,
        change: 0.95,
        changePercent: 0.83,
      },
      {
        symbol: 'VXUS',
        name: 'Vanguard Total International Stock ETF',
        assetClass: 'international_equity',
        targetWeight: 10,
        currentWeight: 11.5,
        shares: 250,
        price: 58.75,
        value: 14687.5,
        change: -0.45,
        changePercent: -0.76,
      },
      {
        symbol: 'VNQ',
        name: 'Vanguard Real Estate ETF',
        assetClass: 'real_estate',
        targetWeight: 5,
        currentWeight: 4.2,
        shares: 62,
        price: 86.5,
        value: 5363,
        change: 0.85,
        changePercent: 0.99,
      },
      {
        symbol: 'VMFXX',
        name: 'Vanguard Federal Money Market Fund',
        assetClass: 'cash',
        targetWeight: 10,
        currentWeight: 9.8,
        shares: 12500,
        price: 1.0,
        value: 12500,
        change: 0,
        changePercent: 0,
      },
    ],
    totalValue: 126647.5,
    cashBalance: 12500,
    drift: 2.5,
    driftStatus: 'within_tolerance',
    lastRebalanceDate: new Date('2024-10-01'),
    nextRebalanceDate: new Date('2025-01-01'),
    performance: {
      mtd: 0.7,
      qtd: 1.4,
      ytd: 4.0,
      oneYear: 4.9,
      sinceInception: 8.2,
      inceptionDate: new Date('2023-08-25'),
    },
    status: 'active',
    assignedAt: new Date('2023-08-25'),
    updatedAt: new Date('2024-12-05'),
  },
  {
    id: 'portfolio-004',
    clientId: 'client-006',
    clientName: 'Emily Johnson',
    modelPortfolioId: 'model-004',
    modelPortfolioName: 'Tax-Efficient Growth',
    accountNumber: 'ACC-2021-088',
    custodian: 'TD Ameritrade',
    accountType: 'trust',
    holdings: [
      {
        symbol: 'VTI',
        name: 'Vanguard Total Stock Market ETF',
        assetClass: 'domestic_equity',
        targetWeight: 40,
        currentWeight: 43.5,
        shares: 980,
        price: 268.5,
        value: 263130,
        change: 2.15,
        changePercent: 0.81,
      },
      {
        symbol: 'VXUS',
        name: 'Vanguard Total International Stock ETF',
        assetClass: 'international_equity',
        targetWeight: 20,
        currentWeight: 18.2,
        shares: 620,
        price: 58.75,
        value: 36425,
        change: -0.45,
        changePercent: -0.76,
      },
      {
        symbol: 'VTEB',
        name: 'Vanguard Tax-Exempt Bond ETF',
        assetClass: 'fixed_income',
        targetWeight: 25,
        currentWeight: 23.5,
        shares: 285,
        price: 50.25,
        value: 14321.25,
        change: 0.15,
        changePercent: 0.3,
      },
      {
        symbol: 'VNQ',
        name: 'Vanguard Real Estate ETF',
        assetClass: 'real_estate',
        targetWeight: 10,
        currentWeight: 9.8,
        shares: 70,
        price: 86.5,
        value: 6055,
        change: 0.85,
        changePercent: 0.99,
      },
      {
        symbol: 'VMFXX',
        name: 'Vanguard Federal Money Market Fund',
        assetClass: 'cash',
        targetWeight: 5,
        currentWeight: 5.0,
        shares: 3050,
        price: 1.0,
        value: 3050,
        change: 0,
        changePercent: 0,
      },
    ],
    totalValue: 322981.25,
    cashBalance: 3050,
    drift: 4.2,
    driftStatus: 'needs_rebalancing',
    lastRebalanceDate: new Date('2024-03-15'),
    nextRebalanceDate: new Date('2024-12-01'),
    performance: {
      mtd: 1.6,
      qtd: 4.5,
      ytd: 13.2,
      oneYear: 15.1,
      sinceInception: 42.5,
      inceptionDate: new Date('2021-03-20'),
    },
    status: 'active',
    assignedAt: new Date('2021-03-20'),
    updatedAt: new Date('2024-12-05'),
  },
];

// Mock rebalancing transactions
export const mockRebalancingTransactions: RebalancingTransaction[] = [
  {
    id: 'txn-001',
    clientPortfolioId: 'portfolio-004',
    clientName: 'Emily Johnson',
    accountNumber: 'ACC-2021-088',
    symbol: 'VTI',
    securityName: 'Vanguard Total Stock Market ETF',
    action: 'sell',
    shares: 35,
    estimatedPrice: 268.5,
    estimatedValue: 9397.5,
    currentWeight: 43.5,
    targetWeight: 40,
    status: 'pending',
    createdAt: new Date('2024-12-05'),
  },
  {
    id: 'txn-002',
    clientPortfolioId: 'portfolio-004',
    clientName: 'Emily Johnson',
    accountNumber: 'ACC-2021-088',
    symbol: 'VXUS',
    securityName: 'Vanguard Total International Stock ETF',
    action: 'buy',
    shares: 58,
    estimatedPrice: 58.75,
    estimatedValue: 3407.5,
    currentWeight: 18.2,
    targetWeight: 20,
    status: 'pending',
    createdAt: new Date('2024-12-05'),
  },
  {
    id: 'txn-003',
    clientPortfolioId: 'portfolio-004',
    clientName: 'Emily Johnson',
    accountNumber: 'ACC-2021-088',
    symbol: 'VTEB',
    securityName: 'Vanguard Tax-Exempt Bond ETF',
    action: 'buy',
    shares: 95,
    estimatedPrice: 50.25,
    estimatedValue: 4773.75,
    currentWeight: 23.5,
    targetWeight: 25,
    status: 'pending',
    createdAt: new Date('2024-12-05'),
  },
];

// Mock rebalancing batch
export const mockRebalancingBatches: RebalancingBatch[] = [
  {
    id: 'batch-001',
    name: 'Q4 2024 Quarterly Rebalance',
    description: 'Regular quarterly rebalancing for accounts exceeding drift thresholds',
    transactions: mockRebalancingTransactions,
    totalBuys: 8181.25,
    totalSells: 9397.5,
    netCashFlow: 1216.25,
    accountsAffected: 1,
    status: 'pending_approval',
    createdBy: 'advisor-001',
    createdAt: new Date('2024-12-05'),
  },
];

// Portfolio summary for dashboard
export interface PortfolioSummary {
  totalAUM: number;
  totalAccounts: number;
  accountsNeedingRebalancing: number;
  avgDrift: number;
  modelDistribution: { modelId: string; modelName: string; aum: number; accounts: number }[];
  performanceSummary: {
    avgYtd: number;
    bestPerformer: string;
    worstPerformer: string;
  };
}

export const mockPortfolioSummary: PortfolioSummary = {
  totalAUM: 523000000,
  totalAccounts: 1250,
  accountsNeedingRebalancing: 45,
  avgDrift: 2.1,
  modelDistribution: [
    { modelId: 'model-001', modelName: 'Conservative Income', aum: 85000000, accounts: 145 },
    { modelId: 'model-002', modelName: 'Balanced Growth', aum: 210000000, accounts: 380 },
    { modelId: 'model-003', modelName: 'Growth Focused', aum: 175000000, accounts: 225 },
    { modelId: 'model-004', modelName: 'Tax-Efficient Growth', aum: 95000000, accounts: 120 },
    { modelId: 'model-005', modelName: 'ESG Sustainable', aum: 65000000, accounts: 95 },
  ],
  performanceSummary: {
    avgYtd: 11.2,
    bestPerformer: 'Growth Focused',
    worstPerformer: 'Conservative Income',
  },
};

// Helper functions for mock responses
export function getMockModelPortfoliosResponse(
  page = 1,
  pageSize = 10,
  riskLevel?: ModelPortfolio['riskLevel']
): ApiResponse<ModelPortfolio[]> {
  let filtered = [...mockModelPortfolios];

  if (riskLevel) {
    filtered = filtered.filter((m) => m.riskLevel === riskLevel);
  }

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginated = filtered.slice(startIndex, endIndex);

  const pagination: PaginationMeta = {
    page,
    pageSize,
    totalItems,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };

  return {
    success: true,
    data: paginated,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: `mock-${Date.now()}`,
      pagination,
    },
  };
}

export function getMockModelPortfolioById(id: string): ApiResponse<ModelPortfolio> {
  const model = mockModelPortfolios.find((m) => m.id === id);

  if (!model) {
    return {
      success: false,
      error: {
        code: 'NOT_FOUND_ERROR',
        message: `Model portfolio with ID ${id} not found`,
      },
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: `mock-${Date.now()}`,
      },
    };
  }

  return {
    success: true,
    data: model,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: `mock-${Date.now()}`,
    },
  };
}

export function getMockClientPortfoliosResponse(
  page = 1,
  pageSize = 10,
  clientId?: string,
  driftStatus?: ClientPortfolio['driftStatus']
): ApiResponse<ClientPortfolio[]> {
  let filtered = [...mockClientPortfolios];

  if (clientId) {
    filtered = filtered.filter((p) => p.clientId === clientId);
  }

  if (driftStatus) {
    filtered = filtered.filter((p) => p.driftStatus === driftStatus);
  }

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginated = filtered.slice(startIndex, endIndex);

  const pagination: PaginationMeta = {
    page,
    pageSize,
    totalItems,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };

  return {
    success: true,
    data: paginated,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: `mock-${Date.now()}`,
      pagination,
    },
  };
}

export function getMockClientPortfolioById(id: string): ApiResponse<ClientPortfolio> {
  const portfolio = mockClientPortfolios.find((p) => p.id === id);

  if (!portfolio) {
    return {
      success: false,
      error: {
        code: 'NOT_FOUND_ERROR',
        message: `Client portfolio with ID ${id} not found`,
      },
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: `mock-${Date.now()}`,
      },
    };
  }

  return {
    success: true,
    data: portfolio,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: `mock-${Date.now()}`,
    },
  };
}

export function getMockRebalancingBatchesResponse(): ApiResponse<RebalancingBatch[]> {
  return {
    success: true,
    data: mockRebalancingBatches,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: `mock-${Date.now()}`,
    },
  };
}

export function getMockPortfolioSummaryResponse(): ApiResponse<PortfolioSummary> {
  return {
    success: true,
    data: mockPortfolioSummary,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: `mock-${Date.now()}`,
    },
  };
}
