export default ({fetchMock, delay, mock, toSuccess, toError}) => ({
  // organization
  '/api/tree/getDept': (options) => toSuccess([{
    title: 'manager',
    key: '0-0',
    children: [{
      title: 'technical director',
      key: '0-0-0',
      children: [
        { title: 'Production department', key: '0-0-0-0' },
        { title: 'R&D department', key: '0-0-0-1' },
        { title: 'Testing Division', key: '0-0-0-2' },
      ],
    }, {
      title: 'Director of Sales',
      key: '0-0-1',
      children: [
        { title: 'Order Management Department', key: '0-0-1-0' },
        { title: 'Blowing water training center', key: '0-0-1-1' },
        { title: 'Branch office', key: '0-0-1-2' },
      ],
    }, {
      title: 'financial director',
      key: '0-0-2',
    }],
  }, {
    title: 'Manager wife',
    key: '0-1',
    children: [
      { title: 'Driver Xiao Liu', key: '0-1-0-0' },
      { title: 'Driver Xiao Chen', key: '0-1-0-1' },
      { title: 'Driver pony', key: '0-1-0-2' },
    ],
  }, {
    title: 'Next door',
    key: '0-2',
  }], 400),
  // Asynchronous tree
  '/api/tree/getAsyncData': (options) => {
    let key = '0';
    if (options.body) {
      key = JSON.parse(options.body);
    }
    return toSuccess([
      {
        title: `Child node 0${  key}`,
        key: `0${  key}`,
      },
      {
        title: `Child node 1${  key}`,
        key: `1${  key}`,
      },
      {
        title: `Child node 2${  key}`,
        key: `2${  key}`,
        isLeaf: true,
      }
    ], 400)
  },
  '/api/tree/getAsyncSearchData': (options) => {
    let title = '0';
    if (options.body) {
      const data = JSON.parse(options.body);
      title = data.search;
    }
    return toSuccess([
      {
        title: `Child node 2${title}`,
        key: `2${title}`,
      }
    ], 400)
  },
  // Asynchronous select tree
  '/api/tree/getAsyncTreeSelect': (options) => {
    let key = '0';
    if (options.body) {
      key = JSON.parse(options.body);
    }
    return toSuccess([
      {
        title: `Child node 0${  key}`,
        value: `0${  key}`,
        key: `0${  key}`,
      },
      {
        title: `Child node 1${  key}`,
        value: `1${  key}`,
        key: `1${  key}`,
      },
      {
        title: `Child node 2${  key}`,
        value: `2${  key}`,
        key: `2${  key}`,
        isLeaf: true,
      }
    ], 400)
  },
  // Provincial and urban data
  '/api/tree/getData': (options) => toSuccess(
    [
      {
        key: "123123",
        title: "Only one level"
      },
      {
        key: "340000",
        title: "Anhui Province",
        children: [
          {
            key: "341500",
            title: "Lu'an City",
            children: [
              {
                key: "341522",
                title: "Huoqiu County",
              },
              {
                key: "341525",
                title: "?????????",
              },
              {
                key: "341502",
                title: "?????????",
              },
              {
                key: "341524",
                title: "?????????",
              },
              {
                key: "341526",
                title: "?????????",
              },
              {
                key: "341521",
                title: "??????",
              },
              {
                key: "341523",
                title: "?????????",
              },
              {
                key: "341503",
                title: "?????????",
              }
            ]
          },
          {
            key: "340500",
            title: "????????????",
            children: [
              {
                key: "340506",
                title: "?????????",
              }
            ]
          },
          {
            key: "341800",
            title: "?????????",
            children: [
              {
                key: "341822",
                title: "?????????",
              },
              {
                key: "341824",
                title: "?????????",
              },
              {
                key: "341825",
                title: "?????????",
              }
            ]
          }
        ]
      },
      {
        key: "820000",
        title: "?????????????????????",
        children: [
          {
            key: "820100",
            title: "????????????",
          },
          {
            key: "820200",
            title: "??????",
          }
        ]
      },
      {
        key: "110000",
        title: "??????",
        children: [
          {
            key: "110100",
            title: "?????????",
            children: [
              {
                key: "110114",
                title: "?????????",
              },
              {
                key: "110105",
                title: "?????????",
              },
              {
                key: "110103",
                title: "?????????",
              },
              {
                key: "110115",
                title: "?????????",
              },
              {
                key: "110101",
                title: "?????????",
              },
              {
                key: "110111",
                title: "?????????",
              },
              {
                key: "110106",
                title: "?????????",
              },
              {
                key: "110108",
                title: "?????????",
              },
              {
                key: "110116",
                title: "?????????",
              },
              {
                key: "110109",
                title: "????????????",
              },
              {
                key: "110228",
                title: "?????????",
              },
              {
                key: "110117",
                title: "?????????",
              },
              {
                key: "110230",
                title: "?????????",
              },
              {
                key: "110107",
                title: "????????????",
              },
              {
                key: "110113",
                title: "?????????",
              },
              {
                key: "110112",
                title: "?????????",
              },
              {
                key: "110102",
                title: "?????????",
              },
              {
                key: "110104",
                title: "?????????",
              },
              {
                key: "110229",
                title: "?????????",
              }
            ]
          }
        ]
      },
      {
        key: "450000",
        title: "?????????????????????",
        children: [
          {
            key: "450500",
            title: "?????????",
            children: [
              {
                key: "450502",
                title: "?????????",
              },
              {
                key: "450521",
                title: "?????????",
              },
              {
                key: "450522",
                title: "?????????",
              },
              {
                key: "450512",
                title: "????????????",
              },
              {
                key: "450503",
                title: "?????????",
              }
            ]
          },
          {
            key: "451000",
            title: "?????????",
            children: [
              {
                key: "451024",
                title: "?????????",
              },
              {
                key: "451025",
                title: "?????????",
              },
              {
                key: "451028",
                title: "?????????",
              },
              {
                key: "451027",
                title: "?????????",
              },
              {
                key: "451031",
                title: "?????????????????????",
              },
              {
                key: "451026",
                title: "?????????",
              },
              {
                key: "451023",
                title: "?????????",
              },
              {
                key: "451032",
                title: "?????????",
              },
              {
                key: "451022",
                title: "?????????",
              },
              {
                key: "451029",
                title: "?????????",
              },
              {
                key: "451021",
                title: "?????????",
              },
              {
                key: "451030",
                title: "?????????",
              },
              {
                key: "451002",
                title: "?????????",
              }
            ]
          },
          {
            key: "451400",
            title: "?????????",
            children: [
              {
                key: "451424",
                title: "?????????",
              },
              {
                key: "451421",
                title: "?????????",
              },
              {
                key: "451402",
                title: "?????????",
              },
              {
                key: "451423",
                title: "?????????",
              },
              {
                key: "451422",
                title: "?????????",
              },
              {
                key: "451481",
                title: "?????????",
              },
              {
                key: "451482",
                title: "?????????",
              },
              {
                key: "451425",
                title: "?????????",
              }
            ]
          },
          {
            key: "450600",
            title: "????????????",
            children: [
              {
                key: "450681",
                title: "?????????",
              },
              {
                key: "450603",
                title: "?????????",
              },
              {
                key: "450602",
                title: "?????????",
              },
              {
                key: "450682",
                title: "?????????",
              },
              {
                key: "450621",
                title: "?????????",
              }
            ]
          },
          {
            key: "450800",
            title: "?????????",
            children: [
              {
                key: "450802",
                title: "?????????",
              },
              {
                key: "450803",
                title: "?????????",
              },
              {
                key: "450881",
                title: "?????????",
              },
              {
                key: "450821",
                title: "?????????",
              },
              {
                key: "450882",
                title: "?????????",
              },
              {
                key: "450804",
                title: "?????????",
              }
            ]
          },
          {
            key: "450300",
            title: "?????????",
            children: [
              {
                key: "450303",
                title: "?????????",
              },
              {
                key: "450332",
                title: "?????????????????????",
              },
              {
                key: "450327",
                title: "?????????",
              },
              {
                key: "450331",
                title: "?????????",
              },
              {
                key: "450322",
                title: "?????????",
              },
              {
                key: "450323",
                title: "?????????",
              },
              {
                key: "450328",
                title: "?????????????????????",
              },
              {
                key: "450330",
                title: "?????????",
              },
              {
                key: "450333",
                title: "?????????",
              },
              {
                key: "450305",
                title: "?????????",
              },
              {
                key: "450324",
                title: "?????????",
              },
              {
                key: "450304",
                title: "?????????",
              },
              {
                key: "450325",
                title: "?????????",
              },
              {
                key: "450302",
                title: "?????????",
              },
              {
                key: "450311",
                title: "?????????",
              },
              {
                key: "450321",
                title: "?????????",
              },
              {
                key: "450326",
                title: "?????????",
              },
              {
                key: "450329",
                title: "?????????",
              }
            ]
          },
          {
            key: "451200",
            title: "?????????",
            children: [
              {
                key: "451227",
                title: "?????????????????????",
              },
              {
                key: "451229",
                title: "?????????????????????",
              },
              {
                key: "451224",
                title: "?????????",
              },
              {
                key: "451228",
                title: "?????????????????????",
              },
              {
                key: "451223",
                title: "?????????",
              },
              {
                key: "451226",
                title: "????????????????????????",
              },
              {
                key: "451202",
                title: "????????????",
              },
              {
                key: "451225",
                title: "????????????????????????",
              },
              {
                key: "451221",
                title: "?????????",
              },
              {
                key: "451282",
                title: "?????????",
              },
              {
                key: "451222",
                title: "?????????",
              },
              {
                key: "451281",
                title: "?????????",
              }
            ]
          },
          {
            key: "451100",
            title: "?????????",
            children: [
              {
                key: "451102",
                title: "?????????",
              },
              {
                key: "451123",
                title: "?????????????????????",
              },
              {
                key: "451119",
                title: "???????????????",
              },
              {
                key: "451124",
                title: "?????????",
              },
              {
                key: "451121",
                title: "?????????",
              },
              {
                key: "451122",
                title: "?????????",
              }
            ]
          },
          {
            key: "451300",
            title: "?????????",
            children: [
              {
                key: "451381",
                title: "?????????",
              },
              {
                key: "451324",
                title: "?????????????????????",
              },
              {
                key: "451382",
                title: "?????????",
              },
              {
                key: "451323",
                title: "?????????",
              },
              {
                key: "451322",
                title: "?????????",
              },
              {
                key: "451321",
                title: "?????????",
              },
              {
                key: "451302",
                title: "?????????",
              }
            ]
          },
          {
            key: "450200",
            title: "?????????",
            children: [
              {
                key: "450202",
                title: "?????????",
              },
              {
                key: "450205",
                title: "?????????",
              },
              {
                key: "450222",
                title: "?????????",
              },
              {
                key: "450221",
                title: "?????????",
              },
              {
                key: "450204",
                title: "?????????",
              },
              {
                key: "450223",
                title: "?????????",
              },
              {
                key: "450227",
                title: "?????????",
              },
              {
                key: "450224",
                title: "?????????",
              },
              {
                key: "450225",
                title: "?????????????????????",
              },
              {
                key: "450226",
                title: "?????????????????????",
              },
              {
                key: "450203",
                title: "?????????",
              }
            ]
          },
          {
            key: "450100",
            title: "?????????",
            children: [
              {
                key: "450126",
                title: "?????????",
              },
              {
                key: "450127",
                title: "??????",
              },
              {
                key: "450105",
                title: "?????????",
              },
              {
                key: "450108",
                title: "?????????",
              },
              {
                key: "450123",
                title: "?????????",
              },
              {
                key: "450124",
                title: "?????????",
              },
              {
                key: "450128",
                title: "?????????",
              },
              {
                key: "450103",
                title: "?????????",
              },
              {
                key: "450125",
                title: "?????????",
              },
              {
                key: "450122",
                title: "?????????",
              },
              {
                key: "450107",
                title: "????????????",
              },
              {
                key: "450102",
                title: "?????????",
              },
              {
                key: "450109",
                title: "?????????",
              }
            ]
          },
          {
            key: "450700",
            title: "?????????",
            children: [
              {
                key: "450721",
                title: "?????????",
              },
              {
                key: "450722",
                title: "?????????",
              },
              {
                key: "450723",
                title: "?????????",
              },
              {
                key: "450703",
                title: "?????????",
              },
              {
                key: "450702",
                title: "?????????",
              }
            ]
          },
          {
            key: "450400",
            title: "?????????",
            children: [
              {
                key: "450421",
                title: "?????????",
              },
              {
                key: "450481",
                title: "?????????",
              },
              {
                key: "450405",
                title: "?????????",
              },
              {
                key: "450404",
                title: "?????????",
              },
              {
                key: "450406",
                title: "?????????",
              },
              {
                key: "450423",
                title: "?????????",
              },
              {
                key: "450482",
                title: "?????????",
              },
              {
                key: "450422",
                title: "??????",
              },
              {
                key: "450403",
                title: "?????????",
              }
            ]
          },
          {
            key: "450900",
            title: "?????????",
            children: [
              {
                key: "450981",
                title: "?????????",
              },
              {
                key: "450923",
                title: "?????????",
              },
              {
                key: "450903",
                title: "?????????",
              },
              {
                key: "450922",
                title: "?????????",
              },
              {
                key: "450982",
                title: "?????????",
              },
              {
                key: "450921",
                title: "??????",
              },
              {
                key: "450924",
                title: "?????????",
              },
              {
                key: "450902",
                title: "?????????",
              }
            ]
          }
        ]
      },
      {
        key: "810000",
        title: "?????????????????????",
        children: [
          {
            key: "810200",
            title: "??????",
            children: [
              {
                key: "810205",
                title: "?????????",
              },
              {
                key: "810204",
                title: "????????????",
              },
              {
                key: "810201",
                title: "????????????",
              },
              {
                key: "810203",
                title: "????????????",
              },
              {
                key: "810202",
                title: "????????????",
              }
            ]
          },
          {
            key: "810100",
            title: "?????????",
            children: [
              {
                key: "810103",
                title: "??????",
              },
              {
                key: "810104",
                title: "??????",
              },
              {
                key: "810102",
                title: "??????",
              },
              {
                key: "810101",
                title: "?????????",
              }
            ]
          },
          {
            key: "810300",
            title: "??????",
            children: [
              {
                key: "810301",
                title: "??????",
              },
              {
                key: "810302",
                title: "?????????",
              },
              {
                key: "810308",
                title: "?????????",
              },
              {
                key: "810309",
                title: "?????????",
              },
              {
                key: "810307",
                title: "?????????",
              },
              {
                key: "810303",
                title: "?????????",
              },
              {
                key: "810306",
                title: "?????????",
              },
              {
                key: "810304",
                title: "?????????",
              },
              {
                key: "810305",
                title: "?????????",
              }
            ]
          }
        ]
      },
      {
        key: "330000",
        title: "?????????",
        children: [
          {
            key: "330100",
            title: "?????????",
            children: [
              {
                key: "330108",
                title: "?????????",
              },
              {
                key: "330127",
                title: "?????????",
              },
              {
                key: "330183",
                title: "?????????",
              },
              {
                key: "330105",
                title: "?????????",
              },
              {
                key: "330182",
                title: "?????????",
              },
              {
                key: "330104",
                title: "?????????",
              },
              {
                key: "330185",
                title: "?????????",
              },
              {
                key: "330186",
                title: "?????????",
              },
              {
                key: "330102",
                title: "?????????",
              },
              {
                key: "330122",
                title: "?????????",
              },
              {
                key: "330106",
                title: "?????????",
              },
              {
                key: "330103",
                title: "?????????",
              },
              {
                key: "330109",
                title: "?????????",
              },
              {
                key: "330110",
                title: "?????????",
              }
            ]
          },
          {
            key: "330500",
            title: "?????????",
            children: [
              {
                key: "330523",
                title: "?????????",
              },
              {
                key: "330522",
                title: "?????????",
              },
              {
                key: "330521",
                title: "?????????",
              },
              {
                key: "330503",
                title: "?????????",
              },
              {
                key: "330524",
                title: "?????????",
              },
              {
                key: "330502",
                title: "?????????",
              }
            ]
          },
          {
            key: "330400",
            title: "?????????",
            children: [
              {
                key: "330481",
                title: "?????????",
              },
              {
                key: "330424",
                title: "?????????",
              },
              {
                key: "330421",
                title: "?????????",
              },
              {
                key: "330402",
                title: "?????????",
              },
              {
                key: "330482",
                title: "?????????",
              },
              {
                key: "330484",
                title: "?????????",
              },
              {
                key: "330483",
                title: "?????????",
              },
              {
                key: "330411",
                title: "?????????",
              }
            ]
          },
          {
            key: "330700",
            title: "?????????",
            children: [
              {
                key: "330783",
                title: "?????????",
              },
              {
                key: "330703",
                title: "?????????",
              },
              {
                key: "330781",
                title: "?????????",
              },
              {
                key: "330727",
                title: "?????????",
              },
              {
                key: "330726",
                title: "?????????",
              },
              {
                key: "330785",
                title: "?????????",
              },
              {
                key: "330702",
                title: "?????????",
              },
              {
                key: "330723",
                title: "?????????",
              },
              {
                key: "330782",
                title: "?????????",
              },
              {
                key: "330784",
                title: "?????????",
              }
            ]
          },
          {
            key: "331100",
            title: "?????????",
            children: [
              {
                key: "331122",
                title: "?????????",
              },
              {
                key: "331127",
                title: "?????????????????????",
              },
              {
                key: "331102",
                title: "?????????",
              },
              {
                key: "331181",
                title: "?????????",
              },
              {
                key: "331182",
                title: "?????????",
              },
              {
                key: "331121",
                title: "?????????",
              },
              {
                key: "331126",
                title: "?????????",
              },
              {
                key: "331124",
                title: "?????????",
              },
              {
                key: "331123",
                title: "?????????",
              },
              {
                key: "331125",
                title: "?????????",
              }
            ]
          },
          {
            key: "330200",
            title: "?????????",
            children: [
              {
                key: "330206",
                title: "?????????",
              },
              {
                key: "330282",
                title: "?????????",
              },
              {
                key: "330283",
                title: "?????????",
              },
              {
                key: "330203",
                title: "?????????",
              },
              {
                key: "330205",
                title: "?????????",
              },
              {
                key: "330204",
                title: "?????????",
              },
              {
                key: "330226",
                title: "?????????",
              },
              {
                key: "330284",
                title: "?????????",
              },
              {
                key: "330225",
                title: "?????????",
              },
              {
                key: "330212",
                title: "?????????",
              },
              {
                key: "330281",
                title: "?????????",
              },
              {
                key: "330211",
                title: "?????????",
              }
            ]
          },
          {
            key: "330800",
            title: "?????????",
            children: [
              {
                key: "330822",
                title: "?????????",
              },
              {
                key: "330881",
                title: "?????????",
              },
              {
                key: "330824",
                title: "?????????",
              },
              {
                key: "330802",
                title: "?????????",
              },
              {
                key: "330825",
                title: "?????????",
              },
              {
                key: "330882",
                title: "?????????",
              },
              {
                key: "330803",
                title: "?????????",
              }
            ]
          },
          {
            key: "330600",
            title: "?????????",
            children: [
              {
                key: "330621",
                title: "?????????",
              },
              {
                key: "330684",
                title: "?????????",
              },
              {
                key: "330682",
                title: "?????????",
              },
              {
                key: "330683",
                title: "?????????",
              },
              {
                key: "330624",
                title: "?????????",
              },
              {
                key: "330602",
                title: "?????????",
              },
              {
                key: "330681",
                title: "?????????",
              }
            ]
          },
          {
            key: "331000",
            title: "?????????",
            children: [
              {
                key: "331003",
                title: "?????????",
              },
              {
                key: "331002",
                title: "?????????",
              },
              {
                key: "331082",
                title: "?????????",
              },
              {
                key: "331004",
                title: "?????????",
              },
              {
                key: "331083",
                title: "?????????",
              },
              {
                key: "331022",
                title: "?????????",
              },
              {
                key: "331023",
                title: "?????????",
              },
              {
                key: "331081",
                title: "?????????",
              },
              {
                key: "331024",
                title: "?????????",
              },
              {
                key: "331021",
                title: "?????????",
              }
            ]
          },
          {
            key: "330300",
            title: "?????????",
            children: [
              {
                key: "330327",
                title: "?????????",
              },
              {
                key: "330322",
                title: "?????????",
              },
              {
                key: "330303",
                title: "?????????",
              },
              {
                key: "330302",
                title: "?????????",
              },
              {
                key: "330304",
                title: "?????????",
              },
              {
                key: "330326",
                title: "?????????",
              },
              {
                key: "330383",
                title: "?????????",
              },
              {
                key: "330381",
                title: "?????????",
              },
              {
                key: "330329",
                title: "?????????",
              },
              {
                key: "330328",
                title: "?????????",
              },
              {
                key: "330324",
                title: "?????????",
              },
              {
                key: "330382",
                title: "?????????",
              }
            ]
          },
          {
            key: "330900",
            title: "?????????",
            children: [
              {
                key: "330921",
                title: "?????????",
              },
              {
                key: "330902",
                title: "?????????",
              },
              {
                key: "330903",
                title: "?????????",
              },
              {
                key: "330923",
                title: "?????????",
              },
              {
                key: "330922",
                title: "?????????",
              }
            ]
          }
        ]
      }
    ]
    , 400),
})
