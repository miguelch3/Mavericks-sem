// String literal to ensure type of field forms and not any string

type FormFields =
  | 'businessType'
  | 'legalBusinessName'
  | 'legalBusinessAddressOne'
  | 'legalBusinessAddressTwo'
  | 'legalBusinessCity'
  | 'legalBusinessState'
  | 'legalBusinessZipCode'
  | 'legalBusinessPhone'
  | 'legalBusinessTIN'
  | 'businessAs'
  | 'businessEstablishedDate'
  | 'dbaAddressOne'
  | 'dbaAddressTwo'
  | 'dbaAddressCity'
  | 'dbaAddressState'
  | 'dbaAddressZipCode'
  | 'businessPhone'
  | 'categoryType'
  | 'subCategoryType'
  | 'mccCode'
  | 'businessProductDescription'
  | 'businessProductWebsite'
  | 'businessHardwareEquipmentName'
  | 'businessHardwareEquipmentPrice'
  | 'businessHardwareEquipmentQuantity'
  | 'businessRepresentativeJobTitle'
  | 'averageMonthlyInCreditCard'
  | 'averageTicketValue'
  | 'highestAmountToDate'
  | 'cardSwipePercentage'
  | 'motoPercentage'
  | 'onlinePercentage'
  | 'keyedPercentage'
  | 'bankName'
  | 'routingNumber'
  | 'accountNumber'
  | 'accountNumberConfirm'
  | 'accountHolderName'
  | 'newAccountHold'
  | 'averageAmexMonthlySales'
  | 'averageAmexTicketValue'
  | 'averageAmexMonthlySalesTwo'
  | 'averageAmexTicketValueTwo'
  | 'discountType'
  | 'nextDayFunding'
  | 'nextDayFunding2'
  | 'zeroOutOne'
  | 'zeroOutTwo'
  | 'zeroOutThree'
  | 'zeroOutFour'
  | 'zeroOutFive'
  | 'zeroOutSix'
  | 'zeroOutSeven'
  | 'cardPercentageTypeOne'
  | 'cardFeeAmountTypeOne'
  | 'cardPercentageTypeTwo'
  | 'cardFeeAmountTypeTwo'
  | 'nonCardPercentageTypeOne'
  | 'nonCardFeeAmountTypeOne'
  | 'nonCardPercentageTypeTwo'
  | 'nonCardFeeAmountTypeTwo'
  | 'appFee'
  | 'productType'
  | 'fluidpayPartner'
  | 'averageMonthlySalesVol'
  | 'averageTicketSize'
  | 'highestTicketSize'
  | 'processorSelection'
  | 'pricingModel'
  | 'annualCashAndCreditVolume'
  | 'annualMCAndVisa'
  | 'annualWexVolume'
  | 'annualAmexVolume'
  | 'annualDiscoverValue'
  | 'twoTierPricing'
  | 'specialRelation'
  | 'merchantApplicationType'
  | 'selectedTIN'
  | 'tsysBoardingProfile'
  | 'tsysEquipmentTemplate'
  | 'businessContactName'
  | 'businessContactEmail'
  | 'underwritingMccCode'
  | 'equipmentTemplateOne'
  | 'equipmentTemplateTwo'
  | 'gateway'
  | 'rejectionFee'
  | 'yearsInBusiness'
  | 'pinDebit';

export type FormKeyDef = Record<FormFields, string>;

// Staging
export const StagingFieldKeys: FormKeyDef = {
  businessType: '17',
  legalBusinessName: '2',
  legalBusinessAddressOne: '4',
  legalBusinessAddressTwo: '',
  legalBusinessCity: '6',
  legalBusinessState: '7',
  legalBusinessZipCode: '8',
  legalBusinessPhone: '6470',
  legalBusinessTIN: '22',
  businessAs: '1',
  businessEstablishedDate: '20',
  dbaAddressOne: '5',
  dbaAddressTwo: '',
  dbaAddressCity: '24',
  dbaAddressState: '25',
  dbaAddressZipCode: '26',
  businessPhone: '9',

  businessContactName: '3',
  businessContactEmail: '12',

  businessRepresentativeJobTitle: '49',

  categoryType: '5800',
  subCategoryType: '6317',
  mccCode: '4370',

  businessProductDescription: '4824',
  businessProductWebsite: '19',

  averageMonthlyInCreditCard: '6185',
  averageTicketValue: '39',
  highestAmountToDate: '3598',
  cardSwipePercentage: '31',
  motoPercentage: '4221',
  onlinePercentage: '34',
  keyedPercentage: '4223',

  bankName: '29',
  routingNumber: '28',
  accountNumber: '30',
  accountNumberConfirm: '3605',
  accountHolderName: '5670',
  newAccountHold: '6652',

  businessHardwareEquipmentName: '7217',
  businessHardwareEquipmentPrice: '7915',
  businessHardwareEquipmentQuantity: '7917',

  averageAmexMonthlySales: '6647',
  averageAmexTicketValue: '6651',
  averageAmexMonthlySalesTwo: '6384',
  averageAmexTicketValueTwo: '6385',
  discountType: '6648',
  nextDayFunding: '6655',
  nextDayFunding2: '7597',

  zeroOutOne: '7879',
  zeroOutTwo: '7880',
  zeroOutThree: '7881',
  zeroOutFour: '7891',
  zeroOutFive: '7893',
  zeroOutSix: '7897',
  zeroOutSeven: '7898',

  cardPercentageTypeOne: '8180',
  cardFeeAmountTypeOne: '8184',

  cardPercentageTypeTwo: '8182',
  cardFeeAmountTypeTwo: '8186',

  nonCardPercentageTypeOne: '8181',
  nonCardFeeAmountTypeOne: '8185',

  nonCardPercentageTypeTwo: '8183',
  nonCardFeeAmountTypeTwo: '8187',

  appFee: '8190',
  productType: '8177',
  fluidpayPartner: '8178',

  averageMonthlySalesVol: '6646',
  averageTicketSize: '6650',
  highestTicketSize: '6649',

  annualCashAndCreditVolume: '7764',
  annualMCAndVisa: '5949',
  annualWexVolume: '6018',
  annualAmexVolume: '45',
  annualDiscoverValue: '5948',

  processorSelection: '7798',
  pricingModel: '7802',
  twoTierPricing: '8179',

  specialRelation: '7531',

  merchantApplicationType: '8197',

  selectedTIN: '7557',

  tsysBoardingProfile: '8341',
  tsysEquipmentTemplate: '8342',

  underwritingMccCode: '6658',

  equipmentTemplateOne: '8342',
  equipmentTemplateTwo: '8343',

  gateway: '6867',

  rejectionFee: '7904',

  yearsInBusiness: '5830',
  pinDebit: '6400',
} as const;

