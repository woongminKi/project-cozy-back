require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const http = require('http'); // Add this line for HTTP server
const WebSocket = require('ws'); // Add this line for WebSocket server
const wsModule = require('ws');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL);

const index = require('./routes/index');
const health = require('./routes/health');
const user = require('./routes/user');
const stripe = require('./routes/stripe');

const app = express();

// Middleware
const whitelist = [
  'http://coin-is-easy.xyz',
  'http://coin-is-easy.xyz:3000',
  'http://localhost:3000',
  'https://coin-is-easy.xyz',
  'http://coin-is-easy.xyz',
  'http://coin-is-easy.xyz:3000',
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: 5000000 }));
app.use(express.urlencoded({ limit: 5000000, extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// Serve static files
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../project-cozy-clinet/build'));
// });
app.use('/', index);
app.use('/health', health);
app.use('/user', user);
app.use('/stripe', stripe);

app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({ message: err.message, status: err.status });
});

// Create HTTP server
const port = normalizePort(process.env.PORT || '8000');
const server = http.createServer(app);
server.listen(port);

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

// Create WebSocket server
// console.log('hello?!!?!?!');
const wss = new WebSocket.Server({ server });
const bithumbWs = new wsModule(process.env.BITHUMB_SOCKET_URL);
let coinInfo = null;
const requestData = {
  type: 'ticker',
  symbols: [
    '1INCH_KRW',
    'AAVE_KRW',
    'ADA_KRW',
    'ADP_KRW',
    'AERGO_KRW',
    'AION_KRW',
    'ALGO_KRW',
    'ALICE_KRW',
    'AMO_KRW',
    'ANKR_KRW',
    'ANV_KRW',
    'ANW_KRW',
    'APIX_KRW',
    'APM_KRW',
    'AQT_KRW',
    'ARPA_KRW',
    'ARW_KRW',
    'ASM_KRW',
    'ATOLO_KRW',
    'ATOM_KRW',
    'AWO_KRW',
    'AXS_KRW',
    'BAKE_KRW',
    'BAL_KRW',
    'BASIC_KRW',
    'BAT_KRW',
    'BCD_KRW',
    'BCH_KRW',
    'BEL_KRW',
    'BFC_KRW',
    'BIOT_KRW',
    'BLY_KRW',
    'BNB_KRW',
    'BNT_KRW',
    'BOA_KRW',
    'BOBA_KRW',
    'BORA_KRW',
    'BSV_KRW',
    'BTC_KRW',
    'BTG_KRW',
    'BTT_KRW',
    'BURGER_KRW',
    'C98_KRW',
    'CAKE_KRW',
    'CELR_KRW',
    'CENNZ_KRW',
    'CHR_KRW',
    'CHZ_KRW',
    'CKB_KRW',
    'COLA_KRW',
    'COMP_KRW',
    'CON_KRW',
    'COS_KRW',
    'COTI_KRW',
    'CRO_KRW',
    'CTC_KRW',
    'CTK_KRW',
    'CTSI_KRW',
    'CTXC_KRW',
    'CWD_KRW',
    'CYCLUB_KRW',
    'DAD_KRW',
    'DAI_KRW',
    'DAO_KRW',
    'DOGE_KRW',
    'DOT_KRW',
    'DVI_KRW',
    'EGG_KRW',
    'EGLD_KRW',
    'EL_KRW',
    'ELF_KRW',
    'ENJ_KRW',
    'EOS_KRW',
    'ETC_KRW',
    'ETH_KRW',
    'EVZ_KRW',
    'FCT2_KRW',
    'FIT_KRW',
    'FLETA_KRW',
    'FRONT_KRW',
    'FX_KRW',
    'GALA_KRW',
    'GHX_KRW',
    'GLM_KRW',
    'GOM2_KRW',
    'GRT_KRW',
    'GXC_KRW',
    'HIBS_KRW',
    'HIVE_KRW',
    'ICX_KRW',
    'IOST_KRW',
    'IPX_KRW',
    'JST_KRW',
    'KLAY_KRW',
    'KNC_KRW',
    'KSM_KRW',
    'LINA_KRW',
    'LINK_KRW',
    'LOOM_KRW',
    'LPT_KRW',
    'LRC_KRW',
    'LTC_KRW',
    'LUNA_KRW',
    'MANA_KRW',
    'MAP_KRW',
    'MATIC_KRW',
    'MBL_KRW',
    'MED_KRW',
    'META_KRW',
    'MIR_KRW',
    'MIX_KRW',
    'MKR_KRW',
    'MLK_KRW',
    'MM_KRW',
    'MSB_KRW',
    'MTL_KRW',
    'MVC_KRW',
    'MXC_KRW',
    'NFT_KRW',
    'NMR_KRW',
    'NU_KRW',
    'OBSR_KRW',
    'OCEAN_KRW',
    'OMG_KRW',
    'ONG_KRW',
    'ONT_KRW',
    'ORBS_KRW',
    'ORC_KRW',
    'OXT_KRW',
    'PCI_KRW',
    'POLA_KRW',
    'POWR_KRW',
    'PUNDIX_KRW',
    'QKC_KRW',
    'QTCON_KRW',
    'QTUM_KRW',
    'REN_KRW',
    'REP_KRW',
    'RINGX_KRW',
    'RLC_KRW',
    'RLY_KRW',
    'RSR_KRW',
    'SAND_KRW',
    'SNT_KRW',
    'SNX_KRW',
    'SOC_KRW',
    'SOFI_KRW',
    'SOL_KRW',
    'SRM_KRW',
    'SSX_KRW',
    'STEEM_KRW',
    'STRAX_KRW',
    'SUN_KRW',
    'SUSHI_KRW',
    'SXP_KRW',
    'TEMCO_KRW',
    'TFUEL_KRW',
    'THETA_KRW',
    'TMTG_KRW',
    'TRV_KRW',
    'TRX_KRW',
    'UMA_KRW',
    'UNI_KRW',
    'UOS_KRW',
    'VALOR_KRW',
    'VELO_KRW',
    'VET_KRW',
    'VRA_KRW',
    'VSYS_KRW',
    'WAVES_KRW',
    'WAXP_KRW',
    'WEMIX_KRW',
    'WICC_KRW',
    'WIKEN_KRW',
    'WOM_KRW',
    'WOO_KRW',
    'WOZX_KRW',
    'WTC_KRW',
    'XEC_KRW',
    'XEM_KRW',
    'XLM_KRW',
    'XNO_KRW',
    'XPR_KRW',
    'XRP_KRW',
    'XTZ_KRW',
    'XVS_KRW',
    'XYM_KRW',
    'YFI_KRW',
    'ZIL_KRW',
    'ZRX_KRW',
  ],
  tickTypes: ['24H'],
};
const subscribeData = JSON.stringify(requestData);

bithumbWs.onopen = () => {
  bithumbWs.send(subscribeData);
};

wss.on('connection', (ws) => {
  bithumbWs.onmessage = (event) => {
    coinInfo = event.data;
    ws.send(coinInfo);
  };

  ws.on('error', (error) => {
    console.error(error);
  });
});

// wss.on('connection', function connection(ws) {
//   ws.on('message', function incoming(message) {
//     console.log('received: %s', message);
//   });

//   ws.send('Connected to WebSocket server!');
// });

module.exports = { app, server };
// module.exports = app;
