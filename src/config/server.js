"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
// REMOVIDO: import { error } from "console"; ← não é necessário
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var prisma = new client_1.PrismaClient();
var bcrypt = require('bcrypt');
var saltRounds = 10;
require('dotenv').config();
var dated = require('date-and-time');
var bodyParser = require('body-parser');
var xml2js = require('xml2js');
var Pool = require('pg').Pool;
//discord channels notifications
var NOTIFICACOES_PAGAMENTOS = "https://discordapp.com/api/webhooks/1284494163064389715/KrceUNN0WZxJ4BD14ol0c6o6fh0uhrirbsdBlNdIrJfFUFzMp_Iaf7e0CY5dFm-RcS-f";
var NOTIFICACOES_LOGINS = "https://discordapp.com/api/webhooks/1284489125042458707/NdEPJPIZzALdiJiMM3aY9qVEJlHyvt08y1SOrHcJDe-7e4HLJR6Opha3ojVjSP4NwniB";
var NOTIFICACOES_CLIENTES = "https://discordapp.com/api/webhooks/1284489125042458707/NdEPJPIZzALdiJiMM3aY9qVEJlHyvt08y1SOrHcJDe-7e4HLJR6Opha3ojVjSP4NwniB";
var NOTIFICACOES_GERAL = "https://discordapp.com/api/webhooks/1284499691622367355/gjb-kKnYLVOvxaKDtPb0FfSnxOHADTvvk054Y9htrf_d7yjnuPUVYmE_rMEMrXk5BfEK";
var NOTIFICACOES_CREDITO_REMOTO = "https://discordapp.com/api/webhooks/1284499691622367355/gjb-kKnYLVOvxaKDtPb0FfSnxOHADTvvk054Y9htrf_d7yjnuPUVYmE_rMEMrXk5BfEK";
//jwt
var jwt = require('jsonwebtoken');
var SECRET = process.env.JWT_SECRET;
var SECRET_REDEFINICAO = process.env.JWT_SECRET_REDEFINICAO;
var SECRET_PESSOA = process.env.JWT_SECRET_PESSOA;
//axios
var axios = require('axios');
axios.defaults.headers.common['Authorization'] = "Bearer ".concat(process.env.TOKEN_DE_SUA_CONTA_MP);
var PORT = process.env.PORT || 5001;
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
//app.use(express.json());
// Configuração do bodyParser para receber dados em URL-encoded e JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
;
//midware de verificação JWT válido.
function verifyJWT(req, res, next) {
    var token = req.headers['x-access-token'];
    jwt.verify(token, SECRET, function (err, decoded) {
        if (err)
            return res.status(401).end();
        req.userId = decoded.userId;
        next();
    });
}
//midware de verificação JWT redefinicao de senha.
function verifyJWT2(req, res, next) {
    var token = req.headers['x-access-token'];
    jwt.verify(token, SECRET_REDEFINICAO, function (err, decoded) {
        if (err)
            return res.status(401).json({
                error: "Invalid or Expired Token. Make sure you add a Header\nParameter named x-access-token with the token provided when an email to reset password has been sent."
            });
        req.userId = decoded.userId;
        next();
    });
}
//midware de verificação JWT PESSOA
function verifyJwtPessoa(req, res, next) {
    var token = req.headers['x-access-token'];
    jwt.verify(token, SECRET_PESSOA, function (err, decoded) {
        if (err)
            return res.status(401).json({
                error: "Invalid or Expired Token. Make sure you add a Header\nParameter named x-access-token with the token provided when an email to reset password has been sent."
            });
        req.userId = decoded.userId;
        next();
    });
}
function stringDateFormatted(time) {
    var result;
    var totalSeconds = time;
    var hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;
    result = "".concat(hours.toString().padStart(2, "0"), "h:").concat(minutes.toString().padStart(2, "0"), "m");
    return result;
}
//INTEGRAÇÃO PIX V2
var valordoPixMaquinaBatomEfi01 = 0; //txid 70a8cacb59b53eac8ccb
var valordoPixPlaquinhaPixMP = 5000; //storeid
function converterPixRecebido(valorPix) {
    var valorAux = 0;
    var ticket = 1;
    if (valorPix > 0 && valorPix >= ticket) {
        valorAux = valorPix;
        valorPix = 0;
        //creditos
        var creditos = valorAux / ticket;
        creditos = Math.floor(creditos);
        var pulsos = creditos * ticket;
        var pulsosFormatados = ("0000" + pulsos).slice(-4);
        return pulsosFormatados;
    }
    else {
        return "0000";
    }
}
//permite facilmente a alteração de valor do preço dos produtos.
function converterPixRecebidoDinamico(valorPix, pulso) {
    var valorAux = 0;
    var ticket = pulso;
    if (valorPix > 0 && valorPix >= ticket) {
        valorAux = valorPix;
        valorPix = 0;
        //creditos
        var creditos = valorAux / ticket;
        creditos = Math.floor(creditos);
        //var pulsos = creditos * ticket;
        var pulsosFormatados = ("0000" + creditos).slice(-4);
        return pulsosFormatados;
    }
    else {
        return "0000";
    }
}
//Retorna em segundos o tempo desde a ultima Consulta efetuada em uma máquina.
function tempoOffline(data2) {
    var data1 = new Date();
    if (!(data1 instanceof Date) || !(data2 instanceof Date)) {
        throw new Error('Datas inválidas');
    }
    // Calcule a diferença em milissegundos
    var diferencaEmSegundos = Math.abs((data2.getTime() - data1.getTime()) / 1000);
    return diferencaEmSegundos;
}
function notificar(urlDiscordWebhook, online, offline) {
    return __awaiter(this, void 0, void 0, function () {
        var embeds, data, config;
        return __generator(this, function (_a) {
            embeds = [
                {
                    title: "Monitoramento de Máquinas",
                    color: 5174599,
                    footer: {
                        text: "\uD83D\uDCC5 ".concat(new Date()),
                    },
                    fields: [
                        {
                            name: "Online: " + online,
                            value: "Offline: " + offline
                        },
                    ],
                },
            ];
            data = JSON.stringify({ embeds: embeds });
            config = {
                method: "POST",
                url: urlDiscordWebhook,
                headers: { "Content-Type": "application/json" },
                data: data,
            };
            //Send the request
            axios(config)
                .then(function (response) {
                console.log("Webhook delivered successfully");
                return response;
            })
                .catch(function (error) {
                console.log(error);
                return error;
            });
            return [2 /*return*/];
        });
    });
}
function notificarDiscord(urlDiscordWebhook, titulo, detalhe) {
    return __awaiter(this, void 0, void 0, function () {
        var embeds, data, config;
        return __generator(this, function (_a) {
            embeds = [
                {
                    title: titulo,
                    color: 5174599,
                    footer: {
                        text: "\uD83D\uDCC5 ".concat(new Date()),
                    },
                    fields: [
                        {
                            name: '',
                            value: detalhe
                        },
                    ],
                },
            ];
            data = JSON.stringify({ embeds: embeds });
            config = {
                method: "POST",
                url: urlDiscordWebhook,
                headers: { "Content-Type": "application/json" },
                data: data,
            };
            //Send the request
            axios(config)
                .then(function (response) {
                console.log("Webhook delivered successfully");
                return response;
            })
                .catch(function (error) {
                console.log(error);
            });
            return [2 /*return*/];
        });
    });
}
function gerarNumeroAleatorio() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0;
        var v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
