const products = [
  {
    user: 'Admin User',
    orderItems: {
      name: 'Roberto Santos',
      age: 5,
      medA: 36,
      medB: 25,
      medC: 30,
      medD: 28,
      medE: 14,
      medF: 27,
      product: 'CRI manual',
    },
    entity: 'APAE - Jacareí',
    cpf_cnpj: '25.150.142/0001-50',
    shippingAddress: {
      address: 'Rua Independência, 135',
      city: 'Jacareí',
      state: 'São Paulo',
      postalCode: '12.300-100',
    },
    shippingPrice: 0.0,
    isAproved: true,
    orderedAt: '',
    buildResult: {
      status: 'pedido recebido',
      updateTime: '',
    },
    isDelivered: false,
    deliveredAt: '',
  },
];
export default products;
