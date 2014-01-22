var baidu = baidu || {};
baidu.frontia = {},
function(e) {
	baidu.frontia.version = "1.0.0", baidu.frontia.serviceHost = {
		PCS: "https://c.pcs.baidu.com",
		Frontia: "https://frontia.baidu.com",
		PBLog: "http://frontialog.smrapp.baidu.com",
		Social: "https://openapi.baidu.com"
	}, baidu.frontia.currentAccount = null, baidu.frontia.apiKey = null, baidu.frontia._CURRENT_USER_KEY = "currentUser", "undefined" != typeof localStorage && (baidu.frontia.localStorage = localStorage), baidu.frontia.DomainManager = {
		getSocialDomain: function() {
			return baidu.frontia.serviceHost.Social
		},
		getPCSDomain: function() {
			return baidu.frontia.serviceHost.PCS
		},
		getFrontiaDomain: function() {
			return baidu.frontia.serviceHost.Frontia
		},
		getPBLogDomain: function() {
			return baidu.frontia.serviceHost.PBLog
		}
	}, baidu.frontia.Base = Object.defineProperty(function() {}, "extend", {
		value: function(e, t) {
			var r = e && e.hasOwnProperty("constructor") ? e.constructor : this,
				n = function() {
					r.apply(this, arguments)
				};
			if (n.prototype = function(e, t) {
				return Object.getOwnPropertyNames(t).forEach(function(r) {
					Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r))
				}), e
			}(Object.create(this.prototype), e || {}), t)
				for (var a in t) t.hasOwnProperty(a) && (n[a] = t[a]);
			return Object.defineProperty(n, "extend", Object.getOwnPropertyDescriptor(this, "extend")), n
		}
	}), baidu.frontia.Object = baidu.frontia.Base.extend({
		acl: null,
		constructor: function(t) {
			if (t && !(t instanceof e.ACL)) throw new Error("[construct ]: acl is invalid");
			this.acl = t || null
		},
		setAcl: function(t) {
			if (t && !(t instanceof e.ACL)) throw new Error("[setAcl ]: acl is invalid");
			this.acl = t || null
		},
		getACL: function() {
			return this.acl
		},
		_getACLInfo: function() {
			var t = null;
			return this.acl instanceof e.ACL && (t = this.acl.toJSON()), t
		}
	}), baidu.frontia.setCurrentAccount = function(t) {
		if (!(t instanceof e.User || t instanceof e.Role)) throw new Error("[setCurrentAccount]: account is invalid");
		var r = t.toJSON();
		baidu.frontia.localStorage.setItem(baidu.frontia._getLocalStorageKey(baidu.frontia._CURRENT_USER_KEY), JSON.stringify(r)), baidu.frontia.currentAccount = t
	}, baidu.frontia.logOutCurrentAccount = function() {
		baidu.frontia.currentAccount = null, baidu.frontia.localStorage.removeItem(baidu.frontia._getLocalStorageKey(baidu.frontia._CURRENT_USER_KEY))
	}, baidu.frontia.getCurrentAccount = function() {
		if (baidu.frontia.currentAccount) return baidu.frontia.currentAccount;
		var e = baidu.frontia.localStorage.getItem(baidu.frontia._getLocalStorageKey(baidu.frontia._CURRENT_USER_KEY));
		if (!e) return null;
		var t = JSON.parse(e);
		return "user" === t.type ? new baidu.frontia.User({
			socialId: t.socialId,
			accessToken: t.accessToken,
			name: t.name,
			mediaType: t.mediaType,
			expiresIn: t.expiresIn
		}) : new baidu.frontia.Role(t.roleId)
	}, baidu.frontia.init = function(e) {
		if (!e) throw new Error("[init]: apiKey is invaild");
		baidu.frontia.apiKey = e
	}, baidu.frontia.getApiKey = function() {
		return baidu.frontia.apiKey
	}, baidu.frontia._getLocalStorageKey = function(e) {
		if (!baidu.frontia.apiKey) throw "Should call baidu.frontia.init before using baidu.frontia";
		if (e || (e = ""), "string" != typeof e) throw "userKey must be a string when getting localStorage key";
		return "baidu.frontia/" + baidu.frontia.apiKey + "/" + e
	}
}(baidu.frontia), "undefined" != typeof module && module.exports && (module.exports = baidu), baidu.frontia.error = baidu.frontia.error || {},
function() {
	baidu.frontia.error = function(e, t) {
		t = t || "error", this.code = e.error_code || e.Code, this.message = e.error_msg || e.Message, this.message += " [" + t + "]"
	}, baidu.frontia.ERR_MSG = {
		NO_AK: {
			error_code: -1,
			error_msg: "No AK found, please config AK by calling BaiduFrontia.init(yourak) at first"
		},
		INVALID_AK: {
			error_code: -1,
			error_msg: "Invalid AK"
		},
		INVALID_PARAMS: {
			error_code: -1,
			error_msg: "Invalid params"
		},
		INVALID_RES_TYPE: {
			error_code: -1,
			error_msg: "Invalid params: response_type"
		},
		INVALID_MEDIA_TYPE: {
			error_code: -1,
			error_msg: "Invalid params: media_type"
		}
	}
}(baidu.frontia),
function() {
	"use strict";

	function e(e, t) {
		var r = e.split("."),
			n = g;
		!(r[0] in n) && n.execScript && n.execScript("var " + r[0]);
		for (var a; r.length && (a = r.shift());) r.length || t === h ? n = n[a] ? n[a] : n[a] = {} : n[a] = t
	}

	function t(e, t) {
		if (this.index = "number" == typeof t ? t : 0, this.f = 0, this.buffer = e instanceof(m ? Uint8Array : Array) ? e : new(m ? Uint8Array : Array)(32768), 2 * this.buffer.length <= this.index) throw Error("invalid index");
		this.buffer.length <= this.index && r(this)
	}

	function r(e) {
		var t, r = e.buffer,
			n = r.length,
			a = new(m ? Uint8Array : Array)(n << 1);
		if (m) a.set(r);
		else
			for (t = 0; n > t; ++t) a[t] = r[t];
		return e.buffer = a
	}

	function n(e, t, r) {
		var n, a = "number" == typeof t ? t : t = 0,
			o = "number" == typeof r ? r : e.length;
		for (n = -1, a = 7 & o; a--; ++t) n = n >>> 8 ^ S[255 & (n ^ e[t])];
		for (a = o >> 3; a--; t += 8) n = n >>> 8 ^ S[255 & (n ^ e[t])], n = n >>> 8 ^ S[255 & (n ^ e[t + 1])], n = n >>> 8 ^ S[255 & (n ^ e[t + 2])], n = n >>> 8 ^ S[255 & (n ^ e[t + 3])], n = n >>> 8 ^ S[255 & (n ^ e[t + 4])], n = n >>> 8 ^ S[255 & (n ^ e[t + 5])], n = n >>> 8 ^ S[255 & (n ^ e[t + 6])], n = n >>> 8 ^ S[255 & (n ^ e[t + 7])];
		return (4294967295 ^ n) >>> 0
	}

	function a(e) {
		this.buffer = new(m ? Uint16Array : Array)(2 * e), this.length = 0
	}

	function o(e, t) {
		this.h = k, this.j = 0, this.input = m && e instanceof Array ? new Uint8Array(e) : e, this.c = 0, t && (t.lazy && (this.j = t.lazy), "number" == typeof t.compressionType && (this.h = t.compressionType), t.outputBuffer && (this.a = m && t.outputBuffer instanceof Array ? new Uint8Array(t.outputBuffer) : t.outputBuffer), "number" == typeof t.outputIndex && (this.c = t.outputIndex)), this.a || (this.a = new(m ? Uint8Array : Array)(32768))
	}

	function i(e, t) {
		this.length = e, this.k = t
	}

	function s(e, t) {
		function r(e, t) {
			var r, n = e.k,
				a = [],
				o = 0;
			r = I[e.length], a[o++] = 65535 & r, a[o++] = 255 & r >> 16, a[o++] = r >> 24;
			var i;
			switch (d) {
				case 1 === n:
					i = [0, n - 1, 0];
					break;
				case 2 === n:
					i = [1, n - 2, 0];
					break;
				case 3 === n:
					i = [2, n - 3, 0];
					break;
				case 4 === n:
					i = [3, n - 4, 0];
					break;
				case 6 >= n:
					i = [4, n - 5, 1];
					break;
				case 8 >= n:
					i = [5, n - 7, 1];
					break;
				case 12 >= n:
					i = [6, n - 9, 2];
					break;
				case 16 >= n:
					i = [7, n - 13, 2];
					break;
				case 24 >= n:
					i = [8, n - 17, 3];
					break;
				case 32 >= n:
					i = [9, n - 25, 3];
					break;
				case 48 >= n:
					i = [10, n - 33, 4];
					break;
				case 64 >= n:
					i = [11, n - 49, 4];
					break;
				case 96 >= n:
					i = [12, n - 65, 5];
					break;
				case 128 >= n:
					i = [13, n - 97, 5];
					break;
				case 192 >= n:
					i = [14, n - 129, 6];
					break;
				case 256 >= n:
					i = [15, n - 193, 6];
					break;
				case 384 >= n:
					i = [16, n - 257, 7];
					break;
				case 512 >= n:
					i = [17, n - 385, 7];
					break;
				case 768 >= n:
					i = [18, n - 513, 8];
					break;
				case 1024 >= n:
					i = [19, n - 769, 8];
					break;
				case 1536 >= n:
					i = [20, n - 1025, 9];
					break;
				case 2048 >= n:
					i = [21, n - 1537, 9];
					break;
				case 3072 >= n:
					i = [22, n - 2049, 10];
					break;
				case 4096 >= n:
					i = [23, n - 3073, 10];
					break;
				case 6144 >= n:
					i = [24, n - 4097, 11];
					break;
				case 8192 >= n:
					i = [25, n - 6145, 11];
					break;
				case 12288 >= n:
					i = [26, n - 8193, 12];
					break;
				case 16384 >= n:
					i = [27, n - 12289, 12];
					break;
				case 24576 >= n:
					i = [28, n - 16385, 13];
					break;
				case 32768 >= n:
					i = [29, n - 24577, 13];
					break;
				default:
					throw "invalid distance"
			}
			r = i, a[o++] = r[0], a[o++] = r[1], a[o++] = r[2];
			var s, c;
			for (s = 0, c = a.length; c > s; ++s) y[v++] = a[s];
			_[a[0]]++, b[a[3]]++, A = e.length + t - 1, f = null
		}
		var n, a, o, i, s, u, l, f, p, g = {}, y = m ? new Uint16Array(2 * t.length) : [],
			v = 0,
			A = 0,
			_ = new(m ? Uint32Array : Array)(286),
			b = new(m ? Uint32Array : Array)(30),
			w = e.j;
		if (!m) {
			for (o = 0; 285 >= o;) _[o++] = 0;
			for (o = 0; 29 >= o;) b[o++] = 0
		}
		for (_[256] = 1, n = 0, a = t.length; a > n; ++n) {
			for (o = s = 0, i = 3; i > o && n + o !== a; ++o) s = s << 8 | t[n + o];
			if (g[s] === h && (g[s] = []), u = g[s], !(0 < A--)) {
				for (; 0 < u.length && 32768 < n - u[0];) u.shift();
				if (n + 3 >= a) {
					for (f && r(f, -1), o = 0, i = a - n; i > o; ++o) p = t[n + o], y[v++] = p, ++_[p];
					break
				}
				0 < u.length ? (l = c(t, n, u), f ? f.length < l.length ? (p = t[n - 1], y[v++] = p, ++_[p], r(l, 0)) : r(f, -1) : l.length < w ? f = l : r(l, 0)) : f ? r(f, -1) : (p = t[n], y[v++] = p, ++_[p])
			}
			u.push(n)
		}
		return y[v++] = 256, _[256]++, e.n = _, e.m = b, m ? y.subarray(0, v) : y
	}

	function c(e, t, r) {
		var n, a, o, s, c, u, l = 0,
			f = e.length;
		s = 0, u = r.length;
		e: for (; u > s; s++) {
			if (n = r[u - s - 1], o = 3, l > 3) {
				for (c = l; c > 3; c--)
					if (e[n + c - 1] !== e[t + c - 1]) continue e;
				o = l
			}
			for (; 258 > o && f > t + o && e[n + o] === e[t + o];)++o;
			if (o > l && (a = n, l = o), 258 === o) break
		}
		return new i(l, t - a)
	}

	function u(e, t) {
		var r, n, o, i, s, c = e.length,
			u = new a(572),
			f = new(m ? Uint8Array : Array)(c);
		if (!m)
			for (i = 0; c > i; i++) f[i] = 0;
		for (i = 0; c > i; ++i) 0 < e[i] && u.push(i, e[i]);
		if (r = Array(u.length / 2), n = new(m ? Uint32Array : Array)(u.length / 2), 1 === r.length) return f[u.pop().index] = 1, f;
		for (i = 0, s = u.length / 2; s > i; ++i) r[i] = u.pop(), n[i] = r[i].value;
		for (o = l(n, n.length, t), i = 0, s = r.length; s > i; ++i) f[r[i].index] = o[i];
		return f
	}

	function l(e, t, r) {
		function n(e) {
			var r = h[e][d[e]];
			r === t ? (n(e + 1), n(e + 1)) : --f[r], ++d[e]
		}
		var a, o, i, s, c, u = new(m ? Uint16Array : Array)(r),
			l = new(m ? Uint8Array : Array)(r),
			f = new(m ? Uint8Array : Array)(t),
			p = Array(r),
			h = Array(r),
			d = Array(r),
			g = (1 << r) - t,
			y = 1 << r - 1;
		for (u[r - 1] = t, o = 0; r > o; ++o) y > g ? l[o] = 0 : (l[o] = 1, g -= y), g <<= 1, u[r - 2 - o] = (0 | u[r - 1 - o] / 2) + t;
		for (u[0] = l[0], p[0] = Array(u[0]), h[0] = Array(u[0]), o = 1; r > o; ++o) u[o] > 2 * u[o - 1] + l[o] && (u[o] = 2 * u[o - 1] + l[o]), p[o] = Array(u[o]), h[o] = Array(u[o]);
		for (a = 0; t > a; ++a) f[a] = r;
		for (i = 0; i < u[r - 1]; ++i) p[r - 1][i] = e[i], h[r - 1][i] = i;
		for (a = 0; r > a; ++a) d[a] = 0;
		for (1 === l[r - 1] && (--f[0], ++d[r - 1]), o = r - 2; o >= 0; --o) {
			for (s = a = 0, c = d[o + 1], i = 0; i < u[o]; i++) s = p[o + 1][c] + p[o + 1][c + 1], s > e[a] ? (p[o][i] = s, h[o][i] = t, c += 2) : (p[o][i] = e[a], h[o][i] = a, ++a);
			d[o] = 0, 1 === l[o] && n(o)
		}
		return f
	}

	function f(e) {
		var t, r, n, a, o = new(m ? Uint16Array : Array)(e.length),
			i = [],
			s = [],
			c = 0;
		for (t = 0, r = e.length; r > t; t++) i[e[t]] = (0 | i[e[t]]) + 1;
		for (t = 1, r = 16; r >= t; t++) s[t] = c, c += 0 | i[t], c <<= 1;
		for (t = 0, r = e.length; r > t; t++)
			for (c = s[e[t]], s[e[t]] += 1, n = o[t] = 0, a = e[t]; a > n; n++) o[t] = o[t] << 1 | 1 & c, c >>>= 1;
		return o
	}

	function p(e, t) {
		this.input = e, this.c = this.i = 0, this.d = {}, t && (t.flags && (this.d = t.flags), "string" == typeof t.filename && (this.filename = t.filename), "string" == typeof t.comment && (this.l = t.comment), t.deflateOptions && (this.e = t.deflateOptions)), this.e || (this.e = {})
	}
	var h = void 0,
		d = !0,
		g = this,
		m = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array;
	t.prototype.b = function(e, t, n) {
		var a, o = this.buffer,
			i = this.index,
			s = this.f,
			c = o[i];
		if (n && t > 1 && (e = t > 8 ? (w[255 & e] << 24 | w[255 & e >>> 8] << 16 | w[255 & e >>> 16] << 8 | w[255 & e >>> 24]) >> 32 - t : w[e] >> 8 - t), 8 > t + s) c = c << t | e, s += t;
		else
			for (a = 0; t > a; ++a) c = c << 1 | 1 & e >> t - a - 1, 8 === ++s && (s = 0, o[i++] = w[c], c = 0, i === o.length && (o = r(this)));
		o[i] = c, this.buffer = o, this.f = s, this.index = i
	}, t.prototype.finish = function() {
		var e, t = this.buffer,
			r = this.index;
		return 0 < this.f && (t[r] <<= 8 - this.f, t[r] = w[t[r]], r++), m ? e = t.subarray(0, r) : (t.length = r, e = t), e
	};
	var y, v = new(m ? Uint8Array : Array)(256);
	for (y = 0; 256 > y; ++y) {
		for (var A = y, _ = A, b = 7, A = A >>> 1; A; A >>>= 1) _ <<= 1, _ |= 1 & A, --b;
		v[y] = (255 & _ << b) >>> 0
	}
	var w = v,
		T = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117],
		S = m ? new Uint32Array(T) : T;
	a.prototype.getParent = function(e) {
		return 2 * (0 | (e - 2) / 4)
	}, a.prototype.push = function(e, t) {
		var r, n, a, o = this.buffer;
		for (r = this.length, o[this.length++] = t, o[this.length++] = e; r > 0 && (n = this.getParent(r), o[r] > o[n]);) a = o[r], o[r] = o[n], o[n] = a, a = o[r + 1], o[r + 1] = o[n + 1], o[n + 1] = a, r = n;
		return this.length
	}, a.prototype.pop = function() {
		var e, t, r, n, a, o = this.buffer;
		for (t = o[0], e = o[1], this.length -= 2, o[0] = o[this.length], o[1] = o[this.length + 1], a = 0;
			(n = 2 * a + 2, !(n >= this.length)) && (n + 2 < this.length && o[n + 2] > o[n] && (n += 2), o[n] > o[a]);) r = o[a], o[a] = o[n], o[n] = r, r = o[a + 1], o[a + 1] = o[n + 1], o[n + 1] = r, a = n;
		return {
			index: e,
			value: t,
			length: this.length
		}
	};
	var j, k = 2,
		x = [];
	for (j = 0; 288 > j; j++) switch (d) {
		case 143 >= j:
			x.push([j + 48, 8]);
			break;
		case 255 >= j:
			x.push([j - 144 + 400, 9]);
			break;
		case 279 >= j:
			x.push([j - 256 + 0, 7]);
			break;
		case 287 >= j:
			x.push([j - 280 + 192, 8]);
			break;
		default:
			throw "invalid literal: " + j
	}
	o.prototype.g = function() {
		var e, r, n, a, o = this.input;
		switch (this.h) {
			case 0:
				for (n = 0, a = o.length; a > n;) {
					r = m ? o.subarray(n, n + 65535) : o.slice(n, n + 65535), n += r.length;
					var i = r,
						c = n === a,
						l = h,
						p = h,
						g = h,
						y = h,
						v = h,
						A = this.a,
						_ = this.c;
					if (m) {
						for (A = new Uint8Array(this.a.buffer); A.length <= _ + i.length + 5;) A = new Uint8Array(A.length << 1);
						A.set(this.a)
					}
					if (l = c ? 1 : 0, A[_++] = 0 | l, p = i.length, g = 65535 & ~p + 65536, A[_++] = 255 & p, A[_++] = 255 & p >>> 8, A[_++] = 255 & g, A[_++] = 255 & g >>> 8, m) A.set(i, _), _ += i.length, A = A.subarray(0, _);
					else {
						for (y = 0, v = i.length; v > y; ++y) A[_++] = i[y];
						A.length = _
					}
					this.c = _, this.a = A
				}
				break;
			case 1:
				var b = new t(m ? new Uint8Array(this.a.buffer) : this.a, this.c);
				b.b(1, 1, d), b.b(1, 2, d);
				var w, T, S, j = s(this, o);
				for (w = 0, T = j.length; T > w; w++)
					if (S = j[w], t.prototype.b.apply(b, x[S]), S > 256) b.b(j[++w], j[++w], d), b.b(j[++w], 5), b.b(j[++w], j[++w], d);
					else
				if (256 === S) break;
				this.a = b.finish(), this.c = this.a.length;
				break;
			case k:
				var O, I, R, N, D, P, E, U, L, C, M, q, F, K, J, B = new t(m ? new Uint8Array(this.a.buffer) : this.a, this.c),
					z = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
					H = Array(19);
				for (O = k, B.b(1, 1, d), B.b(O, 2, d), I = s(this, o), P = u(this.n, 15), E = f(P), U = u(this.m, 7), L = f(U), R = 286; R > 257 && 0 === P[R - 1]; R--);
				for (N = 30; N > 1 && 0 === U[N - 1]; N--);
				var V, Q, G, Y, $, X, Z = R,
					W = N,
					et = new(m ? Uint32Array : Array)(Z + W),
					tt = new(m ? Uint32Array : Array)(316),
					rt = new(m ? Uint8Array : Array)(19);
				for (V = Q = 0; Z > V; V++) et[Q++] = P[V];
				for (V = 0; W > V; V++) et[Q++] = U[V];
				if (!m)
					for (V = 0, Y = rt.length; Y > V; ++V) rt[V] = 0;
				for (V = $ = 0, Y = et.length; Y > V; V += Q) {
					for (Q = 1; Y > V + Q && et[V + Q] === et[V]; ++Q);
					if (G = Q, 0 === et[V])
						if (3 > G)
							for (; 0 < G--;) tt[$++] = 0, rt[0]++;
						else
							for (; G > 0;) X = 138 > G ? G : 138, X > G - 3 && G > X && (X = G - 3), 10 >= X ? (tt[$++] = 17, tt[$++] = X - 3, rt[17]++) : (tt[$++] = 18, tt[$++] = X - 11, rt[18]++), G -= X;
						else
					if (tt[$++] = et[V], rt[et[V]]++, G--, 3 > G)
						for (; 0 < G--;) tt[$++] = et[V], rt[et[V]]++;
					else
						for (; G > 0;) X = 6 > G ? G : 6, X > G - 3 && G > X && (X = G - 3), tt[$++] = 16, tt[$++] = X - 3, rt[16]++, G -= X
				}
				for (e = m ? tt.subarray(0, $) : tt.slice(0, $), C = u(rt, 7), K = 0; 19 > K; K++) H[K] = C[z[K]];
				for (D = 19; D > 4 && 0 === H[D - 1]; D--);
				for (M = f(C), B.b(R - 257, 5, d), B.b(N - 1, 5, d), B.b(D - 4, 4, d), K = 0; D > K; K++) B.b(H[K], 3, d);
				for (K = 0, J = e.length; J > K; K++)
					if (q = e[K], B.b(M[q], C[q], d), q >= 16) {
						switch (K++, q) {
							case 16:
								F = 2;
								break;
							case 17:
								F = 3;
								break;
							case 18:
								F = 7;
								break;
							default:
								throw "invalid code: " + q
						}
						B.b(e[K], F, d)
					}
				var nt, at, ot, it, st, ct, ut, lt, ft = [E, P],
					pt = [L, U];
				for (st = ft[0], ct = ft[1], ut = pt[0], lt = pt[1], nt = 0, at = I.length; at > nt; ++nt)
					if (ot = I[nt], B.b(st[ot], ct[ot], d), ot > 256) B.b(I[++nt], I[++nt], d), it = I[++nt], B.b(ut[it], lt[it], d), B.b(I[++nt], I[++nt], d);
					else
				if (256 === ot) break;
				this.a = B.finish(), this.c = this.a.length;
				break;
			default:
				throw "invalid compression type"
		}
		return this.a
	};
	var O = function() {
		function e(e) {
			switch (d) {
				case 3 === e:
					return [257, e - 3, 0];
				case 4 === e:
					return [258, e - 4, 0];
				case 5 === e:
					return [259, e - 5, 0];
				case 6 === e:
					return [260, e - 6, 0];
				case 7 === e:
					return [261, e - 7, 0];
				case 8 === e:
					return [262, e - 8, 0];
				case 9 === e:
					return [263, e - 9, 0];
				case 10 === e:
					return [264, e - 10, 0];
				case 12 >= e:
					return [265, e - 11, 1];
				case 14 >= e:
					return [266, e - 13, 1];
				case 16 >= e:
					return [267, e - 15, 1];
				case 18 >= e:
					return [268, e - 17, 1];
				case 22 >= e:
					return [269, e - 19, 2];
				case 26 >= e:
					return [270, e - 23, 2];
				case 30 >= e:
					return [271, e - 27, 2];
				case 34 >= e:
					return [272, e - 31, 2];
				case 42 >= e:
					return [273, e - 35, 3];
				case 50 >= e:
					return [274, e - 43, 3];
				case 58 >= e:
					return [275, e - 51, 3];
				case 66 >= e:
					return [276, e - 59, 3];
				case 82 >= e:
					return [277, e - 67, 4];
				case 98 >= e:
					return [278, e - 83, 4];
				case 114 >= e:
					return [279, e - 99, 4];
				case 130 >= e:
					return [280, e - 115, 4];
				case 162 >= e:
					return [281, e - 131, 5];
				case 194 >= e:
					return [282, e - 163, 5];
				case 226 >= e:
					return [283, e - 195, 5];
				case 257 >= e:
					return [284, e - 227, 5];
				case 258 === e:
					return [285, e - 258, 0];
				default:
					throw "invalid length: " + e
			}
		}
		var t, r, n = [];
		for (t = 3; 258 >= t; t++) r = e(t), n[t] = r[2] << 24 | r[1] << 16 | r[0];
		return n
	}(),
		I = m ? new Uint32Array(O) : O;
	p.prototype.g = function() {
		var e, t, r, a, i, s, c, u, l = new(m ? Uint8Array : Array)(32768),
			f = 0,
			p = this.input,
			d = this.i,
			g = this.filename,
			y = this.l;
		if (l[f++] = 31, l[f++] = 139, l[f++] = 8, e = 0, this.d.fname && (e |= D), this.d.fcomment && (e |= P), this.d.fhcrc && (e |= N), l[f++] = e, t = 0 | (Date.now ? Date.now() : +new Date) / 1e3, l[f++] = 255 & t, l[f++] = 255 & t >>> 8, l[f++] = 255 & t >>> 16, l[f++] = 255 & t >>> 24, l[f++] = 0, l[f++] = R, this.d.fname !== h) {
			for (c = 0, u = g.length; u > c; ++c) s = g.charCodeAt(c), s > 255 && (l[f++] = 255 & s >>> 8), l[f++] = 255 & s;
			l[f++] = 0
		}
		if (this.d.comment) {
			for (c = 0, u = y.length; u > c; ++c) s = y.charCodeAt(c), s > 255 && (l[f++] = 255 & s >>> 8), l[f++] = 255 & s;
			l[f++] = 0
		}
		return this.d.fhcrc && (r = 65535 & n(l, 0, f), l[f++] = 255 & r, l[f++] = 255 & r >>> 8), this.e.outputBuffer = l, this.e.outputIndex = f, i = new o(p, this.e), l = i.g(), f = i.c, m && (f + 8 > l.buffer.byteLength ? (this.a = new Uint8Array(f + 8), this.a.set(new Uint8Array(l.buffer)), l = this.a) : l = new Uint8Array(l.buffer)), a = n(p, h, h), l[f++] = 255 & a, l[f++] = 255 & a >>> 8, l[f++] = 255 & a >>> 16, l[f++] = 255 & a >>> 24, u = p.length, l[f++] = 255 & u, l[f++] = 255 & u >>> 8, l[f++] = 255 & u >>> 16, l[f++] = 255 & u >>> 24, this.i = d, m && f < l.length && (this.a = l = l.subarray(0, f)), l
	};
	var R = 255,
		N = 2,
		D = 8,
		P = 16;
	e("Zlib.Gzip", p), e("Zlib.Gzip.prototype.compress", p.prototype.g)
}.call(this), baidu.frontia.util = {},
function(namespace_) {
	var now = +new Date,
		util = {};
	util.guid = function() {
		return "baidu_frontia_" + now++
	}, util.mix = function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var r = arguments[t];
			if (r)
				for (var n in r) r.hasOwnProperty(n) && (e[n] = r[n])
		}
		return e
	}, util.noop = function() {}, util.parseJSON = function(text) {
		return window.JSON && "function" == typeof JSON.parse ? JSON.parse(text) : eval("(" + text + ")")
	};
	var whitespace = /(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g;
	util.trim = function(e) {
		return e.replace(whitespace, "")
	}, util.encodeHTML = function(e) {
		return e += "", e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
	}, util.serializeURL = function(e) {
		if (!e) return "";
		var t = "";
		for (var r in e)
			if (e.hasOwnProperty(r)) {
				var n = e[r];
				t += "&" + encodeURIComponent(r) + "=" + encodeURIComponent(n)
			}
		return t.slice(1)
	},
	function(e) {
		"use strict";
		if (!e.Base64) {
			var t, r = "2.1.2";
			"undefined" != typeof module && module.exports && (t = require("buffer").Buffer);
			var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
				a = function(e) {
					for (var t = {}, r = 0, n = e.length; n > r; r++) t[e.charAt(r)] = r;
					return t
				}(n),
				o = String.fromCharCode,
				i = function(e) {
					if (e.length < 2) {
						var t = e.charCodeAt(0);
						return 128 > t ? e : 2048 > t ? o(192 | t >>> 6) + o(128 | 63 & t) : o(224 | 15 & t >>> 12) + o(128 | 63 & t >>> 6) + o(128 | 63 & t)
					}
					var t = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
					return o(240 | 7 & t >>> 18) + o(128 | 63 & t >>> 12) + o(128 | 63 & t >>> 6) + o(128 | 63 & t)
				}, s = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,
				c = function(e) {
					return e.replace(s, i)
				}, u = function(e) {
					var t = [0, 2, 1][e.length % 3],
						r = e.charCodeAt(0) << 16 | (e.length > 1 ? e.charCodeAt(1) : 0) << 8 | (e.length > 2 ? e.charCodeAt(2) : 0),
						a = [n.charAt(r >>> 18), n.charAt(63 & r >>> 12), t >= 2 ? "=" : n.charAt(63 & r >>> 6), t >= 1 ? "=" : n.charAt(63 & r)];
					return a.join("")
				}, l = e.btoa || function(e) {
					return e.replace(/[\s\S]{1,3}/g, u)
				}, f = t ? function(e) {
					return new t(e).toString("base64")
				} : function(e) {
					return l(c(e))
				}, p = function(e, t) {
					return t ? f(e).replace(/[+\/]/g, function(e) {
						return "+" == e ? "-" : "_"
					}).replace(/=/g, "") : f(e)
				}, h = function(e) {
					return p(e, !0)
				}, d = new RegExp(["[À-ß][-¿]", "[à-ï][-¿]{2}", "[ð-÷][-¿]{3}"].join("|"), "g"),
				g = function(e) {
					switch (e.length) {
						case 4:
							var t = (7 & e.charCodeAt(0)) << 18 | (63 & e.charCodeAt(1)) << 12 | (63 & e.charCodeAt(2)) << 6 | 63 & e.charCodeAt(3),
								r = t - 65536;
							return o((r >>> 10) + 55296) + o((1023 & r) + 56320);
						case 3:
							return o((15 & e.charCodeAt(0)) << 12 | (63 & e.charCodeAt(1)) << 6 | 63 & e.charCodeAt(2));
						default:
							return o((31 & e.charCodeAt(0)) << 6 | 63 & e.charCodeAt(1))
					}
				}, m = function(e) {
					return e.replace(d, g)
				}, y = function(e) {
					var t = e.length,
						r = t % 4,
						n = (t > 0 ? a[e.charAt(0)] << 18 : 0) | (t > 1 ? a[e.charAt(1)] << 12 : 0) | (t > 2 ? a[e.charAt(2)] << 6 : 0) | (t > 3 ? a[e.charAt(3)] : 0),
						i = [o(n >>> 16), o(255 & n >>> 8), o(255 & n)];
					return i.length -= [0, 0, 2, 1][r], i.join("")
				}, v = e.atob || function(e) {
					return e.replace(/[\s\S]{1,4}/g, y)
				}, A = t ? function(e) {
					return new t(e, "base64").toString()
				} : function(e) {
					return m(v(e))
				}, _ = function(e) {
					return A(e.replace(/[-_]/g, function(e) {
						return "-" == e ? "+" : "/"
					}).replace(/[^A-Za-z0-9\+\/]/g, ""))
				};
			e.mix(e, {
				VERSION: r,
				atob: v,
				btoa: l,
				fromBase64: _,
				toBase64: p,
				utob: c,
				encode: p,
				encodeURI: h,
				btou: m,
				decode: _
			})
		}
	}(util), util.isBoolean = function(e) {
		return e === !0 || e === !1 || "[object Boolean]" == toString.call(e)
	}, namespace_.util = util
}(baidu.frontia), baidu.frontia.ajax = {},
function(e) {
	function t(e, t) {
		var r = a.serializeURL(t);
		if (r) {
			var n = e.indexOf("?") >= 0 ? "&" : "?";
			return e + n + r
		}
		return e
	}

	function r(e, t) {
		null == t && (t = "");
		var a = n.hooks.serializeData.getKey,
			o = e ? encodeURIComponent(e) : "",
			i = Object.prototype.toString.call(t);
		switch (i) {
			case "[object Array]":
				for (var s = [], c = 0; c < t.length; c++) {
					var u = t[c];
					s[c] = r("", u)
				}
				return o ? o + "=" + s.join(",") : s.join(",");
			case "[object Object]":
				var l = [];
				for (var f in t) {
					var p = a(f, e),
						h = r(p, t[f]);
					l.push(h)
				}
				return l.join("&");
			default:
				return o ? o + "=" + encodeURIComponent(t) : encodeURIComponent(t)
		}
	}
	var n = {}, a = e.util;
	n.hooks = {}, n.hooks.serializeData = function(e) {
		return r("", e)
	}, n.hooks.serializeData.getKey = function(e, t) {
		return t ? t + "." + e : e
	}, n.request = function(e) {
		var r = {
			method: "POST",
			data: {},
			cache: !0,
			callback: function() {},
			onerror: function() {}
		};
		e = a.mix(r, e);
		var o, i = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
		i.onreadystatechange = function() {
			if (4 === i.readyState) {
				clearTimeout(o);
				var t = i.status;
				if (0 === t ? t = 200 : 1223 === t && (t = 204), 200 > t || t >= 300 && 304 !== t) return e.onerror(i), void 0;
				var r = i.responseText;
				if ("json" === e.dataType) try {
					r = a.parseJSON(r)
				} catch (n) {
					return e.onerror(i, n), void 0
				}
				e.callback(r)
			}
		};
		var s = e.method.toUpperCase(),
			c = {};
		"GET" === s && a.mix(c, e.data), e.cache === !1 && (c._ = +new Date);
		var u = t(e.url, c);
		if (i.open(s, u, !0), e.header) {
			var l;
			for (l in e.header) e.header.hasOwnProperty(l) && i.setRequestHeader(l, e.header[l])
		}
		if ("GET" === s) i.send();
		else {
			var f = e.contentType || "application/x-www-form-urlencoded";
			i.setRequestHeader("Content-type", f);
			var p = n.hooks.serializeData(e.data);
			i.send(p), i.send(e.data)
		}
		return e.timeout > 0 && (o = setTimeout(function() {
			i.status = 408, e.onerror(i)
		}, e.timeout)), i
	}, n.get = function(e, t, r) {
		var o = {
			method: "GET",
			url: e,
			data: t,
			cache: !1
		};
		return r = a.mix(o, r), n.request(r)
	}, n.getJSON = function(e, t, r) {
		var o = {
			method: "GET",
			url: e,
			data: t,
			dataType: "json",
			cache: cache || !1
		};
		return r = a.mix(o, r), n.request(r)
	}, n.request1 = function(e) {
		var r = {
			method: "POST",
			data: {},
			cache: !0,
			callback: function() {},
			onerror: function() {}
		};
		e = a.mix(r, e);
		var o, i = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
		i.onreadystatechange = function() {
			if (4 === i.readyState) {
				clearTimeout(o);
				var t = i.status;
				if (0 === t ? t = 200 : 1223 === t && (t = 204), 200 > t || t >= 300 && 304 !== t) return e.onerror(i), void 0;
				var r = i.responseText;
				if ("json" === e.dataType && r) try {
					r = a.parseJSON(r)
				} catch (n) {
					return e.onerror(i, n), void 0
				}
				e.callback(r)
			}
		};
		var s = e.method.toUpperCase(),
			c = {};
		"GET" === s && a.mix(c, e.data), e.cache === !1 && (c._ = +new Date);
		var u = t(e.url, c);
		if (i.open(s, u, !0), e.header) {
			var l;
			for (l in e.header) e.header.hasOwnProperty(l) && i.setRequestHeader(l, e.header[l])
		}
		if ("GET" === s) i.send();
		else if (e.contentLength && i.setRequestHeader("Content-Length", e.contentLength), "multipart/form-data" === e.contentType) i.send(e.data);
		else if ("application/json" === e.contentType) i.setRequestHeader("Content-type", e.contentType), i.send(e.data);
		else if ("application/octet-stream" === e.contentType) i.setRequestHeader("Content-type", e.contentType), i.send(e.data);
		else {
			var f = e.contentType || "application/x-www-form-urlencoded";
			i.setRequestHeader("Content-type", f);
			var p = n.hooks.serializeData(e.data);
			i.send(p)
		}
		return e.timeout > 0 && (o = setTimeout(function() {
			i.status = 408, e.onerror(i)
		}, e.timeout)), i
	}, n.post = function(e, t, r, o) {
		var i = {
			method: "POST",
			url: e,
			data: t,
			dataType: r || "json"
		};
		return o = a.mix(i, o), n.request1(o)
	}, n.put = function(e, t, r, o) {
		var i = {
			method: "PUT",
			url: e,
			data: t,
			dataType: r || "json"
		};
		return o = a.mix(i, o), n.request1(o)
	}, e.ajax = n
}(baidu.frontia), baidu.frontia.jsonp = {},
function(e) {
	e.jsonp = function() {
		function e(e, t) {
			var r = document.createElement("script"),
				n = !1;
			r.src = e, r.async = !0;
			var o = t || s.error;
			"function" == typeof o && (r.onerror = function(t) {
				o({
					url: e,
					event: t
				})
			}), r.onload = r.onreadystatechange = function() {
				n || this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (n = !0, r.onload = r.onreadystatechange = null, r && r.parentNode && r.parentNode.removeChild(r))
			}, a || (a = document.getElementsByTagName("head")[0]), a.appendChild(r)
		}

		function t(e) {
			return encodeURIComponent(e)
		}

		function r(r, n, a, c, u) {
			var l, f = -1 === (r || "").indexOf("?") ? "?" : "&";
			u = u || s.callbackName || "callback";
			var p = "baidu_frontia_" + u + "_json" + ++o;
			n = n || {};
			for (l in n) n.hasOwnProperty(l) && (f += t(l) + "=" + t(n[l]) + "&");
			return i[p] = function(e) {
				a(e);
				try {
					delete i[p]
				} catch (t) {}
				i[p] = null
			}, e(r + f + u + "=" + p, c), p
		}

		function n(e) {
			s = e
		}
		var a, o = 0,
			i = this,
			s = {};
		return {
			get: r,
			init: n
		}
	}()
}(baidu.frontia), baidu.frontia.Account = baidu.frontia.Account || {}, baidu.frontia.User = baidu.frontia.User || {}, baidu.frontia.Role = baidu.frontia.Role || {}, baidu.frontia.ACL = baidu.frontia.ACL || {},
function(e) {
	function t(t) {
		var r = e.util.toBase64("Application:" + t);
		return "Basic " + r
	}

	function r(t) {
		var r = {
			application_info: [{
				app_frontia_version: e.version,
				app_appid: e.getApiKey(),
				user_id: e.getCurrentAccount().getId() || "",
				frontia_action: [{
					action_name: "",
					timestamp: null,
					restimestamp: null,
					err_code: "",
					err_msg: ""
				}]
			}]
		};
		r.application_info[0].frontia_action[0] = t;
		var n = {}, a = new Zlib.Gzip(new Uint8Array(JSON.stringify(r).split("").map(function(e) {
				return e.charCodeAt(0)
			}))),
			o = a.compress();
		n.stats = btoa(String.fromCharCode.apply(null, o));
		var i = e.ajax;
		i.post(c, JSON.stringify(n), "json", {
			contentType: "application/json"
		})
	}

	function n() {
		var e = Math.floor((new Date).getTime() / 1e3);
		return e
	}
	var a = e.error,
		o = e.ERR_MSG,
		i = e.DomainManager.getFrontiaDomain() + "/role",
		s = e.DomainManager.getFrontiaDomain() + "/user",
		c = e.DomainManager.getPBLogDomain() + "/pushlog";
	e.Account = e.Object.extend({
		accountId: null,
		accountType: null,
		accountName: null,
		constructor: function(e, t, r) {
			if (!e || "string" != typeof e && "number" != typeof e) throw new a(o.INVALID_PARAMS, "[construct Role/User]: accountId is invalid, the typeof accountId is string or number");
			this.accountType = t, this.accountId = e, this.accountName = r
		},
		getId: function() {
			return this.accountId
		},
		getType: function() {
			return this.accountType
		},
		getName: function() {
			return this.accountName
		}
	}), e.User = e.Account.extend({
		accessToken: null,
		expirationIn: null,
		mediaType: null,
		constructor: function(t) {
			t = t || {}, this.accessToken = t.accessToken, this.expiresIn = t.expiresIn, this.mediaType = t.mediaType, e.Account.prototype.constructor.call(this, t.socialId, "user", t.name)
		},
		getAccessToken: function() {
			return this.accessToken
		},
		getExpiresIn: function() {
			return this.expiresIn
		},
		getMediaType: function() {
			return this.mediaType
		},
		getDetailInfo: function(t) {
			t = t || {}, t.error || (t.error = function() {}), t.success || (t.success = function() {}), e.User.find({
				userId: this.accountId
			}, {
				error: function(e) {
					t.error(e)
				},
				success: function(e) {
					0 === e.count ? t.error(new a({
						Code: "1701",
						Message: "user not exists"
					})) : t.success(e.result[0])
				}
			})
		},
		toJSON: function() {
			return {
				socialId: this.getId(),
				name: this.getName(),
				type: this.getType(),
				mediaType: this.getMediaType(),
				expiresIn: this.getExpiresIn(),
				accessToken: this.getAccessToken()
			}
		}
	});
	var u = {
		options: {
			error: function() {},
			success: function() {}
		},
		_configure: function(e) {
			e = e || {}, e.error && (this.options.error = e.error), e.success && (this.options.success = e.success)
		},
		_checkParams: function(t, r) {
			var n = this;
			return t.every(function(t) {
				return "string" !== t.type || t.value && "string" == typeof t.value ? "role" !== t.type || t.value && t.value instanceof e.Role ? "array" !== t.type || t.value && "Array" === Object.prototype.toString.call(t.value).slice(8, -1) ? !0 : (n.options.error(new a(o.INVALID_PARAMS, "[" + r + "]: targets is invalid")), !1) : (n.options.error(new a(o.INVALID_PARAMS, "[" + r + "]: role is invalid")), !1) : (n.options.error(new a(o.INVALID_PARAMS, "[" + r + "]: target is invalid")), !1)
			})
		},
		find: function(o, i) {
			var c = {};
			c.action_name = "User.list", c.timestamp = n();
			var u = this;
			if (1 === arguments.length) var i = o;
			i || (i = {}), u._configure(i);
			var l = {};
			o.mediaType && (l.media_type = o.mediaType), o.sex && (l.sex = o.sex), o.userId && (l.user_id = o.userId), o.userName && (l.username = o.userName);
			var f = u._attachAccount({
				method: "list",
				criteria: l
			}),
				p = u._createAjaxOpt(c, {
					header: {
						authorization: t(e.getApiKey())
					},
					contentType: "application/json"
				});
			p.callback = function(t) {
				if (t.error_code) {
					var o = new a(t);
					u.options.error(o), c.err_code = o.code, c.err_msg = o.message
				} else {
					var i = [];
					t.response_params.users.forEach(function(t) {
						var r = new e.User({
							socialId: t.user_id,
							mediaType: t.media_type,
							name: t.username
						});
						i.push(r)
					}), u.options.success({
						result: i,
						count: t.response_params.count
					}), c.err_code = 0
				}
				c.restimestamp = n(), r(c)
			};
			var h = e.ajax;
			h.post(s, JSON.stringify(f), "json", p)
		},
		_attachAccount: function(t) {
			var r = null;
			return e.currentAccount && e.currentAccount instanceof e.Role && e.currentAccount.getId() ? (r = "requester", t[r] = e.currentAccount.getType() + ":" + e.currentAccount.getId()) : e.currentAccount && e.currentAccount instanceof e.User && e.currentAccount.getAccessToken() && (r = "requester", t[r] = e.currentAccount.getType() + ":" + e.currentAccount.getAccessToken()), t
		},
		_createAjaxOpt: function(t, o) {
			var i = this,
				s = {
					callback: function(e) {
						if (e.error_code) {
							var o = new a(e);
							i.options.error(o), t.err_code = o.code, t.err_msg = o.message
						} else i.options.success(e), t.err_code = 0;
						t.restimestamp = n(), r(t)
					},
					onerror: function(o, s) {
						try {
							var c = e.util.parseJSON(o.responseText)
						} catch (u) {
							return i.options.error(u, o), void 0
						}
						var s = new a(c);
						i.options.error(new a(c), o), t.err_code = s.code, t.err_msg = s.message, t.restimestamp = n(), r(t)
					}
				};
			return e.util.mix(s, o)
		}
	};
	e.util.mix(e.User, u), e.Role = e.Account.extend({
		roleList: {},
		constructor: function(t, r) {
			var n = this;
			n.roleList = {}, Array.isArray(r) && r.forEach(function(t) {
				if (!(t instanceof e.User || t instanceof e.Role)) throw new a(o.INVALID_PARAMS, "[construct Role]: account is invalid");
				n.roleList[t.getId()] = t
			}), e.Account.prototype.constructor.call(this, t, "role", t)
		},
		add: function(t) {
			if (!(t instanceof e.User || t instanceof e.Role)) throw new a(o.INVALID_PARAMS, "[add Role]: account is invalid");
			this.roleList[t.getId()] = t
		},
		"delete": function(e) {
			delete this.roleList[e]
		},
		getInfo: function() {
			var e = [];
			for (var t in this.roleList) this.roleList.hasOwnProperty(t) && e.push(this.roleList[t].getType() + ":" + this.roleList[t].getId());
			return e
		},
		toJSON: function() {
			return {
				roleId: this.getId(),
				name: this.getName(),
				memberList: this.getInfo()
			}
		}
	});
	var l = {
		options: {
			error: function() {},
			success: function() {}
		},
		_configure: function(e) {
			e = e || {}, e.error && (this.options.error = e.error), e.success && (this.options.success = e.success)
		},
		_checkParams: function(t, r) {
			var n = this;
			return t.every(function(t) {
				return "string" !== t.type || t.value && "string" == typeof t.value ? "role" !== t.type || t.value && t.value instanceof e.Role ? "array" !== t.type || t.value && "Array" === Object.prototype.toString.call(t.value).slice(8, -1) ? !0 : (n.options.error(new a(o.INVALID_PARAMS, "[" + r + "]: targets is invalid")), !1) : (n.options.error(new a(o.INVALID_PARAMS, "[" + r + "]: role is invalid")), !1) : (n.options.error(new a(o.INVALID_PARAMS, "[" + r + "]: target is invalid")), !1)
			})
		},
		remove: function(r, a) {
			var o = {};
			o.action_name = "Role.remove", o.timestamp = n();
			var s = this;
			if (a = a || {}, s._configure(a), s._checkParams([{
				value: r,
				type: "string"
			}], "Role remove")) {
				var c = s._attachAccount({
					method: "remove",
					role_id: r
				}),
					u = s._createAjaxOpt(o, {
						header: {
							authorization: t(e.getApiKey())
						},
						contentType: "application/json"
					}),
					l = e.ajax;
				l.post(i, JSON.stringify(c), "json", u)
			}
		},
		get: function(r, a) {
			var o = {};
			o.action_name = "Role.get", o.timestamp = n();
			var s = this;
			if (a = a || {}, s._configure(a), s._checkParams([{
				value: r,
				type: "string"
			}], "Role get")) {
				var c = s._attachAccount({
					method: "describe",
					role_id: r
				}),
					u = s._createAjaxOpt(o, {
						header: {
							authorization: t(e.getApiKey())
						},
						contentType: "application/json"
					}),
					l = e.ajax;
				l.post(i, JSON.stringify(c), "json", u)
			}
		},
		save: function(r, a) {
			var o = {};
			o.action_name = "Role.save", o.timestamp = n();
			var s = this;
			if (a = a || {}, s._configure(a), s._checkParams([{
				value: r,
				type: "role"
			}], "Role save")) {
				var c = r.getInfo(),
					u = s._attachAccount({
						method: "create",
						role_id: r.getId(),
						child: c
					}),
					l = r.getACL();
				l && (u._acl = l.toJSON());
				var f = s._createAjaxOpt(o, {
					header: {
						authorization: t(e.getApiKey())
					},
					contentType: "application/json"
				}),
					p = e.ajax;
				p.post(i, JSON.stringify(u), "json", f)
			}
		},
		update: function(r, s) {
			var c = {};
			c.action_name = "Role.update", c.timestamp = n();
			var u = this,
				l = null;
			if (s = s || {}, u._configure(s), u._checkParams([{
				value: r,
				type: "string"
			}], "Role update")) {
				var f = u._attachAccount({
					method: "modify",
					role_id: r
				});
				if (s.acl && s.acl instanceof e.ACL && (f._acl = s.acl.toJSON()), l = "add" === s.update_type ? "push_child" : "del" === s.update_type ? "pull_child" : "set" === s.update_type ? "set_child" : null) {
					var p = [];
					s.accounts.forEach(function(t) {
						if (!(t instanceof e.User || t instanceof e.Role)) throw new a(o.INVALID_PARAMS, "[update Role]: account is invalid");
						p.push(t.getType() + ":" + t.getId())
					}), f[l] = p
				}
				var h = u._createAjaxOpt(c, {
					header: {
						authorization: t(e.getApiKey())
					},
					contentType: "application/json"
				}),
					d = e.ajax;
				d.post(i, JSON.stringify(f), "json", h)
			}
		},
		list: function(o) {
			var s = {};
			s.action_name = "Role.list", s.timestamp = n();
			var c = this;
			o = o || {}, c._configure(o);
			var u = c._attachAccount({
				method: "list"
			}),
				l = c._createAjaxOpt(s, {
					header: {
						authorization: t(e.getApiKey())
					},
					contentType: "application/json"
				});
			l.callback = function(t) {
				if (t.error_code) {
					var o = new a(t);
					c.options.error(o), s.err_code = o.code, s.err_msg = o.message
				} else {
					var i = [];
					t.response_params.roles.forEach(function(t) {
						var r = new e.ACL;
						t._acl && (r._setPermission(t._acl), delete t._acl);
						var n = new e.Role(t.role_id);
						t.child.forEach(function(t) {
							var r = t.split(":");
							"user" === r[0] ? n.add(new e.User({
								socialId: r[1]
							})) : n.add(new e.Role(r[1]))
						}), i.push(n)
					}), c.options.success({
						result: i,
						count: t.response_params.count
					}), s.err_code = 0
				}
				s.restimestamp = n(), r(s)
			};
			var f = e.ajax;
			f.post(i, JSON.stringify(u), "json", l)
		},
		_attachAccount: function(t) {
			var r = null;
			return e.currentAccount && e.currentAccount instanceof e.Role && e.currentAccount.getId() ? (r = "requester", t[r] = e.currentAccount.getType() + ":" + e.currentAccount.getId()) : e.currentAccount && e.currentAccount instanceof e.User && e.currentAccount.getAccessToken() && (r = "requester", t[r] = e.currentAccount.getType() + ":" + e.currentAccount.getAccessToken()), t
		},
		_createAjaxOpt: function(t, o) {
			var i = this,
				s = {
					callback: function(e) {
						if (e.error_code) {
							var o = new a(e);
							i.options.error(o), t.err_code = o.code, t.err_msg = o.message
						} else i.options.success(e), t.err_code = 0;
						t.restimestamp = n(), r(t)
					},
					onerror: function(o, s) {
						try {
							var c = e.util.parseJSON(o.responseText)
						} catch (u) {
							return i.options.error(u, o), void 0
						}
						var s = new a(c);
						i.options.error(s, o), t.err_code = s.code, t.err_msg = s.message, t.restimestamp = n(), r(t)
					}
				};
			return e.util.mix(s, o)
		}
	};
	e.util.mix(e.Role, l), e.ACL = e.Base.extend({
		permissions: null,
		constructor: function() {
			this.permissions = {}
		},
		_setAccess: function(t, r, n) {
			if (!(r instanceof e.User || r instanceof e.Role)) throw new a(o.INVALID_PARAMS, "[setAccess]: account is invalid");
			if (!e.util.isBoolean(n)) throw new a(o.INVALID_PARAMS, "[setAccess]: allowed is invalid");
			var i = [r.getType(), ":", r.getId()].join("");
			this.permissions[i] = this.permissions[i] || {}, this.permissions[i][t] = n
		},
		_isAccess: function(t, r) {
			if (!(r instanceof e.User || r instanceof e.Role)) throw new a(o.INVALID_PARAMS, "[isAccess]: account is invalid");
			if (this.permissions["role:*"] && this.permissions["role:*"][t]) return !0;
			var n = [r.getType(), ":", r.getId()].join(""),
				i = this.permissions[n];
			return i ? i[t] : !1
		},
		_setPermission: function(e) {
			this.permissions = {};
			for (var t in e)
				if (e.hasOwnProperty(t)) switch (e[t]) {
					case 1:
						this.permissions[t] = this.permissions[t] || {}, this.permissions[t].write = !0;
						break;
					case 2:
						this.permissions[t] = this.permissions[t] || {}, this.permissions[t].read = !0;
						break;
					case 3:
						this.permissions[t] = this.permissions[t] || {}, this.permissions[t].write = !0, this.permissions[t].read = !0
				}
		},
		setReadAccess: function(e, t) {
			this._setAccess("read", e, t)
		},
		setPublicReadAccess: function(t) {
			var r = new e.Role("*");
			this._setAccess("read", r, t)
		},
		setWriteAccess: function(e, t) {
			this._setAccess("write", e, t)
		},
		setPublicWriteAccess: function(t) {
			var r = new e.Role("*");
			this._setAccess("write", r, t)
		},
		isReadAccess: function(e) {
			this._isAccess("read", e)
		},
		isWriteAccess: function(e) {
			this._isAccess("write", e)
		},
		toJSON: function() {
			var e = {};
			for (var t in this.permissions)
				if (this.permissions.hasOwnProperty(t)) {
					var r = this.permissions[t];
					e[t] = (r.read ? 2 : 0) + (r.write ? 1 : 0)
				}
			return e
		}
	})
}(baidu.frontia), baidu.frontia.storage = baidu.frontia.storage || {},
function(e) {
	function t(t) {
		var r = e.util.toBase64("Application:" + t);
		return "Basic " + r
	}

	function r(t) {
		var r = {
			application_info: [{
				app_frontia_version: e.version,
				app_appid: e.getApiKey(),
				user_id: e.getCurrentAccount().getId() || "",
				frontia_action: [{
					action_name: "",
					timestamp: null,
					restimestamp: null,
					err_code: "",
					err_msg: ""
				}]
			}]
		};
		r.application_info[0].frontia_action[0] = t;
		var n = {}, a = new Zlib.Gzip(new Uint8Array(JSON.stringify(r).split("").map(function(e) {
				return e.charCodeAt(0)
			}))),
			o = a.compress();
		n.stats = btoa(String.fromCharCode.apply(null, o));
		var i = e.ajax;
		i.post(c, JSON.stringify(n), "json", {
			contentType: "application/json"
		})
	}

	function n() {
		var e = Math.floor((new Date).getTime() / 1e3);
		return e
	}
	var a = e.error,
		o = e.ERR_MSG,
		i = e.DomainManager.getFrontiaDomain() + "/bss/document",
		s = e.DomainManager.getFrontiaDomain() + "/bcs/object",
		c = e.DomainManager.getPBLogDomain() + "/pushlog";
	e.File = e.Object.extend({
		constructor: function(t, r, n) {
			if (t && !(t instanceof File)) throw new a(o.INVALID_PARAMS, "[baidu.frontia.File.constructor]: file is invalid");
			this.file = t, this.target = r, this.detail = null, e.Object.prototype.constructor.call(this, n)
		},
		getFileInfo: function() {
			return this.detail
		},
		_getFile: function() {
			return this.file
		},
		_getTarget: function() {
			return this.target
		},
		_setFileInfo: function(e) {
			this.detail = e
		}
	}), e.Data = e.Object.extend({
		constructor: function(t, r) {
			this.obj = t || {}, e.Object.prototype.constructor.call(this, r)
		},
		getData: function() {
			return this.obj
		}
	});
	var u = {
		options: {
			error: function() {},
			success: function() {}
		},
		_configure: function(e) {
			e = e || {}, e.error && (this.options.error = e.error), e.success && (this.options.success = e.success)
		},
		_checkParams: function(t, r) {
			var n = this;
			return t.every(function(t) {
				return "file" !== t.type || t.value && t.value instanceof e.File ? "string" !== t.type || t.value && "string" == typeof t.value ? "array" !== t.type || t.value && "Array" === Object.prototype.toString.call(t.value).slice(8, -1) ? "query" !== t.type || t.value && t.value instanceof u.Query ? "data" !== t.type || t.value && t.value instanceof e.Data ? !0 : (n.options.error(new a(o.INVALID_PARAMS, "[" + r + "]: data is invalid")), !1) : (n.options.error(new a(o.INVALID_PARAMS, "[" + r + "]: query is invalid")), !1) : (n.options.error(new a(o.INVALID_PARAMS, "[" + r + "]: targets is invalid")), !1) : (n.options.error(new a(o.INVALID_PARAMS, "[" + r + "]: target is invalid")), !1) : (n.options.error(new a(o.INVALID_PARAMS, "[" + r + "]: file is null or not typeof File of baidu.frontia")), !1)
			})
		},
		uploadFile: function(o, i) {
			var c = {};
			c.action_name = "storage.uploadFile", c.timestamp = n();
			var u = this;
			if (i = i || {}, u._configure(i), u._checkParams([{
				value: o,
				type: "file"
			}], "storage.uploadFile")) {
				var l = {
					file: o._getFile(),
					acl: o._getACLInfo(),
					target: o._getTarget()
				}, f = u._attachAccount({
						method: "getuploadurl"
					}),
					p = e.ajax;
				p.post(s, JSON.stringify(f), "json", {
					header: {
						authorization: t(e.getApiKey())
					},
					contentType: "application/json",
					callback: function(o) {
						if (o.error_code) u.options.error(new a(o));
						else {
							var i = o.response_params.url + "&dumpheader=1",
								f = new FileReader;
							f.onload = function() {
								var o = f.result;
								p.put(i, o, "json", {
									contentType: "application/octet-stream",
									callback: function(r) {
										if (0 !== r.Error.Code) u.options.error(new a(r.Error));
										else {
											var n = u._createAjaxOpt(c, {
												header: {
													authorization: t(e.getApiKey())
												},
												contentType: "application/json"
											}),
												o = u._attachAccount({
													method: "create",
													md5s: [r.Header["Content-MD5"]],
													object: l.target,
													_acl: l.acl
												});
											p.post(s, JSON.stringify(o), "json", n)
										}
									},
									onerror: function(e, t) {
										try {
											var o = JSON.parse(e.responseText)
										} catch (i) {
											return u.options.error(i, e), void 0
										}
										var t = new a(o.Error);
										u.options.error(t, e), c.err_code = t.code, c.err_msg = t.message, c.restimestamp = n(), r(c)
									}
								})
							}, f.readAsArrayBuffer(l.file)
						}
					},
					onerror: function(e, t) {
						try {
							var o = JSON.parse(e.responseText)
						} catch (i) {
							return u.options.error(i, e), void 0
						}
						var t = new a(o);
						u.options.error(t, e), c.err_code = t.code, c.err_msg = t.message, c.restimestamp = n(), r(c)
					}
				})
			}
		},
		getFileUrl: function(r, a) {
			var o = {};
			o.action_name = "storage.getFileUrl", o.timestamp = n();
			var i = this;
			if (a = a || {}, i._configure(a), i._checkParams([{
				value: r,
				type: "string"
			}], "storage.getFileUrl")) {
				var c = i._attachAccount({
					method: "getdownloadurl",
					object: r
				}),
					u = i._createAjaxOpt(o, {
						header: {
							authorization: t(e.getApiKey())
						},
						contentType: "application/json"
					}),
					l = e.ajax;
				l.post(s, JSON.stringify(c), "json", u)
			}
		},
		deleteFile: function(r, a) {
			var o = {};
			o.action_name = "storage.deleteFile", o.timestamp = n();
			var i = this;
			if (a = a || {}, i._configure(a), i._checkParams([{
				value: r,
				type: "string"
			}], "storage.deleteFile")) {
				var c = i._attachAccount({
					method: "delete",
					object: r
				}),
					u = i._createAjaxOpt(o, {
						header: {
							authorization: t(e.getApiKey())
						},
						contentType: "application/json"
					}),
					l = e.ajax;
				l.post(s, JSON.stringify(c), "json", u)
			}
		},
		listFile: function(o, i) {
			var c = {};
			c.action_name = "storage.listFile", c.timestamp = n();
			var u = this;
			if (i = i || {}, u._configure(i), u._checkParams([{
				value: o,
				type: "string"
			}], "storage.listFile")) {
				var l = u._attachAccount({
					method: "list",
					object: o
				}),
					f = u._createAjaxOpt(c, {
						header: {
							authorization: t(e.getApiKey())
						},
						contentType: "application/json"
					});
				f.callback = function(t) {
					if (t.error_code) {
						var o = new a(t);
						u.options.error(o), c.err_code = o.code, c.err_msg = o.message
					} else {
						var i = [];
						t.response_params.object_list.forEach(function(t) {
							var r = new e.ACL;
							t._acl && (r._setPermission(t._acl), delete t._acl);
							var n = new e.File(null, null, r);
							n._setFileInfo(t), i.push(n)
						}), u.options.success({
							result: i,
							count: t.response_params.object_total
						}), c.err_code = 0
					}
					c.restimestamp = n(), r(c)
				};
				var p = e.ajax;
				p.post(s, JSON.stringify(l), "json", f)
			}
		},
		insertData: function(r, a) {
			var o = {};
			if (o.action_name = "storage.insertData", o.timestamp = n(), a = a || {}, this._configure(a), this._checkParams([{
				value: r,
				type: "data"
			}], "storage.insertData")) {
				var s = r.getData(),
					c = r._getACLInfo();
				c && (s._acl = c);
				var u = this._attachAccount({
					method: "insert",
					documents: s
				}),
					l = this._createAjaxOpt(o, {
						header: {
							authorization: t(e.getApiKey())
						},
						contentType: "application/json"
					}),
					f = e.ajax;
				f.post(i, JSON.stringify(u), "json", l)
			}
		},
		deleteData: function(r, a) {
			var o = {};
			if (o.action_name = "storage.deleteData", o.timestamp = n(), a = a || {}, this._configure(a), this._checkParams([{
				value: r,
				type: "query"
			}], "storage.deleteData")) {
				var s = this._attachAccount({
					method: "remove",
					criteria: r.query
				}),
					c = this._createAjaxOpt(o, {
						header: {
							authorization: t(e.getApiKey())
						},
						contentType: "application/json"
					}),
					u = e.ajax;
				u.post(i, JSON.stringify(s), "json", c)
			}
		},
		updateData: function(r, a, o) {
			var s = {};
			if (s.action_name = "storage.updateData", s.timestamp = n(), o = o || {}, this._configure(o), this._checkParams([{
				value: r,
				type: "query"
			}, {
				value: a,
				type: "data"
			}], "storage.updateData")) {
				var c = a.getData(),
					u = a._getACLInfo();
				if (u)
					if (c.hasOwnProperty("$set")) c.$set._acl = u;
					else {
						var l = 0;
						for (var f in c)
							if (c.hasOwnProperty(f) && "$" === f[0]) {
								l = 1, c.$set = {}, c.$set._acl = u;
								break
							}
						0 === l && (c._acl = u)
					}
				var p = this._attachAccount({
					method: "update",
					criteria: r.query,
					document: c
				}),
					h = this._createAjaxOpt(s, {
						header: {
							authorization: t(e.getApiKey())
						},
						contentType: "application/json"
					}),
					d = e.ajax;
				d.post(i, JSON.stringify(p), "json", h)
			}
		},
		findData: function(o, s) {
			var c = {};
			c.action_name = "storage.findData", c.timestamp = n();
			var u = this;
			if (s = s || {}, this._configure(s), this._checkParams([{
				value: o,
				type: "query"
			}], "storage.findData")) {
				var l = this._attachAccount({
					method: "query",
					criteria: o.query
				}),
					f = this._createAjaxOpt(c, {
						header: {
							authorization: t(e.getApiKey())
						},
						contentType: "application/json"
					});
				f.callback = function(t) {
					if (t.error_code) {
						var o = new a(t);
						u.options.error(o), c.err_code = o.code, c.err_msg = o.message
					} else {
						var i = [];
						t.response_params.documents.forEach(function(t) {
							var r = new e.ACL;
							t._acl && (r._setPermission(t._acl), delete t._acl);
							var n = new e.Data(t, r);
							i.push(n)
						}), u.options.success({
							result: i,
							count: t.response_params.count
						}), c.err_code = 0
					}
					c.restimestamp = n(), r(c)
				};
				var p = e.ajax;
				p.post(i, JSON.stringify(l), "json", f)
			}
		},
		_attachAccount: function(t) {
			var r = null;
			return e.currentAccount && e.currentAccount instanceof e.Role && e.currentAccount.getId() ? (r = "requester", t[r] = e.currentAccount.getType() + ":" + e.currentAccount.getId()) : e.currentAccount && e.currentAccount instanceof e.User && e.currentAccount.getAccessToken() && (r = "requester", t[r] = e.currentAccount.getType() + ":" + e.currentAccount.getAccessToken()), t
		},
		_createAjaxOpt: function(t, o) {
			var i = this,
				s = {
					callback: function(e) {
						if (e.error_code) {
							var o = new a(e);
							i.options.error(o), t.err_code = o.code, t.err_msg = o.message
						} else i.options.success(e), t.err_code = 0;
						t.restimestamp = n(), r(t)
					},
					onerror: function(o, s) {
						try {
							var c = e.util.parseJSON(o.responseText)
						} catch (u) {
							return i.options.error(u, o), void 0
						}
						var s = new a(c);
						i.options.error(s, o), t.err_code = s.code, t.err_msg = s.message, t.restimestamp = n(), r(t)
					}
				};
			return e.util.mix(s, o)
		}
	};
	u.Query = e.Base.extend({
		currentKey: null,
		query: null,
		constructor: function() {},
		_set: function(e, t) {
			this.query = this.query || {}, this.query[e] instanceof Object || (this.query[e] = {});
			for (var r in t) t.hasOwnProperty(r) && (this.query[e][r] = t[r])
		},
		_build: function(e, t) {
			if (null === this.currentKey) throw new a("Query key must not be null");
			switch (e) {
				case u.Query.EQUAL:
					this.query = this.query || {}, this.query[this.currentKey] = t;
					break;
				case u.Query.LESSTHAN:
					this._set(this.currentKey, {
						$lt: t
					});
					break;
				case u.Query.LESSTHANEQUAL:
					this._set(this.currentKey, {
						$lte: t
					});
					break;
				case u.Query.GREATERTHAN:
					this._set(this.currentKey, {
						$gt: t
					});
					break;
				case u.Query.GREATERTHANEQUAL:
					this._set(this.currentKey, {
						$gte: t
					});
					break;
				default:
					throw new a("Query " + e + " is not supported")
			}
		},
		equal: function(e) {
			return this._build(u.Query.EQUAL, e), this
		},
		lessThan: function(e) {
			return this._build(u.Query.LESSTHAN, e), this
		},
		lessThanEqual: function(e) {
			return this._build(u.Query.LESSTHANEQUAL, e), this
		},
		greaterThan: function(e) {
			return this._build(u.Query.GREATERTHAN, e), this
		},
		greaterThanEqual: function(e) {
			return this._build(u.Query.GREATERTHANEQUAL, e), this
		},
		on: function(e) {
			return this.currentKey = e, this
		}
	}, {
		EQUAL: 1,
		LESSTHAN: 2,
		LESSTHANEQUAL: 3,
		GREATERTHAN: 4,
		GREATERTHANEQUAL: 5
	}), e.storage = u
}(baidu.frontia), baidu.frontia.personalStorage = baidu.frontia.personalStorage || {},
function(e) {
	function t(e, t, r) {
		var n, a = {}, o = null,
			i = null;
		t = t || {}, "string" == typeof e ? (o = "/" === e.slice(0, 1) ? e : "/".concat(e), a.path = o) : e && (i = {
			list: []
		}, e.forEach(function(e) {
			o = "/" === e.slice(0, 1) ? e : "/".concat(e), i.list.push({
				path: o
			})
		}), i = JSON.stringify(i));
		for (n in t) t.hasOwnProperty(n) && -1 === r.indexOf(n) && (a[n] = t[n]);
		return {
			query: a,
			body: i
		}
	}

	function r(t, r) {
		var n = [s, t, e.util.serializeURL(r)].join("");
		return n
	}

	function n(t) {
		var r = {
			application_info: [{
				app_frontia_version: e.version,
				app_appid: e.getApiKey(),
				user_id: e.getCurrentAccount().getId() || "",
				frontia_action: [{
					action_name: "",
					timestamp: null,
					restimestamp: null,
					err_code: "",
					err_msg: ""
				}]
			}]
		};
		r.application_info[0].frontia_action[0] = t;
		var n = {}, a = new Zlib.Gzip(new Uint8Array(JSON.stringify(r).split("").map(function(e) {
				return e.charCodeAt(0)
			}))),
			o = a.compress();
		n.stats = btoa(String.fromCharCode.apply(null, o));
		var i = e.ajax;
		i.post(c, JSON.stringify(n), "json", {
			contentType: "application/json"
		})
	}

	function a() {
		var e = Math.floor((new Date).getTime() / 1e3);
		return e
	}
	var o = baidu.frontia.error,
		i = baidu.frontia.ERR_MSG,
		s = e.DomainManager.getPCSDomain() + "/rest/2.0/pcs/",
		c = e.DomainManager.getPBLogDomain() + "/pushlog";
	e.apiKey;
	var u = {};
	u = {
		options: {
			error: function() {},
			success: function() {}
		},
		_configure: function(e) {
			e = e || {}, e.error && (this.options.error = e.error), e.success && (this.options.success = e.success)
		},
		_checkParams: function(e, t) {
			var r = this;
			return e.every(function(e) {
				return "file" !== e.type || e.value && e.value instanceof File ? "string" !== e.type || e.value && "string" == typeof e.value ? "array" !== e.type || e.value && "Array" === Object.prototype.toString.call(e.value).slice(8, -1) ? !0 : (r.options.error(new o(i.INVALID_PARAMS, "[" + t + "]: targets is invalid")), !1) : (r.options.error(new o(i.INVALID_PARAMS, "[" + t + "]: target is invalid")), !1) : (r.options.error(new o(i.INVALID_PARAMS, "[" + t + "]: file is null or not typeof File of DOM")), !1)
			})
		},
		_createAjaxOpt: function(t, r) {
			var i = this,
				s = {
					callback: function(e) {
						if (e.error_code) {
							var r = new o(e);
							i.options.error(r), t.err_code = r.code, t.err_msg = r.message
						} else i.options.success(e), t.err_code = 0;
						t.restimestamp = a(), n(t)
					},
					onerror: function(r, s) {
						try {
							var c = e.util.parseJSON(r.responseText)
						} catch (u) {
							return i.options.error(u, r), void 0
						}
						var s = new o(c);
						i.options.error(s, r), t.err_code = s.code, t.err_msg = s.message, t.restimestamp = a(), n(t)
					}
				};
			return e.util.mix(s, r)
		},
		uploadFile: function(n, o, i) {
			var s = {};
			s.action_name = "personalStorage.uploadFile", s.timestamp = a();
			var c = this;
			if (i = i || {}, c._configure(i), c._checkParams([{
				value: n,
				type: "file"
			}, {
				value: o,
				type: "string"
			}], "personalStorage.uploadFile")) {
				i.method = "upload";
				var u = e.getCurrentAccount();
				u && (accessToken = u.getAccessToken()), i.access_token = accessToken;
				var l = t(o, i, ["success", "error"]),
					f = r("file?", l.query),
					p = c._createAjaxOpt(s, {
						contentType: "multipart/form-data"
					}),
					h = e.ajax,
					d = new FormData;
				d.append("baidu_frontia_file", n), h.post(f, d, "json", p)
			}
		},
		getFileUrl: function(i, s) {
			var c = {};
			c.action_name = "personalStorage.getFileUrl", c.timestamp = a();
			var u = this;
			if (s = s || {}, u._configure(s), u._checkParams([{
				value: i,
				type: "string"
			}], "personalStorage.getFileUrl")) {
				var l = e.getCurrentAccount();
				l && (accessToken = l.getAccessToken()), s.access_token = accessToken, s.method = "download";
				var f = t(i, s, ["success", "error"]),
					p = r("file?", f.query);
				s.method = "meta", f = t(i, s, ["success", "error"]);
				var h = r("file?", f.query),
					d = {
						callback: function(e) {
							if (e.error_code) {
								var t = new o(e);
								u.options.error(t), c.err_code = t.code, c.err_msg = t.message
							} else u.options.success(p), c.err_code = 0;
							c.restimestamp = a(), n(c)
						},
						onerror: function(t, r) {
							try {
								var i = e.util.parseJSON(t.responseText)
							} catch (s) {
								return u.options.error(s, t), void 0
							}
							var r = new o(i);
							u.options.error(r, t), c.err_code = r.code, c.err_msg = r.message, c.restimestamp = a(), n(c)
						},
						dataType: "json"
					}, g = e.ajax;
				g.get(h, {}, d)
			}
		},
		deleteFile: function(n, o) {
			var i = {};
			i.action_name = "personalStorage.deleteFile", i.timestamp = a();
			var s = this;
			if (o = o || {}, s._configure(o), s._checkParams([{
				value: n,
				type: "array"
			}], "personalStorage.deleteFile")) {
				o.method = "delete";
				var c = e.getCurrentAccount();
				c && (accessToken = c.getAccessToken()), o.access_token = accessToken;
				var u = t(n, o, ["success", "error"]),
					l = r("file?", u.query),
					f = s._createAjaxOpt(i),
					p = e.ajax;
				p.post(l, {
					param: u.body
				}, "json", f)
			}
		},
		listFile: function(n, o) {
			var i = {};
			i.action_name = "personalStorage.listFile", i.timestamp = a();
			var s = this;
			if (o = o || {}, s._configure(o), s._checkParams([{
				value: n,
				type: "string"
			}], "personalStorage.listFile")) {
				o.method = "list";
				var c = e.getCurrentAccount();
				c && (accessToken = c.getAccessToken()), o.access_token = accessToken;
				var u = t(n, o, ["success", "error"]),
					l = r("file?", u.query),
					f = s._createAjaxOpt(i, {
						dataType: "json"
					}),
					p = e.ajax;
				p.get(l, {}, f)
			}
		},
		listStreamFile: function(n) {
			var o = {};
			o.action_name = "personalStorage.listStreamFile", o.timestamp = a();
			var i = this;
			n = n || {}, i._configure(n), n.method = "list";
			var s = e.getCurrentAccount();
			s && (accessToken = s.getAccessToken()), n.access_token = accessToken;
			var c = t(null, n, ["success", "error"]);
			n.filter_path && (c.query.filter_path = n.filter_path);
			var u = r("stream?", c.query),
				l = i._createAjaxOpt(o, {
					dataType: "json"
				}),
				f = e.ajax;
			f.get(u, {}, l)
		},
		makeDir: function(n, o) {
			var i = {};
			i.action_name = "personalStorage.makeDir", i.timestamp = a();
			var s = this;
			if (o = o || {}, s._configure(o), s._checkParams([{
				value: n,
				type: "string"
			}], "personalStorage.makeDir")) {
				o.method = "mkdir";
				var c = e.getCurrentAccount();
				c && (accessToken = c.getAccessToken()), o.access_token = accessToken;
				var u = t(n, o, ["success", "error"]),
					l = r("file?", u.query),
					f = s._createAjaxOpt({
						dataType: "json"
					}),
					p = e.ajax;
				p.post(l, {}, "json", f)
			}
		},
		getQuota: function(n) {
			var o = {};
			o.action_name = "personalStorage.getQuota", o.timestamp = a();
			var i = this;
			if (n = n || {}, i._configure(n), i._checkParams([], "psersonalStorage.getQuota")) {
				n.method = "info";
				var s = e.getCurrentAccount();
				s && (accessToken = s.getAccessToken()), n.access_token = accessToken;
				var c = t(null, n, ["success", "error"]),
					u = r("quota?", c.query),
					l = i._createAjaxOpt(o, {
						dataType: "json"
					}),
					f = e.ajax;
				f.get(u, {}, l)
			}
		}
	}, u.constant = {
		ONDUP_OVERWRITE: "overwrite",
		ONDUP_NEWCOPY: "newcopy",
		BY_NAME: "name",
		BY_TIME: "time",
		BY_SIZE: "size",
		ORDER_ASC: "asc",
		ORDER_DESC: "desc",
		TYPE_STREAM_VIDEO: "video",
		TYPE_STREAM_AUDIO: "audio",
		TYPE_STREAM_IMAGE: "image",
		TYPE_STREAM_DOC: "doc"
	}, e.personalStorage = u
}(baidu.frontia), baidu.frontia.store = baidu.frontia.store || {},
function(e) {
	function t(t) {
		var r = e.util.toBase64("Application:" + t);
		return "Basic " + r
	}

	function r() {
		var e = Math.floor((new Date).getTime() / 1e3);
		return e
	}
	var n = e.error;
	e.ERR_MSG;
	var a = e.DomainManager.getFrontiaDomain() + "/push";
	e.DomainManager.getPBLogDomain() + "/pushlog";
	var o = {
		options: {
			error: function() {},
			success: function() {}
		},
		_configure: function(e) {
			e = e || {}, e.error && (this.options.error = e.error), e.success && (this.options.success = e.success)
		},
		send: function(n, o) {
			var i = {};
			i.action_name = "Push.list", i.timestamp = r();
			var s = this;
			o = o || {}, s._configure(o);
			var c = a,
				u = {
					method: "pushmsg",
					messages: n.messages,
					msg_keys: n.msg_keys
				};
			for (var l in o) o.hasOwnProperty(l) && "success" !== l && "error" !== l && (u[l] = o[l]);
			var f = s._createAjaxOpt({
				header: {
					authorization: t(e.getApiKey())
				},
				contentType: "application/json"
			}),
				p = e.ajax;
			p.post(c, JSON.stringify(u), "json", f)
		},
		_createAjaxOpt: function(t) {
			var r = this,
				a = {
					callback: function(e) {
						e.error_code ? r.options.error(new n(e)) : e && e.error_code ? r.options.error(new n(e)) : r.options.success(e)
					},
					onerror: function(t) {
						try {
							var a = e.util.parseJSON(t.responseText)
						} catch (o) {
							return r.options.error(o, t), void 0
						}
						r.options.error(new n(a), t)
					}
				};
			return e.util.mix(a, t)
		}
	};
	e.Push = o
}(baidu.frontia);