// Production
export const ProductionFieldKeys: FormKeyDef = {
  businessType: '17',
  legalBusinessName: '2',
  legalBusinessAddressOne: '4',
  legalBusinessAddressTwo: '',
  legalBusinessCity: '6',
  legalBusinessState: '7',
  legalBusinessZipCode: '8',
  legalBusinessPhone: '3670',
  legalBusinessTIN: '22',
  businessAs: '1',
  businessEstablishedDate: '20',
  dbaAddressOne: '5',
  dbaAddressTwo: '',
  dbaAddressCity: '24',
  dbaAddressState: '25',
  dbaAddressZipCode: '26',
  businessPhone: '9',

  businessContactName: '3',
  businessContactEmail: '12',

  businessRepresentativeJobTitle: '49',

  categoryType: '5800',
  subCategoryType: '6317',
  mccCode: '4370',

  businessProductDescription: '4824',
  businessProductWebsite: '19',

  averageMonthlyInCreditCard: '6185',
  averageTicketValue: '39',
  highestAmountToDate: '3598',
  cardSwipePercentage: '31',
  motoPercentage: '4221',
  onlinePercentage: '34',
  keyedPercentage: '4223',

  bankName: '29',
  routingNumber: '28',
  accountNumber: '30',
  accountNumberConfirm: '3605',
  accountHolderName: '5670',
  newAccountHold: '6667',

  businessHardwareEquipmentName: '6885',
  businessHardwareEquipmentPrice: '7856',
  businessHardwareEquipmentQuantity: '7855',

  averageAmexMonthlySales: '6672',
  averageAmexTicketValue: '6668',
  averageAmexMonthlySalesTwo: '6384',
  averageAmexTicketValueTwo: '6385',
  discountType: '6671',
  nextDayFunding: '6664',
  nextDayFunding2: '7502',

  zeroOutOne: '7767',
  zeroOutTwo: '7766',
  zeroOutThree: '7765',
  zeroOutFour: '7754',
  zeroOutFive: '7752',
  zeroOutSix: '7748',
  zeroOutSeven: '7747',

  cardPercentageTypeOne: '8007',
  cardFeeAmountTypeOne: '8008',

  cardPercentageTypeTwo: '8011',
  cardFeeAmountTypeTwo: '8012',

  nonCardPercentageTypeOne: '8009',
  nonCardFeeAmountTypeOne: '8010',

  nonCardPercentageTypeTwo: '8013',
  nonCardFeeAmountTypeTwo: '8014',

  appFee: '8018',
  productType: '8004',
  fluidpayPartner: '8005',

  averageMonthlySalesVol: '6673',
  averageTicketSize: '6669',
  highestTicketSize: '6670',

  annualCashAndCreditVolume: '3675',
  annualMCAndVisa: '5192',
  annualWexVolume: '6018',
  annualAmexVolume: '45',
  annualDiscoverValue: '5191',

  processorSelection: '7738',
  pricingModel: '7841',
  twoTierPricing: '8006',

  specialRelation: '6950',

  merchantApplicationType: '8025',

  selectedTIN: '6955',

  tsysBoardingProfile: '7678',
  tsysEquipmentTemplate: '7679',

  underwritingMccCode: '6661',

  equipmentTemplateOne: '7679',
  equipmentTemplateTwo: '8026',

  gateway: '6886',

  rejectionFee: '7742',

  yearsInBusiness: '6851',
  pinDebit: '6400',
} as const;