function estornar(id) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://api.mercadopago.com/v1/payments/".concat(id, "/refunds");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios.post(url, {}, {
                            headers: {
                                'Authorization': "Bearer ".concat(process.env.TOKEN_DE_SUA_CONTA_MP),
                                'X-Idempotency-Key': "".concat(gerarNumeroAleatorio()),
                            },
                        })];
                case 2:
                    response = _a.sent();
                    console.log("estorno da operação: " + id + " efetuado com sucesso!");
                    return [2 /*return*/, response.data];
                case 3:
                    error_1 = _a.sent();
                    console.log("houve um erro ao tentar efetuar o estorno da operação: " + id);
                    console.log("detalhes do erro: " + error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function esconderString(string) {
    var tamanho = string.length;
    var resultado = '';
    for (var i = 0; i < tamanho - 3; i++) {
        resultado += '*';
    }
    resultado += string.substring(tamanho - 3, tamanho);
    return resultado;
}
var numTentativasEstorno = 1;
var idempotencyKeyAnterior = "";
function gerarChaveIdempotente() {
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var chave = '';
    for (var i = 0; i < 32; i++) {
        chave += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return chave;
}
function estornarMP(id, token, motivoEstorno, tamanhoChave) {
    if (tamanhoChave === void 0) { tamanhoChave = 32; }
    return __awaiter(this, void 0, void 0, function () {
        var url, idempotencyKey, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://api.mercadopago.com/v1/payments/".concat(id, "/refunds");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 7]);
                    console.log('********* estornando *****************');
                    console.log("********* Tentativa n\u00AA ".concat(numTentativasEstorno, " *****************"));
                    console.log(id);
                    console.log('********* token *****************');
                    console.log(esconderString(token));
                    idempotencyKey = gerarChaveIdempotente();
                    return [4 /*yield*/, axios.post(url, {}, {
                            headers: {
                                'X-Idempotency-Key': idempotencyKey,
                                'Authorization': "Bearer ".concat(token)
                            }
                        })];
                case 2:
                    response = _a.sent();
                    console.log(response.data);
                    console.log("Estorno da operação: " + id + " efetuado com sucesso!");
                    numTentativasEstorno = 1;
                    // Se a solicitação for bem-sucedida, salve o valor do cabeçalho X-Idempotency-Key para uso futuro
                    idempotencyKeyAnterior = response.headers['x-idempotency-key'];
                    return [2 /*return*/, response.data];
                case 3:
                    error_2 = _a.sent();
                    console.log("Houve um erro ao tentar efetuar o estorno da operação: " + id);
                    console.log("Detalhes do erro: " + error_2);
                    numTentativasEstorno++;
                    if (!(numTentativasEstorno < 20)) return [3 /*break*/, 5];
                    return [4 /*yield*/, estornarMP(id, token, motivoEstorno, tamanhoChave)];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    console.log("Após 20 tentativas não conseguimos efetuar o estorno, VERIFIQUE O TOKEN DO CLIENTE!!");
                    numTentativasEstorno = 1;
                    _a.label = 6;
                case 6: return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
//variáveis de controle
var valorDoPixMaquina01 = 0;
var ultimoAcessoMaquina01 = new Date('2023-10-20T17:30:10');
//rotas de consulta
app.get("/consulta-maquina01", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pulsosFormatados;
    return __generator(this, function (_a) {
        pulsosFormatados = converterPixRecebido(valorDoPixMaquina01);
        valorDoPixMaquina01 = 0; //<<<<<<<<<ALTERAR
        ultimoAcessoMaquina01 = new Date(); //<<<<<<<<<ALTERAR
        if (pulsosFormatados != "0000") {
            return [2 /*return*/, res.status(200).json({ "retorno": pulsosFormatados })];
        }
        else {
            return [2 /*return*/, res.status(200).json({ "retorno": "0000" })];
        }
        return [2 /*return*/];
    });
}); });
//notitica em um canal do discord
app.get("/online", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var maquinasOffline, maquinasOnline, urlDoWebhookNoDiscord;
    return __generator(this, function (_a) {
        maquinasOffline = "";
        maquinasOnline = "";
        //Relação das Máquinas que você tem:
        if (tempoOffline(ultimoAcessoMaquina01) >= 1) {
            maquinasOffline += " Máquina 1";
        }
        else {
            maquinasOnline += " Máquina 1";
        }
        urlDoWebhookNoDiscord = "https://discord.com/api/webhooks/1165681639930732544/V3TrmmGnyx11OtyHxotSv31L1t6ASC_eF6NOk_1AmhD";
        if (maquinasOffline != "") {
            notificar(urlDoWebhookNoDiscord, maquinasOnline, maquinasOffline);
        }
        return [2 /*return*/, res.status(200).json({ "Máquina 01": "Sucesso" })];
    });
}); });
app.get("/monitoramento-html", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var html;
    return __generator(this, function (_a) {
        html = "\n<!DOCTYPE html>\n<html>\n<head>\n<title>Monitoramento das M\u00E1quinas</title>\n<style>\ntable {\nwidth: 50%;\nborder-collapse: collapse;\nmargin: 0 auto; /* Centralizar a tabela */\n}\nth, td {\nborder: 1px solid #000;\npadding: 10px;\ntext-align: center; /* Centralizar o texto */\n}\nth {\nbackground-color: #f0f0f0;\nfont-weight: bold;\n}\n/* Estilo para aumentar o tamanho da fonte */\ntd, th {\nfont-size: 18px;\n}\n</style>\n<script>\n// Fun\u00E7\u00E3o para atualizar a p\u00E1gina a cada 15 segundos\nfunction atualizarPagina() {\nlocation.reload();\n}\n// Configura o temporizador para chamar a fun\u00E7\u00E3o a cada 5 segundos (15000 milissegundos)\nsetInterval(atualizarPagina, 5000);\n</script>\n</head>\n<body>\n<table>\n<tr>\n<th>M\u00E1quina</th>\n<th>Status</th>\n</tr>\n<tr>\n<td>M\u00E1quina 01</td>\n<td>".concat(tempoOffline(ultimoAcessoMaquina01) >= 10 ? '<b>OFFLINE********</b> ' : 'ONLINE', "</td>\n</tr>\n</table>\n</body>\n</html>\n");
        // Enviar a resposta como HTML.
        res.send(html);
        return [2 /*return*/];
    });
}); });
app.get("/consulta-pix-efi-maq-batom-01", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pulsosFormatados;
    return __generator(this, function (_a) {
        pulsosFormatados = converterPixRecebido(valordoPixMaquinaBatomEfi01);
        valordoPixMaquinaBatomEfi01 = 0; //<<<<<<<<<ALTERAR PARA O NUMERO DA MAQUINA
        if (pulsosFormatados != "0000") {
            return [2 /*return*/, res.status(200).json({ "retorno": pulsosFormatados })];
        }
        else {
            return [2 /*return*/, res.status(200).json({ "retorno": "0000" })];
        }
        return [2 /*return*/];
    });
}); });
function converterPixRecebidoMercadoPago(valorPix) {
    var valor = ("0000000" + valorPix).slice(-7);
    return valor;
}
app.get("/consulta-pix-mp-maq-plaquinha-01", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var aux;
    return __generator(this, function (_a) {
        aux = converterPixRecebidoMercadoPago(valordoPixPlaquinhaPixMP);
        valordoPixPlaquinhaPixMP = 0;
        ultimoAcessoMaquina01 = new Date(); //<<<<<<<<<ALTERAR
        return [2 /*return*/, res.status(200).json({ "R$: ": aux })];
    });
}); }); //.
app.post("/rota-recebimento", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ip, qy;
    return __generator(this, function (_a) {
        try {
            ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
            console.log("ip");
            console.log(ip);
            qy = req.query.hmac;
            console.log("query");
            console.log(qy);
            if (ip != '34.193.116.226') {
                return [2 /*return*/, res.status(401).json({ "unauthorized": "unauthorized" })];
            }
            if (qy != 'myhash1234' && qy != 'myhash1234/pix') {
                return [2 /*return*/, res.status(401).json({ "unauthorized": "unauthorized" })];
            }
            console.log("Novo chamada a essa rota detectada:");
            console.log(req.body);
            if (req.body.pix) {
                console.log("valor do pix recebido:");
                console.log(req.body.pix[0].valor);
                if (req.body.pix) {
                    if (req.body.pix[0].txid == "70a8cacb59b53eac8ccb") {
                        valordoPixMaquinaBatomEfi01 = req.body.pix[0].valor;
                        console.log("Creditando valor do pix na máquina de Batom 01");
                    }
                }
            }
        }
        catch (error) {
            console.error(error);
            return [2 /*return*/, res.status(402).json({ "error": "error: " + error })];
        }
        return [2 /*return*/, res.status(200).json({ "ok": "ok" })];
    });
}); });
app.post("/rota-recebimento-teste", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var txid;
    return __generator(this, function (_a) {
        try {
            console.log("Novo pix detectado:");
            console.log(req.body);
            console.log("valor:");
            console.log(req.body.valor);
            console.log("txid:");
            console.log(req.body.txid);
            txid = req.body.txid;
            if (txid == "flaksdfjaskldfjadfasdfccc") {
                valordoPixMaquinaBatomEfi01 = req.body.valor;
                console.log("setado valor pix para:" + req.body.valor);
            }
            console.log(req.body.valor);
        }
        catch (error) {
            console.error(error);
            return [2 /*return*/, res.status(402).json({ "error": "error: " + error })];
        }
        return [2 /*return*/, res.status(200).json({ "mensagem": "ok" })];
    });
}); });
app.post("/rota-recebimento-mercado-pago", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var url;
    return __generator(this, function (_a) {
        try {
            console.log("Novo pix do Mercado Pago:");
            console.log(req.body);
            console.log("id");
            console.log(req.query.id);
            url = "https://api.mercadopago.com/v1/payments/" + req.query.id;
            axios.get(url)
                .then(function (response) {
                //console.log('Response', response.data)
                if (response.data.status != "approved") {
                    console.log("pagamento não aprovado!");
                    return;
                }
                console.log('store_id', response.data.store_id);
                console.log('storetransaction_amount_id', response.data.transaction_amount);
                //creditar de acordo com o store_id (um para cada maq diferente)
                if (response.data.store_id == '56155276') {
                    if (tempoOffline(ultimoAcessoMaquina01) >= 10) {
                        console.log("Efetuando estorno - Máquina Offline!");
                        estornar(req.query.id);
                    }
                    else {
                        console.log("Creditando pix na máquina 1. store_id(56155276)");
                        valorDoPixMaquina01 = response.data.transaction_amount;
                        valordoPixPlaquinhaPixMP = response.data.transaction_amount;
                    }
                }
            });
        }
        catch (error) {
            console.error(error);
            return [2 /*return*/, res.status(402).json({ "error": "error: " + error })];
        }
        return [2 /*return*/, res.status(200).json({ "mensagem": "ok" })];
    });
}); });
//fim integração pix V2
//rotas integração pix  v3
//CADASTRO DE ADMINISTRADOR ADM
// app.post("/pessoa", async (req, res) => {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     req.body.senha = await bcrypt.hash(req.body.senha, salt);
//     //req.body.dataInclusao = new Date(Date.now());
//     const pessoa = await prisma.pix_Pessoa.create({ data: req.body });
//     pessoa.senha = "";
//     return res.json(pessoa);
//   } catch (err: any) {
//     console.log(err);
//     return res.status(500).json({ error: `>>:${err.message}` });
//   }
// });
//iniciar v4
app.post("/config", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var p, salt, _a, pessoa, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                return [4 /*yield*/, prisma.pix_Pessoa.findFirst()];
            case 1:
                p = _b.sent();
                if (!p) return [3 /*break*/, 2];
                return [2 /*return*/, res.status(500).json({ error: "J\u00E1 existe adm cadastrado!" })];
            case 2: return [4 /*yield*/, bcrypt.genSalt(10)];
            case 3:
                salt = _b.sent();
                _a = req.body;
                return [4 /*yield*/, bcrypt.hash(req.body.senha, salt)];
            case 4:
                _a.senha = _b.sent();
                return [4 /*yield*/, prisma.pix_Pessoa.create({ data: req.body })];
            case 5:
                pessoa = _b.sent();
                pessoa.senha = "";
                return [2 /*return*/, res.status(200).json({ msg: "Cadastro efetuado com sucesso! Acesse o painel ADM V4" })];
            case 6: return [3 /*break*/, 8];
            case 7:
                err_1 = _b.sent();
                console.log(err_1);
                return [2 /*return*/, res.status(500).json({ error: ">>:".concat(err_1.message) })];
            case 8: return [2 /*return*/];
        }
    });
}); });
app.post("/cliente", verifyJwtPessoa, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var salt, _a, cliente, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                return [4 /*yield*/, bcrypt.genSalt(10)];
            case 1:
                salt = _b.sent();
                _a = req.body;
                return [4 /*yield*/, bcrypt.hash(req.body.senha, salt)];
            case 2:
                _a.senha = _b.sent();
                req.body.pessoaId = req.userId;
                return [4 /*yield*/, prisma.pix_Cliente.create({ data: req.body })];
            case 3:
                cliente = _b.sent();
                cliente.senha = "";
                return [2 /*return*/, res.json(cliente)];
            case 4:
                err_2 = _b.sent();
                console.log(err_2);
                return [2 /*return*/, res.status(500).json({ error: ">>:".concat(err_2.message) })];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.put("/cliente", verifyJwtPessoa, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var clienteAtualizado, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                req.body.pessoaId = req.userId;
                return [4 /*yield*/, prisma.pix_Cliente.update({
                        where: {
                            id: req.body.id,
                        },
                        data: {
                            nome: req.body.nome,
                            mercadoPagoToken: req.body.mercadoPagoToken,
                            dataVencimento: req.body.dataVencimento
                        },
                        select: {
                            id: true,
                            nome: true,
                            mercadoPagoToken: false,
                            dataVencimento: true
                            // Adicione outros campos conforme necessário
                        },
                    })];
            case 1:
                clienteAtualizado = _a.sent();
                return [2 /*return*/, res.json(clienteAtualizado)];
            case 2:
                err_3 = _a.sent();
                console.log(err_3);
                return [2 /*return*/, res.status(500).json({ error: ">>:".concat(err_3.message) })];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.delete('/cliente/:id', verifyJwtPessoa, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var clienteId, cliente, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                clienteId = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma.pix_Cliente.findUnique({
                        where: {
                            id: clienteId,
                        },
                    })];
            case 2:
                cliente = _a.sent();
                if (!cliente) {
                    return [2 /*return*/, res.status(404).json({ error: 'Cliente não encontrado' })];
                }
                // Excluir o cliente
                return [4 /*yield*/, prisma.pix_Cliente.delete({
                        where: {
                            id: clienteId,
                        },
                    })];
            case 3:
                // Excluir o cliente
                _a.sent();
                res.json({ message: 'Cliente excluído com sucesso' });
                return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                console.error('Erro ao excluir o cliente:', error_3);
                res.status(500).json({ error: 'Erro ao excluir o cliente' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.put('/alterar-cliente-adm-new/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, nome, mercadoPagoToken, pagbankToken, dataVencimento, pagbankEmail, updatedCliente, protectedCliente, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, nome = _a.nome, mercadoPagoToken = _a.mercadoPagoToken, pagbankToken = _a.pagbankToken, dataVencimento = _a.dataVencimento, pagbankEmail = _a.pagbankEmail;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.pix_Cliente.update({
                        where: { id: id },
                        data: {
                            nome: nome,
                            mercadoPagoToken: mercadoPagoToken,
                            pagbankToken: pagbankToken,
                            pagbankEmail: pagbankEmail,
                            dataVencimento: dataVencimento,
                        },
                    })];
            case 2:
                updatedCliente = _b.sent();
                protectedCliente = __assign({}, updatedCliente);
                // Oculta parcialmente o mercadoPagoToken
                if (protectedCliente.mercadoPagoToken) {
                    protectedCliente.mercadoPagoToken = protectedCliente.mercadoPagoToken.slice(-3).padStart(protectedCliente.mercadoPagoToken.length, '*');
                }
                // Oculta parcialmente o pagbankToken
                if (protectedCliente.pagbankToken) {
                    protectedCliente.pagbankToken = protectedCliente.pagbankToken.slice(-3).padStart(protectedCliente.pagbankToken.length, '*');
                }
                // Protege o campo senha, caso exista
                if (protectedCliente.senha) {
                    protectedCliente.senha = '***'; // Substitua por uma string de sua escolha
                }
                res.json(protectedCliente);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _b.sent();
                console.error('Erro ao alterar o cliente:', error_4);
                res.status(500).json({ "message": 'Erro ao alterar o cliente' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.put("/cliente-sem-token", verifyJwtPessoa, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var clienteAtualizado, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                req.body.pessoaId = req.userId;
                return [4 /*yield*/, prisma.pix_Cliente.update({
                        where: {
                            id: req.body.id,
                        },
                        data: {
                            nome: req.body.nome,
                            dataVencimento: req.body.dataVencimento
                        },
                        select: {
                            id: true,
                            nome: true,
                            mercadoPagoToken: false,
                            dataVencimento: true
                            // Adicione outros campos conforme necessário
                        },
                    })];
            case 1:
                clienteAtualizado = _a.sent();
                return [2 /*return*/, res.json(clienteAtualizado)];
            case 2:
                err_4 = _a.sent();
                console.log(err_4);
                return [2 /*return*/, res.status(500).json({ error: ">>:".concat(err_4.message) })];
            case 3: return [2 /*return*/];
        }
    });
}); });
function criarSenha() {
    var caracteres = '0123456789abcdefghijklmnopqrstuvwxyz';
    var textoAleatorio = '';
    for (var i = 0; i < 8; i++) {
        var indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        textoAleatorio += caracteres.charAt(indiceAleatorio);
    }
    return textoAleatorio;
}
app.put("/cliente-trocar-senha", verifyJwtPessoa, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var novaSenha, senhaCriptografada, salt, clienteAtualizado, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                novaSenha = "";
                senhaCriptografada = "";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                novaSenha = criarSenha();
                return [4 /*yield*/, bcrypt.genSalt(10)];
            case 2:
                salt = _a.sent();
                return [4 /*yield*/, bcrypt.hash(novaSenha, salt)];
            case 3:
                senhaCriptografada = _a.sent();
                return [4 /*yield*/, prisma.pix_Cliente.update({
                        where: { email: req.body.email },
                        data: { senha: senhaCriptografada },
                    })];
            case 4:
                clienteAtualizado = _a.sent();
                if (clienteAtualizado) {
                    if (NOTIFICACOES_GERAL) {
                        notificarDiscord(NOTIFICACOES_GERAL, "Troca de senha efetuada", "Cliente ".concat(clienteAtualizado.nome, " acabou de ter sua senha redefinida."));
                    }
                    return [2 /*return*/, res.json({ "newPassword": novaSenha })];
                }
                else {
                    return [2 /*return*/, res.status(301).json({ error: ">>:cliente n\u00E3o encontrado" })];
                }
                return [3 /*break*/, 6];
            case 5:
                err_5 = _a.sent();
                console.log(err_5);
                return [2 /*return*/, res.status(500).json({ error: ">:cliente n\u00E3o encontrado" })];
            case 6: return [2 /*return*/];
        }
    });
}); });
// //TROCAR SENHA ADM LOGADO
// app.put("/trocar-senha-adm", verifyJwtPessoa, async (req: any, res) => {
//   var novaSenha = "";
//   var senhaCriptografada = "";
//   try {
//     novaSenha = criarSenha();
//     const salt = await bcrypt.genSalt(10);
//     senhaCriptografada = await bcrypt.hash(novaSenha, salt);
//     const clienteAtualizado = await prisma.pix_Pessoa.update({
//       where: { email: req.body.email },
//       data: { senha: senhaCriptografada },
//     });
//     if (clienteAtualizado) {
//       return res.json({ "newPassword": novaSenha });
//     } else {
//       return res.status(301).json({ "message": `>>:adm não encontrado` });
//     }
//   } catch (err: any) {
//     console.log(err);
//     return res.status(500).json({ "message": `>:adm não encontrado` });
//   }
// });
//cadastrar nova máquina adm
app.post("/maquina", verifyJwtPessoa, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var condicoes, maquinaExistente, maquina, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                req.body.pessoaId = req.userId;
                condicoes = [
                    {
                        nome: req.body.nome,
                        clienteId: req.body.clienteId
                    }
                ];
                // Adicione condicionalmente o store_id se ele não for nulo ou undefined
                if (req.body.store_id) {
                    condicoes.push({
                        store_id: req.body.store_id,
                        clienteId: req.body.clienteId
                    });
                }
                // Adicione condicionalmente o maquininha_serial se ele não for nulo ou undefined
                if (req.body.maquininha_serial) {
                    condicoes.push({
                        maquininha_serial: req.body.maquininha_serial,
                        clienteId: req.body.clienteId
                    });
                }
                return [4 /*yield*/, prisma.pix_Maquina.findFirst({
                        where: {
                            OR: condicoes
                        },
                        select: {
                            id: true,
                            nome: true,
                            store_id: true,
                            maquininha_serial: true // Retorna o maquininha_serial da máquina conflitante
                        }
                    })];
            case 1:
                maquinaExistente = _a.sent();
                if (maquinaExistente) {
                    return [2 /*return*/, res.status(400).json({
                            error: "J\u00E1 existe uma m\u00E1quina com o nome (".concat(maquinaExistente.nome, "), store_id (").concat(maquinaExistente.store_id, ") ou maquininha_serial (").concat(maquinaExistente.maquininha_serial, ") para este cliente."),
                        })];
                }
                return [4 /*yield*/, prisma.pix_Maquina.create({ data: req.body })];
            case 2:
                maquina = _a.sent();
                return [2 /*return*/, res.json(maquina)];
            case 3:
                err_6 = _a.sent();
                console.log(err_6);
                return [2 /*return*/, res.status(500).json({ error: "Erro ao criar a m\u00E1quina: ".concat(err_6.message) })];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post("/maquina-cliente", verifyJWT, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cliente, condicoes, maquinaExistente, maquina, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                req.body.clienteId = req.userId;
                return [4 /*yield*/, prisma.pix_Cliente.findUnique({
                        where: {
                            id: req.body.clienteId, // Usando o clienteId passado no corpo da requisição
                        },
                        select: {
                            pessoaId: true, // Seleciona o campo pessoaId relacionado
                        },
                    })];
            case 1:
                cliente = _a.sent();
                // Verifica se o cliente foi encontrado
                if (!cliente) {
                    return [2 /*return*/, res.status(404).json({ error: "Cliente não encontrado." })];
                }
                // Atribui o pessoaId ao corpo da requisição
                req.body.pessoaId = cliente.pessoaId;
                condicoes = [
                    {
                        nome: req.body.nome,
                        clienteId: req.body.clienteId
                    }
                ];
                // Adicione condicionalmente o store_id se ele não for nulo ou undefined
                if (req.body.store_id) {
                    condicoes.push({
                        store_id: req.body.store_id,
                        clienteId: req.body.clienteId
                    });
                }
                // Adicione condicionalmente o maquininha_serial se ele não for nulo ou undefined
                if (req.body.maquininha_serial) {
                    condicoes.push({
                        maquininha_serial: req.body.maquininha_serial,
                        clienteId: req.body.clienteId
                    });
                }
                return [4 /*yield*/, prisma.pix_Maquina.findFirst({
                        where: {
                            OR: condicoes
                        },
                        select: {
                            id: true,
                            nome: true,
                            store_id: true,
                            maquininha_serial: true // Retorna o maquininha_serial da máquina conflitante
                        }
                    })];
            case 2:
                maquinaExistente = _a.sent();
                if (maquinaExistente) {
                    return [2 /*return*/, res.status(400).json({
                            error: "J\u00E1 existe uma m\u00E1quina com o nome (".concat(maquinaExistente.nome, "), store_id (").concat(maquinaExistente.store_id, ") ou maquininha_serial (").concat(maquinaExistente.maquininha_serial, ") para este cliente."),
                        })];
                }
                return [4 /*yield*/, prisma.pix_Maquina.create({ data: req.body })];
            case 3:
                maquina = _a.sent();
                return [2 /*return*/, res.json(maquina)];
            case 4:
                err_7 = _a.sent();
                console.log(err_7);
                return [2 /*return*/, res.status(500).json({ error: "Erro ao criar a m\u00E1quina: ".concat(err_7.message) })];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.put('/recuperar-id-maquina/:id', verifyJwtPessoa, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, novoId, maquinaExistente, maquinaAtualizada, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                novoId = req.body.novoId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma.pix_Maquina.findUnique({
                        where: { id: id },
                    })];
            case 2:
                maquinaExistente = _a.sent();
                if (!maquinaExistente) {
                    return [2 /*return*/, res.status(404).json({ error: 'Máquina não encontrada' })];
                }
                return [4 /*yield*/, prisma.pix_Maquina.update({
                        where: { id: id },
                        data: { id: novoId },
                    })];
            case 3:
                maquinaAtualizada = _a.sent();
                res.json({ message: 'ID da máquina atualizado com sucesso', maquina: maquinaAtualizada });
                return [3 /*break*/, 5];
            case 4:
                error_5 = _a.sent();
                console.error('Erro ao alterar o ID da máquina:', error_5);
                res.status(500).json({ error: 'Erro ao alterar o ID da máquina' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
//alterar máquina
app.put("/maquina", verifyJwtPessoa, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var maquinaExistente, maquinaAtualizada, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, prisma.pix_Maquina.findFirst({
                        where: {
                            AND: [
                                { clienteId: req.body.clienteId },
                                {
                                    OR: [
                                        { nome: req.body.nome },
                                        { store_id: req.body.store_id },
                                        { maquininha_serial: req.body.maquininha_serial }
                                    ]
                                },
                                { NOT: { id: req.body.id } } // Exclui a máquina atual da verificação
                            ]
                        },
                        select: {
                            id: true,
                            nome: true,
                            store_id: true,
                            maquininha_serial: true
                        }
                    })];
            case 1:
                maquinaExistente = _a.sent();
                if (maquinaExistente) {
                    return [2 /*return*/, res.status(400).json({
                            error: "J\u00E1 existe uma m\u00E1quina com o nome (".concat(maquinaExistente.nome, "), store_id (").concat(maquinaExistente.store_id, ") ou maquininha_serial (").concat(maquinaExistente.maquininha_serial, ") para este cliente.")
                        })];
                }
                return [4 /*yield*/, prisma.pix_Maquina.update({
                        where: {
                            id: req.body.id,
                        },
                        data: {
                            nome: req.body.nome,
                            descricao: req.body.descricao,
                            store_id: req.body.store_id,
                            maquininha_serial: req.body.maquininha_serial,
                            valorDoPulso: req.body.valorDoPulso,
                            estoque: req.body.estoque
                            // Adicione outros campos conforme necessário
                        },
                    })];
            case 2:
                maquinaAtualizada = _a.sent();
                console.log('Máquina atualizada com sucesso:', maquinaAtualizada);
                return [2 /*return*/, res.status(200).json(maquinaAtualizada)];
            case 3:
                err_8 = _a.sent();
                console.log(err_8);
                return [2 /*return*/, res.status(500).json({ error: "Erro ao atualizar a m\u00E1quina: ".concat(err_8.message) })];
            case 4: return [2 /*return*/];
        }
    });
}); });
//alterar máquina CLIENTE
app.put("/maquina-cliente", verifyJWT, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var maquinaExistente, maquinaAtualizada, err_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, prisma.pix_Maquina.findFirst({
                        where: {
                            AND: [
                                { clienteId: req.body.clienteId },
                                {
                                    OR: [
                                        { nome: req.body.nome },
                                        { store_id: req.body.store_id },
                                        { maquininha_serial: req.body.maquininha_serial }
                                    ]
                                },
                                { NOT: { id: req.body.id } } // Exclui a máquina atual da verificação
                            ]
                        },
                        select: {
                            id: true,
                            nome: true,
                            store_id: true,
                            maquininha_serial: true
                        }
                    })];
            case 1:
                maquinaExistente = _a.sent();
                if (maquinaExistente) {
                    return [2 /*return*/, res.status(400).json({
                            error: "J\u00E1 existe uma m\u00E1quina com o nome (".concat(maquinaExistente.nome, "), store_id (").concat(maquinaExistente.store_id, ") ou maquininha_serial (").concat(maquinaExistente.maquininha_serial, ") para este cliente.")
                        })];
                }
                return [4 /*yield*/, prisma.pix_Maquina.update({
                        where: {
                            id: req.body.id,
                        },
                        data: {
                            nome: req.body.nome,
                            descricao: req.body.descricao,
                            store_id: req.body.store_id,
                            valorDoPulso: req.body.valorDoPulso,
                            estoque: req.body.estoque
                            // Adicione outros campos conforme necessário
                        },
                    })];
            case 2:
                maquinaAtualizada = _a.sent();
                console.log('Máquina atualizada com sucesso:', maquinaAtualizada);
                return [2 /*return*/, res.status(200).json(maquinaAtualizada)];
            case 3:
                err_9 = _a.sent();
                console.log(err_9);
                return [2 /*return*/, res.status(500).json({ error: "Erro ao atualizar a m\u00E1quina: ".concat(err_9.message) })];
            case 4: return [2 /*return*/];
        }
    });
}); });
//DELETAR MÁQUINA ADM
app.delete("/maquina", verifyJwtPessoa, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deletedPagamento, deletedMaquina, err_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                if (!req.body.id) {
                    return [2 /*return*/, res.status(500).json({ error: ">>:informe o id da m\u00E1quina que deseja deletar" })];
                }
                return [4 /*yield*/, prisma.pix_Pagamento.deleteMany({
                        where: {
                            maquinaId: req.body.id,
                        },
                    })];
            case 1:
                deletedPagamento = _a.sent();
                return [4 /*yield*/, prisma.pix_Maquina.delete({
                        where: {
                            id: req.body.id,
                        },
                    })];
            case 2:
                deletedMaquina = _a.sent();
                if (deletedMaquina) {
                    console.log('Máquina removida com sucesso:', deletedMaquina.nome);
                    return [2 /*return*/, res.status(200).json("M\u00E1quina: ".concat(deletedMaquina.nome, " removida."))];
                }
                else {
                    return [2 /*return*/, res.status(200).json("M\u00E1quina n\u00E3o encontrada.")];
                }
                return [3 /*break*/, 4];
            case 3:
                err_10 = _a.sent();
                console.log(err_10);
                return [2 /*return*/, res.status(500).json({ error: ">>:".concat(err_10.message) })];
            case 4: return [2 /*return*/];
        }
    });
}); });
//DELETAR MÁQUINA....
app.delete("/maquina-cliente", verifyJWT, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deletedPagamento, deletedMaquina, err_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                if (!req.body.id) {
                    return [2 /*return*/, res.status(500).json({ error: ">>:informe o id da m\u00E1quina que deseja deletar" })];
                }
                return [4 /*yield*/, prisma.pix_Pagamento.deleteMany({
                        where: {
                            maquinaId: req.body.id,
                        },
                    })];
            case 1:
                deletedPagamento = _a.sent();
                return [4 /*yield*/, prisma.pix_Maquina.delete({
                        where: {
                            id: req.body.id,
                        },
                    })];
            case 2:
                deletedMaquina = _a.sent();
                if (deletedMaquina) {
                    console.log('Máquina removida com sucesso:', deletedMaquina.nome);
                    return [2 /*return*/, res.status(200).json("M\u00E1quina: ".concat(deletedMaquina.nome, " removida."))];
                }
                else {
                    return [2 /*return*/, res.status(200).json("M\u00E1quina n\u00E3o encontrada.")];
                }
                return [3 /*break*/, 4];
            case 3:
                err_11 = _a.sent();
                console.log(err_11);
                return [2 /*return*/, res.status(500).json({ error: ">>:".concat(err_11.message) })];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get("/consultar-maquina/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var maquina, pulsosFormatados, err_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, prisma.pix_Maquina.findUnique({
                        where: {
                            id: req.params.id,
                        }
                    })];
            case 1:
                maquina = _a.sent();
                pulsosFormatados = "";
                if (!(maquina != null)) return [3 /*break*/, 3];
                pulsosFormatados = converterPixRecebidoDinamico(parseFloat(maquina.valorDoPix), parseFloat(maquina.valorDoPulso));
                console.log("encontrou"); //zerar o valor e atualizar data ultimo acesso
                return [4 /*yield*/, prisma.pix_Maquina.update({
                        where: {
                            id: req.params.id
                        },
                        data: {
                            valorDoPix: "0",
                            ultimaRequisicao: new Date(Date.now())
                        }
                    })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                pulsosFormatados = "0000";
                console.log("não encontrou");
                _a.label = 4;
            case 4: return [2 /*return*/, res.status(200).json({ "retorno": pulsosFormatados })];
            case 5:
                err_12 = _a.sent();
                console.log(err_12);
                return [2 /*return*/, res.status(500).json({ "retorno": "0000" })];
            case 6: return [2 /*return*/];
        }
    });
}); });
//SIMULA UM CRÉDITO REMOTO
app.post("/credito-remoto", verifyJwtPessoa, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var maquina, status, err_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, prisma.pix_Maquina.findUnique({
                        where: {
                            id: req.body.id,
                        },
                        include: {
                            cliente: true,
                        },
                    })];
            case 1:
                maquina = _a.sent();
                if (!(maquina != null)) return [3 /*break*/, 3];
                if (maquina.cliente !== null && maquina.cliente !== undefined) {
                    if (maquina.cliente.ativo) {
                        console.log("Cliente ativo - seguindo...");
                    }
                    else {
                        console.log("Cliente inativo - parando...");
                        return [2 /*return*/, res.status(500).json({ "retorno": "CLIENTE ".concat(maquina.cliente.nome, " INATIVO") })];
                    }
                }
                else {
                    console.log("error.. cliente nulo!");
                }
                //VERIFICAR SE A MAQUINA ESTA ONINE
                if (maquina.ultimaRequisicao) {
                    status = (tempoOffline(new Date(maquina.ultimaRequisicao))) > 60 ? "OFFLINE" : "ONLINE";
                    console.log(status);
                    if (status == "OFFLINE") {
                        return [2 /*return*/, res.status(400).json({ "msg": "MÁQUINA OFFLINE!" })];
                    }
                }
                else {
                    return [2 /*return*/, res.status(400).json({ "msg": "MÁQUINA OFFLINE!" })];
                }
                return [4 /*yield*/, prisma.pix_Maquina.update({
                        where: {
                            id: req.body.id
                        },
                        data: {
                            valorDoPix: req.body.valor,
                            ultimoPagamentoRecebido: new Date(Date.now())
                        }
                    })];
            case 2:
                _a.sent();
                if (NOTIFICACOES_CREDITO_REMOTO) {
                    notificarDiscord(NOTIFICACOES_CREDITO_REMOTO, "CR\u00C9DITO REMOTO DE R$: ".concat(req.body.valor), "Enviado pelo adm.");
                }
                return [2 /*return*/, res.status(200).json({ "retorno": "CREDITO INSERIDO" })];
            case 3:
                console.log("não encontrou");
                return [2 /*return*/, res.status(301).json({ "retorno": "ID NÃO ENCONTRADO" })];
            case 4: return [3 /*break*/, 6];
            case 5:
                err_13 = _a.sent();
                console.log(err_13);
                return [2 /*return*/, res.status(500).json({ "retorno": "ERRO: see: console > view logs" })];
            case 6: return [2 /*return*/];
        }
    });
}); });
//SIMULA UM CRÉDITO REMOTO
app.post("/credito-remoto-cliente", verifyJWT, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var maquina, status, err_14;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, prisma.pix_Maquina.findUnique({
                        where: {
                            id: req.body.id,
                        },
                        include: {
                            cliente: true,
                        },
                    })];
            case 1:
                maquina = _a.sent();
                if (!(maquina != null)) return [3 /*break*/, 3];
                if (maquina.cliente !== null && maquina.cliente !== undefined) {
                    if (maquina.cliente.ativo) {
                        console.log("Cliente ativo - seguindo...");
                    }
                    else {
                        console.log("Cliente inativo - parando...");
                        return [2 /*return*/, res.status(500).json({ "retorno": "CLIENTE ".concat(maquina.cliente.nome, " INATIVO") })];
                    }
                }
                else {
                    console.log("error.. cliente nulo!");
                }
                //VERIFICAR SE A MAQUINA ESTA ONINE
                if (maquina.ultimaRequisicao) {
                    status = (tempoOffline(new Date(maquina.ultimaRequisicao))) > 60 ? "OFFLINE" : "ONLINE";
                    console.log(status);
                    if (status == "OFFLINE") {
                        return [2 /*return*/, res.status(400).json({ "msg": "MÁQUINA OFFLINE!" })];
                    }
                }
                else {
                    return [2 /*return*/, res.status(400).json({ "msg": "MÁQUINA OFFLINE!" })];
                }
                return [4 /*yield*/, prisma.pix_Maquina.update({
                        where: {
                            id: req.body.id
                        },
                        data: {
                            valorDoPix: req.body.valor,
                            ultimoPagamentoRecebido: new Date(Date.now())
                        }
                    })];
            case 2:
                _a.sent();
                if (NOTIFICACOES_CREDITO_REMOTO) {
                    notificarDiscord(NOTIFICACOES_CREDITO_REMOTO, "CR\u00C9DITO REMOTO DE R$: ".concat(req.body.valor), "Enviado pelo cliente.");
                }
                return [2 /*return*/, res.status(200).json({ "retorno": "CREDITO INSERIDO" })];
            case 3:
                console.log("não encontrou");
                return [2 /*return*/, res.status(301).json({ "retorno": "ID NÃO ENCONTRADO" })];
            case 4: return [3 /*break*/, 6];
            case 5:
                err_14 = _a.sent();
                console.log(err_14);
                return [2 /*return*/, res.status(500).json({ "retorno": "ERRO: see: console > view logs" })];
            case 6: return [2 /*return*/];
        }
    });
}); });
//login ADM
app.post("/login-pessoa", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, validPassword, token, error_6, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, prisma.pix_Pessoa.findUnique({
                        where: {
                            email: req.body.email
                        },
                    })];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new Error('Password or Email Invalid');
                }
                return [4 /*yield*/, bcrypt.compare(req.body.senha, user.senha)];
            case 2:
                validPassword = _a.sent();
                if (!validPassword) {
                    throw new Error('Password or Email Invalid');
                }
                return [4 /*yield*/, prisma.pix_Pessoa.update({
                        where: {
                            email: req.body.email
                        },
                        data: { ultimoAcesso: new Date(Date.now()) }
                    })
                    //explicação top sobre jwt https://www.youtube.com/watch?v=D0gpL8-DVrc
                ];
            case 3:
                _a.sent();
                token = jwt.sign({ userId: user.id }, SECRET_PESSOA, { expiresIn: 3600 });
                if (NOTIFICACOES_LOGINS) {
                    notificarDiscord(NOTIFICACOES_LOGINS, "Novo login efetuado", "ADM ".concat(user.nome, " acabou de fazer login."));
                }
                return [2 /*return*/, res.json({ email: user.email, id: user.id, type: "pessoa", key: "ADMIN", name: user.nome, lastLogin: user.ultimoAcesso, token: token })];
            case 4:
                error_6 = _a.sent();
                message = error_6.message;
                return [2 /*return*/, res.status(403).json({ error: message })];
            case 5: return [2 /*return*/];
        }
    });
}); });
//
//login-cliente
app.post("/login-cliente", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, validPassword, token, warningMsg, diferencaEmMilissegundos, diferencaEmDias, error_7, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, prisma.pix_Cliente.findUnique({
                        where: {
                            email: req.body.email
                        },
                    })];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new Error('Password or Email Invalid');
                }
                return [4 /*yield*/, bcrypt.compare(req.body.senha, user.senha)];
            case 2:
                validPassword = _a.sent();
                if (!validPassword) {
                    throw new Error('Password or Email Invalid');
                }
                return [4 /*yield*/, prisma.pix_Cliente.update({
                        where: {
                            email: req.body.email
                        },
                        data: { ultimoAcesso: new Date(Date.now()) }
                    })
                    //explicação top sobre jwt https://www.youtube.com/watch?v=D0gpL8-DVrc
                ];
            case 3:
                _a.sent();
                token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: 3600 });
                warningMsg = "";
                if (user) {
                    if (user.dataVencimento) {
                        diferencaEmMilissegundos = new Date().getTime() - user.dataVencimento.getTime();
                        diferencaEmDias = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
                        console.log("atraso: " + diferencaEmDias);
                        if (diferencaEmDias > 0 && diferencaEmDias <= 5) {
                            warningMsg = "Aten\u00E7\u00E3o! Regularize seu pagamento!";
                        }
                        if (diferencaEmDias > 5 && diferencaEmDias <= 10) {
                            warningMsg = "seu plano ser\u00E1 bloqueado em  ".concat(diferencaEmDias, " dia(s), efetue pagamento e evite o bloqueio.");
                        }
                        if (diferencaEmDias > 10) {
                            warningMsg = "seu plano est\u00E1 bloqueado, entre em contato com o setor financeiro!";
                        }
                    }
                }
                if (NOTIFICACOES_LOGINS) {
                    notificarDiscord(NOTIFICACOES_LOGINS, "Novo login efetuado", "Cliente ".concat(user.nome, " acabou de fazer login."));
                }
                return [2 /*return*/, res.json({ email: user.email, id: user.id, type: "pessoa", key: "CLIENT", name: user.nome, lastLogin: user.ultimoAcesso, ativo: user.ativo, warningMsg: warningMsg, vencimento: user.dataVencimento, token: token })];
            case 4:
                error_7 = _a.sent();
                message = error_7.message;
                return [2 /*return*/, res.status(403).json({ error: message })];
            case 5: return [2 /*return*/];
        }
    });
}); });
//maquinas exibir as máquinas de um cliente logado
app.get("/maquinas", verifyJWT, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var maquinas, maquinasComStatus, _i, maquinas_1, maquina, status, err_15;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("".concat(req.userId, " acessou a rota que busca todos as m\u00E1quinas."));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.pix_Maquina.findMany({
                        where: {
                            clienteId: req.userId,
                        },
                        orderBy: {
                            dataInclusao: 'desc', // 'asc' para ordenação ascendente, 'desc' para ordenação descendente.
                        },
                    })];
            case 2:
                maquinas = _a.sent();
                if (maquinas != null) {
                    console.log("encontrou");
                    maquinasComStatus = [];
                    for (_i = 0, maquinas_1 = maquinas; _i < maquinas_1.length; _i++) {
                        maquina = maquinas_1[_i];
                        // 60 segundos sem acesso máquina já fica offline
                        if (maquina.ultimaRequisicao) {
                            status = (tempoOffline(new Date(maquina.ultimaRequisicao))) > 60 ? "OFFLINE" : "ONLINE";
                            //60 segundos x 30 = 1800 segundos (meia hora pagamento mais recente)
                            if (status == "ONLINE" && maquina.ultimoPagamentoRecebido && tempoOffline(new Date(maquina.ultimoPagamentoRecebido)) < 1800) {
                                status = "PAGAMENTO_RECENTE";
                            }
                            maquinasComStatus.push({
                                id: maquina.id,
                                pessoaId: maquina.pessoaId,
                                clienteId: maquina.clienteId,
                                nome: maquina.nome,
                                descricao: maquina.descricao,
                                estoque: maquina.estoque,
                                store_id: maquina.store_id,
                                maquininha_serial: maquina.maquininha_serial,
                                valorDoPix: maquina.valorDoPix,
                                dataInclusao: maquina.dataInclusao,
                                ultimoPagamentoRecebido: maquina.ultimoPagamentoRecebido,
                                ultimaRequisicao: maquina.ultimaRequisicao,
                                status: status,
                                pulso: maquina.valorDoPulso
                            });
                        }
                        else {
                            maquinasComStatus.push({
                                id: maquina.id,
                                pessoaId: maquina.pessoaId,
                                clienteId: maquina.clienteId,
                                nome: maquina.nome,
                                descricao: maquina.descricao,
                                estoque: maquina.estoque,
                                store_id: maquina.store_id,
                                maquininha_serial: maquina.maquininha_serial,
                                valorDoPix: maquina.valorDoPix,
                                dataInclusao: maquina.dataInclusao,
                                ultimoPagamentoRecebido: maquina.ultimoPagamentoRecebido,
                                ultimaRequisicao: maquina.ultimaRequisicao,
                                status: "OFFLINE",
                                pulso: maquina.valorDoPulso
                            });
                        }
                    }
                    return [2 /*return*/, res.status(200).json(maquinasComStatus)];
                }
                else {
                    console.log("não encontrou");
                    return [2 /*return*/, res.status(200).json("[]")];
                }
                return [3 /*break*/, 4];
            case 3:
                err_15 = _a.sent();
                console.log(err_15);
                return [2 /*return*/, res.status(500).json({ "retorno": "ERRO" })];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get("/maquinas-adm", verifyJwtPessoa, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var maquinas, maquinasComStatus, _i, maquinas_2, maquina, status, err_16;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.pix_Maquina.findMany({
                        where: {
                            clienteId: req.query.id,
                        },
                        orderBy: {
                            dataInclusao: 'desc', // 'asc' para ordenação ascendente, 'desc' para ordenação descendente.
                        },
                    })];
            case 1:
                maquinas = _a.sent();
                if (maquinas != null) {
                    console.log("encontrou");
                    maquinasComStatus = [];
                    for (_i = 0, maquinas_2 = maquinas; _i < maquinas_2.length; _i++) {
                        maquina = maquinas_2[_i];
                        // 60 segundos sem acesso máquina já fica offline
                        if (maquina.ultimaRequisicao) {
                            status = (tempoOffline(new Date(maquina.ultimaRequisicao))) > 60 ? "OFFLINE" : "ONLINE";
                            //60 segundos x 30 = 1800 segundos (meia hora pagamento mais recente)
                            if (status == "ONLINE" && maquina.ultimoPagamentoRecebido && tempoOffline(new Date(maquina.ultimoPagamentoRecebido)) < 1800) {
                                status = "PAGAMENTO_RECENTE";
                            }
                            maquinasComStatus.push({
                                id: maquina.id,
                                pessoaId: maquina.pessoaId,
                                clienteId: maquina.clienteId,
                                nome: maquina.nome,
                                descricao: maquina.descricao,
                                estoque: maquina.estoque,
                                store_id: maquina.store_id,
                                maquininha_serial: maquina.maquininha_serial,
                                valorDoPix: maquina.valorDoPix,
                                dataInclusao: maquina.dataInclusao,
                                ultimoPagamentoRecebido: maquina.ultimoPagamentoRecebido,
                                ultimaRequisicao: maquina.ultimaRequisicao,
                                status: status,
                                pulso: maquina.valorDoPulso
                            });
                        }
                        else {
                            maquinasComStatus.push({
                                id: maquina.id,
                                pessoaId: maquina.pessoaId,
                                clienteId: maquina.clienteId,
                                nome: maquina.nome,
                                descricao: maquina.descricao,
                                estoque: maquina.estoque,
                                store_id: maquina.store_id,
                                maquininha_serial: maquina.maquininha_serial,
                                valorDoPix: maquina.valorDoPix,
                                dataInclusao: maquina.dataInclusao,
                                ultimoPagamentoRecebido: maquina.ultimoPagamentoRecebido,
                                ultimaRequisicao: maquina.ultimaRequisicao,
                                status: "OFFLINE",
                                pulso: maquina.valorDoPulso
                            });
                        }
                    }
                    return [2 /*return*/, res.status(200).json(maquinasComStatus)];
                }
                else {
                    console.log("não encontrou");
                    return [2 /*return*/, res.status(200).json("[]")];
                }
                return [3 /*break*/, 3];
            case 2:
                err_16 = _a.sent();
                console.log(err_16);
                return [2 /*return*/, res.status(500).json({ "retorno": "ERRO" })];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/clientes", verifyJwtPessoa, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var clientesComMaquinas, clientesModificados, err_17;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("".concat(req.userId, " acessou a rota que busca todos os clientes e suas m\u00E1quinas."));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.pix_Cliente.findMany({
                        where: {
                            pessoaId: req.userId,
                        },
                        select: {
                            id: true,
                            nome: true,
                            email: true,
                            dataInclusao: true,
                            ultimoAcesso: true,
                            ativo: true,
                            senha: false,
                            mercadoPagoToken: true,
                            pagbankEmail: true,
                            pagbankToken: true,
                            dataVencimento: true,
                            Maquina: {
                                select: {
                                    id: true,
                                    nome: true,
                                    descricao: true,
                                    store_id: true,
                                    dataInclusao: true,
                                    ultimoPagamentoRecebido: true,
                                    ultimaRequisicao: true,
                                    maquininha_serial: true, // Adiciona maquininha_serial
                                },
                            },
                        },
                        orderBy: {
                            dataInclusao: 'desc', // Ordenar pela dataInclusao do mais atual para o mais antigo
                        },
                    })];
            case 2:
                clientesComMaquinas = _a.sent();
                if (clientesComMaquinas != null) {
                    console.log("retornando a lista de clientes e suas respectivas máquinas");
                    clientesModificados = clientesComMaquinas.map(function (cliente) { return (__assign(__assign({}, cliente), { mercadoPagoToken: cliente.mercadoPagoToken ? "***********" + cliente.mercadoPagoToken.slice(-3) : null, pagbankToken: cliente.pagbankToken ? "***********" + cliente.pagbankToken.slice(-3) : null })); });
                    return [2 /*return*/, res.status(200).json(clientesModificados)];
                }
                else {
                    console.log("não encontrou");
                    return [2 /*return*/, res.status(200).json("[]")];
                }
                return [3 /*break*/, 4];
            case 3:
                err_17 = _a.sent();
                console.log(err_17);
                return [2 /*return*/, res.status(500).json({ "retorno": "ERRO" })];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post("/ativar-cliente", verifyJwtPessoa, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cliente, error_8, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, prisma.pix_Cliente.findUnique({
                        where: {
                            id: req.body.clienteId
                        },
                    })];
            case 1:
                cliente = _a.sent();
                if (!cliente) {
                    throw new Error('Client not found');
                }
                return [4 /*yield*/, prisma.pix_Cliente.update({
                        where: {
                            id: req.body.clienteId
                        },
                        data: {
                            ativo: true
                        }
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ "retorno": "CLIENTE ".concat(cliente.nome, " DESBLOQUEADO") })];
            case 3:
                error_8 = _a.sent();
                message = error_8.message;
                return [2 /*return*/, res.status(403).json({ error: message })];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post("/inativar-cliente", verifyJwtPessoa, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cliente, error_9, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, prisma.pix_Cliente.findUnique({
                        where: {
                            id: req.body.clienteId
                        },
                    })];
            case 1:
                cliente = _a.sent();
                if (!cliente) {
                    throw new Error('Client not found');
                }
                return [4 /*yield*/, prisma.pix_Cliente.update({
                        where: {
                            id: req.body.clienteId
                        },
                        data: {
                            ativo: false
                        }
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ "retorno": "CLIENTE ".concat(cliente.nome, " BLOQUEADO") })];
            case 3:
                error_9 = _a.sent();
                message = error_9.message;
                return [2 /*return*/, res.status(403).json({ error: message })];
            case 4: return [2 /*return*/];
        }
    });
}); });
function verificarRegistroExistente(mercadoPagoId, maquinaId) {
    return __awaiter(this, void 0, void 0, function () {
        var registroExistente, error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.pix_Pagamento.findFirst({
                            where: {
                                mercadoPagoId: mercadoPagoId,
                                maquinaId: maquinaId,
                            },
                        })];
                case 1:
                    registroExistente = _a.sent();
                    if (registroExistente) {
                        // Se um registro com os campos especificados existe, retorna true
                        return [2 /*return*/, true];
                    }
                    else {
                        // Se não existir nenhum registro com os campos especificados, retorna false
                        return [2 /*return*/, false];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_10 = _a.sent();
                    console.error('Erro ao verificar o registro:', error_10);
                    throw new Error('Erro ao verificar o registro.');
                case 3: return [2 /*return*/];
            }
        });
    });
}
//esse id é o do cliente e NÃO DA máquina.
//EXEMPLO:
//https://api-v3-ddd5b551a51f.herokuapp.com/rota-recebimento-mercado-pago-dinamica/a803e2f8-7045-4ae8-a387-517ae844c965
app.post("/rota-recebimento-mercado-pago-dinamica/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var valor, tipoPagamento, taxaDaOperacao, cliId, str_id, mensagem, _a, resource, topic, url, tokenCliente, cliente, err_18;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                //teste de chamada do Mercado Pago
                if (req.query.id === "123456") {
                    return [2 /*return*/, res.status(200).json({ "status": "ok" })];
                }
                valor = 0.00;
                tipoPagamento = "";
                taxaDaOperacao = "";
                cliId = "";
                str_id = "";
                mensagem = "M\u00C1QUINA N\u00C3O POSSUI store_id CADASTRADO >\nALTERE O store_id dessa m\u00E1quina para ".concat(str_id, " para poder receber pagamentos nela...");
                console.log("Novo pix do Mercado Pago:");
                console.log(req.body);
                console.log("id");
                console.log(req.query.id);
                _a = req.body, resource = _a.resource, topic = _a.topic;
                // Exibe os valores capturados
                console.log('Resource:', resource);
                console.log('Topic:', topic);
                url = "https://api.mercadopago.com/v1/payments/" + req.query.id;
                tokenCliente = "";
                return [4 /*yield*/, prisma.pix_Cliente.findUnique({
                        where: {
                            id: req.params.id,
                        }
                    })];
            case 1:
                cliente = _b.sent();
                tokenCliente = ((cliente === null || cliente === void 0 ? void 0 : cliente.mercadoPagoToken) == undefined) ? "" : cliente === null || cliente === void 0 ? void 0 : cliente.mercadoPagoToken;
                cliId = ((cliente === null || cliente === void 0 ? void 0 : cliente.id) == undefined) ? "" : cliente === null || cliente === void 0 ? void 0 : cliente.id;
                if (tokenCliente) {
                    console.log("token obtido.");
                }
                console.log("Cliente ativo:");
                console.log(cliente === null || cliente === void 0 ? void 0 : cliente.ativo);
                axios.get(url, { headers: { Authorization: "Bearer ".concat(tokenCliente) } })
                    .then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
                    var maquina, statusFinal, tentativa, consulta;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log('store_id', response.data.store_id);
                                str_id = response.data.store_id;
                                console.log('storetransaction_amount_id', response.data.transaction_amount);
                                console.log('payment_method_id', response.data.payment_type_id);
                                valor = response.data.transaction_amount;
                                tipoPagamento = response.data.payment_type_id;
                                if (response.data.fee_details && Array.isArray(response.data.fee_details) && response.data.fee_details.length > 0) {
                                    console.log('Amount:', response.data.fee_details[0].amount);
                                    taxaDaOperacao = response.data.fee_details[0].amount + "";
                                }
                                return [4 /*yield*/, prisma.pix_Maquina.findFirst({
                                        where: {
                                            store_id: str_id,
                                            clienteId: req.params.id
                                        },
                                        include: {
                                            cliente: true,
                                        },
                                    })];
                            case 1:
                                maquina = _a.sent();
                                console.log("store id trazido pelo Mercado Pago...");
                                console.log(str_id);
                                if (!(response.data.status != "approved")) return [3 /*break*/, 8];
                                console.log(Pagamento, não, aprovado, ainda | Status, MP, $, { response: response, : .data.status });
                                if (!(response.data.status === "pending")) return [3 /*break*/, 8];
                                console.log.apply(console, __spreadArray([Iniciando, checagem, ativa, para, o, pagamento, $, { req: req, : .query.id }], , false));
                                statusFinal = response.data.status;
                                tentativa = 1;
                                _a.label = 2;
                            case 2:
                                if (!(tentativa <= 6)) return [3 /*break*/, 8];
                                // espera 4 segundos entre tentativas
                                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 4000); })];
                            case 3:
                                // espera 4 segundos entre tentativas
                                _a.sent();
                                _a.label = 4;
                            case 4:
                                _a.trys.push([4, , 6, 7]);
                                return [4 /*yield*/, axios.get(https, //api.mercadopago.com/v1/payments/${req.query.id},
                                    { headers: { Authorization: Bearer, $: $ } }, { tokenCliente: tokenCliente })];
                            case 5:
                                consulta = _a.sent();
                                return [3 /*break*/, 7];
                            case 6: return [7 /*endfinally*/];
                            case 7:
                                tentativa++;
                                return [3 /*break*/, 2];
                            case 8: return [2 /*return*/];
                        }
                    });
                }); });
                statusFinal = consulta.data.status;
                console.log(Tentativa, $, { tentativa: tentativa }, status, atual = $, { statusFinal: statusFinal });
                if (statusFinal === "approved") {
                    console.log(Pagamento, $, { req: req, : .query.id }, confirmado, mais, rápido, pelo, polling);
                    break; // sai do loop e segue para o fluxo normal de aprovado
                }
                return [3 /*break*/, 3];
            case 2:
                err_18 = _b.sent();
                if (err_18 instanceof Error) {
                    console.error("Erro ao consultar status no Mercado Pago:", err_18.message);
                }
                else {
                    console.error("Erro ao consultar status no Mercado Pago:", err_18);
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
if (statusFinal !== "approved") {
    console.log(Pagamento, $, { req: req, : .query.id }, não, aprovado, após, checagens, aguardando, webhook, normal.
    );
    return;
}
{
    console.log("pagamento não aprovado!");
    return;
}
if (response.data.status != "approved") {
    console.log("Pagamento n\u00E3o aprovado ainda | Status MP: ".concat(response.data.status));
    // Checagem ativa se status for pending
    if (response.data.status === "pending") {
        console.log("Iniciando checagem ativa para o pagamento ".concat(req.query.id, "..."));
        var statusFinal = response.data.status;
        for (var tentativa = 1; tentativa <= 6; tentativa++) {
            // espera 4 segundos entre tentativas
            await new Promise(function (resolve) { return setTimeout(resolve, 4000); });
            try {
                var consulta = await axios.get("https://api.mercadopago.com/v1/payments/".concat(req.query.id), { headers: { Authorization: "Bearer ".concat(tokenCliente) } });
                statusFinal = consulta.data.status;
                console.log("Tentativa ".concat(tentativa, ": status atual = ").concat(statusFinal));
                if (statusFinal === "approved") {
                    console.log("\u2705 Pagamento ".concat(req.query.id, " confirmado mais r\u00E1pido pelo polling!"));
                    break; // sai do loop e segue para o fluxo normal de aprovado
                }
            }
            catch (err) {
                if (err instanceof Error) {
                    console.error("Erro ao consultar status no Mercado Pago:", err.message);
                }
                else {
                    console.error("Erro ao consultar status no Mercado Pago:", err);
                }
            }
        }
        if (statusFinal !== "approved") {
            console.log("\u26A0\uFE0F Pagamento ".concat(req.query.id, " n\u00E3o aprovado ap\u00F3s checagens, aguardando webhook normal."));
            return;
        }
    }
    else {
        console.log("pagamento não aprovado!");
        return;
    }
}
//PROCESSAR O PAGAMENTO (se eu tiver uma máquina com store_id cadastrado)
if (maquina && maquina.store_id && maquina.store_id.length > 0) {
    console.log("recebendo pagamento na m\u00E1quina: ".concat(maquina.nome, " - store_id: ").concat(maquina.store_id));
    //VERIFICANDO SE A MÁQUINA PERTENCE A UM CIENTE ATIVO
    if (cliente != null) {
        if (cliente !== null && cliente !== undefined) {
            if (cliente.ativo) {
                console.log("Cliente ativo - seguindo...");
                //VERIFICAÇÃO DA DATA DE VENCIMENTO:
                if (cliente.dataVencimento) {
                    if (cliente.dataVencimento != null) {
                        console.log("verificando inadimplência...");
                        var dataVencimento = cliente.dataVencimento;
                        var dataAtual = new Date();
                        var diferencaEmMilissegundos = dataAtual.getTime() - dataVencimento.getTime();
                        var diferencaEmDias = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
                        console.log(diferencaEmDias);
                        if (diferencaEmDias > 10) {
                            console.log("Cliente MENSALIDADE atrasada - estornando...");
                            //EVITAR ESTORNO DUPLICADO
                            var registroExistente_1 = await prisma.pix_Pagamento.findFirst({
                                where: {
                                    mercadoPagoId: req.query.id,
                                    estornado: true,
                                    clienteId: req.params.id
                                },
                            });
                            if (registroExistente_1) {
                                console.log("Esse estorno ja foi feito...");
                                return res.status(200).json({ "retorno": "error.. cliente ATRASADO - mais de 10 dias sem pagamento!" });
                            }
                            else {
                                console.log("Seguindo...");
                            }
                            //FIM EVITANDO ESTORNO DUPLICADO
                            estornarMP(req.query.id, tokenCliente, "mensalidade com atraso");
                            //REGISTRAR O PAGAMENTO
                            var novoPagamento_1 = await prisma.pix_Pagamento.create({
                                data: {
                                    maquinaId: maquina.id,
                                    valor: valor.toString(),
                                    mercadoPagoId: req.query.id,
                                    motivoEstorno: "01- mensalidade com atraso. str_id: ".concat(str_id),
                                    estornado: true,
                                },
                            });
                            return res.status(200).json({ "retorno": "error.. cliente ATRASADO - mais de 10 dias sem pagamento!" });
                        }
                    }
                    else {
                        console.log("pulando etapa de verificar inadimplência... campo dataVencimento não cadastrado ou nulo!");
                    }
                }
                //FIM VERIFICAÇÃO VENCIMENTO
            }
            else {
                console.log("Cliente inativo - estornando...");
                //EVITAR ESTORNO DUPLICADO
                var registroExistente_2 = await prisma.pix_Pagamento.findFirst({
                    where: {
                        mercadoPagoId: req.query.id,
                        estornado: true,
                        clienteId: req.params.id
                    },
                });
                if (registroExistente_2) {
                    console.log("Esse estorno ja foi feito...");
                    return res.status(200).json({ "retorno": "error.. cliente ATRASADO - mais de 10 dias sem pagamento!" });
                }
                else {
                    console.log("Seguindo...");
                }
                //FIM EVITANDO ESTORNO DUPLICADO
                estornarMP(req.query.id, tokenCliente, "cliente inativo");
                //REGISTRAR O PAGAMENTO
                var novoPagamento_2 = await prisma.pix_Pagamento.create({
                    data: {
                        maquinaId: maquina.id,
                        valor: valor.toString(),
                        mercadoPagoId: req.query.id,
                        motivoEstorno: "02- cliente inativo. str_id: ".concat(str_id),
                        estornado: true,
                    },
                });
                return res.status(200).json({ "retorno": "error.. cliente INATIVO - pagamento estornado!" });
            }
        }
        else {
            console.log("error.. cliente nulo ou não encontrado!");
            return res.status(200).json({ "retorno": "error.. cliente nulo ou não encontrado!" });
        }
    }
    //FIM VERIFICAÇÃO DE CLIENTE ATIVO.
    //VERIFICANDO SE A MÁQUINA ESTÁ OFFLINE
    if (maquina.ultimaRequisicao instanceof Date) {
        var diferencaEmSegundos = tempoOffline(maquina.ultimaRequisicao);
        if (diferencaEmSegundos > 60) {
            console.log("estornando... máquina offline.");
            //EVITAR ESTORNO DUPLICADO
            var registroExistente_3 = await prisma.pix_Pagamento.findFirst({
                where: {
                    mercadoPagoId: req.query.id,
                    estornado: true,
                },
            });
            if (registroExistente_3) {
                console.log("Esse estorno ja foi feito...");
                return res.status(200).json({ "retorno": "error.. cliente ATRASADO - mais de 10 dias sem pagamento!" });
            }
            else {
                console.log("Seguindo...");
            }
            //FIM EVITANDO ESTORNO DUPLICADO
            estornarMP(req.query.id, tokenCliente, "máquina offline");
            //evitando duplicidade de estorno:
            var estornos = await prisma.pix_Pagamento.findMany({
                where: {
                    mercadoPagoId: req.query.id,
                    estornado: true,
                    clienteId: req.params.id
                },
            });
            if (estornos) {
                if (estornos.length > 0) {
                    return res.status(200).json({ "retorno": "PAGAMENTO JÁ ESTORNADO! - MÁQUINA OFFLINE" });
                }
            }
            //FIM envitando duplicidade de estorno
            //REGISTRAR ESTORNO
            var novoPagamento_3 = await prisma.pix_Pagamento.create({
                data: {
                    maquinaId: maquina.id,
                    valor: valor.toString(),
                    mercadoPagoId: req.query.id,
                    motivoEstorno: "03- m\u00E1quina offline. str_id: ".concat(str_id),
                    estornado: true,
                },
            });
            return res.status(200).json({ "retorno": "PAGAMENTO ESTORNADO - MÁQUINA OFFLINE" });
        }
    }
    else {
        console.log("estornando... máquina offline.");
        //EVITAR ESTORNO DUPLICADO
        var registroExistente_4 = await prisma.pix_Pagamento.findFirst({
            where: {
                mercadoPagoId: req.query.id,
                estornado: true,
                clienteId: req.params.id
            },
        });
        if (registroExistente_4) {
            console.log("Esse estorno ja foi feito...");
            return res.status(200).json({ "retorno": "error.. cliente ATRASADO - mais de 10 dias sem pagamento!" });
        }
        else {
            console.log("Seguindo...");
        }
        //FIM EVITANDO ESTORNO DUPLICADO
        estornarMP(req.query.id, tokenCliente, "máquina offline");
        //REGISTRAR O PAGAMENTO
        var novoPagamento_4 = await prisma.pix_Pagamento.create({
            data: {
                maquinaId: maquina.id,
                valor: valor.toString(),
                mercadoPagoId: req.query.id,
                motivoEstorno: "04- m\u00E1quina offline. str_id: ".concat(str_id),
                estornado: true,
            },
        });
        return res.status(200).json({ "retorno": "PAGAMENTO ESTORNADO - MÁQUINA OFFLINE" });
    }
    //FIM VERIFICAÇÃO MÁQUINA OFFLINE
    //VERIFICAR SE O VALOR PAGO É MAIOR QUE O VALOR MÍNIMO
    var valorMinimo = parseFloat(maquina.valorDoPulso);
    if (valor < valorMinimo) {
        console.log("iniciando estorno...");
        //EVITAR ESTORNO DUPLICADO
        var registroExistente_5 = await prisma.pix_Pagamento.findFirst({
            where: {
                mercadoPagoId: req.query.id,
                estornado: true,
                clienteId: req.params.id
            },
        });
        if (registroExistente_5) {
            console.log("Esse estorno ja foi feito...");
            return res.status(200).json({ "retorno": "error.. cliente ATRASADO - mais de 10 dias sem pagamento!" });
        }
        else {
            console.log("Seguindo...");
        }
        //FIM EVITANDO ESTORNO DUPLICADO
        //REGISTRAR O PAGAMENTO
        var novoPagamento_5 = await prisma.pix_Pagamento.create({
            data: {
                maquinaId: maquina.id,
                valor: valor.toString(),
                mercadoPagoId: req.query.id,
                motivoEstorno: "05- valor inferior ao m\u00EDnimo. str_id: ".concat(str_id),
                estornado: true,
            },
        });
        console.log("estornando valor inferior ao mínimo...");
        estornarMP(req.query.id, tokenCliente, "valor inferior ao mínimo");
        return res.status(200).json({
            "retorno": "PAGAMENTO ESTORNADO - INFERIOR AO VALOR\nM\u00CDNIMO DE R$: ".concat(valorMinimo, " PARA ESSA M\u00C1QUINA.")
        });
    }
    else {
        console.log("valor permitido finalizando operação...");
    }
    if (response.data.status != "approved") {
        console.log("pagamento não aprovado!");
        return;
    }
    //VERIFICAR SE ESSE PAGAMENTO JÁ FOI EFETUADO
    var registroExistente = await prisma.pix_Pagamento.findFirst({
        where: {
            mercadoPagoId: req.query.id,
            clienteId: req.params.id
        },
    });
    if (registroExistente) {
        console.log("Esse pagamento ja foi feito...");
        return res.status(200).json({ "retorno": "error.. Duplicidade de pagamento!" });
    }
    else {
        console.log("Seguindo...");
    }
    //VERIFICAR SE ESSE PAGAMENTO JÁ FOI EFETUADO
    //ATUALIZAR OS DADOS DA MÁQUINA QUE ESTAMOS RECEBENDO O PAGAMENTO
    await prisma.pix_Maquina.update({
        where: {
            id: maquina.id,
        },
        data: {
            valorDoPix: valor.toString(),
            ultimoPagamentoRecebido: new Date(Date.now())
        }
    });
    //REGISTRAR O PAGAMENTO
    var novoPagamento = await prisma.pix_Pagamento.create({
        data: {
            maquinaId: maquina.id,
            valor: valor.toString(),
            mercadoPagoId: req.query.id,
            motivoEstorno: "",
            tipo: tipoPagamento,
            taxas: taxaDaOperacao,
            clienteId: cliId,
            estornado: false,
            operadora: "Mercado Pago"
        },
    });
    if (NOTIFICACOES_PAGAMENTOS) {
        notificarDiscord(NOTIFICACOES_PAGAMENTOS, "Novo pagamento recebido no Mercado Pago. R$: ".concat(valor.toString()), "Cliente ".concat(cliente === null || cliente === void 0 ? void 0 : cliente.nome, " Maquina: ").concat(maquina === null || maquina === void 0 ? void 0 : maquina.nome, ". Maquina: ").concat(maquina === null || maquina === void 0 ? void 0 : maquina.descricao));
    }
    console.log('Pagamento inserido com sucesso:', novoPagamento);
    return res.status(200).json(novoPagamento);
}
else {
    //PROCESSAMENTO DE EVENTOS QUE NÃO SAO PAYMENTS DE LOJAS E CAIXAS
    console.log(mensagem);
    return res.status(200).json({ "retorno": mensagem });
}
try { }
catch () { }
(function (error) {
    console.error('Erro ao processar pagamento, verifique se o token está cadastrado:', error);
    // Aqui você pode adicionar qualquer lógica ou retorno desejado em caso de erro.
    return res.status(500).json({ error: "".concat(error.message) });
});
;
try { }
catch (error) {
    console.error(error);
    return res.status(402).json({ "error": "error: " + error });
}
;
//esse :id é o do seu cliente e não da máquina!
//EXEMPLO:
//https://api-v3-ddd5b551a51f.herokuapp.com/webhookmercadopago/a803e2f8-7045-4ae8-a387-517ae844c965
app.post("/webhookmercadopago/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ip, ipFromHeader;
    return __generator(this, function (_a) {
        try {
            console.log("Processando pagamento via Mercado Pago Webhooks...");
            console.log(req.body);
            //teste de chamada do Mercado Pago (webhooks)
            if (req.query['data.id'] === "123456" && req.query.type === "payment") {
                console.log("recebendo requisição de teste do Mercado Pago");
                console.log("Ip de origem");
                ip = req.socket.remoteAddress;
                ipFromHeader = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
                console.log(ipFromHeader);
                return [2 /*return*/, res.status(200).json({ "status": "ok" })];
            }
            /*
            //processamento do pagamento
            var valor = 0.00;
            var tipoPagamento = ``;
            var taxaDaOperacao = ``;
            var cliId = ``;
            var str_id = "";
            var mensagem = `MÁQUINA NÃO ENCONTRADA`;
            console.log("Novo pix do Mercado Pago:");
            console.log(req.body);
            console.log("id");
            console.log(req.query['data.id']);
            const { resource, topic } = req.body;
            // Exibe os valores capturados
            console.log('Resource:', resource);
            console.log('Topic:', topic);
            var url = "https://api.mercadopago.com/v1/payments/" + req.query['data.id'];
            var tokenCliente = "";
            //buscar token do cliente no banco de dados:
            const cliente = await prisma.pix_Cliente.findUnique({
              where: {
                id: req.params.id,
              }
            });
            tokenCliente = (cliente?.mercadoPagoToken == undefined) ? "" : cliente?.mercadoPagoToken;
            cliId = (cliente?.id == undefined) ? "" : cliente?.id;
            if (tokenCliente) {
              console.log("token obtido.");
            }
            console.log("Cliente ativo:");
            console.log(cliente?.ativo);
            axios.get(url, { headers: { Authorization: `Bearer ${tokenCliente}` } })
              .then(async (response: { data: {transaction_amount: number; status: string, payment_type_id: string, fee_details: any, external_reference: string }; }) => {
                console.log('storetransaction_amount_id', response.data.transaction_amount);
                console.log('payment_method_id', response.data.payment_type_id);
                valor = response.data.transaction_amount;
                tipoPagamento = response.data.payment_type_id;
                console.log('external_reference', response.data.external_reference);
                if (response.data.fee_details && Array.isArray(response.data.fee_details) && response.data.fee_details.length > 0) {
                  console.log('Amount:', response.data.fee_details[0].amount);
                  taxaDaOperacao = response.data.fee_details[0].amount + "";
                }
                //BUSCAR QUAL MÁQUINA ESTÁ SENDO UTILIZADA (store_id)
                const maquina = await prisma.pix_Maquina.findFirst({
                  where: {
                    id: response.data.external_reference,
                  },
                  include: {
                    cliente: true,
                  },
                });
                //PROCESSAR O PAGAMENTO (se eu tiver uma máquina com store_id cadastrado)
                if (maquina && maquina.descricao) {
                  console.log(`recebendo pagamento na máquina: ${maquina.nome} -  ${maquina.descricao}`)
                  //VERIFICANDO SE A MÁQUINA PERTENCE A UM CIENTE ATIVO
                  if (cliente != null) {
                    if (cliente !== null && cliente !== undefined) {
                      if (cliente.ativo) {
                        console.log("Cliente ativo - seguindo...");
                        //VERIFICAÇÃO DA DATA DE VENCIMENTO:
                        if (cliente.dataVencimento) {
                          if (cliente.dataVencimento != null) {
                            console.log("verificando inadimplência...");
                            const dataVencimento: Date = cliente.dataVencimento;
                            const dataAtual = new Date();
                            const diferencaEmMilissegundos = dataAtual.getTime() - dataVencimento.getTime();
                            const diferencaEmDias = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
                            console.log(diferencaEmDias);
                            if (diferencaEmDias > 10) {
                              console.log("Cliente MENSALIDADE atrasada - estornando...");
                              //EVITAR ESTORNO DUPLICADO
                              const registroExistente = await prisma.pix_Pagamento.findFirst({
                                where: {
                                  mercadoPagoId: req.query.id,
                                  estornado: true,
                                  clienteId: req.params.id
                                },
                              });
                              if (registroExistente) {
                                console.log("Esse estorno ja foi feito...");
                                return res.status(200).json({ "retorno": "error.. cliente ATRASADO - mais de 10 dias sem pagamento!" });
                              } else {
                                console.log("Seguindo...");
                              }
                              //FIM EVITANDO ESTORNO DUPLICADO
                              estornarMP(req.query.id, tokenCliente, "mensalidade com atraso");
                              //REGISTRAR O PAGAMENTO
                              const novoPagamento = await prisma.pix_Pagamento.create({
                                data: {
                                  maquinaId: maquina.id,
                                  valor: valor.toString(),
                                  mercadoPagoId: req.query.id,
                                  motivoEstorno: `01- mensalidade com atraso. str_id: ${str_id}`,
                                  estornado: true,
                                },
                              });
                              return res.status(200).json({ "retorno": "error.. cliente ATRASADO - mais de 10 dias sem pagamento!" });
                            }
                          } else {
                            console.log("pulando etapa de verificar inadimplência... campo dataVencimento não cadastrado ou nulo!")
                          }
                        }
                        //FIM VERIFICAÇÃO VENCIMENTO
                      } else {
                        console.log("Cliente inativo - estornando...");
                        //EVITAR ESTORNO DUPLICADO
                        const registroExistente = await prisma.pix_Pagamento.findFirst({
                          where: {
                            mercadoPagoId: req.query.id,
                            estornado: true,
                            clienteId: req.params.id
                          },
                        });
                        if (registroExistente) {
                          console.log("Esse estorno ja foi feito...");
                          return res.status(200).json({ "retorno": "error.. cliente ATRASADO - mais de 10 dias sem pagamento!" });
                        } else {
                          console.log("Seguindo...");
                        }
                        //FIM EVITANDO ESTORNO DUPLICADO
                        estornarMP(req.query.id, tokenCliente, "cliente inativo");
                        //REGISTRAR O PAGAMENTO
                        const novoPagamento = await prisma.pix_Pagamento.create({
                          data: {
                            maquinaId: maquina.id,
                            valor: valor.toString(),
                            mercadoPagoId: req.query.id,
                            motivoEstorno: `02- cliente inativo. str_id: ${str_id}`,
                            estornado: true,
                          },
                        });
                        return res.status(200).json({ "retorno": "error.. cliente INATIVO - pagamento estornado!" });
                      }
                    } else {
                      console.log("error.. cliente nulo ou não encontrado!");
                      return res.status(200).json({ "retorno": "error.. cliente nulo ou não encontrado!" });
                    }
                  }
                  //FIM VERIFICAÇÃO DE CLIENTE ATIVO.
                  //VERIFICANDO SE A MÁQUINA ESTÁ OFFLINE
                  if (maquina.ultimaRequisicao instanceof Date) {
                    const diferencaEmSegundos = tempoOffline(maquina.ultimaRequisicao);
                    if (diferencaEmSegundos > 60) {
                      console.log("estornando... máquina offline.");
                      //EVITAR ESTORNO DUPLICADO
                      const registroExistente = await prisma.pix_Pagamento.findFirst({
                        where: {
                          mercadoPagoId: req.query.id,
                          estornado: true,
                        },
                      });
                      if (registroExistente) {
                        console.log("Esse estorno ja foi feito...");
                        return res.status(200).json({ "retorno": "error.. cliente ATRASADO - mais de 10 dias sem pagamento!" });
                      } else {
                        console.log("Seguindo...");
                      }
                      //FIM EVITANDO ESTORNO DUPLICADO
                      estornarMP(req.query.id, tokenCliente, "máquina offline");
                      //evitando duplicidade de estorno:
                      const estornos = await prisma.pix_Pagamento.findMany({
                        where: {
                          mercadoPagoId: req.query.id,
                          estornado: true,
                          clienteId: req.params.id
                        },
                      });
                      if (estornos) {
                        if (estornos.length > 0) {
                          return res.status(200).json({ "retorno": "PAGAMENTO JÁ ESTORNADO! - MÁQUINA OFFLINE" });
                        }
                      }
                      //FIM envitando duplicidade de estorno
                      //REGISTRAR ESTORNO
                      const novoPagamento = await prisma.pix_Pagamento.create({
                        data: {
                          maquinaId: maquina.id,
                          valor: valor.toString(),
                          mercadoPagoId: req.query.id,
                          motivoEstorno: `03- máquina offline. str_id: ${str_id}`,
                          estornado: true,
                        },
                      });
                      return res.status(200).json({ "retorno": "PAGAMENTO ESTORNADO - MÁQUINA OFFLINE" });
                    }
                  } else {
                    console.log("estornando... máquina offline.");
                    //EVITAR ESTORNO DUPLICADO
                    const registroExistente = await prisma.pix_Pagamento.findFirst({
                      where: {
                        mercadoPagoId: req.query.id,
                        estornado: true,
                        clienteId: req.params.id
                      },
                    });
                    if (registroExistente) {
                      console.log("Esse estorno ja foi feito...");
                      return res.status(200).json({ "retorno": "error.. cliente ATRASADO - mais de 10 dias sem pagamento!" });
                    } else {
                      console.log("Seguindo...");
                    }
                    //FIM EVITANDO ESTORNO DUPLICADO
                    estornarMP(req.query.id, tokenCliente, "máquina offline");
                    //REGISTRAR O PAGAMENTO
                    const novoPagamento = await prisma.pix_Pagamento.create({
                      data: {
                        maquinaId: maquina.id,
                        valor: valor.toString(),
                        mercadoPagoId: req.query.id,
                        motivoEstorno: `04- máquina offline. str_id: ${str_id}`,
                        estornado: true,
                      },
                    });
                    return res.status(200).json({ "retorno": "PAGAMENTO ESTORNADO - MÁQUINA OFFLINE" });
                  }
                  //FIM VERIFICAÇÃO MÁQUINA OFFLINE
                  //VERIFICAR SE O VALOR PAGO É MAIOR QUE O VALOR MÍNIMO
                  const valorMinimo = parseFloat(maquina.valorDoPulso);
                  if (valor < valorMinimo) {
                    console.log("iniciando estorno...")
                    //EVITAR ESTORNO DUPLICADO
                    const registroExistente = await prisma.pix_Pagamento.findFirst({
                      where: {
                        mercadoPagoId: req.query.id,
                        estornado: true,
                        clienteId: req.params.id
                      },
                    });
                    if (registroExistente) {
                      console.log("Esse estorno ja foi feito...");
                      return res.status(200).json({ "retorno": "error.. cliente ATRASADO - mais de 10 dias sem pagamento!" });
                    } else {
                      console.log("Seguindo...");
                    }
                    //FIM EVITANDO ESTORNO DUPLICADO
                    //REGISTRAR O PAGAMENTO
                    const novoPagamento = await prisma.pix_Pagamento.create({
                      data: {
                        maquinaId: maquina.id,
                        valor: valor.toString(),
                        mercadoPagoId: req.query.id,
                        motivoEstorno: `05- valor inferior ao mínimo. str_id: ${str_id}`,
                        estornado: true,
                      },
                    });
                    console.log("estornando valor inferior ao mínimo...");
                    estornarMP(req.query.id, tokenCliente, "valor inferior ao mínimo");
                    return res.status(200).json({
                      "retorno": `PAGAMENTO ESTORNADO - INFERIOR AO VALOR
        MÍNIMO DE R$: ${valorMinimo} PARA ESSA MÁQUINA.`
                    });
                  } else {
                    console.log("valor permitido finalizando operação...");
                  }
                  if (response.data.status != "approved") {
                    console.log("pagamento não aprovado!");
                    return;
                  }
                  //VERIFICAR SE ESSE PAGAMENTO JÁ FOI EFETUADO
                  const registroExistente = await prisma.pix_Pagamento.findFirst({
                    where: {
                      mercadoPagoId: req.query.id,
                      clienteId: req.params.id
                    },
                  });
                  if (registroExistente) {
                    console.log("Esse pagamento ja foi feito...");
                    return res.status(200).json({ "retorno": "error.. Duplicidade de pagamento!" });
                  } else {
                    console.log("Seguindo...");
                  }
                  //VERIFICAR SE ESSE PAGAMENTO JÁ FOI EFETUADO
                  //ATUALIZAR OS DADOS DA MÁQUINA QUE ESTAMOS RECEBENDO O PAGAMENTO
                  await prisma.pix_Maquina.update({
                    where: {
                      id: maquina.id,
                    },
                    data: {
                      valorDoPix: valor.toString(),
                      ultimoPagamentoRecebido: new Date(Date.now())
                    }
                  });
                  //REGISTRAR O PAGAMENTO
                  const novoPagamento = await prisma.pix_Pagamento.create({
                    data: {
                      maquinaId: maquina.id,
                      valor: valor.toString(),
                      mercadoPagoId: req.query.id,
                      motivoEstorno: ``,
                      tipo: tipoPagamento,
                      taxas: taxaDaOperacao,
                      clienteId: cliId,
                      estornado: false,
                      operadora: `Mercado Pago`
                    },
                  });
                  if (NOTIFICACOES_PAGAMENTOS) {
                    notificarDiscord(NOTIFICACOES_PAGAMENTOS, `Novo pagamento recebido no Mercado Pago. Via APP. R$: ${valor.toString()}`, `Cliente ${cliente?.nome} Maquina: ${maquina?.nome}. Maquina: ${maquina?.descricao}`)
                  }
                  console.log('Pagamento inserido com sucesso:', novoPagamento);
                  return res.status(200).json(novoPagamento);
                } else {
                  //PROCESSAMENTO DE EVENTOS QUE NÃO SAO PAYMENTS DE LOJAS E CAIXAS
                  console.log("Máquina não encontrada");
                  return res.status(200).json({ "retorno": mensagem });
                }
              }).catch((error: any) => {
                console.error('Erro ao processar pagamento, verifique se o token está cadastrado:', error);
                // Aqui você pode adicionar qualquer lógica ou retorno desejado em caso de erro.
                return res.status(500).json({ error: `${error.message}` });
              });
            */
        }
        catch (error) {
            console.error(error);
            return [2 /*return*/, res.status(402).json({ "error": "error: " + error })];
        }
        return [2 /*return*/];
    });
}); });
//STORE ID MAQ ?valor=1
app.post("/rota-recebimento-especie/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var maquina, value, novoPagamento, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, prisma.pix_Maquina.findUnique({
                        where: {
                            id: req.params.id,
                        }
                    })];
            case 1:
                maquina = _a.sent();
                value = req.query.valor;
                if (!maquina) return [3 /*break*/, 3];
                console.log("recebendo pagamento na m\u00E1quina: ".concat(maquina.nome));
                return [4 /*yield*/, prisma.pix_Pagamento.create({
                        data: {
                            maquinaId: maquina.id,
                            valor: value,
                            mercadoPagoId: "CASH",
                            motivoEstorno: "",
                            tipo: "CASH",
                            estornado: false,
                        },
                    })];
            case 2:
                novoPagamento = _a.sent();
                return [2 /*return*/, res.status(200).json({ "pagamento registrado": "Pagamento registrado" })];
            case 3:
                console.log("error.. cliente nulo ou não encontrado!");
                return [2 /*return*/, res.status(404).json({ "retorno": "error.. máquina nulo ou não encontrado!" })];
            case 4: return [3 /*break*/, 6];
            case 5:
                error_11 = _a.sent();
                console.error(error_11);
                return [2 /*return*/, res.status(402).json({ "error": "error: " + error_11 })];
            case 6: return [2 /*return*/];
        }
    });
}); });
//id da maquina e a quantidade ?valor=1
app.post("/decrementar-estoque/:id/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var value, maquina, novoEstoque, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                value = req.query.valor;
                return [4 /*yield*/, prisma.pix_Maquina.findUnique({
                        where: {
                            id: req.params.id,
                        },
                    })];
            case 1:
                maquina = _a.sent();
                if (!maquina) {
                    return [2 /*return*/, res.status(404).json({ "retorno": "error.. máquina nulo ou não encontrado!" })];
                }
                novoEstoque = maquina.estoque !== null ? maquina.estoque - Number(value) : -1;
                // Perform the update
                return [4 /*yield*/, prisma.pix_Maquina.update({
                        where: {
                            id: req.params.id,
                        },
                        data: {
                            estoque: novoEstoque,
                        },
                    })];
            case 2:
                // Perform the update
                _a.sent();
                console.log("Estoque atualizado");
                return [2 /*return*/, res.status(200).json({ "Estoque atual": "".concat(novoEstoque) })];
            case 3:
                error_12 = _a.sent();
                console.error("Error updating stock:", error_12);
                return [2 /*return*/, res.status(404).json({ "retorno": "Erro ao tentar atualizar estoque" })];
            case 4: return [2 /*return*/];
        }
    });
}); });
//id da maquina e a quantidade ?valor=1
app.post('/setar-estoque/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var maquinaId, estoque, val, maquina, error_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                maquinaId = req.params.id;
                estoque = req.query.valor;
                val = Number(estoque);
                return [4 /*yield*/, prisma.pix_Maquina.findUnique({
                        where: {
                            id: maquinaId,
                        },
                    })];
            case 1:
                maquina = _a.sent();
                if (!maquina) {
                    return [2 /*return*/, res.status(404).json({ error: 'Maquina não encontrada!' })];
                }
                // Perform the update
                return [4 /*yield*/, prisma.pix_Maquina.update({
                        where: {
                            id: maquinaId,
                        },
                        data: {
                            estoque: val,
                        },
                    })];
            case 2:
                // Perform the update
                _a.sent();
                return [2 /*return*/, res.status(200).json({ "novo estoque:": "".concat(val) })];
            case 3:
                error_13 = _a.sent();
                console.error('Error updating stock:', error_13);
                return [2 /*return*/, res.status(500).json({ error: 'Internal server error.' })];
            case 4: return [2 /*return*/];
        }
    });
}); });
//RELATORIO DE PAGAMENTOS POR MÁQUINA
app.get("/pagamentos/:maquinaId", verifyJWT, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var totalRecebido, totalEstornado, totalEspecie, pagamentos, maquina, estoque, totalSemEstorno, totalComEstorno, _i, pagamentos_1, pagamento, valor, especie, _a, especie_1, e, valor, err_19;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log("".concat(req.params.maquinaId, " acessou a rota de pagamentos."));
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                totalRecebido = 0.0;
                totalEstornado = 0.0;
                totalEspecie = 0.0;
                return [4 /*yield*/, prisma.pix_Pagamento.findMany({
                        where: {
                            maquinaId: req.params.maquinaId,
                            removido: false
                        },
                        orderBy: {
                            data: 'desc', // 'desc' para ordem decrescente (da mais recente para a mais antiga)
                        }
                    })];
            case 2:
                pagamentos = _b.sent();
                return [4 /*yield*/, prisma.pix_Maquina.findUnique({
                        where: {
                            id: req.params.maquinaId
                        }
                    })];
            case 3:
                maquina = _b.sent();
                if (!maquina) {
                    return [2 /*return*/, res.status(404).json({ error: 'Máquina não encontrada' })];
                }
                estoque = maquina.estoque !== null ? maquina.estoque : '--';
                totalSemEstorno = 0;
                totalComEstorno = 0;
                for (_i = 0, pagamentos_1 = pagamentos; _i < pagamentos_1.length; _i++) {
                    pagamento = pagamentos_1[_i];
                    valor = parseFloat(pagamento.valor);
                    if (pagamento.estornado === false) {
                        totalSemEstorno += valor;
                    }
                    else {
                        totalComEstorno += valor;
                    }
                }
                return [4 /*yield*/, prisma.pix_Pagamento.findMany({
                        where: {
                            maquinaId: req.params.maquinaId,
                            removido: false,
                            mercadoPagoId: "CASH"
                        }
                    })];
            case 4:
                especie = _b.sent();
                for (_a = 0, especie_1 = especie; _a < especie_1.length; _a++) {
                    e = especie_1[_a];
                    valor = parseFloat(e.valor);
                    totalEspecie += valor;
                }
                return [2 /*return*/, res.status(200).json({ "total": totalSemEstorno, "estornos": totalComEstorno, "cash": totalEspecie, "estoque": estoque, "pagamentos": pagamentos })];
            case 5:
                err_19 = _b.sent();
                console.log(err_19);
                return [2 /*return*/, res.status(500).json({ "retorno": "ERRO" })];
            case 6: return [2 /*return*/];
        }
    });
}); });
//RELATORIO DE PAGAMENTOS POR MÁQUINA
app.get("/pagamentos-adm/:maquinaId", verifyJwtPessoa, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var totalRecebido, totalEstornado, totalEspecie, pagamentos, maquina, estoque, totalSemEstorno, totalComEstorno, _i, pagamentos_2, pagamento, valor, especie, _a, especie_2, e, valor, err_20;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log("".concat(req.params.maquinaId, " acessou a rota de pagamentos."));
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                totalRecebido = 0.0;
                totalEstornado = 0.0;
                totalEspecie = 0.0;
                return [4 /*yield*/, prisma.pix_Pagamento.findMany({
                        where: {
                            maquinaId: req.params.maquinaId,
                            removido: false
                        },
                        orderBy: {
                            data: 'desc', // 'desc' para ordem decrescente (da mais recente para a mais antiga)
                        }
                    })];
            case 2:
                pagamentos = _b.sent();
                return [4 /*yield*/, prisma.pix_Maquina.findUnique({
                        where: {
                            id: req.params.maquinaId
                        }
                    })];
            case 3:
                maquina = _b.sent();
                if (!maquina) {
                    return [2 /*return*/, res.status(404).json({ error: 'Máquina não encontrada' })];
                }
                estoque = maquina.estoque !== null ? maquina.estoque : '--';
                totalSemEstorno = 0;
                totalComEstorno = 0;
                for (_i = 0, pagamentos_2 = pagamentos; _i < pagamentos_2.length; _i++) {
                    pagamento = pagamentos_2[_i];
                    valor = parseFloat(pagamento.valor);
                    if (pagamento.estornado === false) {
                        totalSemEstorno += valor;
                    }
                    else {
                        totalComEstorno += valor;
                    }
                }
                return [4 /*yield*/, prisma.pix_Pagamento.findMany({
                        where: {
                            maquinaId: req.params.maquinaId,
                            removido: false,
                            mercadoPagoId: "CASH"
                        }
                    })];
            case 4:
                especie = _b.sent();
                for (_a = 0, especie_2 = especie; _a < especie_2.length; _a++) {
                    e = especie_2[_a];
                    valor = parseFloat(e.valor);
                    totalEspecie += valor;
                }
                return [2 /*return*/, res.status(200).json({ "total": totalSemEstorno, "estornos": totalComEstorno, "cash": totalEspecie, "estoque": estoque, "pagamentos": pagamentos })];
            case 5:
                err_20 = _b.sent();
                console.log(err_20);
                return [2 /*return*/, res.status(500).json({ "retorno": "ERRO" })];
            case 6: return [2 /*return*/];
        }
    });
}); });
//RELATORIO DE PAGAMENTOS POR MÁQUINA POR PERÍODO
app.post("/pagamentos-periodo/:maquinaId", verifyJWT, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var totalRecebido, totalEstornado, totalEspecie, dataInicio, dataFim, pagamentos, totalSemEstorno, totalComEstorno, _i, pagamentos_3, pagamento, valor, especie, _a, especie_3, e, valor, err_21;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                totalRecebido = 0.0;
                totalEstornado = 0.0;
                totalEspecie = 0.0;
                dataInicio = new Date(req.body.dataInicio);
                dataFim = new Date(req.body.dataFim);
                return [4 /*yield*/, prisma.pix_Pagamento.findMany({
                        where: {
                            maquinaId: req.params.maquinaId,
                            data: {
                                gte: dataInicio,
                                lte: dataFim,
                            },
                        },
                        orderBy: {
                            data: 'desc', // 'desc' para ordem decrescente (da mais recente para a mais antiga)
                        }
                    })];
            case 1:
                pagamentos = _b.sent();
                totalSemEstorno = 0;
                totalComEstorno = 0;
                for (_i = 0, pagamentos_3 = pagamentos; _i < pagamentos_3.length; _i++) {
                    pagamento = pagamentos_3[_i];
                    valor = parseFloat(pagamento.valor);
                    if (pagamento.estornado === false) {
                        totalSemEstorno += valor;
                    }
                    else {
                        totalComEstorno += valor;
                    }
                }
                return [4 /*yield*/, prisma.pix_Pagamento.findMany({
                        where: {
                            maquinaId: req.params.maquinaId,
                            removido: false,
                            mercadoPagoId: "CASH"
                        }
                    })];
            case 2:
                especie = _b.sent();
                for (_a = 0, especie_3 = especie; _a < especie_3.length; _a++) {
                    e = especie_3[_a];
                    valor = parseFloat(e.valor);
                    totalEspecie += valor;
                }
                return [2 /*return*/, res.status(200).json({ "total": totalSemEstorno, "estornos": totalComEstorno, "cash": totalEspecie, "pagamentos": pagamentos })];
            case 3:
                err_21 = _b.sent();
                console.log(err_21);
                return [2 /*return*/, res.status(500).json({ "retorno": "ERRO" })];
            case 4: return [2 /*return*/];
        }
    });
}); });
//RELATORIO DE PAGAMENTOS POR MÁQUINA POR PERÍODO
app.post("/pagamentos-periodo-adm/:maquinaId", verifyJwtPessoa, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var totalRecebido, totalEstornado, totalEspecie, dataInicio, dataFim, pagamentos, totalSemEstorno, totalComEstorno, _i, pagamentos_4, pagamento, valor, especie, _a, especie_4, e, valor, err_22;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                totalRecebido = 0.0;
                totalEstornado = 0.0;
                totalEspecie = 0.0;
                dataInicio = new Date(req.body.dataInicio);
                dataFim = new Date(req.body.dataFim);
                return [4 /*yield*/, prisma.pix_Pagamento.findMany({
                        where: {
                            maquinaId: req.params.maquinaId,
                            data: {
                                gte: dataInicio,
                                lte: dataFim,
                            },
                        },
                        orderBy: {
                            data: 'desc', // 'desc' para ordem decrescente (da mais recente para a mais antiga)
                        }
                    })];
            case 1:
                pagamentos = _b.sent();
                totalSemEstorno = 0;
                totalComEstorno = 0;
                for (_i = 0, pagamentos_4 = pagamentos; _i < pagamentos_4.length; _i++) {
                    pagamento = pagamentos_4[_i];
                    valor = parseFloat(pagamento.valor);
                    if (pagamento.estornado === false) {
                        totalSemEstorno += valor;
                    }
                    else {
                        totalComEstorno += valor;
                    }
                }
                return [4 /*yield*/, prisma.pix_Pagamento.findMany({
                        where: {
                            maquinaId: req.params.maquinaId,
                            removido: false,
                            mercadoPagoId: "CASH"
                        }
                    })];
            case 2:
                especie = _b.sent();
                for (_a = 0, especie_4 = especie; _a < especie_4.length; _a++) {
                    e = especie_4[_a];
                    valor = parseFloat(e.valor);
                    totalEspecie += valor;
                }
                return [2 /*return*/, res.status(200).json({ "total": totalSemEstorno, "estornos": totalComEstorno, "cash": totalEspecie, "pagamentos": pagamentos })];
            case 3:
                err_22 = _b.sent();
                console.log(err_22);
                return [2 /*return*/, res.status(500).json({ "retorno": "ERRO" })];
            case 4: return [2 /*return*/];
        }
    });
}); });
//ASSINATURA
app.post("/assinatura", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            console.log(req.body);
            return [2 /*return*/, res.status(200).json({ "status": "ok" })];
        }
        catch (err) {
            console.log(err);
            return [2 /*return*/, res.status(500).json({ "retorno": "ERRO" })];
        }
        return [2 /*return*/];
    });
}); });
app.delete('/delete-pagamentos/:maquinaId', verifyJWT, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var maquinaId, updatePagamentos, error_14;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                maquinaId = req.params.maquinaId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.pix_Pagamento.updateMany({
                        where: {
                            maquinaId: maquinaId
                        },
                        data: {
                            removido: true
                        }
                    })];
            case 2:
                updatePagamentos = _a.sent();
                res.status(200).json({ message: "Todos os pagamentos para a m\u00E1quina com ID ".concat(maquinaId, " foram removidos.") });
                return [3 /*break*/, 4];
            case 3:
                error_14 = _a.sent();
                console.error('Erro ao deletar os pagamentos:', error_14);
                res.status(500).json({ error: 'Erro ao deletar os pagamentos.' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.delete('/delete-pagamentos-adm/:maquinaId', verifyJwtPessoa, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var maquinaId, updatePagamentos, error_15;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                maquinaId = req.params.maquinaId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.pix_Pagamento.updateMany({
                        where: {
                            maquinaId: maquinaId
                        },
                        data: {
                            removido: true
                        }
                    })];
            case 2:
                updatePagamentos = _a.sent();
                res.status(200).json({ message: "Todos os pagamentos para a m\u00E1quina com ID ".concat(maquinaId, " foram removidos.") });
                return [3 /*break*/, 4];
            case 3:
                error_15 = _a.sent();
                console.error('Erro ao deletar os pagamentos:', error_15);
                res.status(500).json({ error: 'Erro ao deletar os pagamentos.' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//RELATÓRIOS
app.post("/relatorio-01-cash", verifyJWT, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pagamentos, somatorio, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("************** cash");
                console.log(req.body);
                return [4 /*yield*/, prisma.pix_Pagamento.findMany({
                        where: {
                            estornado: false,
                            mercadoPagoId: "CASH",
                            maquinaId: req.body.maquinaId,
                            data: {
                                gte: new Date(req.body.dataInicio),
                                lte: new Date(req.body.dataFim),
                            }
                        }
                    })];
            case 1:
                pagamentos = _a.sent();
                somatorio = pagamentos.reduce(function (acc, pagamento) { return acc + parseInt(pagamento.valor); }, 0);
                return [2 /*return*/, res.status(200).json({ valor: somatorio })];
            case 2:
                e_1 = _a.sent();
                res.json({ error: "error" + e_1 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post("/relatorio-01-cash-adm", verifyJwtPessoa, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pagamentos, somatorio, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("************** cash");
                console.log(req.body);
                return [4 /*yield*/, prisma.pix_Pagamento.findMany({
                        where: {
                            estornado: false,
                            mercadoPagoId: "CASH",
                            maquinaId: req.body.maquinaId,
                            data: {
                                gte: new Date(req.body.dataInicio),
                                lte: new Date(req.body.dataFim),
                            }
                        }
                    })];
            case 1:
                pagamentos = _a.sent();
                somatorio = pagamentos.reduce(function (acc, pagamento) { return acc + parseInt(pagamento.valor); }, 0);
                return [2 /*return*/, res.status(200).json({ valor: somatorio })];
            case 2:
                e_2 = _a.sent();
                res.json({ error: "error" + e_2 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post("/relatorio-02-taxas", verifyJWT, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pagamentos_pix, totalTaxasPix, _i, pagamentos_pix_1, pagamento, taxa, pagamentos, totalTaxasCredito, _a, pagamentos_5, pagamento, taxa, pagamentos_debito, totalTaxasDebito, _b, pagamentos_debito_1, pagamento, taxa, e_3, e_4;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 7, , 8]);
                console.log("************** taxas");
                console.log(req.body);
                if (req.body.maquinaId == null) {
                    return [2 /*return*/, res.status(500).json({ error: "necess\u00E1rio informar maquinaId" })];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 5, , 6]);
                return [4 /*yield*/, prisma.pix_Pagamento.findMany({
                        where: {
                            maquinaId: req.body.maquinaId,
                            tipo: "bank_transfer",
                            estornado: false,
                            data: {
                                gte: new Date(req.body.dataInicio),
                                lte: new Date(req.body.dataFim),
                            }
                        }
                    })];
            case 2:
                pagamentos_pix = _c.sent();
                totalTaxasPix = 0;
                for (_i = 0, pagamentos_pix_1 = pagamentos_pix; _i < pagamentos_pix_1.length; _i++) {
                    pagamento = pagamentos_pix_1[_i];
                    taxa = pagamento.taxas !== null ? pagamento.taxas : "0";
                    totalTaxasPix += parseFloat(taxa) || 0;
                }
                return [4 /*yield*/, prisma.pix_Pagamento.findMany({
                        where: {
                            maquinaId: req.body.maquinaId,
                            tipo: "credit_card",
                            estornado: false,
                            data: {
                                gte: new Date(req.body.dataInicio),
                                lte: new Date(req.body.dataFim),
                            }
                        }
                    })];
            case 3:
                pagamentos = _c.sent();
                totalTaxasCredito = 0;
                for (_a = 0, pagamentos_5 = pagamentos; _a < pagamentos_5.length; _a++) {
                    pagamento = pagamentos_5[_a];
                    taxa = pagamento.taxas !== null ? pagamento.taxas : "0";
                    totalTaxasCredito += parseFloat(taxa) || 0;
                }
                return [4 /*yield*/, prisma.pix_Pagamento.findMany({
                        where: {
                            maquinaId: req.body.maquinaId,
                            tipo: "debit_card",
                            estornado: false,
                            data: {
                                gte: new Date(req.body.dataInicio),
                                lte: new Date(req.body.dataFim),
                            }
                        }
                    })];
            case 4:
                pagamentos_debito = _c.sent();
                totalTaxasDebito = 0;
                for (_b = 0, pagamentos_debito_1 = pagamentos_debito; _b < pagamentos_debito_1.length; _b++) {
                    pagamento = pagamentos_debito_1[_b];
                    taxa = pagamento.taxas !== null ? pagamento.taxas : "0";
                    totalTaxasDebito += parseFloat(taxa) || 0;
                }
                return [2 /*return*/, res.status(200).json({ pix: totalTaxasPix, credito: totalTaxasCredito, debito: totalTaxasDebito })];
            case 5:
                e_3 = _c.sent();
                res.json({ error: "error" + e_3 });
                return [3 /*break*/, 6];
            case 6: return [3 /*break*/, 8];
            case 7:
                e_4 = _c.sent();
                res.json({ "error": "error" + e_4 });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
app.post("/relatorio-02-taxas-adm", verifyJwtPessoa, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pagamentos_pix, totalTaxasPix, _i, pagamentos_pix_2, pagamento, taxa, pagamentos, totalTaxasCredito, _a, pagamentos_6, pagamento, taxa, pagamentos_debito, totalTaxasDebito, _b, pagamentos_debito_2, pagamento, taxa, e_5, e_6;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 7, , 8]);
                console.log("************** taxas");
                console.log(req.body);
                if (req.body.maquinaId == null) {
                    return [2 /*return*/, res.status(500).json({ error: "necess\u00E1rio informar maquinaId" })];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 5, , 6]);
                return [4 /*yield*/, prisma.pix_Pagamento.findMany({
                        where: {
                            maquinaId: req.body.maquinaId,
                            tipo: "bank_transfer",
                            estornado: false
                        }
                    })];
            case 2:
                pagamentos_pix = _c.sent();
                totalTaxasPix = 0;
                for (_i = 0, pagamentos_pix_2 = pagamentos_pix; _i < pagamentos_pix_2.length; _i++) {
                    pagamento = pagamentos_pix_2[_i];
                    taxa = pagamento.taxas !== null ? pagamento.taxas : "0";
                    totalTaxasPix += parseFloat(taxa) || 0;
                }
                return [4 /*yield*/, prisma.pix_Pagamento.findMany({
                        where: {
                            maquinaId: req.body.maquinaId,
                            tipo: "credit_card",
                            estornado: false
                        }
                    })];
            case 3:
                pagamentos = _c.sent();
                totalTaxasCredito = 0;
                for (_a = 0, pagamentos_6 = pagamentos; _a < pagamentos_6.length; _a++) {
                    pagamento = pagamentos_6[_a];
                    taxa = pagamento.taxas !== null ? pagamento.taxas : "0";
                    totalTaxasCredito += parseFloat(taxa) || 0;
                }
                return [4 /*yield*/, prisma.pix_Pagamento.findMany({
                        where: {
                            maquinaId: req.body.maquinaId,
                            tipo: "debit_card",
                            estornado: false
                        }
                    })];
            case 4:
                pagamentos_debito = _c.sent();
                totalTaxasDebito = 0;
                for (_b = 0, pagamentos_debito_2 = pagamentos_debito; _b < pagamentos_debito_2.length; _b++) {
                    pagamento = pagamentos_debito_2[_b];
                    taxa = pagamento.taxas !== null ? pagamento.taxas : "0";
                    totalTaxasDebito += parseFloat(taxa) || 0;
                }
                return [2 /*return*/, res.status(200).json({ pix: totalTaxasPix, credito: totalTaxasCredito, debito: totalTaxasDebito })];
            case 5:
                e_5 = _c.sent();
                res.json({ error: "error" + e_5 });
                return [3 /*break*/, 6];
            case 6: return [3 /*break*/, 8];
            case 7:
                e_6 = _c.sent();
                res.json({ "error": "error" + e_6 });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
app.post("/relatorio-03-pagamentos", verifyJWT, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pagamentos_pix, pagamentosPix, _i, pagamentos_pix_3, pagamento, valor, pagamentos_credito, pagamentosCredito, _a, pagamentos_credito_1, pagamento, valorCredito, pagamentos_debito, pagamentosDebito, _b, pagamentos_debito_3, pagamento, valorDebito, e_7;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                console.log("************** pagamentos");
                console.log(req.body);
                if (req.body.maquinaId == null) {
                    return [2 /*return*/, res.status(500).json({ error: "necess\u00E1rio informar maquinaId" })];
                }
                return [4 /*yield*/, prisma.pix_Pagamento.findMany({
                        where: {
                            maquinaId: req.body.maquinaId,
                            tipo: "bank_transfer",
                            estornado: false,
                            data: {
                                gte: new Date(req.body.dataInicio),
                                lte: new Date(req.body.dataFim),
                            }
                        }
                    })];
            case 1:
                pagamentos_pix = _c.sent();
                pagamentosPix = 0;
                for (_i = 0, pagamentos_pix_3 = pagamentos_pix; _i < pagamentos_pix_3.length; _i++) {
                    pagamento = pagamentos_pix_3[_i];
                    valor = pagamento.valor !== null ? pagamento.valor : "0";
                    pagamentosPix += parseFloat(valor) || 0;
                }
                return [4 /*yield*/, prisma.pix_Pagamento.findMany({
                        where: {
                            maquinaId: req.body.maquinaId,
                            tipo: "credit_card",
                            estornado: false,
                            data: {
                                gte: new Date(req.body.dataInicio),
                                lte: new Date(req.body.dataFim),
                            }
                        }
                    })];
            case 2:
                pagamentos_credito = _c.sent();
                pagamentosCredito = 0;
                for (_a = 0, pagamentos_credito_1 = pagamentos_credito; _a < pagamentos_credito_1.length; _a++) {
                    pagamento = pagamentos_credito_1[_a];
                    valorCredito = pagamento.valor !== null ? pagamento.valor : "0";
                    pagamentosCredito += parseFloat(valorCredito) || 0;
                }
                return [4 /*yield*/, prisma.pix_Pagamento.findMany({
                        where: {
                            maquinaId: req.body.maquinaId,
                            tipo: "debit_card",
                            estornado: false,
                            data: {
                                gte: new Date(req.body.dataInicio),
                                lte: new Date(req.body.dataFim),
                            }
                        }
                    })];
            case 3:
                pagamentos_debito = _c.sent();
                pagamentosDebito = 0;
                for (_b = 0, pagamentos_debito_3 = pagamentos_debito; _b < pagamentos_debito_3.length; _b++) {
                    pagamento = pagamentos_debito_3[_b];
                    valorDebito = pagamento.valor !== null ? pagamento.valor : "0";
                    pagamentosDebito += parseFloat(valorDebito) || 0;
                }
                return [2 /*return*/, res.status(200).json({ pix: pagamentosPix, especie: -1, credito: pagamentosCredito, debito: pagamentosDebito })];
            case 4:
                e_7 = _c.sent();
                res.json({ "error": "error" + e_7 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.post("/relatorio-03-pagamentos-adm", verifyJwtPessoa, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pagamentos_pix, pagamentosPix, _i, pagamentos_pix_4, pagamento, valor, pagamentos_credito, pagamentosCredito, _a, pagamentos_credito_2, pagamento, valorCredito, pagamentos_debito, pagamentosDebito, _b, pagamentos_debito_4, pagamento, valorDebito, e_8;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                console.log("************** pagamentos");
                console.log(req.body);
                if (req.body.maquinaId == null) {
                    return [2 /*return*/, res.status(500).json({ error: "necess\u00E1rio informar maquinaId" })];
                }
                return [4 /*yield*/, prisma.pix_Pagamento.findMany({
                        where: {
                            maquinaId: req.body.maquinaId,
                            tipo: "bank_transfer",
                            estornado: false,
                            data: {
                                gte: new Date(req.body.dataInicio),
                                lte: new Date(req.body.dataFim),
                            }
                        }
                    })];
            case 1:
                pagamentos_pix = _c.sent();
                pagamentosPix = 0;
                for (_i = 0, pagamentos_pix_4 = pagamentos_pix; _i < pagamentos_pix_4.length; _i++) {
                    pagamento = pagamentos_pix_4[_i];
                    valor = pagamento.valor !== null ? pagamento.valor : "0";
                    pagamentosPix += parseFloat(valor) || 0;
                }
                return [4 /*yield*/, prisma.pix_Pagamento.findMany({
                        where: {
                            maquinaId: req.body.maquinaId,
                            tipo: "credit_card",
                            estornado: false,
                            data: {
                                gte: new Date(req.body.dataInicio),
                                lte: new Date(req.body.dataFim),
                            }
                        }
                    })];
            case 2:
                pagamentos_credito = _c.sent();
                pagamentosCredito = 0;
                for (_a = 0, pagamentos_credito_2 = pagamentos_credito; _a < pagamentos_credito_2.length; _a++) {
                    pagamento = pagamentos_credito_2[_a];
                    valorCredito = pagamento.valor !== null ? pagamento.valor : "0";
                    pagamentosCredito += parseFloat(valorCredito) || 0;
                }
                return [4 /*yield*/, prisma.pix_Pagamento.findMany({
                        where: {
                            maquinaId: req.body.maquinaId,
                            tipo: "debit_card",
                            estornado: false,
                            data: {
                                gte: new Date(req.body.dataInicio),
                                lte: new Date(req.body.dataFim),
                            }
                        }
                    })];
            case 3:
                pagamentos_debito = _c.sent();
                pagamentosDebito = 0;
                for (_b = 0, pagamentos_debito_4 = pagamentos_debito; _b < pagamentos_debito_4.length; _b++) {
                    pagamento = pagamentos_debito_4[_b];
                    valorDebito = pagamento.valor !== null ? pagamento.valor : "0";
                    pagamentosDebito += parseFloat(valorDebito) || 0;
                }
                return [2 /*return*/, res.status(200).json({ pix: pagamentosPix, especie: -1, credito: pagamentosCredito, debito: pagamentosDebito })];
            case 4:
                e_8 = _c.sent();
                res.json({ "error": "error" + e_8 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.post("/relatorio-04-estornos", verifyJWT, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pagamentos, somatorioValores, e_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("************** estornos");
                console.log(req.body);
                if (req.body.maquinaId == null) {
                    return [2 /*return*/, res.status(500).json({ error: "necess\u00E1rio informar maquinaId" })];
                }
                return [4 /*yield*/, prisma.pix_Pagamento.findMany({
                        where: {
                            maquinaId: req.body.maquinaId,
                            estornado: true,
                            data: {
                                gte: new Date(req.body.dataInicio),
                                lte: new Date(req.body.dataFim),
                            },
                        },
                        select: {
                            valor: true,
                        },
                    })];
            case 1:
                pagamentos = _a.sent();
                somatorioValores = pagamentos.reduce(function (acc, curr) {
                    return acc + parseFloat(curr.valor);
                }, 0);
                return [2 /*return*/, res.status(200).json({ valor: somatorioValores })];
            case 2:
                e_9 = _a.sent();
                res.json({ "error": "error" + e_9 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post("/relatorio-04-estornos-adm", verifyJwtPessoa, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pagamentos, somatorioValores, e_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("************** estornos");
                console.log(req.body);
                if (req.body.maquinaId == null) {
                    return [2 /*return*/, res.status(500).json({ error: "necess\u00E1rio informar maquinaId" })];
                }
                return [4 /*yield*/, prisma.pix_Pagamento.findMany({
                        where: {
                            maquinaId: req.body.maquinaId,
                            estornado: true,
                            data: {
                                gte: new Date(req.body.dataInicio),
                                lte: new Date(req.body.dataFim),
                            },
                        },
                        select: {
                            valor: true,
                        },
                    })];
            case 1:
                pagamentos = _a.sent();
                somatorioValores = pagamentos.reduce(function (acc, curr) {
                    return acc + parseFloat(curr.valor);
                }, 0);
                return [2 /*return*/, res.status(200).json({ valor: somatorioValores })];
            case 2:
                e_10 = _a.sent();
                res.json({ "error": "error" + e_10 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
var util = require('util');
// Transformar parseString em uma Promise
var parseStringPromise = util.promisify(xml2js.parseString);
var estornarOperacaoPagSeguroCount = 0;
function estornarOperacaoPagSeguro(email, token, idOperacao) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, error_16;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://ws.pagseguro.uol.com.br/v2/transactions/refunds";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios.post('https://ws.pagseguro.uol.com.br/v2/transactions/refunds', null, {
                            params: {
                                email: email,
                                token: token,
                                transactionCode: idOperacao // Usando o transactionCode diretamente como parâmetro
                            },
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        })];
                case 2:
                    response = _a.sent();
                    if (response.status === 200) {
                        console.log('Tentativa: ', estornarOperacaoPagSeguroCount);
                        console.log('Estorno realizado com sucesso:', response.data);
                        estornarOperacaoPagSeguroCount = 1;
                        return [2 /*return*/, response.data];
                    }
                    else {
                        console.log('Tentativa: ', estornarOperacaoPagSeguroCount);
                        console.error('Falha ao realizar o estorno:', response.data);
                        estornarOperacaoPagSeguroCount++;
                        if (estornarOperacaoPagSeguroCount <= 20) {
                            estornarOperacaoPagSeguro(email, token, idOperacao);
                        }
                        else {
                            console.log("Após 20 tentativas não conseguimos efetuar o estorno!");
                            estornarOperacaoPagSeguroCount = 1;
                        }
                        return [2 /*return*/, response.data];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_16 = _a.sent();
                    console.error('Erro ao tentar estornar operação:', error_16.response ? error_16.response.data : error_16.message);
                    estornarOperacaoPagSeguroCount++;
                    if (estornarOperacaoPagSeguroCount <= 20) {
                        estornarOperacaoPagSeguro(email, token, idOperacao);
                    }
                    else {
                        console.log("Após 20 tentativas não conseguimos efetuar o estorno!");
                        estornarOperacaoPagSeguroCount = 1;
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
app.post('/webhookpagbank/:idCliente', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var PAGSEGURO_API_URL, notificationCode, notificationType, serialNumber, cliente, tokenCliente, emailCliente, url, response, result, transaction, creditorFees, paymentMethod, deviceInfo, maquina, dataVencimento, dataAtual, diferencaEmMilissegundos, diferencaEmDias, registroExistente, novoPagamento_6, registroExistente, novoPagamento_7, diferencaEmSegundos, registroExistente, novoPagamento_8, valorMinimo, valorAtual, registroExistente, novoPagamento_9, novoPagamento, error_17;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 26, , 27]);
                PAGSEGURO_API_URL = 'https://ws.pagseguro.uol.com.br/v3/transactions/notifications';
                notificationCode = req.body.notificationCode;
                notificationType = req.body.notificationType;
                console.log('Notification Code:', notificationCode);
                console.log('Notification Type:', notificationType);
                serialNumber = '';
                return [4 /*yield*/, prisma.pix_Cliente.findUnique({
                        where: {
                            id: req.params.idCliente,
                        },
                    })];
            case 1:
                cliente = _a.sent();
                tokenCliente = (cliente === null || cliente === void 0 ? void 0 : cliente.pagbankToken) || '';
                emailCliente = (cliente === null || cliente === void 0 ? void 0 : cliente.pagbankEmail) || '';
                if (tokenCliente) {
                    console.log("Token obtido.");
                }
                if (emailCliente) {
                    console.log("Email obtido.");
                }
                console.log("Cliente ativo:", cliente === null || cliente === void 0 ? void 0 : cliente.ativo);
                url = "".concat(PAGSEGURO_API_URL, "/").concat(notificationCode, "?email=").concat(emailCliente, "&token=").concat(tokenCliente);
                return [4 /*yield*/, axios.get(url)];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, parseStringPromise(response.data)];
            case 3:
                result = _a.sent();
                transaction = result.transaction;
                creditorFees = transaction.creditorFees[0];
                paymentMethod = transaction.paymentMethod[0];
                console.log('Método de Pagamento - Tipo:', paymentMethod.type[0]);
                console.log('Dados da Transação:', transaction);
                if (!(transaction.deviceInfo && transaction.deviceInfo.length > 0)) return [3 /*break*/, 24];
                deviceInfo = transaction.deviceInfo[0];
                console.log('Device Info encontrado:');
                serialNumber = deviceInfo.serialNumber ? deviceInfo.serialNumber[0] : 'Não disponível';
                console.log('Serial Number:', serialNumber);
                console.log('Referência:', deviceInfo.reference ? deviceInfo.reference[0] : 'Não disponível');
                console.log('Bin:', deviceInfo.bin ? deviceInfo.bin[0] : 'Não disponível');
                console.log('Holder:', deviceInfo.holder ? deviceInfo.holder[0] : 'Não disponível');
                return [4 /*yield*/, prisma.pix_Maquina.findFirst({
                        where: {
                            maquininha_serial: serialNumber,
                            clienteId: req.params.idCliente,
                        },
                        include: {
                            cliente: true,
                        },
                    })];
            case 4:
                maquina = _a.sent();
                console.log("Máquina:", maquina);
                if (!(maquina && maquina.maquininha_serial)) return [3 /*break*/, 22];
                console.log("Processando pagamento na m\u00E1quina: ".concat(maquina.nome, " - id: ").concat(maquina.id));
                // Validações antes de processar o pagamento
                console.log("Recebendo pagamento na m\u00E1quina: ".concat(maquina.nome, " - store_id: ").concat(maquina.store_id));
                if (!cliente) return [3 /*break*/, 13];
                if (!cliente.ativo) return [3 /*break*/, 10];
                console.log("Cliente ativo - seguindo...");
                if (!cliente.dataVencimento) return [3 /*break*/, 8];
                dataVencimento = cliente.dataVencimento;
                dataAtual = new Date();
                diferencaEmMilissegundos = dataAtual.getTime() - dataVencimento.getTime();
                diferencaEmDias = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
                console.log(diferencaEmDias);
                if (!(diferencaEmDias > 10)) return [3 /*break*/, 7];
                console.log("Cliente MENSALIDADE atrasada - estornando...");
                return [4 /*yield*/, prisma.pix_Pagamento.findFirst({
                        where: {
                            mercadoPagoId: transaction.code[0].toString(),
                            estornado: true,
                            clienteId: req.params.idCliente,
                        },
                    })];
            case 5:
                registroExistente = _a.sent();
                if (registroExistente) {
                    console.log("Esse estorno já foi feito...");
                    return [2 /*return*/, res.status(200).json({ retorno: "Erro: cliente atrasado - mais de 10 dias sem pagamento!" })];
                }
                console.log("3561");
                estornarOperacaoPagSeguro(emailCliente, tokenCliente, transaction.code[0].toString());
                return [4 /*yield*/, prisma.pix_Pagamento.create({
                        data: {
                            maquinaId: maquina.id,
                            valor: transaction.grossAmount[0].toString(),
                            mercadoPagoId: transaction.code[0].toString(),
                            motivoEstorno: '01 - Mensalidade com atraso.',
                            estornado: true,
                            operadora: "Pagbank",
                            clienteId: req.params.idCliente,
                        },
                    })];
            case 6:
                novoPagamento_6 = _a.sent();
                return [2 /*return*/, res.status(200).json({ retorno: "Erro: cliente atrasado - mais de 10 dias sem pagamento!" })];
            case 7: return [3 /*break*/, 9];
            case 8:
                console.log("Pulando etapa de verificar inadimplência... campo dataVencimento não cadastrado ou nulo!");
                _a.label = 9;
            case 9: return [3 /*break*/, 13];
            case 10:
                console.log("Cliente inativo - estornando...");
                return [4 /*yield*/, prisma.pix_Pagamento.findFirst({
                        where: {
                            mercadoPagoId: transaction.code[0].toString(),
                            estornado: true,
                            clienteId: req.params.idCliente,
                        },
                    })];
            case 11:
                registroExistente = _a.sent();
                if (registroExistente) {
                    console.log("Esse estorno já foi feito...");
                    return [2 /*return*/, res.status(200).json({ retorno: "Erro: cliente inativo!" })];
                }
                console.log("3598");
                estornarOperacaoPagSeguro(emailCliente, tokenCliente, transaction.code[0].toString());
                return [4 /*yield*/, prisma.pix_Pagamento.create({
                        data: {
                            maquinaId: maquina.id,
                            valor: transaction.grossAmount[0].toString(),
                            mercadoPagoId: transaction.code[0].toString(),
                            motivoEstorno: '02 - Cliente inativo.',
                            estornado: true,
                            operadora: "Pagbank",
                            clienteId: req.params.idCliente,
                        },
                    })];
            case 12:
                novoPagamento_7 = _a.sent();
                return [2 /*return*/, res.status(200).json({ retorno: "Erro: cliente inativo - pagamento estornado!" })];
            case 13:
                if (!(maquina.ultimaRequisicao instanceof Date)) return [3 /*break*/, 16];
                diferencaEmSegundos = tempoOffline(maquina.ultimaRequisicao);
                if (!(diferencaEmSegundos > 60)) return [3 /*break*/, 16];
                console.log("Estornando... máquina offline.");
                return [4 /*yield*/, prisma.pix_Pagamento.findFirst({
                        where: {
                            mercadoPagoId: transaction.code[0].toString(),
                            estornado: true,
                            clienteId: req.params.idCliente,
                        },
                    })];
            case 14:
                registroExistente = _a.sent();
                if (registroExistente) {
                    console.log("Esse estorno já foi feito...");
                    return [2 /*return*/, res.status(200).json({ retorno: "Erro: Esse estorno já foi feito..." })];
                }
                console.log("3637");
                estornarOperacaoPagSeguro(emailCliente, tokenCliente, transaction.code[0].toString());
                return [4 /*yield*/, prisma.pix_Pagamento.create({
                        data: {
                            maquinaId: maquina.id,
                            valor: transaction.grossAmount[0].toString(),
                            mercadoPagoId: transaction.code[0].toString(),
                            motivoEstorno: '03 - Máquina offline.',
                            clienteId: req.params.idCliente,
                            estornado: true,
                        },
                    })];
            case 15:
                novoPagamento_8 = _a.sent();
                return [2 /*return*/, res.status(200).json({ retorno: "Pagamento estornado - Máquina offline" })];
            case 16:
                valorMinimo = parseFloat(maquina.valorDoPulso);
                valorAtual = parseFloat(transaction.netAmount[0].toString());
                console.log("Valor atual: " + valorAtual);
                if (!(valorAtual < valorMinimo)) return [3 /*break*/, 19];
                console.log("Iniciando estorno...");
                return [4 /*yield*/, prisma.pix_Pagamento.findFirst({
                        where: {
                            mercadoPagoId: transaction.code[0].toString(),
                            estornado: true,
                            clienteId: req.params.idCliente,
                        },
                    })];
            case 17:
                registroExistente = _a.sent();
                if (registroExistente) {
                    console.log("Esse estorno já foi feito...");
                    return [2 /*return*/, res.status(200).json({ retorno: "Erro: Esse estorno já foi feito..." })];
                }
                console.log("3578");
                estornarOperacaoPagSeguro(emailCliente, tokenCliente, transaction.code[0].toString());
                return [4 /*yield*/, prisma.pix_Pagamento.create({
                        data: {
                            maquinaId: maquina.id,
                            valor: transaction.grossAmount[0].toString(),
                            mercadoPagoId: transaction.code[0].toString(),
                            motivoEstorno: '05 - Valor inferior ao mínimo.',
                            estornado: true,
                            operadora: "Pagbank",
                            clienteId: req.params.idCliente,
                        },
                    })];
            case 18:
                novoPagamento_9 = _a.sent();
                return [2 /*return*/, res.status(200).json({ retorno: "Pagamento estornado - Inferior ao valor m\u00EDnimo de R$: ".concat(valorMinimo, " para essa m\u00E1quina.") })];
            case 19: 
            // ATUALIZAR OS DADOS DA MÁQUINA
            return [4 /*yield*/, prisma.pix_Maquina.update({
                    where: {
                        id: maquina.id,
                    },
                    data: {
                        valorDoPix: transaction.grossAmount[0].toString(),
                        ultimoPagamentoRecebido: new Date(Date.now()),
                    },
                })];
            case 20:
                // ATUALIZAR OS DADOS DA MÁQUINA
                _a.sent();
                return [4 /*yield*/, prisma.pix_Pagamento.create({
                        data: {
                            maquinaId: maquina.id,
                            valor: transaction.grossAmount[0].toString(),
                            mercadoPagoId: transaction.code[0].toString(),
                            motivoEstorno: '',
                            tipo: paymentMethod.type[0].toString(),
                            taxas: (parseFloat(transaction.grossAmount[0].toString()) -
                                parseFloat(transaction.netAmount[0].toString())).toString(),
                            clienteId: req.params.idCliente,
                            estornado: false,
                            operadora: 'Pagbank',
                        },
                    })];
            case 21:
                novoPagamento = _a.sent();
                if (NOTIFICACOES_PAGAMENTOS) {
                    notificarDiscord(NOTIFICACOES_PAGAMENTOS, "Novo pagamento recebido no Pagbank. R$: ".concat(transaction.grossAmount[0].toString()), "Cliente ".concat(cliente === null || cliente === void 0 ? void 0 : cliente.nome, " Maquina: ").concat(maquina === null || maquina === void 0 ? void 0 : maquina.nome, ". Maquina: ").concat(maquina === null || maquina === void 0 ? void 0 : maquina.descricao));
                }
                console.log('Pagamento inserido com sucesso:', novoPagamento);
                return [3 /*break*/, 23];
            case 22:
                console.log("Nova maquininha detectada n\u00E3o cadastrada. Serial: ".concat(serialNumber, " - cliente: ").concat(cliente === null || cliente === void 0 ? void 0 : cliente.nome));
                if (NOTIFICACOES_GERAL) {
                    notificarDiscord(NOTIFICACOES_GERAL, "Pagamento recebido em maquininha n\u00E3o cadastrada.", "Cliente ".concat(cliente === null || cliente === void 0 ? void 0 : cliente.nome, " Serial: ").concat(serialNumber, ". Maquina: ").concat(maquina === null || maquina === void 0 ? void 0 : maquina.nome, "\nMaquina: ").concat(maquina === null || maquina === void 0 ? void 0 : maquina.descricao));
                }
                _a.label = 23;
            case 23: return [3 /*break*/, 25];
            case 24:
                console.log('Device Info não encontrado.');
                _a.label = 25;
            case 25:
                // Retorna os dados da transação em JSON
                res.status(200).json(result);
                return [3 /*break*/, 27];
            case 26:
                error_17 = _a.sent();
                console.error('Erro ao processar a requisição:', error_17.message);
                res.status(500).send('Erro ao processar a requisição');
                return [3 /*break*/, 27];
            case 27: return [2 /*return*/];
        }
    });
}); });
// implementações da v5
// Rota para inserir valores vindo via JSON
app.post('/inserir-maquininha', verifyJwtPessoa, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, codigo, operacao, urlServidor, webhook01, webhook02, rotaConsultaStatusMaq, rotaConsultaAdimplencia, idMaquina, idCliente, valor1, valor2, valor3, valor4, textoEmpresa, corPrincipal, corSecundaria, minValue, maxValue, identificadorMaquininha, serialMaquininha, macaddressMaquininha, operadora, novaMaquina, error_18;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, codigo = _a.codigo, operacao = _a.operacao, urlServidor = _a.urlServidor, webhook01 = _a.webhook01, webhook02 = _a.webhook02, rotaConsultaStatusMaq = _a.rotaConsultaStatusMaq, rotaConsultaAdimplencia = _a.rotaConsultaAdimplencia, idMaquina = _a.idMaquina, idCliente = _a.idCliente, valor1 = _a.valor1, valor2 = _a.valor2, valor3 = _a.valor3, valor4 = _a.valor4, textoEmpresa = _a.textoEmpresa, corPrincipal = _a.corPrincipal, corSecundaria = _a.corSecundaria, minValue = _a.minValue, maxValue = _a.maxValue, identificadorMaquininha = _a.identificadorMaquininha, serialMaquininha = _a.serialMaquininha, macaddressMaquininha = _a.macaddressMaquininha, operadora = _a.operadora;
                return [4 /*yield*/, prisma.configuracaoMaquina.create({
                        data: {
                            codigo: codigo,
                            operacao: operacao,
                            urlServidor: urlServidor,
                            webhook01: webhook01,
                            webhook02: webhook02,
                            rotaConsultaStatusMaq: rotaConsultaStatusMaq,
                            rotaConsultaAdimplencia: rotaConsultaAdimplencia,
                            idMaquina: idMaquina,
                            idCliente: idCliente,
                            valor1: valor1,
                            valor2: valor2,
                            valor3: valor3,
                            valor4: valor4,
                            textoEmpresa: textoEmpresa,
                            corPrincipal: corPrincipal,
                            corSecundaria: corSecundaria,
                            minValue: minValue,
                            maxValue: maxValue,
                            identificadorMaquininha: identificadorMaquininha,
                            serialMaquininha: serialMaquininha,
                            macaddressMaquininha: macaddressMaquininha,
                            operadora: operadora
                        },
                    })];
            case 1:
                novaMaquina = _b.sent();
                res.json({ mensagem: 'Maquina inserida com sucesso', novaMaquina: novaMaquina });
                return [3 /*break*/, 3];
            case 2:
                error_18 = _b.sent();
                console.error(error_18);
                res.status(500).json({ error: 'Erro ao inserir a máquina' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/buscar-maquininha/:codigo', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var codigo, maquina, error_19;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                codigo = req.params.codigo;
                return [4 /*yield*/, prisma.configuracaoMaquina.findUnique({
                        where: {
                            codigo: codigo,
                        },
                    })];
            case 1:
                maquina = _a.sent();
                if (!maquina) {
                    return [2 /*return*/, res.status(404).json({ mensagem: 'Maquina não encontrada' })];
                }
                res.json({ maquina: maquina });
                return [3 /*break*/, 3];
            case 2:
                error_19 = _a.sent();
                console.error(error_19);
                res.status(500).json({ error: 'Erro ao buscar a máquina' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Rota para atualizar informações de uma máquina pelo código
app.put('/alterar-maquininha/:codigo', verifyJwtPessoa, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var codigo, _a, operacao, urlServidor, webhook01, webhook02, rotaConsultaStatusMaq, rotaConsultaAdimplencia, idMaquina, idCliente, valor1, valor2, valor3, valor4, textoEmpresa, corPrincipal, corSecundaria, minValue, maxValue, identificadorMaquininha, serialMaquininha, macaddressMaquininha, operadora, maquinaExistente, maquinaAtualizada, error_20;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                codigo = req.params.codigo;
                _a = req.body, operacao = _a.operacao, urlServidor = _a.urlServidor, webhook01 = _a.webhook01, webhook02 = _a.webhook02, rotaConsultaStatusMaq = _a.rotaConsultaStatusMaq, rotaConsultaAdimplencia = _a.rotaConsultaAdimplencia, idMaquina = _a.idMaquina, idCliente = _a.idCliente, valor1 = _a.valor1, valor2 = _a.valor2, valor3 = _a.valor3, valor4 = _a.valor4, textoEmpresa = _a.textoEmpresa, corPrincipal = _a.corPrincipal, corSecundaria = _a.corSecundaria, minValue = _a.minValue, maxValue = _a.maxValue, identificadorMaquininha = _a.identificadorMaquininha, serialMaquininha = _a.serialMaquininha, macaddressMaquininha = _a.macaddressMaquininha, operadora = _a.operadora;
                return [4 /*yield*/, prisma.configuracaoMaquina.findUnique({
                        where: { codigo: codigo },
                    })];
            case 1:
                maquinaExistente = _b.sent();
                if (!maquinaExistente) {
                    return [2 /*return*/, res.status(404).json({ mensagem: 'Maquina não encontrada' })];
                }
                return [4 /*yield*/, prisma.configuracaoMaquina.update({
                        where: { codigo: codigo },
                        data: {
                            operacao: operacao,
                            urlServidor: urlServidor,
                            webhook01: webhook01,
                            webhook02: webhook02,
                            rotaConsultaStatusMaq: rotaConsultaStatusMaq,
                            rotaConsultaAdimplencia: rotaConsultaAdimplencia,
                            idMaquina: idMaquina,
                            idCliente: idCliente,
                            valor1: valor1,
                            valor2: valor2,
                            valor3: valor3,
                            valor4: valor4,
                            textoEmpresa: textoEmpresa,
                            corPrincipal: corPrincipal,
                            corSecundaria: corSecundaria,
                            minValue: minValue,
                            maxValue: maxValue,
                            identificadorMaquininha: identificadorMaquininha,
                            serialMaquininha: serialMaquininha,
                            macaddressMaquininha: macaddressMaquininha,
                            operadora: operadora
                        },
                    })];
            case 2:
                maquinaAtualizada = _b.sent();
                res.json({ mensagem: 'Maquina atualizada com sucesso', maquinaAtualizada: maquinaAtualizada });
                return [3 /*break*/, 4];
            case 3:
                error_20 = _b.sent();
                console.error(error_20);
                res.status(500).json({ error: 'Erro ao atualizar a máquina' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.delete('/deletar-maquininha/:codigo', verifyJwtPessoa, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var codigo, maquinaExistente, error_21;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                codigo = req.params.codigo;
                return [4 /*yield*/, prisma.configuracaoMaquina.findUnique({
                        where: { codigo: codigo },
                    })];
            case 1:
                maquinaExistente = _a.sent();
                if (!maquinaExistente) {
                    return [2 /*return*/, res.status(404).json({ mensagem: 'Maquina não encontrada' })];
                }
                // Exclui a máquina
                return [4 /*yield*/, prisma.configuracaoMaquina.delete({
                        where: { codigo: codigo },
                    })];
            case 2:
                // Exclui a máquina
                _a.sent();
                res.json({ mensagem: 'Maquina excluída com sucesso' });
                return [3 /*break*/, 4];
            case 3:
                error_21 = _a.sent();
                console.error(error_21);
                res.status(500).json({ error: 'Erro ao excluir a máquina' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Rota GET para verificar se a máquina está online ou offline
app.get('/is-online/:idMaquina', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idMaquina, maquina, status_1, error_22;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                idMaquina = req.params.idMaquina;
                return [4 /*yield*/, prisma.pix_Maquina.findUnique({
                        where: {
                            id: idMaquina,
                        },
                        include: {
                            cliente: true,
                        },
                    })];
            case 1:
                maquina = _a.sent();
                // Verificando se a máquina foi encontrada
                if (!maquina) {
                    return [2 /*return*/, res.status(404).json({ msg: 'Máquina não encontrada!' })];
                }
                // Verifica o status da máquina com base na última requisição
                if (maquina.ultimaRequisicao) {
                    status_1 = tempoOffline(new Date(maquina.ultimaRequisicao)) > 60 ? "OFFLINE" : "ONLINE";
                    console.log("Status da m\u00E1quina: ".concat(status_1));
                    return [2 /*return*/, res.status(200).json({ idMaquina: idMaquina, status: status_1 })];
                }
                else {
                    console.log("Máquina sem registro de última requisição");
                    return [2 /*return*/, res.status(400).json({ msg: "MÁQUINA OFFLINE! Sem registro de última requisição." })];
                }
                return [3 /*break*/, 3];
            case 2:
                error_22 = _a.sent();
                console.error(error_22);
                return [2 /*return*/, res.status(500).json({ error: 'Erro ao verificar o status da máquina.' })];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Função para calcular a diferença em dias
function calcularDiferencaEmDias(dataVencimento) {
    var hoje = new Date();
    var diferencaEmMilissegundos = hoje.getTime() - new Date(dataVencimento).getTime();
    var diferencaEmDias = diferencaEmMilissegundos / (1000 * 60 * 60 * 24);
    return Math.floor(diferencaEmDias);
}
// Rota GET para verificar se o cliente está com mensalidade atrasada
app.get('/is-client-ok/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, cliente, diferencaEmDias, error_23;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, prisma.pix_Cliente.findUnique({
                        where: { id: id },
                    })];
            case 1:
                cliente = _a.sent();
                if (!cliente) {
                    return [2 /*return*/, res.status(404).json({ status: null })];
                }
                // Verifica se o cliente está ativo
                if (!cliente.ativo) {
                    return [2 /*return*/, res.status(400).json({ status: null })];
                }
                // Verifica se a data de vencimento está definida e calcula a diferença em dias
                if (cliente.dataVencimento) {
                    diferencaEmDias = calcularDiferencaEmDias(cliente.dataVencimento);
                    if (diferencaEmDias > 10) {
                        return [2 /*return*/, res.json({ status: false })];
                    }
                    else {
                        return [2 /*return*/, res.json({ status: true })];
                    }
                }
                else {
                    return [2 /*return*/, res.status(400).json({ status: null })];
                }
                return [3 /*break*/, 3];
            case 2:
                error_23 = _a.sent();
                console.error(error_23);
                return [2 /*return*/, res.status(500).json({ status: null })];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Rota POST para gerar um pagamento PIX via Mercado Pago
app.post('/mp-qrcode-generator/:id/:maquina', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var valor, cliente, tokenCliente, mercadoPagoUrl, headers, externalReference, pagamentoPix, response, paymentData, qrCode, qrCodeBase64, error_24;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                valor = req.query.valor;
                // Garantir que o valor seja uma string
                if (typeof valor !== 'string') {
                    return [2 /*return*/, res.status(400).json({ status: "Valor não informado ou inválido!" })];
                }
                return [4 /*yield*/, prisma.pix_Cliente.findUnique({
                        where: {
                            id: req.params.id,
                        }
                    })];
            case 1:
                cliente = _a.sent();
                // Verifica se o cliente foi encontrado
                if (!cliente) {
                    return [2 /*return*/, res.status(404).json({ status: "Cliente não encontrado!" })];
                }
                tokenCliente = cliente.mercadoPagoToken ? cliente.mercadoPagoToken : "";
                if (!tokenCliente) {
                    return [2 /*return*/, res.status(403).json({ status: "Cliente sem token!" })];
                }
                console.log("Token recuperado");
                mercadoPagoUrl = "https://api.mercadopago.com/v1/payments";
                headers = {
                    'Authorization': "Bearer ".concat(tokenCliente),
                    'Content-Type': 'application/json'
                };
                externalReference = req.params.maquina;
                pagamentoPix = {
                    transaction_amount: parseFloat(valor),
                    description: "Pagamento via PIX",
                    payment_method_id: "pix",
                    payer: { email: "email@gmail.com" },
                    external_reference: externalReference // Identificador único para rastrear o pagamento
                };
                return [4 /*yield*/, axios.post(mercadoPagoUrl, pagamentoPix, { headers: headers })];
            case 2:
                response = _a.sent();
                paymentData = response.data;
                qrCode = paymentData.point_of_interaction.transaction_data.qr_code;
                qrCodeBase64 = paymentData.point_of_interaction.transaction_data.qr_code_base64;
                // Enviar os dados da transação para o cliente
                return [2 /*return*/, res.status(200).json({
                        status: "Pagamento PIX criado com sucesso",
                        payment_data: paymentData,
                        qr_code: qrCode,
                        qr_code_base64: qrCodeBase64,
                        external_reference: externalReference // Retornando o identificador
                    })];
            case 3:
                error_24 = _a.sent();
                console.error("Erro ao processar a requisição: ", error_24);
                return [2 /*return*/, res.status(500).json({ status: "Erro interno de servidor", error: error_24.message })];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Rota GET para verificar o status de pagamento
app.get('/verificar-pagamento/:idCliente/:idPagamento', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cliente, tokenCliente, idPagamento, mercadoPagoUrl, headers, response, statusPagamento, valor, tipoPagamento, taxaDaOperacao, cliId, str_id, mensagem, _a, resource, topic, url, maquina, dataVencimento, dataAtual, diferencaEmMilissegundos, diferencaEmDias, registroExistente_6, novoPagamento_10, registroExistente_7, novoPagamento_11, diferencaEmSegundos, registroExistente_8, estornos, novoPagamento_12, registroExistente_9, novoPagamento_13, valorMinimo, registroExistente_10, novoPagamento_14, registroExistente, novoPagamento, error_25;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 34, , 35]);
                return [4 /*yield*/, prisma.pix_Cliente.findUnique({
                        where: {
                            id: req.params.idCliente,
                        }
                    })];
            case 1:
                cliente = _b.sent();
                // Verifica se o cliente foi encontrado
                if (!cliente) {
                    return [2 /*return*/, res.status(404).json({ status: "Cliente não encontrado!" })];
                }
                tokenCliente = cliente.mercadoPagoToken ? cliente.mercadoPagoToken : "";
                if (!tokenCliente) {
                    return [2 /*return*/, res.status(403).json({ status: "Cliente sem token!" })];
                }
                console.log("Token obtido.");
                idPagamento = req.params.idPagamento;
                mercadoPagoUrl = "https://api.mercadopago.com/v1/payments/".concat(idPagamento);
                headers = {
                    'Authorization': "Bearer ".concat(tokenCliente),
                    'Content-Type': 'application/json'
                };
                return [4 /*yield*/, axios.get(mercadoPagoUrl, { headers: headers })];
            case 2:
                response = _b.sent();
                statusPagamento = response.data.status;
                if (!(statusPagamento === 'approved')) return [3 /*break*/, 32];
                valor = 0.00;
                tipoPagamento = "";
                taxaDaOperacao = "";
                cliId = "";
                str_id = "";
                mensagem = "M\u00C1QUINA N\u00C3O ENCONTRADA";
                console.log("Novo pix do Mercado Pago:");
                console.log(req.body);
                console.log("id");
                console.log(req.query['data.id']);
                _a = req.body, resource = _a.resource, topic = _a.topic;
                // Exibe os valores capturados
                console.log('Resource:', resource);
                console.log('Topic:', topic);
                url = "https://api.mercadopago.com/v1/payments/" + req.query['data.id'];
                console.log(cliente === null || cliente === void 0 ? void 0 : cliente.ativo);
                console.log('storetransaction_amount_id', response.data.transaction_amount);
                console.log('payment_method_id', response.data.payment_type_id);
                valor = response.data.transaction_amount;
                tipoPagamento = response.data.payment_type_id;
                console.log('external_reference', response.data.external_reference);
                if (response.data.fee_details && Array.isArray(response.data.fee_details) && response.data.fee_details.length > 0) {
                    console.log('Amount:', response.data.fee_details[0].amount);
                    taxaDaOperacao = response.data.fee_details[0].amount + "";
                }
                return [4 /*yield*/, prisma.pix_Maquina.findFirst({
                        where: {
                            id: response.data.external_reference,
                        },
                        include: {
                            cliente: true,
                        },
                    })];
            case 3:
                maquina = _b.sent();
                if (!(maquina && maquina.descricao)) return [3 /*break*/, 30];
                console.log("recebendo pagamento na m\u00E1quina: ".concat(maquina.nome, " -  ").concat(maquina.descricao));
                if (!(cliente != null)) return [3 /*break*/, 14];
                if (!(cliente !== null && cliente !== undefined)) return [3 /*break*/, 13];
                if (!cliente.ativo) return [3 /*break*/, 9];
                console.log("Cliente ativo - seguindo...");
                if (!cliente.dataVencimento) return [3 /*break*/, 8];
                if (!(cliente.dataVencimento != null)) return [3 /*break*/, 7];
                console.log("verificando inadimplência...");
                dataVencimento = cliente.dataVencimento;
                dataAtual = new Date();
                diferencaEmMilissegundos = dataAtual.getTime() - dataVencimento.getTime();
                diferencaEmDias = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
                console.log(diferencaEmDias);
                if (!(diferencaEmDias > 10)) return [3 /*break*/, 6];
                console.log("Cliente MENSALIDADE atrasada - estornando...");
                return [4 /*yield*/, prisma.pix_Pagamento.findFirst({
                        where: {
                            mercadoPagoId: req.params.idPagamento,
                            estornado: true,
                            clienteId: req.params.idCliente
                        },
                    })];
            case 4:
                registroExistente_6 = _b.sent();
                if (registroExistente_6) {
                    console.log("Esse estorno ja foi feito...");
                    // return res.status(200).json({ "retorno": "error.. cliente ATRASADO - mais de 10 dias sem pagamento!" });
                    return [2 /*return*/, res.status(200).json({ pago: false })];
                }
                else {
                    console.log("Seguindo...");
                }
                //FIM EVITANDO ESTORNO DUPLICADO
                estornarMP(req.params.idPagamento, tokenCliente, "mensalidade com atraso");
                return [4 /*yield*/, prisma.pix_Pagamento.create({
                        data: {
                            maquinaId: maquina.id,
                            valor: valor.toString(),
                            mercadoPagoId: req.params.idPagamento,
                            motivoEstorno: "01- mensalidade com atraso. str_id: ".concat(str_id),
                            estornado: true,
                        },
                    })];
            case 5:
                novoPagamento_10 = _b.sent();
                // return res.status(200).json({ "retorno": "error.. cliente ATRASADO - mais de 10 dias sem pagamento!" });
                return [2 /*return*/, res.status(200).json({ pago: false })];
            case 6: return [3 /*break*/, 8];
            case 7:
                console.log("pulando etapa de verificar inadimplência... campo dataVencimento não cadastrado ou nulo!");
                _b.label = 8;
            case 8: return [3 /*break*/, 12];
            case 9:
                console.log("Cliente inativo - estornando...");
                return [4 /*yield*/, prisma.pix_Pagamento.findFirst({
                        where: {
                            mercadoPagoId: req.params.idPagamento,
                            estornado: true,
                            clienteId: req.params.idCliente
                        },
                    })];
            case 10:
                registroExistente_7 = _b.sent();
                if (registroExistente_7) {
                    console.log("Esse estorno ja foi feito...");
                    //  return res.status(200).json({ "retorno": "error.. cliente ATRASADO - mais de 10 dias sem pagamento!" });
                    return [2 /*return*/, res.status(200).json({ pago: false })];
                }
                else {
                    console.log("Seguindo...");
                }
                //FIM EVITANDO ESTORNO DUPLICADO
                estornarMP(req.params.idPagamento, tokenCliente, "cliente inativo");
                return [4 /*yield*/, prisma.pix_Pagamento.create({
                        data: {
                            maquinaId: maquina.id,
                            valor: valor.toString(),
                            mercadoPagoId: req.params.idPagamento,
                            motivoEstorno: "02- cliente inativo. str_id: ".concat(str_id),
                            estornado: true,
                        },
                    })];
            case 11:
                novoPagamento_11 = _b.sent();
                // return res.status(200).json({ "retorno": "error.. cliente INATIVO - pagamento estornado!" });
                return [2 /*return*/, res.status(200).json({ pago: false })];
            case 12: return [3 /*break*/, 14];
            case 13:
                console.log("error.. cliente nulo ou não encontrado!");
                // return res.status(200).json({ "retorno": "error.. cliente nulo ou não encontrado!" });
                return [2 /*return*/, res.status(200).json({ pago: false })];
            case 14:
                if (!(maquina.ultimaRequisicao instanceof Date)) return [3 /*break*/, 19];
                diferencaEmSegundos = tempoOffline(maquina.ultimaRequisicao);
                if (!(diferencaEmSegundos > 60)) return [3 /*break*/, 18];
                console.log("estornando... máquina offline.");
                return [4 /*yield*/, prisma.pix_Pagamento.findFirst({
                        where: {
                            mercadoPagoId: req.params.idPagamento,
                            estornado: true,
                        },
                    })];
            case 15:
                registroExistente_8 = _b.sent();
                if (registroExistente_8) {
                    console.log("Esse estorno ja foi feito...");
                    //return res.status(200).json({ "retorno": "error.. cliente ATRASADO - mais de 10 dias sem pagamento!" });
                    return [2 /*return*/, res.status(200).json({ pago: false })];
                }
                else {
                    console.log("Seguindo...");
                }
                //FIM EVITANDO ESTORNO DUPLICADO
                estornarMP(req.params.idPagamento, tokenCliente, "máquina offline");
                return [4 /*yield*/, prisma.pix_Pagamento.findMany({
                        where: {
                            mercadoPagoId: req.params.idPagamento,
                            estornado: true,
                            clienteId: req.params.idCliente
                        },
                    })];
            case 16:
                estornos = _b.sent();
                if (estornos) {
                    if (estornos.length > 0) {
                        // return res.status(200).json({ "retorno": "PAGAMENTO JÁ ESTORNADO! - MÁQUINA OFFLINE" });
                        return [2 /*return*/, res.status(200).json({ pago: false })];
                    }
                }
                return [4 /*yield*/, prisma.pix_Pagamento.create({
                        data: {
                            maquinaId: maquina.id,
                            valor: valor.toString(),
                            mercadoPagoId: req.params.idPagamento,
                            motivoEstorno: "03- m\u00E1quina offline. str_id: ".concat(str_id),
                            estornado: true,
                        },
                    })];
            case 17:
                novoPagamento_12 = _b.sent();
                // return res.status(200).json({ "retorno": "PAGAMENTO ESTORNADO - MÁQUINA OFFLINE" });
                return [2 /*return*/, res.status(200).json({ pago: false })];
            case 18: return [3 /*break*/, 22];
            case 19:
                console.log("estornando... máquina offline.");
                return [4 /*yield*/, prisma.pix_Pagamento.findFirst({
                        where: {
                            mercadoPagoId: req.params.idPagamento,
                            estornado: true,
                            clienteId: req.params.idCliente
                        },
                    })];
            case 20:
                registroExistente_9 = _b.sent();
                if (registroExistente_9) {
                    console.log("Esse estorno ja foi feito...");
                    // return res.status(200).json({ "retorno": "error.. cliente ATRASADO - mais de 10 dias sem pagamento!" });
                    return [2 /*return*/, res.status(200).json({ pago: false })];
                }
                else {
                    console.log("Seguindo...");
                }
                //FIM EVITANDO ESTORNO DUPLICADO
                estornarMP(req.params.idPagamento, tokenCliente, "máquina offline");
                return [4 /*yield*/, prisma.pix_Pagamento.create({
                        data: {
                            maquinaId: maquina.id,
                            valor: valor.toString(),
                            mercadoPagoId: req.params.idPagamento,
                            motivoEstorno: "04- m\u00E1quina offline. str_id: ".concat(str_id),
                            estornado: true,
                        },
                    })];
            case 21:
                novoPagamento_13 = _b.sent();
                // return res.status(200).json({ "retorno": "PAGAMENTO ESTORNADO - MÁQUINA OFFLINE" });
                return [2 /*return*/, res.status(200).json({ pago: false })];
            case 22:
                valorMinimo = parseFloat(maquina.valorDoPulso);
                if (!(valor < valorMinimo)) return [3 /*break*/, 25];
                console.log("iniciando estorno...");
                return [4 /*yield*/, prisma.pix_Pagamento.findFirst({
                        where: {
                            mercadoPagoId: req.params.idPagamento,
                            estornado: true,
                            clienteId: req.params.idCliente
                        },
                    })];
            case 23:
                registroExistente_10 = _b.sent();
                if (registroExistente_10) {
                    console.log("Esse estorno ja foi feito...");
                    // return res.status(200).json({ "retorno": "error.. cliente ATRASADO - mais de 10 dias sem pagamento!" });
                    return [2 /*return*/, res.status(200).json({ pago: false })];
                }
                else {
                    console.log("Seguindo...");
                }
                return [4 /*yield*/, prisma.pix_Pagamento.create({
                        data: {
                            maquinaId: maquina.id,
                            valor: valor.toString(),
                            mercadoPagoId: req.params.idPagamento,
                            motivoEstorno: "05- valor inferior ao m\u00EDnimo. str_id: ".concat(str_id),
                            estornado: true,
                        },
                    })];
            case 24:
                novoPagamento_14 = _b.sent();
                console.log("estornando valor inferior ao mínimo...");
                estornarMP(req.params.idPagamento, tokenCliente, "valor inferior ao mínimo");
                return [2 /*return*/, res.status(200).json({
                        "retorno": "PAGAMENTO ESTORNADO - INFERIOR AO VALOR\nM\u00CDNIMO DE R$: ".concat(valorMinimo, " PARA ESSA M\u00C1QUINA.")
                    })];
            case 25:
                console.log("valor permitido finalizando operação...");
                _b.label = 26;
            case 26:
                if (response.data.status != "approved") {
                    console.log("pagamento não aprovado!");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, prisma.pix_Pagamento.findFirst({
                        where: {
                            mercadoPagoId: req.params.idPagamento,
                            clienteId: req.params.idCliente
                        },
                    })];
            case 27:
                registroExistente = _b.sent();
                if (registroExistente) {
                    console.log("Esse pagamento ja foi feito...");
                    // return res.status(200).json({ "retorno": "error.. Duplicidade de pagamento!" });
                    return [2 /*return*/, res.status(200).json({ pago: true })];
                }
                else {
                    console.log("Seguindo...");
                }
                //VERIFICAR SE ESSE PAGAMENTO JÁ FOI EFETUADO
                //ATUALIZAR OS DADOS DA MÁQUINA QUE ESTAMOS RECEBENDO O PAGAMENTO
                return [4 /*yield*/, prisma.pix_Maquina.update({
                        where: {
                            id: maquina.id,
                        },
                        data: {
                            valorDoPix: valor.toString(),
                            ultimoPagamentoRecebido: new Date(Date.now())
                        }
                    })];
            case 28:
                //VERIFICAR SE ESSE PAGAMENTO JÁ FOI EFETUADO
                //ATUALIZAR OS DADOS DA MÁQUINA QUE ESTAMOS RECEBENDO O PAGAMENTO
                _b.sent();
                return [4 /*yield*/, prisma.pix_Pagamento.create({
                        data: {
                            maquinaId: maquina.id,
                            valor: valor.toString(),
                            mercadoPagoId: req.params.idPagamento,
                            motivoEstorno: "",
                            tipo: tipoPagamento,
                            taxas: taxaDaOperacao,
                            clienteId: req.params.idCliente,
                            estornado: false,
                            operadora: "Mercado Pago"
                        },
                    })];
            case 29:
                novoPagamento = _b.sent();
                if (NOTIFICACOES_PAGAMENTOS) {
                    notificarDiscord(NOTIFICACOES_PAGAMENTOS, "Novo pagamento recebido no Mercado Pago. Via APP. R$: ".concat(valor.toString()), "Cliente ".concat(cliente === null || cliente === void 0 ? void 0 : cliente.nome, " Maquina: ").concat(maquina === null || maquina === void 0 ? void 0 : maquina.nome, ". Maquina: ").concat(maquina === null || maquina === void 0 ? void 0 : maquina.descricao));
                }
                console.log('Pagamento inserido com sucesso:', novoPagamento);
                // return res.status(200).json(novoPagamento);
                return [2 /*return*/, res.status(200).json({ pago: true })];
            case 30:
                //PROCESSAMENTO DE EVENTOS QUE NÃO SAO PAYMENTS DE LOJAS E CAIXAS
                console.log("Máquina não encontrada");
                // return res.status(200).json({ "retorno": mensagem });
                return [2 /*return*/, res.status(404).json({ pago: false })];
            case 31: return [3 /*break*/, 33];
            case 32: return [2 /*return*/, res.status(200).json({ pago: false })];
            case 33: return [3 /*break*/, 35];
            case 34:
                error_25 = _b.sent();
                console.error("Erro ao verificar o pagamento: ", error_25);
                return [2 /*return*/, res.status(500).json({ status: "Erro ao verificar o pagamento", error: error_25.message })];
            case 35: return [2 /*return*/];
        }
    });
}); });
//código escrito por Lucas Carvalho
//git add .
//git commit -m "msg"
//git push
app.listen(PORT, function () { return console.log("localhost:".concat(PORT)); });
