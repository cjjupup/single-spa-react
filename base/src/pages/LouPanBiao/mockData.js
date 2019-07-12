export const typeList = [
  {
    display: '可售',
    value: '0'
  }, {
    display: '已签约',
    value: '1'
  }, {
    display: '已备案',
    value: '2'
  }, {
    display: '不可售',
    value: '3'
  }
]

export const fwxzList = [
  {
    display: '市场化商品房',
    value: '0'
  }, {
    display: '动迁房',
    value: '1'
  }, {
    display: '配套商品房',
    value: '2'
  }, {
    display: '公共租赁住房',
    value: '3'
  }, {
    display: '廉租住房',
    value: '4'
  }, {
    display: '限价普通商品住房',
    value: '5'
  }, {
    display: '经济适用住房',
    value: '6'
  }, {
    display: '定销商品房',
    value: '7'
  }, {
    display: '集资建房',
    value: '8'
  }, {
    display: '福利房',
    value: '9'
  }, {
    display: '其他',
    value: '99'
  }
]

export const lpxxList = [
  {
    dy: '一单元',
    ceng: [
      {
        sjc: 4,
        ch: '四层',
        // hu: [
        //   {
        //     fjh: '1-0401',
        //     fwxz: 0,
        //     fwxzmc: '市场化商品房',
        //     type: 3
        //   },
        //   {
        //     fjh: '1-0402',
        //     fwxz: 1,
        //     fwxzmc: '动迁房',
        //     type: 2
        //   },
        //   {
        //     fjh: '1-0403',
        //     fwxz: 1,
        //     fwxzmc: '动迁房',
        //     type: 2
        //   },
        //   {
        //     fjh: '1-0404',
        //     fwxz: 0,
        //     fwxzmc: '市场化商品房',
        //     type: 1
        //   }
        // ]
      },
      {
        sjc: 3,
        ch: '三层',
        hu: [
          {
            fjh: '1-0301',
            fwxz: 2,
            fwxzmc: '配套商品房',
            type: 0
          },
          {
            fjh: '1-0302',
            fwxz: 2,
            fwxzmc: '配套商品房',
            type: 1
          },
          {
            fjh: '1-0303',
            fwxz: 4,
            fwxzmc: '廉租住房',
            type: 1
          },
          {
            fjh: '1-0304',
            fwxz: 4,
            fwxzmc: '廉租住房',
            type: 2
          }
        ]
      },
      {
        sjc: 2,
        ch: '二层',
        hu: [
          {
            fjh: '1-0201',
            fwxz: 0,
            fwxzmc: '市场化商品房',
            type: 3
          },
          {
            fjh: '1-0202',
            fwxz: 1,
            fwxzmc: '动迁房',
            type: 3
          },
          {
            fjh: '1-0203',
            fwxz: 1,
            fwxzmc: '动迁房',
            type: 3
          },
          {
            fjh: '1-0204',
            fwxz: 0,
            fwxzmc: '市场化商品房',
            type: 1
          }
        ]
      },
      {
        sjc: 1,
        ch: '一层',
        hu: [
          {
            fjh: '1-0101',
            fwxz: 2,
            fwxzmc: '配套商品房',
            type: 0
          },
          {
            fjh: '1-0102',
            fwxz: 2,
            fwxzmc: '配套商品房',
            type: 0
          },
          {
            fjh: '1-0103',
            fwxz: 4,
            fwxzmc: '廉租住房',
            type: 0
          },
          {
            fjh: '1-0104',
            fwxz: 4,
            fwxzmc: '廉租住房',
            type: 2
          }
        ]
      }
    ]
  },
  {
    dy: '二单元',
    ceng: [
      {
        sjc: 4,
        ch: '四层',
        hu: [
          {
            fjh: '2-0401',
            fwxz: 0,
            fwxzmc: '市场化商品房',
            type: 0
          },
          {
            fjh: '2-0402',
            fwxz: 1,
            fwxzmc: '动迁房',
            type: 1
          },
          {
            fjh: '2-0403',
            fwxz: 1,
            fwxzmc: '动迁房',
            type: 1
          },
          {
            fjh: '2-0404',
            fwxz: 0,
            fwxzmc: '市场化商品房',
            type: 2
          }
        ]
      },
      {
        sjc: 3,
        ch: '三层',
        hu: [
          {
            fjh: '2-0301',
            fwxz: 2,
            fwxzmc: '配套商品房',
            type: 3
          },
          {
            fjh: '2-0302',
            fwxz: 2,
            fwxzmc: '配套商品房',
            type: 3
          },
          {
            fjh: '2-0303',
            fwxz: 4,
            fwxzmc: '廉租住房',
            type: 1
          },
          {
            fjh: '2-0304',
            fwxz: 4,
            fwxzmc: '廉租住房',
            type: 0
          }
        ]
      },
      {
        sjc: 2,
        ch: '二层',
        hu: [
          {
            fjh: '2-0201',
            fwxz: 0,
            fwxzmc: '市场化商品房',
            type: 3
          },
          {
            fjh: '2-0202',
            fwxz: 0,
            fwxzmc: '市场化商品房',
            type: 3
          },
          {
            fjh: '2-0203',
            fwxz: 1,
            fwxzmc: '动迁房',
            type: 1
          },
          {
            fjh: '2-0204',
            fwxz: 1,
            fwxzmc: '动迁房',
            type: 2
          }
        ]
      },
      {
        sjc: 1,
        ch: '一层',
        hu: [
          {
            fjh: '2-0101',
            fwxz: 4,
            fwxzmc: '廉租住房',
            type: 3
          },
          {
            fjh: '2-0102',
            fwxz: 4,
            fwxzmc: '廉租住房',
            type: 3
          },
          {
            fjh: '2-0103',
            fwxz: 2,
            fwxzmc: '配套商品房',
            type: 1
          },
          {
            fjh: '2-0104',
            fwxz: 2,
            fwxzmc: '配套商品房',
            type: 1
          }
        ]
      }
    ]
  }
]
