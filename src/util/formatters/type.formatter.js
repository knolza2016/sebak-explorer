export { formatOperationType }

function formatOperationType(type) {
  switch (type) {
    case 'create-account':
      return 'Create account'
    case 'payment':
      return 'Payment'
    case 'collect-tx-fee':
      return 'Collect transaction fee'
    case 'inflation':
      return "Inflation"
    case 'unfreezing-request':
      return "Unfreezing request"
    default:
      return type;
  }
}
