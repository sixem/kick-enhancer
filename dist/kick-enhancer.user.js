// ==UserScript==
// @name         KICK Enhancer
// @namespace    kick-enhancer/userscript
// @version      0.1.2
// @author       emy
// @description  Enhances KICK with viewer counts, stream uptime, content controls, and direct clip downloads.
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAW9yTlQBz6J3mgAABtRJREFUWMPFl2uoZWUdxn/P+66199nnnLk2kl0QisBE88J8EaIQ1LwcGZsMRs/UaFcTIa1BQdIvKUp5KYsCZ5Co1BQl1LyATh8SGz+YGTkSUhZEXhh1dDpzbnut9T59eNfZe5+tZknQ+2FtNmu97/P/P//nf3nh/7wEcE7/GCbLEiESDgEFkxyImDT4NGFVpBQgCXHU4ie4snvz8CwRDRYCPALhlV8ZksiHptRkA97NSovLqFuOOCLRHpz/6b9goDqayaIjkBM+NqIjTbMsimCSwYjgROpWpD8F2FfQ0c/8pG0HkhNB6yRO8YCMVQwIqIANhqcEzwBKqXYB0IvTQD+C60j8qmkuhlCBi+xHAKhBpdANQpctMBeNkySnSBngdmCmpTcMqTeZGQXwc9gnm5ahZAqAWg2RRPZUC5Bs9LqgGCGyNt6USIuBghP8SUmw2Ee9kjuBGWA5g7sZYbkG9YB9hpOR9gNSCAayAQONMHBXQhEI+ZUlhFAw9hwH2KDDBEq90ncAnwH6oHIoPgSqgR74r8YzwP723MYp0dR15haNxotV1rg90NAkjFxMHvCrXPzKtRXJtwLnZXCK1eDUQAl+0eZM0N9pwSFzXHQ6rQHtzxDMA/iQ1d2Ap0XYP8HaOz+ny6k31T9CfHEIvkrYTWaD12xmgOfacA7AY4wMQhAG2bPKc6sFN54wYb7Huq0n6aynzvUl34uEi0B98FuBF8Ah4y2IPwgKpBqDnQbgAwO8Km0GAWjB6SaHpQnWnHMa2/aezRe+E4mXgsfBV9QegWXjrYK9QIGH4KGIqzaEvCtliQ0UCaAG3DFqeqzZdhbbH9vCBd8u6VwOrsZobzcKwMbnCu0BZc9DxhgHHxhQuBiJ/EoYXJqgDtOzZ7J9zww7ruzQvaoFj2O1zFnJjuDPC+4FSkSdLfIq2kdXMcyCgLIObIQJReHu9rN1/oNnMHtZh87VbwYf5LAyOBci3ZHVTwXgZEIMb1uKw4r4EsYkTFIuvJ0vzWjHfad79usdJr7bplXgTe0jW2/YibQLKFLdVAvNAva/Bx8YYGoCQgQCYS3mrhM56e6Pp9OO6dK9bqSyjZ/WtIzskXQTUDqlRoKeJgghvGMzCgCR7or3JNJBydue4NHZJ8Ij+5ZZumyE9jRSbPLWbNwp2FdgKilERD4rNe9oQAGwxALdAUYg0WCaXfd5d1Wq/PHpPq/XYeKGNq7xLTpqAl0Lnkf6gQiFFlTvmDpO56cTaBQokAW8UC/ySPnsOANl9j0rISj3z6Wk5qcP+CdbH+aOG/ssf6utbg3jFQO71cjNJH8FVDPpcL3v9xG810emeU/7Fab9Cuvja2+RBSPCUp4JJIVGqFrUoZ/fz63bGqprz/IFvQ4TVw6zwSP93rnziV0mLf5Tb9z2Q76x9kW/3CGsnzdTiwGxHwMvjxeipk1BoO18oGhcg1yx+IuHue3Ue7X7qor+9ZkJ1awuXFpJCePr1lUb9TeevyURX+i7ukaO2BQfpNb56Sgu8NF82ptXekFYNfvlpzGKgr5Qd5mFux/lrq3LWrp81t/sROIlw0YkwAH0hszzoBcowWhjkjvJXpfyN17PBxy1BjATo71g6Ik99MvOVKtPNuKe3/CrmTm9fumFvnoqEr8MXgZ3culmhsDe7f0tEwvNnzXdmxxMRUuaopsOTB7i+aWa+UoUTLFpvBdoTA+t2XnKmTdsnGfunHu4hcLFhcDtoG676WXg6XP52D2dzkvPru1N/j4SjgcdKqQzJph7WqF8ptHUDYU2UmhdeFVFZqAYA/VYoQVb7XTUkBZ7THNdOC/WS3M7iu70NHA2uL+MypLORyF8GEiGBaASYb3R4TlM8SMMtBZXQjB8rgoG2LaVZ2wrdwxt4DAKRxUTa5JTs00Ke4ATuib9RX/c+R4ffsQmvb8wzdeMj0nweElxW8IbQPsCZZ5LqFbSMAxzIE+1yTnVvDLfGzXGjXFqqPmtHko7/f2AWDY+U+hx5N17U//GhurAian75JHxuDMC4di+m2cFuwXxVdwcny7C4PetiLCmGp2FeoJgaxPK7zMrro1jsqeE6LEGoQQhkJizOFXiMSs9CXrxd8EfmuX4tc73pHWNE1Gx3KSCl+KuBuDQSgjK5bXQPZja0PzS6B+gBUxYocAmWWnS8HirhVRRUVIkAlFmP+ZTQWEWc0BSf5bNNwO/Nn5CEonUP8hcekDPvamWvrvrWb+PimJ4lgcFBMXwn1/NPuvNdAYlPgacBjcbtXXRhiRTuU6RkAAOqstD9d5RMAExOREeiPX2LZujjCrqVFIkAa9rngf/VwyML990xUjXHnZX7bzmbff8Cx1fShSwufUVAAAAAElFTkSuQmCC
// @homepage     https://github.com/sixem/kick-enhancer#readme
// @homepageURL  https://github.com/sixem/kick-enhancer
// @source       https://github.com/sixem/kick-enhancer
// @supportURL   https://github.com/sixem/kick-enhancer/issues
// @downloadURL  https://raw.githubusercontent.com/sixem/kick-enhancer/main/dist/kick-enhancer.user.js
// @updateURL    https://raw.githubusercontent.com/sixem/kick-enhancer/main/dist/kick-enhancer.meta.js
// @match        https://kick.com/*
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        unsafeWindow
// @run-at       document-start
// @noframes
// ==/UserScript==

(function() {
	"use strict";
	var _GM = (() => typeof GM != "undefined" ? GM : void 0)();
	var _unsafeWindow = (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
	var LEVEL_VALUES = {
		debug: 0,
		info: 1,
		warn: 2,
		error: 3,
		silent: 4
	};
	var LEVEL_STYLES = {
		debug: "color: #8c8c8c",
		info: "color: #53fc18",
		warn: "color: #f5c451",
		error: "color: #ff6b6b"
	};
	var BRAND_STYLE = [
		"background: #53fc18",
		"border-radius: 3px",
		"color: #071402",
		"font-weight: 700",
		"padding: 1px 4px"
	].join("; ");
	var SCOPE_STYLE = "color: #b0b0b0; font-weight: 600";
	var RESET_STYLE = "color: inherit; font-weight: normal";
	var HISTORY_NOTIFY_INTERVAL_MS = 200;
	var config = {
		colors: true,
		filters: ["*"],
		historyLimit: 250,
		level: "info"
	};
	var excludedScopePatterns = [];
	var history = [];
	var historyListeners = new Set();
	var historyNotifyTimer;
	var includedScopePatterns = [];
	var nextLogEntryId = 1;
	function notifyHistoryListeners() {
		const snapshot = getLogHistory();
		for (const listener of historyListeners) try {
			listener(snapshot);
		} catch (error) {
			console.error("[KICK Enhancer] Log history listener failed.", error);
		}
	}
	function cancelHistoryNotification() {
		if (historyNotifyTimer === void 0) return;
		globalThis.clearTimeout(historyNotifyTimer);
		historyNotifyTimer = void 0;
	}
	function flushHistoryListeners() {
		cancelHistoryNotification();
		notifyHistoryListeners();
	}
	function scheduleHistoryNotification() {
		if (historyListeners.size === 0 || historyNotifyTimer !== void 0) return;
		historyNotifyTimer = globalThis.setTimeout(() => {
			historyNotifyTimer = void 0;
			notifyHistoryListeners();
		}, HISTORY_NOTIFY_INTERVAL_MS);
	}
	function matchesPattern(scope, pattern) {
		if (pattern === "*") return true;
		if (pattern.endsWith("*")) return scope.startsWith(pattern.slice(0, -1));
		return scope === pattern;
	}
	function rebuildScopePatterns(filters) {
		const excluded = [];
		const included = [];
		for (const pattern of filters) if (pattern.startsWith("-")) excluded.push(pattern.slice(1));
		else included.push(pattern);
		excludedScopePatterns = excluded;
		includedScopePatterns = included;
	}
	function matchesAnyPattern(scope, patterns) {
		for (const pattern of patterns) if (matchesPattern(scope, pattern)) return true;
		return false;
	}
	rebuildScopePatterns(config.filters);
	function isScopeEnabled(scope) {
		return (includedScopePatterns.length === 0 || matchesAnyPattern(scope, includedScopePatterns)) && !matchesAnyPattern(scope, excludedScopePatterns);
	}
	function remember(entry) {
		if (config.historyLimit <= 0) return;
		history.push(entry);
		if (history.length > config.historyLimit) history = config.historyLimit === 0 ? [] : history.slice(-config.historyLimit);
		scheduleHistoryNotification();
	}
	function write(level, scope, values) {
		remember({
			arguments: values,
			id: nextLogEntryId,
			level,
			scope,
			timestamp: Date.now()
		});
		nextLogEntryId += 1;
		if (LEVEL_VALUES[level] < LEVEL_VALUES[config.level] || !isScopeEnabled(scope)) return;
		const method = console[level].bind(console);
		if (!config.colors) {
			method(`[KICK Enhancer] [${scope}]`, ...values);
			return;
		}
		method("%cKICK Enhancer%c %s%c", BRAND_STYLE, `${SCOPE_STYLE}; ${LEVEL_STYLES[level]}`, scope, RESET_STYLE, ...values);
	}
	function createLogger(scope) {
		return {
			child: (childScope) => createLogger(`${scope}:${childScope}`),
			debug: (...values) => write("debug", scope, values),
			error: (...values) => write("error", scope, values),
			info: (...values) => write("info", scope, values),
			warn: (...values) => write("warn", scope, values)
		};
	}
	function getLogHistory() {
		return [...history];
	}
	function clearLogHistory() {
		if (history.length === 0) return;
		history = [];
		flushHistoryListeners();
	}
	function subscribeLogHistory(listener) {
		historyListeners.add(listener);
		return () => {
			historyListeners.delete(listener);
			if (historyListeners.size === 0) cancelHistoryNotification();
		};
	}
	var CHAT_FONT_FAMILIES = [
		"arial",
		"verdana",
		"tahoma",
		"trebuchet",
		"georgia",
		"monospace"
	];
	var CHAT_FONT_WEIGHTS = [
		100,
		200,
		300,
		400,
		500,
		600,
		700,
		800,
		900
	];
	var DEFAULT_SETTINGS = {
		chat: {
			fontFamily: null,
			fontSize: null,
			fontWeight: null,
			messageDividers: false,
			messageSpacing: null,
			showChatStatistics: false
		},
		ui: {
			hideChatLeaderboard: false,
			hideFollowingRecommendations: false,
			hideGamblingStreams: false,
			hideHomepageCarousel: false,
			hideRecommendedChannels: false,
			rememberSidebarState: false,
			showClipDownloadButtons: true,
			showHiddenViewerCounts: true,
			showStreamUptime: false,
			sidebarCollapsed: false
		},
		version: 7
	};
	function parseSettings(value) {
		if (!isRecord$4(value)) return DEFAULT_SETTINGS;
		const chat = isRecord$4(value.chat) ? value.chat : {};
		const ui = isRecord$4(value.ui) ? value.ui : {};
		return {
			chat: {
				fontFamily: normalizeChatFontFamily(chat.fontFamily),
				fontSize: normalizeChatValue(chat.fontSize, 10, 24),
				fontWeight: normalizeChatFontWeight(chat.fontWeight),
				messageDividers: chat.messageDividers === true,
				messageSpacing: normalizeChatValue(chat.messageSpacing, 0, 12),
				showChatStatistics: chat.showChatStatistics === true
			},
			ui: {
				hideChatLeaderboard: ui.hideChatLeaderboard === true,
				hideFollowingRecommendations: ui.hideFollowingRecommendations === true,
				hideGamblingStreams: ui.hideGamblingStreams === true,
				hideHomepageCarousel: ui.hideHomepageCarousel === true,
				hideRecommendedChannels: ui.hideRecommendedChannels === true,
				rememberSidebarState: ui.rememberSidebarState === true,
				showClipDownloadButtons: ui.showClipDownloadButtons !== false,
				showHiddenViewerCounts: ui.showHiddenViewerCounts !== false,
				showStreamUptime: ui.showStreamUptime === true,
				sidebarCollapsed: ui.sidebarCollapsed === true
			},
			version: 7
		};
	}
	function parseSettingsFile(text) {
		let value;
		try {
			value = JSON.parse(text);
		} catch {
			return { ok: false };
		}
		if (!isRecord$4(value) || !hasRecognizedSetting(value)) return { ok: false };
		const settings = parseSettings(value);
		return {
			compatibilityWarning: !matchesCanonicalValue(value, settings),
			ok: true,
			settings
		};
	}
	function serializeSettings(settings) {
		return `${JSON.stringify(settings, null, 2)}\n`;
	}
	function normalizeChatFontFamily(value) {
		return typeof value === "string" && CHAT_FONT_FAMILIES.includes(value) ? value : null;
	}
	function normalizeChatFontWeight(value) {
		return typeof value === "number" && CHAT_FONT_WEIGHTS.includes(value) ? value : null;
	}
	function normalizeChatValue(value, min, max) {
		if (typeof value !== "number" || !Number.isFinite(value)) return null;
		return Math.min(max, Math.max(min, Math.round(value)));
	}
	function hasRecognizedSetting(value) {
		return hasRecognizedSectionValue(value.chat, DEFAULT_SETTINGS.chat) || hasRecognizedSectionValue(value.ui, DEFAULT_SETTINGS.ui);
	}
	function hasRecognizedSectionValue(value, expected) {
		return isRecord$4(value) && Object.keys(expected).some((key) => Object.prototype.hasOwnProperty.call(value, key));
	}
	function matchesCanonicalValue(value, expected) {
		if (!isRecord$4(expected)) return Object.is(value, expected);
		if (!isRecord$4(value)) return false;
		const expectedKeys = Object.keys(expected);
		const valueKeys = Object.keys(value);
		return expectedKeys.length === valueKeys.length && expectedKeys.every((key) => Object.prototype.hasOwnProperty.call(value, key) && matchesCanonicalValue(value[key], expected[key]));
	}
	function isRecord$4(value) {
		return value !== null && typeof value === "object" && !Array.isArray(value);
	}
	var DEFAULT_WRITE_DELAY_MS = 125;
	function createSettingsPersistence({ cancelTimer = globalThis.clearTimeout, delayMs = DEFAULT_WRITE_DELAY_MS, onError, scheduleTimer = globalThis.setTimeout, write }) {
		let flushAfterWrite = false;
		let inFlight;
		let latestValue;
		let pendingBurst;
		let timer;
		function ensurePendingBurst() {
			if (pendingBurst) return pendingBurst;
			let resolve = () => void 0;
			pendingBurst = {
				promise: new Promise((settle) => {
					resolve = settle;
				}),
				resolve
			};
			return pendingBurst;
		}
		function cancelPendingTimer() {
			if (timer === void 0) return;
			cancelTimer(timer);
			timer = void 0;
		}
		function settlePendingBurst() {
			if (timer !== void 0 || inFlight || latestValue !== void 0) return;
			const burst = pendingBurst;
			pendingBurst = void 0;
			burst?.resolve();
		}
		function schedulePendingTimer() {
			cancelPendingTimer();
			timer = scheduleTimer(() => {
				timer = void 0;
				startWrite();
			}, Math.max(0, delayMs));
		}
		function completeWrite(completedWrite, succeeded) {
			if (inFlight !== completedWrite) return;
			inFlight = void 0;
			if (succeeded && latestValue === completedWrite.value) latestValue = void 0;
			if (latestValue !== void 0) {
				if (flushAfterWrite) {
					flushAfterWrite = false;
					startWrite();
				} else schedulePendingTimer();
				return;
			}
			flushAfterWrite = false;
			settlePendingBurst();
		}
		function startWrite() {
			if (inFlight || latestValue === void 0) {
				settlePendingBurst();
				return;
			}
			cancelPendingTimer();
			const value = latestValue;
			latestValue = void 0;
			const promise = Promise.resolve().then(() => write(value)).then(() => true, (error) => {
				onError(error);
				return false;
			});
			const currentWrite = {
				promise,
				value
			};
			inFlight = currentWrite;
			promise.then((succeeded) => {
				completeWrite(currentWrite, succeeded);
			});
		}
		return {
			flush() {
				cancelPendingTimer();
				if (inFlight) flushAfterWrite = true;
				else startWrite();
				return pendingBurst?.promise ?? Promise.resolve();
			},
			schedule(value) {
				latestValue = value;
				const burst = ensurePendingBurst();
				if (!inFlight) schedulePendingTimer();
				return burst.promise;
			},
			whenIdle() {
				return pendingBurst?.promise ?? Promise.resolve();
			}
		};
	}
	var SETTINGS_KEY = "settings";
	var log$10 = createLogger("settings");
	var listeners$1 = new Set();
	var currentSettings = DEFAULT_SETTINGS;
	var persistenceLifecycleInstalled = false;
	var persistence = createSettingsPersistence({
		onError: (error) => {
			log$10.error("Save failed", error);
		},
		write: (serializedSettings) => _GM.setValue(SETTINGS_KEY, serializedSettings)
	});
	function notifyListeners() {
		for (const listener of listeners$1) listener(currentSettings);
	}
	async function initializeSettings() {
		installPersistenceLifecycle();
		try {
			const storedSettings = await _GM.getValue(SETTINGS_KEY, "");
			currentSettings = storedSettings ? parseSettings(JSON.parse(storedSettings)) : DEFAULT_SETTINGS;
		} catch (error) {
			log$10.warn("Load failed; using defaults", error);
			currentSettings = DEFAULT_SETTINGS;
		}
	}
	function getSettings() {
		return currentSettings;
	}
	function resetSettings() {
		return updateSettings(() => DEFAULT_SETTINGS);
	}
	function replaceSettings(settings) {
		return updateSettings(() => settings);
	}
	function subscribeSettings(listener) {
		listeners$1.add(listener);
		return () => {
			listeners$1.delete(listener);
		};
	}
	function observeSetting(selector, listener) {
		let currentValue = selector(currentSettings);
		listener(currentValue);
		return subscribeSettings((settings) => {
			const nextValue = selector(settings);
			if (Object.is(currentValue, nextValue)) return;
			currentValue = nextValue;
			listener(nextValue);
		});
	}
	function updateSettings(update) {
		const nextSettings = update(currentSettings);
		if (nextSettings === currentSettings) return persistence.whenIdle();
		currentSettings = nextSettings;
		notifyListeners();
		const serializedSettings = JSON.stringify(currentSettings);
		return persistence.schedule(serializedSettings);
	}
	function installPersistenceLifecycle() {
		if (persistenceLifecycleInstalled) return;
		persistenceLifecycleInstalled = true;
		window.addEventListener("pagehide", flushPersistence);
		document.addEventListener("visibilitychange", handleVisibilityChange);
	}
	function flushPersistence() {
		persistence.flush();
	}
	function handleVisibilityChange() {
		if (document.hidden) flushPersistence();
	}
	function createChatAppearanceStyles({ fontFamily, fontSize, fontWeight, messageDividers, messageSpacing }) {
		const declarations = [
			fontFamily === null ? void 0 : `font-family: ${FONT_FAMILY_STACKS[fontFamily]};`,
			fontSize === null ? void 0 : `--chatroom-font-size: ${fontSize}px;`,
			messageSpacing === null ? void 0 : `--chatroom-message-spacing: ${messageSpacing}px;`
		].filter((declaration) => declaration !== void 0);
		const rules = [];
		if (declarations.length > 0) rules.push(`#channel-chatroom {\n  ${declarations.join("\n  ")}\n}`);
		if (messageDividers) rules.push([
			"#chatroom-messages > div > [data-index] [data-emote-id] {",
			"  height: calc(var(--chatroom-font-size)*28/13);",
			"}",
			"",
			"#chatroom-messages > div > [data-index]::before {",
			"  position: absolute;",
			"  inset: 0;",
			"  pointer-events: none;",
			"  content: \"\";",
			"}",
			"",
			"#chatroom-messages > div > [data-index]::after {",
			"  position: absolute;",
			"  right: 0;",
			"  bottom: 0;",
			"  left: 0;",
			"  height: 1px;",
			"  pointer-events: none;",
			"  content: \"\";",
			"  background: #161616;",
			"}",
			"",
			"@media (hover: hover) {",
			"  #chatroom-messages > div > [data-index]:hover::before {",
			"    background: var(--neon-surface-highest, #232629);",
			"  }",
			"",
			"  #chatroom-messages > div > [data-index] [class~=\"betterhover:group-hover:bg-surface-highest\"] {",
			"    background: transparent !important;",
			"    border-radius: 0;",
			"  }",
			"}"
		].join("\n"));
		if (fontWeight !== null) rules.push([
			"#chatroom-messages > div > [data-index] .font-normal[class~=\"leading-[1.55]\"] {",
			`  font-weight: ${fontWeight};`,
			"}"
		].join("\n"));
		if (rules.length === 0) return "";
		return rules.join("\n\n");
	}
	var FONT_FAMILY_STACKS = {
		arial: "Arial, Helvetica, sans-serif",
		georgia: "Georgia, \"Times New Roman\", serif",
		monospace: "ui-monospace, Consolas, \"Courier New\", monospace",
		tahoma: "Tahoma, Verdana, sans-serif",
		trebuchet: "\"Trebuchet MS\", Arial, sans-serif",
		verdana: "Verdana, Geneva, sans-serif"
	};
	var STYLE_ID$10 = "kick-enhancer-chat-appearance";
	var stopActiveFeature$5;
	function startChatAppearance() {
		stopActiveFeature$5?.();
		let stopped = false;
		const stopObserving = observeSetting((settings) => settings.chat, applyChatAppearance);
		const stop = () => {
			if (stopped) return;
			stopped = true;
			stopObserving();
			document.getElementById(STYLE_ID$10)?.remove();
			if (stopActiveFeature$5 === stop) stopActiveFeature$5 = void 0;
		};
		stopActiveFeature$5 = stop;
		return stop;
	}
	function applyChatAppearance(settings) {
		const styles = createChatAppearanceStyles(settings);
		const existingStyle = document.getElementById(STYLE_ID$10);
		if (!styles) {
			existingStyle?.remove();
			return;
		}
		if (existingStyle) {
			if (existingStyle.textContent !== styles) existingStyle.textContent = styles;
			return;
		}
		const style = document.createElement("style");
		style.id = STYLE_ID$10;
		style.textContent = styles;
		document.documentElement.append(style);
	}
	var chatLeaderboard_default = "#channel-chatroom div:has(> button[aria-label=\"Expand leaderboard\"]) {\n  display: none !important;\n}";
	function applyStyleToggle(id, styles, enabled) {
		const existingStyle = document.getElementById(id);
		if (!enabled) {
			existingStyle?.remove();
			return;
		}
		if (existingStyle) return;
		const style = document.createElement("style");
		style.id = id;
		style.textContent = styles;
		document.documentElement.append(style);
	}
	function createStyleSettingFeature({ id, selectEnabled, styles }) {
		let stopActiveFeature;
		return function startStyleSettingFeature() {
			stopActiveFeature?.();
			let stopped = false;
			const stopObserving = observeSetting(selectEnabled, (enabled) => applyStyleToggle(id, styles, enabled));
			const stop = () => {
				if (stopped) return;
				stopped = true;
				stopObserving();
				applyStyleToggle(id, styles, false);
				if (stopActiveFeature === stop) stopActiveFeature = void 0;
			};
			stopActiveFeature = stop;
			return stop;
		};
	}
	var startChatLeaderboardVisibility = createStyleSettingFeature({
		id: "kick-enhancer-hide-chat-leaderboard",
		selectEnabled: (settings) => settings.ui.hideChatLeaderboard,
		styles: chatLeaderboard_default
	});
	var n;
	var l$1;
	var u$2;
	var i$2;
	var r$1;
	var o$1;
	var e$1;
	var f$2;
	var c$1;
	var a$1;
	var s$1;
	var h$1;
	var p$1;
	var v$1;
	var d$1 = {};
	var w$1 = [];
	var _$1 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
	var g$2 = Array.isArray;
	function m$1(n, l) {
		for (var u in l) n[u] = l[u];
		return n;
	}
	function b(n) {
		n && n.parentNode && n.parentNode.removeChild(n);
	}
	function k$1(l, u, t) {
		var i, r, o, e = {};
		for (o in u) "key" == o ? i = u[o] : "ref" == o ? r = u[o] : e[o] = u[o];
		if (arguments.length > 2 && (e.children = arguments.length > 3 ? n.call(arguments, 2) : t), "function" == typeof l && null != l.defaultProps) for (o in l.defaultProps) void 0 === e[o] && (e[o] = l.defaultProps[o]);
		return x(l, e, i, r, null);
	}
	function x(n, t, i, r, o) {
		var e = {
			type: n,
			props: t,
			key: i,
			ref: r,
			__k: null,
			__: null,
			__b: 0,
			__e: null,
			__c: null,
			constructor: void 0,
			__v: null == o ? ++u$2 : o,
			__i: -1,
			__u: 0
		};
		return null == o && null != l$1.vnode && l$1.vnode(e), e;
	}
	function S(n) {
		return n.children;
	}
	function C$1(n, l) {
		this.props = n, this.context = l;
	}
	function $$1(n, l) {
		if (null == l) return n.__ ? $$1(n.__, n.__i + 1) : null;
		for (var u; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
		return "function" == typeof n.type ? $$1(n) : null;
	}
	function I(n) {
		if (n.__P && n.__d) {
			var u = n.__v, t = u.__e, i = [], r = [], o = m$1({}, u);
			o.__v = u.__v + 1, l$1.vnode && l$1.vnode(o), q$2(n.__P, o, u, n.__n, n.__P.namespaceURI, 32 & u.__u ? [t] : null, i, null == t ? $$1(u) : t, !!(32 & u.__u), r), o.__v = u.__v, o.__.__k[o.__i] = o, D$1(i, o, r), u.__e = u.__ = null, o.__e != t && P$1(o);
		}
	}
	function P$1(n) {
		if (null != (n = n.__) && null != n.__c) return n.__e = n.__c.base = null, n.__k.some(function(l) {
			if (null != l && null != l.__e) return n.__e = n.__c.base = l.__e;
		}), P$1(n);
	}
	function A$2(n) {
		(!n.__d && (n.__d = !0) && i$2.push(n) && !H$1.__r++ || r$1 != l$1.debounceRendering) && ((r$1 = l$1.debounceRendering) || o$1)(H$1);
	}
	function H$1() {
		try {
			for (var n, l = 1; i$2.length;) i$2.length > l && i$2.sort(e$1), n = i$2.shift(), l = i$2.length, I(n);
		} finally {
			i$2.length = H$1.__r = 0;
		}
	}
	function L(n, l, u, t, i, r, o, e, f, c, a) {
		var s, h, p, v, y, _, g, m = t && t.__k || w$1, b = l.length;
		for (f = T$2(u, l, m, f, b), s = 0; s < b; s++) null != (p = u.__k[s]) && (h = -1 != p.__i && m[p.__i] || d$1, p.__i = s, _ = q$2(n, p, h, i, r, o, e, f, c, a), v = p.__e, p.ref && h.ref != p.ref && (h.ref && J$1(h.ref, null, p), a.push(p.ref, p.__c || v, p)), null == y && null != v && (y = v), (g = !!(4 & p.__u)) || h.__k === p.__k ? (f = j$2(p, f, n, g), g && h.__e && (h.__e = null)) : "function" == typeof p.type && void 0 !== _ ? f = _ : v && (f = v.nextSibling), p.__u &= -7);
		return u.__e = y, f;
	}
	function T$2(n, l, u, t, i) {
		var r, o, e, f, c, a = u.length, s = a, h = 0;
		for (n.__k = new Array(i), r = 0; r < i; r++) null != (o = l[r]) && "boolean" != typeof o && "function" != typeof o ? ("string" == typeof o || "number" == typeof o || "bigint" == typeof o || o.constructor == String ? o = n.__k[r] = x(null, o, null, null, null) : g$2(o) ? o = n.__k[r] = x(S, { children: o }, null, null, null) : void 0 === o.constructor && o.__b > 0 ? o = n.__k[r] = x(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : n.__k[r] = o, f = r + h, o.__ = n, o.__b = n.__b + 1, e = null, -1 != (c = o.__i = O$1(o, u, f, s)) && (s--, (e = u[c]) && (e.__u |= 2)), null == e || null == e.__v ? (-1 == c && (i > a ? h-- : i < a && h++), "function" != typeof o.type && (o.__u |= 4)) : c != f && (c == f - 1 ? h-- : c == f + 1 ? h++ : (c > f ? h-- : h++, o.__u |= 4))) : n.__k[r] = null;
		if (s) for (r = 0; r < a; r++) null != (e = u[r]) && 0 == (2 & e.__u) && (e.__e == t && (t = $$1(e)), K$1(e, e));
		return t;
	}
	function j$2(n, l, u, t) {
		var i, r;
		if ("function" == typeof n.type) {
			for (i = n.__k, r = 0; i && r < i.length; r++) i[r] && (i[r].__ = n, l = j$2(i[r], l, u, t));
			return l;
		}
		n.__e != l && (t && (l && n.type && !l.parentNode && (l = $$1(n)), u.insertBefore(n.__e, l || null)), l = n.__e);
		do
			l = l && l.nextSibling;
		while (null != l && 8 == l.nodeType);
		return l;
	}
	function F(n, l) {
		return l = l || [], null == n || "boolean" == typeof n || (g$2(n) ? n.some(function(n) {
			F(n, l);
		}) : l.push(n)), l;
	}
	function O$1(n, l, u, t) {
		var i, r, o, e = n.key, f = n.type, c = l[u], a = null != c && 0 == (2 & c.__u);
		if (null === c && null == e || a && e == c.key && f == c.type) return u;
		if (t > (a ? 1 : 0)) {
			for (i = u - 1, r = u + 1; i >= 0 || r < l.length;) if (null != (c = l[o = i >= 0 ? i-- : r++]) && 0 == (2 & c.__u) && e == c.key && f == c.type) return o;
		}
		return -1;
	}
	function z$1(n, l, u) {
		"-" == l[0] ? n.setProperty(l, null == u ? "" : u) : n[l] = null == u ? "" : "number" != typeof u || _$1.test(l) ? u : u + "px";
	}
	function N$1(n, l, u, t, i) {
		var r, o;
		n: if ("style" == l) if ("string" == typeof u) n.style.cssText = u;
		else {
			if ("string" == typeof t && (n.style.cssText = t = ""), t) for (l in t) u && l in u || z$1(n.style, l, "");
			if (u) for (l in u) t && u[l] == t[l] || z$1(n.style, l, u[l]);
		}
		else if ("o" == l[0] && "n" == l[1]) r = l != (l = l.replace(s$1, "$1")), o = l.toLowerCase(), l = o in n || "onFocusOut" == l || "onFocusIn" == l ? o.slice(2) : l.slice(2), n.l || (n.l = {}), n.l[l + r] = u, u ? t ? u[a$1] = t[a$1] : (u[a$1] = h$1, n.addEventListener(l, r ? v$1 : p$1, r)) : n.removeEventListener(l, r ? v$1 : p$1, r);
		else {
			if ("http://www.w3.org/2000/svg" == i) l = l.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
			else if ("width" != l && "height" != l && "href" != l && "list" != l && "form" != l && "tabIndex" != l && "download" != l && "rowSpan" != l && "colSpan" != l && "role" != l && "popover" != l && l in n) try {
				n[l] = null == u ? "" : u;
				break n;
			} catch (n) {}
			"function" == typeof u || (null == u || !1 === u && "-" != l[4] ? n.removeAttribute(l) : n.setAttribute(l, "popover" == l && 1 == u ? "" : u));
		}
	}
	function V$1(n) {
		return function(u) {
			if (this.l) {
				var t = this.l[u.type + n];
				if (null == u[c$1]) u[c$1] = h$1++;
				else if (u[c$1] < t[a$1]) return;
				return t(l$1.event ? l$1.event(u) : u);
			}
		};
	}
	function q$2(n, u, t, i, r, o, e, f, c, a) {
		var s, h, p, v, y, d, _, k, x, M, $, I, P, A, H, T, j = u.type;
		if (void 0 !== u.constructor) return null;
		128 & t.__u && (c = !!(32 & t.__u), o = [f = u.__e = t.__e]), (s = l$1.__b) && s(u);
		n: if ("function" == typeof j) {
			h = e.length;
			try {
				if (x = u.props, M = j.prototype && j.prototype.render, $ = (s = j.contextType) && i[s.__c], I = s ? $ ? $.props.value : s.__ : i, t.__c ? k = (p = u.__c = t.__c).__ = p.__E : (M ? u.__c = p = new j(x, I) : (u.__c = p = new C$1(x, I), p.constructor = j, p.render = Q$1), $ && $.sub(p), p.state || (p.state = {}), p.__n = i, v = p.__d = !0, p.__h = [], p._sb = []), M && null == p.__s && (p.__s = p.state), M && null != j.getDerivedStateFromProps && (p.__s == p.state && (p.__s = m$1({}, p.__s)), m$1(p.__s, j.getDerivedStateFromProps(x, p.__s))), y = p.props, d = p.state, p.__v = u, v) M && null == j.getDerivedStateFromProps && null != p.componentWillMount && p.componentWillMount(), M && null != p.componentDidMount && p.__h.push(p.componentDidMount);
				else {
					if (M && null == j.getDerivedStateFromProps && x !== y && null != p.componentWillReceiveProps && p.componentWillReceiveProps(x, I), u.__v == t.__v || !p.__e && null != p.shouldComponentUpdate && !1 === p.shouldComponentUpdate(x, p.__s, I)) {
						u.__v != t.__v && (p.props = x, p.state = p.__s, p.__d = !1), u.__e = t.__e, u.__k = t.__k, u.__k.some(function(n) {
							n && (n.__ = u);
						}), w$1.push.apply(p.__h, p._sb), p._sb = [], p.__h.length && e.push(p);
						break n;
					}
					null != p.componentWillUpdate && p.componentWillUpdate(x, p.__s, I), M && null != p.componentDidUpdate && p.__h.push(function() {
						p.componentDidUpdate(y, d, _);
					});
				}
				if (p.context = I, p.props = x, p.__P = n, p.__e = !1, P = l$1.__r, A = 0, M) p.state = p.__s, p.__d = !1, P && P(u), s = p.render(p.props, p.state, p.context), w$1.push.apply(p.__h, p._sb), p._sb = [];
				else do
					p.__d = !1, P && P(u), s = p.render(p.props, p.state, p.context), p.state = p.__s;
				while (p.__d && ++A < 25);
				p.state = p.__s, null != p.getChildContext && (i = m$1(m$1({}, i), p.getChildContext())), M && !v && null != p.getSnapshotBeforeUpdate && (_ = p.getSnapshotBeforeUpdate(y, d)), H = null != s && s.type === S && null == s.key ? E$1(s.props.children) : s, f = L(n, g$2(H) ? H : [H], u, t, i, r, o, e, f, c, a), p.base = u.__e, u.__u &= -161, p.__h.length && e.push(p), k && (p.__E = p.__ = null);
			} catch (n) {
				if (e.length = h, u.__v = null, c || null != o) {
					if (n.then) {
						for (u.__u |= c ? 160 : 128; f && 8 == f.nodeType && f.nextSibling;) f = f.nextSibling;
						null != o && (o[o.indexOf(f)] = null), u.__e = f;
					} else if (null != o) for (T = o.length; T--;) b(o[T]);
				} else u.__e = t.__e;
				u.__k ??= t.__k || [], n.then || B$2(u), l$1.__e(n, u, t);
			}
		} else null == o && u.__v == t.__v ? (u.__k = t.__k, u.__e = t.__e) : f = u.__e = G$1(t.__e, u, t, i, r, o, e, c, a);
		return (s = l$1.diffed) && s(u), 128 & u.__u ? void 0 : f;
	}
	function B$2(n) {
		n && (n.__c && (n.__c.__e = !0), n.__k && n.__k.some(B$2));
	}
	function D$1(n, u, t) {
		for (var i = 0; i < t.length; i++) J$1(t[i], t[++i], t[++i]);
		l$1.__c && l$1.__c(u, n), n.some(function(u) {
			try {
				n = u.__h, u.__h = [], n.some(function(n) {
					n.call(u);
				});
			} catch (n) {
				l$1.__e(n, u.__v);
			}
		});
	}
	function E$1(n) {
		return "object" != typeof n || null == n || n.__b > 0 ? n : g$2(n) ? n.map(E$1) : void 0 !== n.constructor ? null : m$1({}, n);
	}
	function G$1(u, t, i, r, o, e, f, c, a) {
		var s, h, p, v, y, w, _, m = i.props || d$1, k = t.props, x = t.type;
		if ("svg" == x ? o = "http://www.w3.org/2000/svg" : "math" == x ? o = "http://www.w3.org/1998/Math/MathML" : o || (o = "http://www.w3.org/1999/xhtml"), null != e) {
			for (s = 0; s < e.length; s++) if ((y = e[s]) && "setAttribute" in y == !!x && (x ? y.localName == x : 3 == y.nodeType)) {
				u = y, e[s] = null;
				break;
			}
		}
		if (null == u) {
			if (null == x) return document.createTextNode(k);
			u = document.createElementNS(o, x, k.is && k), c && (l$1.__m && l$1.__m(t, e), c = !1), e = null;
		}
		if (null == x) m === k || c && u.data == k || (u.data = k);
		else {
			if (e = "textarea" == x && null != k.defaultValue ? null : e && n.call(u.childNodes), !c && null != e) for (m = {}, s = 0; s < u.attributes.length; s++) m[(y = u.attributes[s]).name] = y.value;
			for (s in m) y = m[s], "dangerouslySetInnerHTML" == s ? p = y : "children" == s || s in k || "value" == s && "defaultValue" in k || "checked" == s && "defaultChecked" in k || N$1(u, s, null, y, o);
			for (s in k) y = k[s], "children" == s ? v = y : "dangerouslySetInnerHTML" == s ? h = y : "value" == s ? w = y : "checked" == s ? _ = y : c && "function" != typeof y || m[s] === y || N$1(u, s, y, m[s], o);
			if (h) c || p && (h.__html == p.__html || h.__html == u.innerHTML) || (u.innerHTML = h.__html), t.__k = [];
			else if (p && (u.innerHTML = ""), L("template" == t.type ? u.content : u, g$2(v) ? v : [v], t, i, r, "foreignObject" == x ? "http://www.w3.org/1999/xhtml" : o, e, f, e ? e[0] : i.__k && $$1(i, 0), c, a), null != e) for (s = e.length; s--;) b(e[s]);
			c && "textarea" != x || (s = "value", "progress" == x && null == w ? u.removeAttribute("value") : null != w && (w !== u[s] || "progress" == x && !w || "option" == x && w != m[s]) && N$1(u, s, w, m[s], o), s = "checked", null != _ && _ != u[s] && N$1(u, s, _, m[s], o));
		}
		return u;
	}
	function J$1(n, u, t) {
		try {
			if ("function" == typeof n) {
				var i = "function" == typeof n.__u;
				i && n.__u(), i && null == u || (n.__u = n(u));
			} else n.current = u;
		} catch (n) {
			l$1.__e(n, t);
		}
	}
	function K$1(n, u, t) {
		var i, r;
		if (l$1.unmount && l$1.unmount(n), (i = n.ref) && (i.current && i.current != n.__e || J$1(i, null, u)), null != (i = n.__c)) {
			if (i.componentWillUnmount) try {
				i.componentWillUnmount();
			} catch (n) {
				l$1.__e(n, u);
			}
			i.base = i.__P = i.__n = null;
		}
		if (i = n.__k) for (r = 0; r < i.length; r++) i[r] && K$1(i[r], u, t || "function" != typeof n.type);
		t || b(n.__e), n.__c = n.__ = n.__e = void 0;
	}
	function Q$1(n, l, u) {
		return this.constructor(n, u);
	}
	function R(u, t, i) {
		var r, o, e, f;
		t == document && (t = document.documentElement), l$1.__ && l$1.__(u, t), o = (r = "function" == typeof i) ? null : i && i.__k || t.__k, e = [], f = [], q$2(t, u = (!r && i || t).__k = k$1(S, null, [u]), o || d$1, d$1, t.namespaceURI, !r && i ? [i] : o ? null : t.firstChild ? n.call(t.childNodes) : null, e, !r && i ? i : o ? o.__e : t.firstChild, r, f), D$1(e, u, f), u.props.children = null;
	}
	n = w$1.slice, l$1 = { __e: function(n, l, u, t) {
		for (var i, r, o; l = l.__;) if ((i = l.__c) && !i.__) try {
			if ((r = i.constructor) && null != r.getDerivedStateFromError && (i.setState(r.getDerivedStateFromError(n)), o = i.__d), null != i.componentDidCatch && (i.componentDidCatch(n, t || {}), o = i.__d), o) return i.__E = i;
		} catch (l) {
			n = l;
		}
		throw n;
	} }, u$2 = 0, C$1.prototype.setState = function(n, l) {
		var u = null != this.__s && this.__s != this.state ? this.__s : this.__s = m$1({}, this.state);
		"function" == typeof n && (n = n(m$1({}, u), this.props)), n && m$1(u, n), null != n && this.__v && (l && this._sb.push(l), A$2(this));
	}, C$1.prototype.forceUpdate = function(n) {
		this.__v && (this.__e = !0, n && this.__h.push(n), A$2(this));
	}, C$1.prototype.render = S, i$2 = [], o$1 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e$1 = function(n, l) {
		return n.__v.__b - l.__v.__b;
	}, H$1.__r = 0, f$2 = Math.random().toString(8), c$1 = "__d" + f$2, a$1 = "__a" + f$2, s$1 = /(PointerCapture)$|Capture$/i, h$1 = 0, p$1 = V$1(!1), v$1 = V$1(!0);
	var t;
	var r;
	var u$1;
	var i$1;
	var o = 0;
	var f$1 = [];
	var c = l$1;
	var e = c.__b;
	var a = c.__r;
	var v = c.diffed;
	var l = c.__c;
	var m = c.unmount;
	var p = c.__;
	function s(n, t) {
		c.__h && c.__h(r, n, o || t), o = 0;
		var u = r.__H || (r.__H = {
			__: [],
			__h: []
		});
		return n >= u.__.length && u.__.push({}), u.__[n];
	}
	function d(n) {
		return o = 1, y(D, n);
	}
	function y(n, u, i) {
		var o = s(t++, 2);
		if (o.t = n, !o.__c && (o.__ = [i ? i(u) : D(void 0, u), function(n) {
			var t = o.__N ? o.__N[0] : o.__[0], r = o.t(t, n);
			t !== r && (o.__N = [r, o.__[1]], o.__c.setState({}));
		}], o.__c = r, !r.__f)) {
			var f = function(n, t, r) {
				if (!o.__c.__H) return !0;
				var u = !1, i = o.__c.props !== n;
				if (o.__c.__H.__.some(function(n) {
					if (n.__N) {
						u = !0;
						var t = n.__[0];
						n.__ = n.__N, n.__N = void 0, t !== n.__[0] && (i = !0);
					}
				}), c) {
					var f = c.call(this, n, t, r);
					return u ? f || i : f;
				}
				return !u || i;
			};
			r.__f = !0;
			var c = r.shouldComponentUpdate, e = r.componentWillUpdate;
			r.componentWillUpdate = function(n, t, r) {
				if (this.__e) {
					var u = c;
					c = void 0, f(n, t, r), c = u;
				}
				e && e.call(this, n, t, r);
			}, r.shouldComponentUpdate = f;
		}
		return o.__N || o.__;
	}
	function h(n, u) {
		var i = s(t++, 3);
		!c.__s && C(i.__H, u) && (i.__ = n, i.u = u, r.__H.__h.push(i));
	}
	function _(n, u) {
		var i = s(t++, 4);
		!c.__s && C(i.__H, u) && (i.__ = n, i.u = u, r.__h.push(i));
	}
	function A$1(n) {
		return o = 5, T$1(function() {
			return { current: n };
		}, []);
	}
	function T$1(n, r) {
		var u = s(t++, 7);
		return C(u.__H, r) && (u.__ = n(), u.__H = r, u.__h = n), u.__;
	}
	function q$1(n, t) {
		return o = 8, T$1(function() {
			return n;
		}, t);
	}
	function g$1() {
		var n = s(t++, 11);
		if (!n.__) {
			for (var u = r.__v; null !== u && !u.__m && null !== u.__;) u = u.__;
			var i = u.__m || (u.__m = [0, 0]);
			n.__ = "P" + i[0] + "-" + i[1]++;
		}
		return n.__;
	}
	function j$1() {
		for (var n; n = f$1.shift();) {
			var t = n.__H;
			if (n.__P && t) try {
				t.__h.some(z), t.__h.some(B$1), t.__h = [];
			} catch (r) {
				t.__h = [], c.__e(r, n.__v);
			}
		}
	}
	c.__b = function(n) {
		r = null, e && e(n);
	}, c.__ = function(n, t) {
		n && t.__k && t.__k.__m && (n.__m = t.__k.__m), p && p(n, t);
	}, c.__r = function(n) {
		a && a(n), t = 0;
		var i = (r = n.__c).__H;
		i && (u$1 === r ? (i.__h = [], r.__h = [], i.__.some(function(n) {
			n.__N && (n.__ = n.__N), n.u = n.__N = void 0;
		})) : (i.__h.some(z), i.__h.some(B$1), i.__h = [], t = 0)), u$1 = r;
	}, c.diffed = function(n) {
		v && v(n);
		var t = n.__c;
		t && t.__H && (t.__H.__h.length && (1 !== f$1.push(t) && i$1 === c.requestAnimationFrame || ((i$1 = c.requestAnimationFrame) || w)(j$1)), t.__H.__.some(function(n) {
			n.u && (n.__H = n.u, n.u = void 0);
		})), u$1 = r = null;
	}, c.__c = function(n, t) {
		t.some(function(n) {
			try {
				n.__h.some(z), n.__h = n.__h.filter(function(n) {
					return !n.__ || B$1(n);
				});
			} catch (r) {
				t.some(function(n) {
					n.__h && (n.__h = []);
				}), t = [], c.__e(r, n.__v);
			}
		}), l && l(n, t);
	}, c.unmount = function(n) {
		m && m(n);
		var t, r = n.__c;
		r && r.__H && (r.__H.__.some(function(n) {
			try {
				z(n);
			} catch (n) {
				t = n;
			}
		}), r.__H = void 0, t && c.__e(t, r.__v));
	};
	var k = "function" == typeof requestAnimationFrame;
	function w(n) {
		var t, r = function() {
			clearTimeout(u), k && cancelAnimationFrame(t), setTimeout(n);
		}, u = setTimeout(r, 35);
		k && (t = requestAnimationFrame(r));
	}
	function z(n) {
		var t = r, u = n.__c;
		"function" == typeof u && (n.__c = void 0, u()), r = t;
	}
	function B$1(n) {
		var t = r;
		n.__c = n.__(), r = t;
	}
	function C(n, t) {
		return !n || n.length !== t.length || t.some(function(t, r) {
			return t !== n[r];
		});
	}
	function D(n, t) {
		return "function" == typeof t ? t(n) : t;
	}
	var DIGITS = Array.from({ length: 30 }, (_, index) => index % 10);
	var states = new WeakMap();
	function renderAnimatedNumber(container, value) {
		const formatted = formatNumber(value);
		const existing = states.get(container);
		if (existing?.value === formatted) return;
		cancelState(existing);
		if (prefersReducedMotion()) {
			container.textContent = formatted;
			states.set(container, {
				animations: [],
				value: formatted
			});
			return;
		}
		const fragment = document.createDocumentFragment();
		const reels = [];
		let digitIndex = 0;
		for (const character of formatted) {
			if (!/\d/.test(character)) {
				const separator = document.createElement("span");
				separator.className = "ke-animated-number__separator";
				separator.textContent = character;
				fragment.append(separator);
				continue;
			}
			const viewport = document.createElement("span");
			viewport.className = "ke-animated-number__digit";
			const reel = document.createElement("span");
			reel.className = "ke-animated-number__reel";
			for (const digit of DIGITS) {
				const cell = document.createElement("span");
				cell.className = "ke-animated-number__cell";
				cell.textContent = String(digit);
				reel.append(cell);
			}
			viewport.append(reel);
			fragment.append(viewport);
			reels.push({
				digit: Number(character),
				element: reel,
				index: digitIndex,
				viewport
			});
			digitIndex += 1;
		}
		container.replaceChildren(fragment);
		const state = {
			animations: [],
			value: formatted
		};
		states.set(container, state);
		state.frame = window.requestAnimationFrame(() => {
			state.frame = void 0;
			if (states.get(container) !== state || !container.isConnected) return;
			for (const reel of reels) {
				const digitHeight = reel.viewport.getBoundingClientRect().height;
				if (digitHeight <= 0) continue;
				const target = -(20 + reel.digit) * digitHeight;
				const animation = reel.element.animate([
					{ transform: "translateY(0)" },
					{
						offset: .82,
						transform: `translateY(${target - digitHeight * .3}px)`
					},
					{
						offset: .93,
						transform: `translateY(${target + digitHeight * .1}px)`
					},
					{ transform: `translateY(${target}px)` }
				], {
					delay: reel.index * 35,
					duration: 520 + reel.index * 70,
					easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
					fill: "backwards"
				});
				reel.element.style.transform = `translateY(${target}px)`;
				state.animations.push(animation);
			}
		});
	}
	function formatNumber(value) {
		return value.toLocaleString();
	}
	function cancelState(state) {
		if (!state) return;
		if (state.frame !== void 0) window.cancelAnimationFrame(state.frame);
		for (const animation of state.animations) animation.cancel();
	}
	function prefersReducedMotion() {
		return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	}
	var f = 0;
	Array.isArray;
	function u(e, t, n, o, i, u) {
		t || (t = {});
		var a, c, p = t;
		if ("ref" in p) for (c in p = {}, t) "ref" == c ? a = t[c] : p[c] = t[c];
		var l = {
			type: e,
			props: p,
			key: n,
			ref: a,
			__k: null,
			__: null,
			__b: 0,
			__e: null,
			__c: null,
			constructor: void 0,
			__v: --f,
			__i: -1,
			__u: 0,
			__source: i,
			__self: u
		};
		if ("function" == typeof e && (a = e.defaultProps)) for (c in a) void 0 === p[c] && (p[c] = a[c]);
		return l$1.vnode && l$1.vnode(l), l;
	}
	function AnimatedNumber({ value }) {
		const elementRef = A$1(null);
		_(() => {
			if (elementRef.current) renderAnimatedNumber(elementRef.current, value);
		}, [value]);
		return u("span", {
			"aria-label": value.toLocaleString(),
			className: "ke-animated-number",
			ref: elementRef
		});
	}
	function DownloadIcon({ class: className }) {
		return u("svg", {
			"aria-hidden": "true",
			class: className,
			fill: "none",
			viewBox: "0 0 24 24",
			children: [u("path", {
				d: "M14 8a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h3.293a.707.707 0 0 1 .5 1.207l-6.939 6.939a1.207 1.207 0 0 1-1.708 0l-6.94-6.94a.707.707 0 0 1 .5-1.206H8a1 1 0 0 0 1-1V9a1 1 0 0 1 1-1z",
				stroke: "currentColor",
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-width": "2"
			}), u("path", {
				d: "M9 4h6",
				stroke: "currentColor",
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-width": "2"
			})]
		});
	}
	function GitHubIcon({ class: className }) {
		return u("svg", {
			"aria-hidden": "true",
			class: className,
			fill: "currentColor",
			viewBox: "0 0 24 24",
			children: u("path", { d: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" })
		});
	}
	function LoadingSpinnerIcon({ class: className }) {
		return u("svg", {
			"aria-hidden": "true",
			class: className,
			fill: "none",
			viewBox: "0 0 24 24",
			children: [u("circle", {
				cx: "12",
				cy: "12",
				opacity: "0.25",
				r: "9",
				stroke: "currentColor",
				"stroke-width": "2.5"
			}), u("path", {
				d: "M12 3a9 9 0 0 1 9 9",
				stroke: "currentColor",
				"stroke-linecap": "round",
				"stroke-width": "2.5"
			})]
		});
	}
	function ChatStatisticsTrigger({ expanded, onToggle, snapshot }) {
		const calibrating = snapshot.status === "pending" || snapshot.status === "active" && Date.now() < snapshot.trendReadyAt;
		const unavailable = snapshot.status === "unavailable";
		const trend = snapshot.status === "active" && !calibrating ? formatTrend(snapshot.trendPercent) : null;
		return u("button", {
			"aria-controls": "kick-enhancer-chat-statistics-card",
			"aria-expanded": expanded,
			"aria-label": unavailable ? "Chat statistics unavailable" : "Toggle chat statistics",
			className: "ke-chat-statistics-trigger",
			onClick: onToggle,
			type: "button",
			children: [unavailable ? u("span", { children: "Chat" }) : u("span", { children: [u(AnimatedNumber, { value: snapshot.status === "active" ? snapshot.messagesPerMinute : 0 }), "/min"] }), unavailable ? u("span", {
				"aria-hidden": "true",
				className: "ke-chat-statistics-trigger__unavailable",
				children: "!"
			}) : calibrating ? u(LoadingSpinnerIcon, { class: "ke-chat-statistics-trigger__trend-loader" }) : trend ? u("span", {
				className: "ke-chat-statistics-trigger__trend",
				"data-tone": trend.tone,
				children: [
					trend.direction,
					u(AnimatedNumber, { value: trend.value }),
					"%"
				]
			}) : null]
		});
	}
	function ChatStatisticsCard({ onClose, snapshot }) {
		const calibrating = snapshot.status === "pending" || snapshot.status === "active" && Date.now() < snapshot.trendReadyAt;
		const trend = snapshot.status === "active" ? formatTrend(snapshot.trendPercent) : null;
		return u("section", {
			"aria-label": "Chat statistics",
			className: "ke-chat-statistics-card",
			id: "kick-enhancer-chat-statistics-card",
			children: [u("header", {
				className: "ke-chat-statistics-card__header",
				children: [u("span", {
					className: "ke-chat-statistics-card__title",
					children: [u("span", {
						"aria-hidden": "true",
						className: "ke-chat-statistics-card__live-dot",
						"data-status": calibrating ? "calibrating" : snapshot.status
					}), snapshot.status === "active" ? u("span", { children: [
						"Chat Statistics (ID:",
						" ",
						u("span", {
							className: "ke-chat-statistics-card__room-id",
							children: snapshot.chatroomId
						}),
						")"
					] }) : "Chat Statistics"]
				}), u("button", {
					"aria-label": "Close chat statistics",
					className: "ke-chat-statistics-card__close",
					onClick: onClose,
					type: "button",
					children: "×"
				})]
			}), snapshot.status === "unavailable" ? u("p", {
				className: "ke-chat-statistics-card__error",
				children: snapshot.reason === "multiple-sessions" ? "Multiple compatible chat sessions were detected, so no room was selected." : snapshot.reason === "capture-failed" ? "Chat socket observation could not be installed." : "The KICK chat socket connection failed."
			}) : u(S, { children: [u("div", {
				className: "ke-chat-statistics-card__primary",
				children: [u("span", {
					className: "ke-chat-statistics-card__rate",
					children: [
						u(AnimatedNumber, { value: snapshot.status === "active" ? snapshot.messagesPerMinute : 0 }),
						" ",
						u("small", { children: "msg/min" })
					]
				}), calibrating ? u("span", {
					className: "ke-chat-statistics-card__calibrating",
					children: "Calibrating..."
				}) : trend ? u("span", {
					className: "ke-chat-statistics-card__trend",
					"data-tone": trend.tone,
					children: [
						trend.direction,
						" ",
						u(AnimatedNumber, { value: trend.value }),
						"%"
					]
				}) : null]
			}), u("div", {
				className: "ke-chat-statistics-card__details",
				children: [
					u("span", { children: [
						u("strong", { children: u(AnimatedNumber, { value: snapshot.status === "active" ? snapshot.activeChatters : 0 }) }),
						" ",
						"unique chatters/min"
					] }),
					u("span", { children: [
						u("strong", { children: snapshot.status !== "active" || snapshot.socketRttMs === null ? "—" : u(S, { children: [u(AnimatedNumber, { value: snapshot.socketRttMs }), " ms"] }) }),
						" ",
						"socket RTT"
					] }),
					u("span", { children: [
						"Peak",
						" ",
						u("strong", { children: [
							u(AnimatedNumber, { value: snapshot.status === "active" ? snapshot.peakMessagesPerMinute : 0 }),
							" ",
							"msg/min"
						] })
					] }),
					u("span", { children: [
						u("strong", { children: u(AnimatedNumber, { value: snapshot.status === "active" ? snapshot.totalMessages : 0 }) }),
						" ",
						"total messages"
					] })
				]
			})] })]
		});
	}
	function formatTrend(value) {
		if (value === null) return null;
		if (value > 0) return {
			direction: "↑",
			tone: "positive",
			value
		};
		if (value < 0) return {
			direction: "↓",
			tone: "negative",
			value: Math.abs(value)
		};
		return {
			direction: "–",
			tone: "neutral",
			value: 0
		};
	}
	var CHAT_CHANNEL_PATTERN = /^chatrooms\.(\d+)\.v2$/;
	var CHAT_MESSAGE_EVENT = "App\\Events\\ChatMessageEvent";
	var KickChatAdapter = class {
		#sessions = new Map();
		accept(event, collectMessages = true) {
			if (event.type === "socketClosed") return this.#endSocketSessions(event.socketId, event.observedAt);
			if (event.type !== "subscribing" && event.type !== "subscribed" && event.type !== "unsubscribing" && event.type !== "event") return [];
			const match = CHAT_CHANNEL_PATTERN.exec(event.channelName);
			if (!match) return [];
			const chatroomId = match[1];
			if (!chatroomId) return [];
			const key = createSessionKey$1(event.socketId, event.channelName);
			if (event.type === "subscribing") {
				const existing = this.#sessions.get(key);
				this.#sessions.set(key, {
					channelName: event.channelName,
					chatroomId,
					confirmed: false,
					socketId: event.socketId
				});
				return existing?.confirmed ? [createSessionEvent("sessionEnded", existing, event.observedAt)] : [];
			}
			if (event.type === "unsubscribing") {
				const existing = this.#sessions.get(key);
				this.#sessions.delete(key);
				return existing?.confirmed ? [createSessionEvent("sessionEnded", existing, event.observedAt)] : [];
			}
			const session = this.#sessions.get(key);
			if (!session) return [];
			if (event.type === "subscribed") {
				if (session.confirmed) return [];
				const confirmed = {
					...session,
					confirmed: true
				};
				this.#sessions.set(key, confirmed);
				return [createSessionEvent("sessionStarted", confirmed, event.observedAt)];
			}
			if (!session.confirmed || !collectMessages || event.eventName !== CHAT_MESSAGE_EVENT) return [];
			const message = decodeMessage(decodeEventData(event.data), chatroomId);
			if (!message) return [];
			return [{
				channelName: session.channelName,
				chatroomId: session.chatroomId,
				messageId: message.messageId,
				messageType: message.messageType,
				observedAt: event.observedAt,
				senderId: message.senderId,
				socketId: session.socketId,
				type: "message"
			}];
		}
		#endSocketSessions(socketId, observedAt) {
			const ended = [];
			for (const [key, session] of this.#sessions) {
				if (session.socketId !== socketId) continue;
				this.#sessions.delete(key);
				if (session.confirmed) ended.push(createSessionEvent("sessionEnded", session, observedAt));
			}
			return ended;
		}
	};
	function decodeEventData(value) {
		if (typeof value !== "string") return value;
		try {
			return JSON.parse(value);
		} catch {
			return value;
		}
	}
	function decodeMessage(data, chatroomId) {
		if (!isRecord$3(data) || !isId(data.id)) return null;
		if (!isId(data.chatroom_id) || String(data.chatroom_id) !== chatroomId || typeof data.type !== "string" || !isRecord$3(data.sender) || !isId(data.sender.id)) return null;
		return {
			messageId: String(data.id),
			messageType: data.type,
			senderId: String(data.sender.id)
		};
	}
	function createSessionEvent(type, session, observedAt) {
		return {
			channelName: session.channelName,
			chatroomId: session.chatroomId,
			observedAt,
			socketId: session.socketId,
			type
		};
	}
	function createSessionKey$1(socketId, channelName) {
		return `${socketId}:${channelName}`;
	}
	function isId(value) {
		return typeof value === "string" && value.length > 0 || typeof value === "number" && Number.isFinite(value);
	}
	function isRecord$3(value) {
		return typeof value === "object" && value !== null;
	}
	function decodePusherEvent(event) {
		if (event.type === "closed") return {
			observedAt: event.observedAt,
			socketId: event.socketId,
			type: "socketClosed"
		};
		if (event.type !== "frame" || typeof event.data !== "string") return null;
		const envelope = parseRecord(event.data);
		if (!envelope || typeof envelope.event !== "string") return null;
		const eventName = envelope.event;
		if (eventName === "pusher:ping" || eventName === "pusher:pong") return {
			direction: event.direction,
			observedAt: event.observedAt,
			socketId: event.socketId,
			type: eventName === "pusher:ping" ? "ping" : "pong"
		};
		if (event.direction === "outgoing" && (eventName === "pusher:subscribe" || eventName === "pusher:unsubscribe")) {
			const data = decodeData(envelope.data);
			const channelName = isRecord$2(data) ? data.channel : void 0;
			if (typeof channelName !== "string") return null;
			return {
				channelName,
				observedAt: event.observedAt,
				socketId: event.socketId,
				type: eventName === "pusher:subscribe" ? "subscribing" : "unsubscribing"
			};
		}
		const channelName = envelope.channel;
		if (typeof channelName !== "string") return null;
		if (event.direction === "incoming" && eventName === "pusher_internal:subscription_succeeded") return {
			channelName,
			observedAt: event.observedAt,
			socketId: event.socketId,
			type: "subscribed"
		};
		if (event.direction !== "incoming" || eventName.startsWith("pusher:")) return null;
		return {
			channelName,
			data: envelope.data,
			eventName,
			observedAt: event.observedAt,
			socketId: event.socketId,
			type: "event"
		};
	}
	function decodeData(value) {
		if (typeof value !== "string") return value;
		try {
			return JSON.parse(value);
		} catch {
			return value;
		}
	}
	function parseRecord(value) {
		try {
			const parsed = JSON.parse(value);
			return isRecord$2(parsed) ? parsed : null;
		} catch {
			return null;
		}
	}
	function isRecord$2(value) {
		return typeof value === "object" && value !== null;
	}
	var SocketRttTracker = class {
		#pending = new Map();
		clear() {
			this.#pending.clear();
		}
		accept(event) {
			if (event.type === "socketClosed") {
				this.#pending.delete(event.socketId);
				return null;
			}
			if (event.type === "ping" && event.direction === "outgoing") {
				if (!this.#pending.has(event.socketId)) this.#pending.set(event.socketId, event.observedAt);
				return null;
			}
			if (event.type !== "pong" || event.direction !== "incoming") return null;
			const pendingAt = this.#pending.get(event.socketId);
			if (pendingAt === void 0) return null;
			this.#pending.delete(event.socketId);
			const rttMs = event.observedAt - pendingAt;
			return Number.isFinite(rttMs) && rttMs >= 0 ? {
				rttMs,
				socketId: event.socketId
			} : null;
		}
		canStart(socketId, now, timeoutMs) {
			const pendingAt = this.#pending.get(socketId);
			if (pendingAt === void 0) return true;
			if (now - pendingAt <= timeoutMs) return false;
			this.#pending.delete(socketId);
			return true;
		}
	};
	var CURRENT_WINDOW_MS = 6e4;
	var RETAINED_WINDOW_MS = 12e4;
	var RTT_SAMPLE_LIMIT = 20;
	var ChatStatsStore = class {
		#rttSamples = new Map();
		#sessions = new Map();
		accept(event) {
			const key = createSessionKey(event.socketId, event.channelName);
			if (event.type === "sessionStarted") {
				this.#sessions.set(key, {
					activeSenderCounts: new Map(),
					chatroomId: event.chatroomId,
					confirmedAt: event.observedAt,
					currentWindowStartIndex: 0,
					firstRecordIndex: 0,
					peakMessagesPerMinute: 0,
					records: [],
					seenMessageIds: new Map(),
					socketId: event.socketId,
					totalMessages: 0
				});
				return;
			}
			if (event.type === "sessionEnded") {
				this.#sessions.delete(key);
				return;
			}
			if (event.type !== "message") return;
			const session = this.#sessions.get(key);
			if (!session || event.messageType !== "message" && event.messageType !== "reply") return;
			pruneSession(session, event.observedAt);
			if (session.seenMessageIds.has(event.messageId)) return;
			session.records.push({
				messageId: event.messageId,
				receivedAt: event.observedAt,
				senderId: event.senderId
			});
			session.seenMessageIds.set(event.messageId, event.observedAt);
			incrementSenderCount(session, event.senderId);
			session.totalMessages += 1;
			const currentCount = countCurrentWindow(session);
			session.peakMessagesPerMinute = Math.max(session.peakMessagesPerMinute, currentCount);
		}
		addRttSample(socketId, rttMs) {
			if (!Number.isFinite(rttMs) || rttMs < 0) return;
			const samples = this.#rttSamples.get(socketId) ?? [];
			samples.push(rttMs);
			if (samples.length > RTT_SAMPLE_LIMIT) samples.splice(0, samples.length - RTT_SAMPLE_LIMIT);
			this.#rttSamples.set(socketId, samples);
		}
		clearSocket(socketId) {
			this.#rttSamples.delete(socketId);
		}
		resetStatistics(now) {
			this.#rttSamples.clear();
			for (const session of this.#sessions.values()) resetSessionStatistics(session, now);
		}
		getSelectedSocketId() {
			return this.#sessions.size === 1 ? [...this.#sessions.values()][0]?.socketId ?? null : null;
		}
		getSnapshot(now) {
			if (this.#sessions.size === 0) return { status: "pending" };
			if (this.#sessions.size > 1) return {
				reason: "multiple-sessions",
				status: "unavailable"
			};
			const session = [...this.#sessions.values()][0];
			if (!session) return { status: "pending" };
			pruneSession(session, now);
			const currentCount = countCurrentWindow(session);
			session.peakMessagesPerMinute = Math.max(session.peakMessagesPerMinute, currentCount);
			return {
				activeChatters: session.activeSenderCounts.size,
				chatroomId: session.chatroomId,
				messagesPerMinute: currentCount,
				peakMessagesPerMinute: session.peakMessagesPerMinute,
				socketRttMs: median(this.#rttSamples.get(session.socketId) ?? []),
				status: "active",
				totalMessages: session.totalMessages,
				trendReadyAt: session.confirmedAt + CURRENT_WINDOW_MS,
				trendPercent: calculateSessionTrend(session, now, currentCount)
			};
		}
	};
	function pruneSession(session, now) {
		advanceCurrentWindow(session, now);
		const cutoff = now - RETAINED_WINDOW_MS;
		while (session.firstRecordIndex < session.records.length && (session.records[session.firstRecordIndex]?.receivedAt ?? Infinity) <= cutoff) {
			const record = session.records[session.firstRecordIndex];
			session.firstRecordIndex += 1;
			if (record && session.seenMessageIds.get(record.messageId) === record.receivedAt) session.seenMessageIds.delete(record.messageId);
		}
		if (session.firstRecordIndex > 128 && session.firstRecordIndex * 2 > session.records.length) {
			const removedRecords = session.firstRecordIndex;
			session.records = session.records.slice(removedRecords);
			session.firstRecordIndex = 0;
			session.currentWindowStartIndex = Math.max(0, session.currentWindowStartIndex - removedRecords);
		}
	}
	function advanceCurrentWindow(session, now) {
		const cutoff = now - CURRENT_WINDOW_MS;
		session.currentWindowStartIndex = Math.max(session.currentWindowStartIndex, session.firstRecordIndex);
		while (session.currentWindowStartIndex < session.records.length && (session.records[session.currentWindowStartIndex]?.receivedAt ?? Infinity) <= cutoff) {
			const record = session.records[session.currentWindowStartIndex];
			session.currentWindowStartIndex += 1;
			if (record) decrementSenderCount(session, record.senderId);
		}
	}
	function countCurrentWindow(session) {
		return session.records.length - session.currentWindowStartIndex;
	}
	function countWindow(session, lowerExclusive, upperInclusive) {
		const start = findFirstRecordAfter(session.records, session.firstRecordIndex, lowerExclusive);
		return findFirstRecordAfter(session.records, start, upperInclusive) - start;
	}
	function findFirstRecordAfter(records, startIndex, timestamp) {
		let lower = startIndex;
		let upper = records.length;
		while (lower < upper) {
			const middle = lower + Math.floor((upper - lower) / 2);
			if ((records[middle]?.receivedAt ?? Infinity) <= timestamp) lower = middle + 1;
			else upper = middle;
		}
		return lower;
	}
	function calculateSessionTrend(session, now, currentCount) {
		const elapsed = Math.max(0, now - session.confirmedAt);
		if (elapsed < CURRENT_WINDOW_MS) return null;
		return calculateTrend(currentCount, elapsed < RETAINED_WINDOW_MS ? countWindow(session, session.confirmedAt, session.confirmedAt + CURRENT_WINDOW_MS) : countWindow(session, now - RETAINED_WINDOW_MS, now - CURRENT_WINDOW_MS));
	}
	function calculateTrend(current, previous) {
		if (previous === 0) return current === 0 ? 0 : null;
		return Math.round((current - previous) / previous * 100);
	}
	function median(samples) {
		if (samples.length === 0) return null;
		const sorted = [...samples].sort((left, right) => left - right);
		const middle = Math.floor(sorted.length / 2);
		const upper = sorted[middle];
		if (upper === void 0) return null;
		if (sorted.length % 2 === 1) return Math.round(upper);
		const lower = sorted[middle - 1];
		return lower === void 0 ? Math.round(upper) : Math.round((lower + upper) / 2);
	}
	function incrementSenderCount(session, senderId) {
		session.activeSenderCounts.set(senderId, (session.activeSenderCounts.get(senderId) ?? 0) + 1);
	}
	function decrementSenderCount(session, senderId) {
		const count = session.activeSenderCounts.get(senderId);
		if (count === void 0) return;
		if (count === 1) session.activeSenderCounts.delete(senderId);
		else session.activeSenderCounts.set(senderId, count - 1);
	}
	function resetSessionStatistics(session, now) {
		session.activeSenderCounts.clear();
		session.confirmedAt = now;
		session.currentWindowStartIndex = 0;
		session.firstRecordIndex = 0;
		session.peakMessagesPerMinute = 0;
		session.records = [];
		session.seenMessageIds.clear();
		session.totalMessages = 0;
	}
	function createSessionKey(socketId, channelName) {
		return `${socketId}:${channelName}`;
	}
	var WEB_SOCKET_OPEN_STATE = 1;
	var WebSocketTap = class {
		#clock;
		#host;
		#listeners = new Set();
		#sockets = new Map();
		#installed = false;
		#nextSocketId = 1;
		#restoreConstructor;
		constructor(host, clock = Date.now) {
			this.#host = host;
			this.#clock = clock;
		}
		install() {
			if (this.#installed) return true;
			try {
				const NativeWebSocket = this.#host.WebSocket;
				const descriptor = Object.getOwnPropertyDescriptor(this.#host, "WebSocket");
				const proxy = new Proxy(NativeWebSocket, { construct: (target, argumentsList, newTarget) => {
					const socket = Reflect.construct(target, argumentsList, newTarget);
					try {
						this.#captureSocket(socket);
					} catch {}
					return socket;
				} });
				Object.defineProperty(this.#host, "WebSocket", {
					configurable: descriptor?.configurable ?? true,
					enumerable: descriptor?.enumerable ?? true,
					value: proxy,
					writable: true
				});
				this.#restoreConstructor = () => {
					if (this.#host.WebSocket !== proxy) return;
					if (descriptor) Object.defineProperty(this.#host, "WebSocket", descriptor);
					else Object.defineProperty(this.#host, "WebSocket", {
						configurable: true,
						enumerable: true,
						value: NativeWebSocket,
						writable: true
					});
				};
				this.#installed = true;
				return true;
			} catch {
				return false;
			}
		}
		send(socketId, data) {
			const captured = this.#sockets.get(socketId);
			if (!captured || captured.socket.readyState !== WEB_SOCKET_OPEN_STATE) return false;
			try {
				captured.socket.send(data);
				return true;
			} catch {
				return false;
			}
		}
		subscribe(listener) {
			this.#listeners.add(listener);
			return () => {
				this.#listeners.delete(listener);
			};
		}
		dispose() {
			this.#restoreConstructor?.();
			this.#restoreConstructor = void 0;
			for (const socketId of [...this.#sockets.keys()]) this.#releaseSocket(socketId);
			this.#listeners.clear();
			this.#installed = false;
		}
		#captureSocket(socket) {
			const socketId = this.#nextSocketId;
			this.#nextSocketId += 1;
			const originalSend = socket.send;
			const hookedSend = new Proxy(originalSend, { apply: (target, thisArgument, argumentsList) => {
				const result = Reflect.apply(target, thisArgument, argumentsList);
				this.#emit({
					data: argumentsList[0],
					direction: "outgoing",
					observedAt: this.#clock(),
					socketId,
					type: "frame"
				});
				return result;
			} });
			const onMessage = (event) => {
				this.#emit({
					data: event.data,
					direction: "incoming",
					observedAt: this.#clock(),
					socketId,
					type: "frame"
				});
			};
			const onError = () => {
				this.#emit({
					observedAt: this.#clock(),
					socketId,
					type: "error"
				});
			};
			const onClose = () => {
				this.#emit({
					observedAt: this.#clock(),
					socketId,
					type: "closed"
				});
				this.#releaseSocket(socketId);
			};
			Object.defineProperty(socket, "send", {
				configurable: true,
				value: hookedSend,
				writable: true
			});
			socket.addEventListener("message", onMessage);
			socket.addEventListener("error", onError);
			socket.addEventListener("close", onClose);
			this.#sockets.set(socketId, {
				hookedSend,
				onClose,
				onError,
				onMessage,
				originalSend,
				socket
			});
		}
		#emit(event) {
			for (const listener of this.#listeners) try {
				listener(event);
			} catch {}
		}
		#releaseSocket(socketId) {
			const captured = this.#sockets.get(socketId);
			if (!captured) return;
			this.#sockets.delete(socketId);
			captured.socket.removeEventListener("message", captured.onMessage);
			captured.socket.removeEventListener("error", captured.onError);
			captured.socket.removeEventListener("close", captured.onClose);
			if (captured.socket.send === captured.hookedSend) try {
				Reflect.deleteProperty(captured.socket, "send");
			} catch {
				Object.defineProperty(captured.socket, "send", {
					configurable: true,
					value: captured.originalSend,
					writable: true
				});
			}
		}
	};
	var PING_TIMEOUT_MS = 15e3;
	var SNAPSHOT_INTERVAL_MS = 5e3;
	var PUSHER_PING_FRAME = JSON.stringify({
		data: {},
		event: "pusher:ping"
	});
	var log$9 = createLogger("chat-statistics");
	var ChatStatisticsRuntime = class {
		#chatAdapter = new KickChatAdapter();
		#clock;
		#listeners = new Set();
		#rttTracker = new SocketRttTracker();
		#statsStore = new ChatStatsStore();
		#tap;
		#captureFailed = false;
		#collectionEnabled = false;
		#connectionFailed = false;
		#initialized = false;
		#snapshotTimer;
		#stopTapEvents;
		constructor(tap = new WebSocketTap(_unsafeWindow), clock = Date.now) {
			this.#tap = tap;
			this.#clock = clock;
		}
		initialize() {
			if (this.#initialized) return true;
			this.#stopTapEvents = this.#tap.subscribe((event) => {
				if (event.type === "error" && event.socketId === this.#statsStore.getSelectedSocketId()) this.#connectionFailed = true;
				const pusherEvent = decodePusherEvent(event);
				if (!pusherEvent) {
					if (event.type === "error") this.#publish();
					return;
				}
				const rttSample = this.#collectionEnabled ? this.#rttTracker.accept(pusherEvent) : null;
				if (rttSample) {
					this.#statsStore.addRttSample(rttSample.socketId, rttSample.rttMs);
					this.#publish();
				}
				const chatEvents = this.#chatAdapter.accept(pusherEvent, this.#collectionEnabled);
				let lifecycleChanged = false;
				for (const chatEvent of chatEvents) {
					this.#statsStore.accept(chatEvent);
					if (chatEvent.type === "sessionStarted") this.#connectionFailed = false;
					lifecycleChanged ||= chatEvent.type !== "message";
				}
				if (pusherEvent.type === "socketClosed") this.#statsStore.clearSocket(pusherEvent.socketId);
				if (lifecycleChanged) this.#publish();
			});
			this.#initialized = this.#tap.install();
			this.#captureFailed = !this.#initialized;
			if (this.#initialized) log$9.info("Socket observation installed");
			else {
				this.#stopTapEvents();
				this.#stopTapEvents = void 0;
				log$9.warn("Socket observation unavailable");
			}
			return this.#initialized;
		}
		getSnapshot() {
			const snapshot = this.#statsStore.getSnapshot(this.#clock());
			if (snapshot.status !== "pending") return snapshot;
			if (this.#captureFailed) return {
				reason: "capture-failed",
				status: "unavailable"
			};
			if (this.#connectionFailed) return {
				reason: "connection-failed",
				status: "unavailable"
			};
			return snapshot;
		}
		setCollectionEnabled(enabled) {
			if (this.#collectionEnabled === enabled) return;
			this.#collectionEnabled = enabled;
			this.#rttTracker.clear();
			this.#statsStore.resetStatistics(this.#clock());
			this.#publish();
		}
		requestSocketRttSample() {
			if (!this.#collectionEnabled) return false;
			const socketId = this.#statsStore.getSelectedSocketId();
			if (socketId === null) return false;
			const now = this.#clock();
			if (!this.#rttTracker.canStart(socketId, now, PING_TIMEOUT_MS)) return false;
			return this.#tap.send(socketId, PUSHER_PING_FRAME);
		}
		subscribe(listener) {
			this.#listeners.add(listener);
			listener(this.getSnapshot());
			if (!this.#snapshotTimer) this.#snapshotTimer = setInterval(() => {
				this.#publish();
			}, SNAPSHOT_INTERVAL_MS);
			return () => {
				this.#listeners.delete(listener);
				if (this.#listeners.size === 0 && this.#snapshotTimer) {
					clearInterval(this.#snapshotTimer);
					this.#snapshotTimer = void 0;
				}
			};
		}
		#publish() {
			if (this.#listeners.size === 0) return;
			const snapshot = this.getSnapshot();
			for (const listener of this.#listeners) listener(snapshot);
		}
	};
	var runtime = new ChatStatisticsRuntime();
	function initializeChatStatisticsCapture() {
		return runtime.initialize();
	}
	function getChatStatisticsRuntime() {
		return runtime;
	}
	var chatStatistics_default = ".ke-animated-number {\n  display: inline-flex;\n  align-items: center;\n  font-variant-numeric: tabular-nums;\n}\n\n.ke-animated-number__digit {\n  position: relative;\n  display: inline-block;\n  width: 1ch;\n  height: var(--ke-animated-number-height, 1.25rem);\n  overflow: hidden;\n}\n\n.ke-animated-number__reel {\n  position: absolute;\n  top: 0;\n  left: 0;\n  display: flex;\n  width: 100%;\n  flex-direction: column;\n  will-change: transform;\n}\n\n.ke-animated-number__cell {\n  display: flex;\n  width: 100%;\n  height: var(--ke-animated-number-height, 1.25rem);\n  flex: 0 0 var(--ke-animated-number-height, 1.25rem);\n  align-items: center;\n  justify-content: center;\n  line-height: var(--ke-animated-number-height, 1.25rem);\n}\n\n.ke-animated-number__separator {\n  display: inline-block;\n  height: var(--ke-animated-number-height, 1.25rem);\n  line-height: var(--ke-animated-number-height, 1.25rem);\n}\n\n[data-ke-native-chat-title] {\n  visibility: hidden;\n}\n\n#kick-enhancer-chat-statistics-title {\n  position: absolute;\n  left: 50%;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  transform: translateX(-50%);\n}\n\n.ke-chat-statistics-trigger .ke-animated-number,\n.ke-chat-statistics-card .ke-animated-number {\n  --ke-animated-number-height: 1em;\n  position: relative;\n  top: 0.18em;\n}\n\n.ke-chat-statistics-trigger {\n  display: inline-flex;\n  min-height: 1.75rem;\n  box-sizing: border-box;\n  align-items: center;\n  gap: 0.3rem;\n  padding: 0.25rem 0.4rem;\n  color: var(--neon-surface-onSurface, #fff);\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  border-radius: 0.25rem;\n  font: inherit;\n  font-size: 0.75rem;\n  font-weight: 700;\n  font-variant-numeric: tabular-nums;\n  line-height: 1;\n  white-space: nowrap;\n}\n.ke-chat-statistics-trigger:hover {\n  background: var(--neon-stateLayer-surfaceHover, rgba(240, 241, 242, 0.0392156863));\n}\n.ke-chat-statistics-trigger:focus-visible {\n  outline: 2px solid var(--neon-focusLight, #fff);\n  outline-offset: 1px;\n}\n.ke-chat-statistics-trigger__trend {\n  color: var(--neon-surface-onSurfacePositive, #53fc18);\n  font-size: 0.6875rem;\n}\n.ke-chat-statistics-trigger__trend[data-tone=negative] {\n  color: var(--neon-surface-onSurfaceNegative, #fd7272);\n}\n.ke-chat-statistics-trigger__trend[data-tone=neutral] {\n  color: var(--neon-surface-onSurfaceSecondary, #9fa6ad);\n}\n.ke-chat-statistics-trigger__trend-loader {\n  width: 0.875rem;\n  height: 0.875rem;\n  flex: 0 0 auto;\n  color: #ffc45c;\n  animation: ke-chat-statistics-spin 800ms linear infinite;\n}\n.ke-chat-statistics-trigger__unavailable {\n  display: grid;\n  width: 0.8rem;\n  height: 0.8rem;\n  box-sizing: border-box;\n  color: var(--neon-surface-onSurfaceNegative, #fd7272);\n  border: 1px solid currentcolor;\n  border-radius: 50%;\n  font-size: 0.6rem;\n  font-weight: 800;\n  line-height: 1;\n  place-items: center;\n}\n\n#kick-enhancer-chat-statistics-panel {\n  position: relative;\n  z-index: 1;\n  order: -1;\n  width: 100%;\n}\n\n.ke-chat-statistics-card {\n  width: 100%;\n  box-sizing: border-box;\n  padding: 0.4rem 0.55rem 0.45rem;\n  color: var(--neon-surface-onSurface, #fff);\n  background: rgba(11, 11, 12, 0.968627451);\n  backdrop-filter: blur(3px);\n  border: 2px solid var(--neon-outline-decorative, rgba(240, 241, 242, 0.1607843137));\n  border-radius: 0.25rem;\n  box-shadow: 0 0.0625rem 0.2rem rgba(0, 0, 0, 0.2666666667);\n  font-size: 0.75rem;\n  font-weight: 500;\n  font-variant-numeric: tabular-nums;\n  line-height: 1.25;\n  animation: ke-chat-statistics-enter 140ms ease-out;\n}\n.ke-chat-statistics-card__header, .ke-chat-statistics-card__primary {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.ke-chat-statistics-card__header {\n  min-height: 1.35rem;\n}\n.ke-chat-statistics-card__title {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  font-weight: 700;\n}\n.ke-chat-statistics-card__room-id {\n  color: var(--neon-surface-onSurfaceSecondary, #9fa6ad);\n  font-weight: 600;\n}\n.ke-chat-statistics-card__live-dot {\n  width: 0.4rem;\n  height: 0.4rem;\n  background: var(--neon-surface-onSurfacePositive, #53fc18);\n  border-radius: 50%;\n  box-shadow: 0 0 0 0.18rem rgba(83, 252, 24, 0.1490196078);\n}\n.ke-chat-statistics-card__live-dot[data-status=calibrating] {\n  background: #ffc45c;\n  box-shadow: 0 0 0 0.18rem rgba(255, 196, 92, 0.1490196078);\n}\n.ke-chat-statistics-card__live-dot[data-status=unavailable] {\n  background: var(--neon-surface-onSurfaceNegative, #fd7272);\n  box-shadow: 0 0 0 0.18rem rgba(253, 114, 114, 0.1490196078);\n}\n.ke-chat-statistics-card__close {\n  display: grid;\n  width: 1.35rem;\n  height: 1.35rem;\n  padding: 0;\n  color: var(--neon-surface-onSurfaceSecondary, #9fa6ad);\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  border-radius: 0.2rem;\n  font: inherit;\n  font-size: 1rem;\n  line-height: 1;\n  place-items: center;\n}\n.ke-chat-statistics-card__close:hover {\n  color: var(--neon-surface-onSurface, #fff);\n  background: var(--neon-stateLayer-surfaceHover, rgba(240, 241, 242, 0.0392156863));\n}\n.ke-chat-statistics-card__close:focus-visible {\n  outline: 2px solid var(--neon-focusLight, #fff);\n  outline-offset: 1px;\n}\n.ke-chat-statistics-card__primary {\n  padding: 0.1rem 0 0.25rem;\n}\n.ke-chat-statistics-card__rate {\n  font-size: 1.25rem;\n  font-weight: 800;\n  letter-spacing: -0.025em;\n  line-height: 1;\n}\n.ke-chat-statistics-card__rate small {\n  color: var(--neon-surface-onSurfaceSecondary, #9fa6ad);\n  font-size: 0.6875rem;\n  font-weight: 600;\n  letter-spacing: normal;\n}\n.ke-chat-statistics-card__trend {\n  color: var(--neon-surface-onSurfacePositive, #53fc18);\n  font-size: 0.75rem;\n  font-weight: 700;\n}\n.ke-chat-statistics-card__trend[data-tone=negative] {\n  color: var(--neon-surface-onSurfaceNegative, #fd7272);\n}\n.ke-chat-statistics-card__trend[data-tone=neutral] {\n  color: var(--neon-surface-onSurfaceSecondary, #9fa6ad);\n}\n.ke-chat-statistics-card__calibrating {\n  color: #ffc45c;\n  font-size: 0.6875rem;\n  font-weight: 600;\n}\n.ke-chat-statistics-card__details {\n  display: grid;\n  padding-top: 0.3rem;\n  border-top: 1px solid var(--neon-outline-decorative, rgba(240, 241, 242, 0.1607843137));\n  color: var(--neon-surface-onSurfaceSecondary, #9fa6ad);\n  gap: 0.25rem 0.6rem;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n.ke-chat-statistics-card__details strong {\n  color: var(--neon-surface-onSurface, #fff);\n  font-weight: 700;\n}\n.ke-chat-statistics-card__error {\n  margin: 0.25rem 0 0.15rem;\n  padding-top: 0.4rem;\n  border-top: 1px solid var(--neon-outline-decorative, rgba(240, 241, 242, 0.1607843137));\n  color: var(--neon-surface-onSurfaceSecondary, #9fa6ad);\n  line-height: 1.4;\n}\n\n@keyframes ke-chat-statistics-enter {\n  from {\n    opacity: 0;\n    transform: translateY(-0.35rem);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@keyframes ke-chat-statistics-spin {\n  to {\n    transform: rotate(1turn);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .ke-chat-statistics-card,\n  .ke-chat-statistics-trigger__trend-loader {\n    animation: none;\n  }\n}";
	var CHATROOM_SELECTOR = "#channel-chatroom";
	var MESSAGES_SELECTOR = "#chatroom-messages";
	var TITLE_POSITION_CLASSES = [
		"absolute",
		"left-1/2",
		"-translate-x-1/2"
	];
	function findChatStatisticsAnchors(ownerDocument = document) {
		const chatroom = ownerDocument.querySelector(CHATROOM_SELECTOR);
		if (!chatroom) return null;
		let title;
		for (const candidate of chatroom.querySelectorAll("span")) {
			if (candidate.parentElement?.parentElement?.parentElement !== chatroom) continue;
			let matchesPosition = true;
			for (const className of TITLE_POSITION_CLASSES) if (!candidate.classList.contains(className)) {
				matchesPosition = false;
				break;
			}
			if (matchesPosition) {
				title = candidate;
				break;
			}
		}
		if (!title) return null;
		const stackRoot = chatroom.querySelector(MESSAGES_SELECTOR)?.previousElementSibling;
		return {
			eventStack: stackRoot?.classList.contains("absolute") && stackRoot.classList.contains("w-full") && stackRoot.firstElementChild ? stackRoot.firstElementChild : null,
			title
		};
	}
	var NATIVE_TITLE_ATTRIBUTE = "data-ke-native-chat-title";
	var PANEL_HOST_ID = "kick-enhancer-chat-statistics-panel";
	var STYLE_ID$8 = "kick-enhancer-chat-statistics-styles";
	var TITLE_HOST_ID = "kick-enhancer-chat-statistics-title";
	var stopActiveFeature$4;
	function startChatStatistics() {
		stopActiveFeature$4?.();
		const runtime = getChatStatisticsRuntime();
		let stopUi;
		const stopObserving = observeSetting((settings) => settings.chat.showChatStatistics, (enabled) => {
			stopUi?.();
			stopUi = void 0;
			runtime.setCollectionEnabled(enabled);
			stopUi = enabled ? startStatisticsUi() : void 0;
		});
		let stopped = false;
		const stop = () => {
			if (stopped) return;
			stopped = true;
			stopObserving();
			stopUi?.();
			stopUi = void 0;
			runtime.setCollectionEnabled(false);
			if (stopActiveFeature$4 === stop) stopActiveFeature$4 = void 0;
		};
		stopActiveFeature$4 = stop;
		return stop;
	}
	function startStatisticsUi() {
		installStyles$2();
		const runtime = getChatStatisticsRuntime();
		let anchors = null;
		let panelHost = null;
		let panelOpen = false;
		let rttTimer;
		let rttChatroomId = null;
		let snapshot = runtime.getSnapshot();
		let titleHost = null;
		let reconcileScheduled = false;
		let stopped = false;
		const renderTrigger = () => {
			if (!titleHost) return;
			R(u(ChatStatisticsTrigger, {
				expanded: panelOpen && Boolean(panelHost),
				onToggle: togglePanel,
				snapshot
			}), titleHost);
		};
		const removePanel = () => {
			if (!panelHost) return;
			R(null, panelHost);
			panelHost.remove();
			panelHost = null;
		};
		const reconcilePanel = () => {
			if (!panelOpen || !anchors?.eventStack?.isConnected) {
				removePanel();
				return;
			}
			if (!panelHost || !panelHost.isConnected || panelHost.parentElement !== anchors.eventStack) {
				removePanel();
				panelHost = document.createElement("div");
				panelHost.id = PANEL_HOST_ID;
				anchors.eventStack.append(panelHost);
			}
			R(u(ChatStatisticsCard, {
				onClose: closePanel,
				snapshot
			}), panelHost);
		};
		const removeTitle = () => {
			if (titleHost) {
				R(null, titleHost);
				titleHost.remove();
				titleHost = null;
			}
			anchors?.title.removeAttribute(NATIVE_TITLE_ATTRIBUTE);
		};
		const reconcile = () => {
			reconcileScheduled = false;
			if (stopped) return;
			const nextAnchors = findChatStatisticsAnchors();
			if (nextAnchors?.title !== anchors?.title) {
				removeTitle();
				anchors = nextAnchors;
				if (anchors) {
					anchors.title.setAttribute(NATIVE_TITLE_ATTRIBUTE, "");
					titleHost = document.createElement("span");
					titleHost.id = TITLE_HOST_ID;
					anchors.title.after(titleHost);
				}
			} else anchors = nextAnchors;
			reconcilePanel();
			renderTrigger();
		};
		const scheduleReconcile = () => {
			if (stopped || reconcileScheduled) return;
			reconcileScheduled = true;
			queueMicrotask(reconcile);
		};
		const updateRttSampling = () => {
			if (rttTimer) {
				clearInterval(rttTimer);
				rttTimer = void 0;
			}
			if (!panelOpen || snapshot.status !== "active") {
				rttChatroomId = null;
				return;
			}
			if (rttChatroomId !== snapshot.chatroomId) {
				rttChatroomId = snapshot.chatroomId;
				runtime.requestSocketRttSample();
			}
			rttTimer = setInterval(() => {
				runtime.requestSocketRttSample();
			}, 6e4);
		};
		function togglePanel() {
			panelOpen = !panelOpen;
			updateRttSampling();
			reconcilePanel();
			renderTrigger();
		}
		function closePanel() {
			panelOpen = false;
			updateRttSampling();
			removePanel();
			renderTrigger();
		}
		const applySnapshot = (nextSnapshot) => {
			const previousChatroomId = snapshot.status === "active" ? snapshot.chatroomId : null;
			const nextChatroomId = nextSnapshot.status === "active" ? nextSnapshot.chatroomId : null;
			snapshot = nextSnapshot;
			if (panelOpen && previousChatroomId !== nextChatroomId) {
				rttChatroomId = null;
				updateRttSampling();
			}
			renderTrigger();
			reconcilePanel();
		};
		const stopSnapshots = runtime.subscribe(applySnapshot);
		const observer = new MutationObserver((mutations) => {
			if (anchors?.title.isConnected && titleHost?.isConnected && (!panelOpen || panelHost?.isConnected)) return;
			if (mutations.some((mutation) => {
				return !(mutation.target instanceof Element ? mutation.target : mutation.target.parentElement)?.closest("#chatroom-messages");
			})) scheduleReconcile();
		});
		observer.observe(document.documentElement, {
			childList: true,
			subtree: true
		});
		reconcile();
		return () => {
			if (stopped) return;
			stopped = true;
			observer.disconnect();
			stopSnapshots();
			panelOpen = false;
			updateRttSampling();
			removePanel();
			removeTitle();
			anchors = null;
			document.getElementById(STYLE_ID$8)?.remove();
		};
	}
	function installStyles$2() {
		if (document.getElementById(STYLE_ID$8)) return;
		const style = document.createElement("style");
		style.id = STYLE_ID$8;
		style.textContent = chatStatistics_default;
		document.documentElement.append(style);
	}
	function onDocumentElementReady(callback, ownerDocument = document, createObserver = (observerCallback) => new MutationObserver(observerCallback)) {
		if (ownerDocument.documentElement) {
			callback();
			return () => void 0;
		}
		let active = true;
		const observer = createObserver(() => {
			if (!active || !ownerDocument.documentElement) return;
			active = false;
			observer.disconnect();
			callback();
		});
		observer.observe(ownerDocument, { childList: true });
		return () => {
			active = false;
			observer.disconnect();
		};
	}
	var shared_ui_default = ".ke-confirmation-host {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  min-width: 0;\n  min-height: 0;\n  overflow: hidden;\n}\n\n.ke-confirmation-layer {\n  position: absolute;\n  z-index: 10;\n  inset: 0;\n  display: grid;\n  padding: 1rem;\n  place-items: center;\n  background: rgba(0, 0, 0, 0.32);\n  backdrop-filter: blur(3px);\n}\n\n.ke-confirmation-dialog {\n  width: min(24rem, 100%);\n  padding: 1.1rem;\n  border: 1px solid #303030;\n  border-radius: 0.45rem;\n  background: #080808;\n  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.55);\n}\n\n.ke-confirmation-dialog__copy {\n  display: grid;\n  gap: 0.45rem;\n}\n\n.ke-confirmation-dialog__title {\n  margin: 0;\n  color: #f2f2f2;\n  font-size: 1rem;\n  font-weight: 700;\n  line-height: 1.3;\n}\n\n.ke-confirmation-dialog__description {\n  margin: 0;\n  color: #747474;\n  font-size: 0.825rem;\n  font-weight: 500;\n  line-height: 1.5;\n}\n\n.ke-confirmation-dialog__actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.65rem;\n  margin-top: 1rem;\n}\n\n.ke-button,\n.ke-text-field,\n.ke-select-box__input,\n.ke-track-bar {\n  box-sizing: border-box;\n  font: inherit;\n}\n\n.ke-button {\n  min-height: 2.35rem;\n  padding: 0 0.85rem;\n  border: 1px solid #1b1b1b;\n  border-radius: 0.45rem;\n  background: #0a0a0a;\n  color: #f2f2f2;\n  font-size: 0.875rem;\n  font-weight: 650;\n  line-height: 1;\n  cursor: pointer;\n  transition: background 140ms ease, border-color 140ms ease, color 140ms ease;\n}\n.ke-button:hover:not(:disabled) {\n  border-color: #303030;\n  background: #101010;\n}\n.ke-button:focus-visible {\n  outline: 2px solid #53fc18;\n  outline-offset: 2px;\n}\n.ke-button:disabled {\n  cursor: not-allowed;\n  opacity: 0.45;\n}\n.ke-button--compact {\n  min-height: 2rem;\n  padding-inline: 0.65rem;\n}\n.ke-button--primary {\n  border-color: #53fc18;\n  background: #53fc18;\n  color: #071402;\n}\n.ke-button--primary:hover:not(:disabled) {\n  border-color: #7dff50;\n  background: #7dff50;\n}\n.ke-button--danger {\n  color: #ff6b6b;\n}\n\n.ke-form-field {\n  display: grid;\n  min-width: 0;\n  gap: 0.4rem;\n  color: #f2f2f2;\n}\n\n.ke-form-field__label {\n  display: block;\n  font-size: 0.875rem;\n  font-weight: 650;\n  line-height: 1.25;\n}\n\n.ke-form-field__description {\n  display: block;\n  color: #747474;\n  font-size: 0.78rem;\n  line-height: 1.4;\n  font-weight: 500;\n}\n\n.ke-text-field,\n.ke-select-box__input {\n  width: 100%;\n  min-height: 2.35rem;\n  border: 1px solid #1b1b1b;\n  border-radius: 0.45rem;\n  outline: none;\n  background: #0a0a0a;\n  color: #f2f2f2;\n  font-size: 0.875rem;\n  transition: background 140ms ease, border-color 140ms ease;\n}\n.ke-text-field:hover:not(:disabled),\n.ke-select-box__input:hover:not(:disabled) {\n  border-color: #303030;\n  background: #101010;\n}\n.ke-text-field:focus-visible,\n.ke-select-box__input:focus-visible {\n  border-color: #53fc18;\n  box-shadow: 0 0 0 1px #53fc18;\n}\n.ke-text-field:disabled,\n.ke-select-box__input:disabled {\n  cursor: not-allowed;\n  opacity: 0.45;\n}\n\n.ke-text-field {\n  padding: 0 0.72rem;\n  user-select: text;\n}\n.ke-text-field::placeholder {\n  color: #8c8c8c;\n}\n\n.ke-text-field-shell {\n  display: flex;\n  align-items: stretch;\n}\n\n.ke-text-field-shell .ke-text-field {\n  flex: 1 1 auto;\n  min-width: 0;\n  border-radius: 0.45rem 0 0 0.45rem;\n}\n\n.ke-text-field__suffix {\n  display: flex;\n  flex: 0 0 auto;\n  align-items: center;\n  padding-inline: 0.7rem;\n  border: 1px solid #1b1b1b;\n  border-left: 0;\n  border-radius: 0 0.45rem 0.45rem 0;\n  background: #080808;\n  color: #8c8c8c;\n  font-size: 0.875rem;\n}\n\n.ke-text-field-shell:focus-within .ke-text-field__suffix {\n  border-color: #53fc18;\n}\n\n.ke-select-box {\n  position: relative;\n  display: block;\n}\n\n.ke-select-box__input {\n  appearance: none;\n  padding: 0 2.2rem 0 0.72rem;\n  color-scheme: dark;\n  cursor: pointer;\n}\n\n.ke-select-box__chevron {\n  position: absolute;\n  top: 50%;\n  right: 0.85rem;\n  width: 0.45rem;\n  height: 0.45rem;\n  border-right: 1.5px solid #8c8c8c;\n  border-bottom: 1.5px solid #8c8c8c;\n  pointer-events: none;\n  transform: translateY(-70%) rotate(45deg);\n}\n\n.ke-toggle {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  color: #f2f2f2;\n  cursor: pointer;\n}\n\n.ke-toggle__copy {\n  display: grid;\n  min-width: 0;\n  gap: 0.4rem;\n}\n\n.ke-toggle__control {\n  position: relative;\n  flex: 0 0 auto;\n}\n\n.ke-toggle__input {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  opacity: 0;\n  pointer-events: none;\n}\n\n.ke-toggle__track {\n  position: relative;\n  display: block;\n  width: 2.4rem;\n  height: 1.35rem;\n  border: 1px solid #303030;\n  border-radius: 999px;\n  background: #0a0a0a;\n  transition: background 140ms ease, border-color 140ms ease;\n}\n\n.ke-toggle__thumb {\n  position: absolute;\n  top: 0.18rem;\n  left: 0.18rem;\n  width: 0.85rem;\n  height: 0.85rem;\n  border-radius: 50%;\n  background: #8c8c8c;\n  transition: background 140ms ease, transform 140ms ease;\n}\n\n.ke-toggle__input:checked + .ke-toggle__track {\n  border-color: #53fc18;\n  background: #53fc18;\n}\n\n.ke-toggle__input:checked + .ke-toggle__track .ke-toggle__thumb {\n  background: #071402;\n  transform: translateX(1.02rem);\n}\n\n.ke-toggle__input:focus-visible + .ke-toggle__track {\n  outline: 2px solid #53fc18;\n  outline-offset: 2px;\n}\n\n.ke-toggle__input:disabled + .ke-toggle__track {\n  opacity: 0.45;\n}\n\n.ke-track-bar__heading {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  gap: 1rem;\n}\n\n.ke-track-bar__value {\n  color: #8c8c8c;\n  font-size: 0.78rem;\n  font-variant-numeric: tabular-nums;\n}\n\n.ke-track-bar {\n  width: 100%;\n  height: 1.25rem;\n  margin: 0;\n  appearance: none;\n  outline: none;\n  background: transparent;\n  cursor: pointer;\n}\n.ke-track-bar::-webkit-slider-runnable-track {\n  height: 0.28rem;\n  border-radius: 999px;\n  background: linear-gradient(to right, #53fc18 0 var(--ke-track-progress), #1b1b1b var(--ke-track-progress) 100%);\n}\n.ke-track-bar::-moz-range-track {\n  height: 0.28rem;\n  border-radius: 999px;\n  background: #1b1b1b;\n}\n.ke-track-bar::-moz-range-progress {\n  height: 0.28rem;\n  border-radius: 999px;\n  background: #53fc18;\n}\n.ke-track-bar::-webkit-slider-thumb {\n  width: 1rem;\n  height: 1rem;\n  margin-top: -0.36rem;\n  appearance: none;\n  border: 2px solid #53fc18;\n  border-radius: 50%;\n  background: #050505;\n}\n.ke-track-bar::-moz-range-thumb {\n  width: 0.8rem;\n  height: 0.8rem;\n  border: 2px solid #53fc18;\n  border-radius: 50%;\n  background: #050505;\n}\n.ke-track-bar:focus-visible::-webkit-slider-thumb {\n  outline: 2px solid #53fc18;\n  outline-offset: 2px;\n}\n.ke-track-bar:focus-visible::-moz-range-thumb {\n  outline: 2px solid #53fc18;\n  outline-offset: 2px;\n}\n\n.ke-list-view {\n  --ke-list-view-scrollbar-gutter: 0.5rem;\n  min-width: 0;\n  min-height: 0;\n  display: grid;\n  grid-template-rows: 2rem minmax(0, 1fr);\n  overflow: hidden;\n  border: 1px solid #1b1b1b;\n  border-radius: 0.45rem;\n  background: #080808;\n  user-select: none;\n}\n\n.ke-list-view__header-group,\n.ke-list-view__scroll {\n  min-width: 0;\n  min-height: 0;\n  box-sizing: border-box;\n  padding-right: var(--ke-list-view-scrollbar-gutter);\n}\n\n.ke-list-view__scroll {\n  --ke-scroll-indicator-right: var(--ke-list-view-scrollbar-gutter);\n}\n\n.ke-list-view__header-group {\n  border-bottom: 1px solid #1b1b1b;\n  background: #0a0a0a;\n}\n\n.ke-list-view__header,\n.ke-list-view__row {\n  min-width: 0;\n  width: 100%;\n  display: grid;\n}\n\n.ke-list-view__header {\n  height: 100%;\n  color: #8c8c8c;\n  font-size: 0.72rem;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n}\n\n.ke-list-view__header-cell,\n.ke-list-view__cell {\n  min-width: 0;\n  display: flex;\n  align-items: center;\n  padding: 0.42rem 0.6rem;\n  overflow: hidden;\n}\n.ke-list-view__header-cell:not(:last-child),\n.ke-list-view__cell:not(:last-child) {\n  border-right: 1px solid #1b1b1b;\n}\n.ke-list-view__header-cell[data-align=center],\n.ke-list-view__cell[data-align=center] {\n  justify-content: center;\n  text-align: center;\n}\n.ke-list-view__header-cell[data-align=end],\n.ke-list-view__cell[data-align=end] {\n  justify-content: flex-end;\n  text-align: right;\n}\n\n.ke-list-view__header-label,\n.ke-list-view__cell-content {\n  min-width: 0;\n  max-width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.ke-list-view__body {\n  position: relative;\n  min-width: 0;\n  min-height: 100%;\n}\n.ke-list-view__body[data-virtualized=true] {\n  contain: layout paint style;\n}\n\n.ke-list-view__row {\n  min-height: 2.125rem;\n  box-sizing: border-box;\n  border-bottom: 1px solid #1b1b1b;\n  color: #f2f2f2;\n  font-size: 0.76rem;\n}\n.ke-list-view__row[data-last-row=true] {\n  border-bottom: 0;\n}\n.ke-list-view__row[data-virtualized=true] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  contain: layout paint style;\n}\n.ke-list-view__row:hover {\n  background: #101010;\n}\n.ke-list-view__row.is-interactive {\n  cursor: pointer;\n}\n.ke-list-view__row.is-interactive:focus-visible {\n  outline: 1px solid #53fc18;\n  outline-offset: -1px;\n}\n\n.ke-list-view__empty {\n  min-height: 4rem;\n  display: grid;\n  place-items: center;\n  padding: 1rem;\n  color: #8c8c8c;\n  font-size: 0.78rem;\n  text-align: center;\n}\n\n.ke-list-view__live-status {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0 0 0 0);\n  clip-path: inset(50%);\n  border: 0;\n  white-space: nowrap;\n}\n\n.ke-modal {\n  width: min(36rem, 100vw - 2rem);\n  max-width: none;\n  max-height: calc(100vh - 2rem);\n  margin: auto;\n  padding: 0;\n  overflow: visible;\n  border: 1px solid #1b1b1b;\n  border-radius: 0.65rem;\n  outline: none;\n  background: transparent;\n  color: #f2f2f2;\n  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif;\n  font-size: 16px;\n  line-height: 1.5;\n  box-shadow: 0 1.5rem 5rem rgba(0, 0, 0, 0.65);\n  user-select: none;\n}\n.ke-modal::backdrop {\n  background: rgba(0, 0, 0, 0.62);\n  backdrop-filter: blur(2px);\n}\n\n.ke-modal,\n.ke-modal * {\n  box-sizing: border-box;\n}\n\n.ke-modal ::selection {\n  background: #fff;\n  color: #000;\n}\n\n.ke-modal__surface {\n  display: grid;\n  max-height: calc(100vh - 2rem);\n  overflow: hidden;\n  border-radius: inherit;\n  background: #050505;\n  animation: ke-modal-enter 150ms ease-out;\n}\n\n.ke-modal__header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 1.25rem 1.25rem 1rem;\n  border-bottom: 1px solid #1b1b1b;\n}\n\n.ke-modal__heading {\n  min-width: 0;\n}\n\n.ke-modal__identity {\n  min-width: 0;\n  display: flex;\n  align-items: center;\n  gap: 0.85rem;\n}\n\n.ke-modal__icon {\n  width: 2.75rem;\n  height: 2.75rem;\n  flex: 0 0 auto;\n  object-fit: contain;\n}\n\n.ke-modal__title {\n  margin: 0;\n  color: #f2f2f2;\n  font-size: 1.1rem;\n  font-weight: 750;\n  line-height: 1.25;\n}\n\n.ke-modal__description {\n  margin: 0.35rem 0 0;\n  color: #8c8c8c;\n  font-size: 0.8rem;\n  font-weight: 500;\n  line-height: 1.45;\n}\n\n.ke-modal__close {\n  display: grid;\n  width: 2rem;\n  min-width: 2rem;\n  min-height: 2rem;\n  padding: 0;\n  place-items: center;\n  font-size: 1.3rem;\n  font-weight: 400;\n}\n\n.ke-modal__body {\n  min-height: 0;\n  padding: 1.25rem;\n  overflow-y: auto;\n  scrollbar-color: #303030 transparent;\n}\n\n.ke-modal__footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.65rem;\n  padding: 1rem 1.25rem;\n  border-top: 1px solid #1b1b1b;\n  background: #080808;\n}\n\n.ke-settings {\n  display: grid;\n  gap: 1.35rem;\n}\n\n.ke-settings__actions {\n  display: flex;\n  justify-content: flex-end;\n}\n\n.ke-workspace-modal {\n  --ke-workspace-modal-gutter: clamp(1rem, 4vw, 2rem);\n  --ke-workspace-modal-height: 52rem;\n  --ke-workspace-modal-width: 52rem;\n  width: min(var(--ke-workspace-modal-width), 100vw - var(--ke-workspace-modal-gutter));\n  max-height: calc(100dvh - var(--ke-workspace-modal-gutter));\n}\n\n.ke-workspace-modal .ke-modal__surface {\n  height: min(var(--ke-workspace-modal-height), 100dvh - var(--ke-workspace-modal-gutter));\n  grid-template-rows: auto minmax(0, 1fr) auto;\n}\n\n.ke-workspace-modal .ke-modal__body {\n  padding: 0;\n  overflow: hidden;\n}\n\n.ke-settings-modal {\n  --ke-workspace-modal-height: 46rem;\n}\n\n.ke-settings-modal__tabs {\n  width: 100%;\n  height: 100%;\n}\n\n.ke-settings-modal__github {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  margin-right: auto;\n}\n.ke-settings-modal__github:hover:not(:disabled) {\n  background: #0a0a0a;\n  color: #53fc18;\n}\n\n.ke-settings-modal__github-icon {\n  width: 1.05rem;\n  height: 1.05rem;\n  flex: 0 0 auto;\n}\n\n@keyframes ke-modal-enter {\n  from {\n    opacity: 0;\n    transform: translateY(0.35rem) scale(0.985);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .ke-modal__surface {\n    animation: none;\n  }\n}\n.ke-scroll-area {\n  position: relative;\n  min-width: 0;\n  min-height: 0;\n  height: 100%;\n  overflow: hidden;\n}\n.ke-scroll-area[data-height=content] {\n  height: auto;\n}\n.ke-scroll-area[data-height=content] .ke-scroll-area__viewport {\n  height: auto;\n  max-height: inherit;\n}\n.ke-scroll-area[data-height=content] .ke-scroll-area__content {\n  min-height: 0;\n}\n\n.ke-scroll-area__viewport {\n  min-width: 0;\n  min-height: 0;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  overscroll-behavior: contain;\n  scrollbar-width: none;\n}\n.ke-scroll-area__viewport::-webkit-scrollbar {\n  width: 0;\n  height: 0;\n}\n.ke-scroll-area__viewport:focus {\n  outline: none;\n}\n.ke-scroll-area__viewport:focus-visible {\n  outline: 1px solid #1b1b1b;\n  outline-offset: -1px;\n}\n\n.ke-scroll-area__content {\n  min-width: 100%;\n  min-height: 100%;\n}\n\n.ke-scroll-area[data-scroll-indicators=true]::before, .ke-scroll-area[data-scroll-indicators=true]::after {\n  position: absolute;\n  z-index: 1;\n  right: var(--ke-scroll-indicator-right, 0);\n  left: 0;\n  height: 0.75rem;\n  content: \"\";\n  pointer-events: none;\n}\n.ke-scroll-area[data-scroll-indicators=true][data-overflow-top]::before {\n  top: 0;\n  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), transparent);\n}\n.ke-scroll-area[data-scroll-indicators=true][data-overflow-bottom]::after {\n  bottom: 0;\n  background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);\n}\n\n.ke-scroll-area__thumb {\n  position: absolute;\n  z-index: 2;\n  top: 0;\n  right: 0.25rem;\n  width: 0.25rem;\n  border-radius: 0.125rem;\n  background: #fff;\n  cursor: default;\n  opacity: 0;\n  pointer-events: none;\n  touch-action: none;\n  transition: background 140ms ease, opacity 140ms ease;\n}\n.ke-scroll-area__thumb:not([data-visible=true]) {\n  display: none;\n}\n\n.ke-scroll-area:hover > .ke-scroll-area__thumb[data-visible=true],\n.ke-scroll-area:focus-within > .ke-scroll-area__thumb[data-visible=true],\n.ke-scroll-area.is-dragging > .ke-scroll-area__thumb[data-visible=true] {\n  background: #fff;\n  opacity: 1;\n  pointer-events: auto;\n}\n\n.ke-scroll-area[data-scrollbar=compact] > .ke-scroll-area__thumb {\n  right: 0.15rem;\n  width: 0.1875rem;\n}\n\n.ke-scroll-area[data-scrollbar=overlay] > .ke-scroll-area__thumb {\n  right: 0.3rem;\n  width: 0.25rem;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .ke-scroll-area__thumb {\n    transition: none;\n  }\n}\n.ke-tabs {\n  width: 100%;\n  height: 100%;\n  min-width: 0;\n  min-height: 0;\n  display: grid;\n  grid-template-rows: auto minmax(0, 1fr);\n  overflow: hidden;\n}\n\n.ke-tabs__list {\n  display: flex;\n  min-width: 0;\n  min-height: 2.5rem;\n  align-items: stretch;\n  overflow: hidden;\n  border-bottom: 1px solid #1b1b1b;\n  background: #050505;\n}\n\n.ke-tabs__tab {\n  min-width: 0;\n  flex: 0 1 auto;\n  padding: 0.5rem 0.75rem;\n  overflow: hidden;\n  border: 0;\n  border-bottom: 0.125rem solid transparent;\n  outline: none;\n  background: transparent;\n  color: #8c8c8c;\n  font: inherit;\n  font-size: 0.875rem;\n  font-weight: 550;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  cursor: pointer;\n  user-select: none;\n  transition: background 140ms ease, color 140ms ease;\n}\n.ke-tabs__tab:hover:not(:disabled) {\n  background: #101010;\n  color: #f2f2f2;\n}\n.ke-tabs__tab:focus-visible {\n  outline: 1px solid #53fc18;\n  outline-offset: -1px;\n}\n.ke-tabs__tab[aria-selected=true] {\n  border-bottom-color: #f2f2f2;\n  color: #f2f2f2;\n}\n.ke-tabs__tab:disabled {\n  color: #747474;\n  cursor: default;\n  opacity: 0.45;\n}\n\n.ke-tabs__panel {\n  min-width: 0;\n  min-height: 0;\n  overflow: hidden;\n}\n.ke-tabs__panel[hidden] {\n  display: none;\n}\n\n.ke-tabs__scroll {\n  height: 100%;\n}\n\n.ke-tabs__panel-content {\n  padding: 1rem 1.25rem 1.25rem;\n}\n\n.ke-tabs__panel-content--centered {\n  display: grid;\n  align-items: safe center;\n  justify-items: center;\n}";
	var STYLE_ID$7 = "kick-enhancer-shared-ui-styles";
	function installSharedUiStyles() {
		if (document.getElementById(STYLE_ID$7)) return;
		const style = document.createElement("style");
		style.id = STYLE_ID$7;
		style.textContent = shared_ui_default;
		document.documentElement.append(style);
	}
	var CLIP_CARD_SELECTOR = "[data-testid=\"livestream-results-card\"]";
	var CLIP_MODAL_BUTTON_SELECTOR = "button[aria-label=\"Open clip modal\"]";
	var CLIP_PERMALINK_SELECTOR = "a[href*=\"/clips/clip_\"]";
	var CLIP_ID_PATTERN = /^clip_[A-Za-z0-9_-]+$/;
	var MAX_CLIP_ID_LENGTH = 128;
	function isValidClipId(value) {
		return value.length <= MAX_CLIP_ID_LENGTH && CLIP_ID_PATTERN.test(value);
	}
	function getClipIdFromHref(href, kickOrigin) {
		if (!href) return;
		let baseUrl;
		let clipUrl;
		try {
			baseUrl = new URL(kickOrigin);
			clipUrl = new URL(href, `${baseUrl.origin}/`);
		} catch {
			return;
		}
		if (clipUrl.origin !== baseUrl.origin) return;
		const pathSegments = clipUrl.pathname.split("/").filter(Boolean);
		if (pathSegments.length !== 3 || pathSegments[1] !== "clips") return;
		const clipId = pathSegments[2];
		if (!isValidClipId(clipId)) return;
		return clipId;
	}
	function getUniqueClipId(hrefs, kickOrigin) {
		const clipIds = new Set();
		for (const href of hrefs) {
			const clipId = getClipIdFromHref(href, kickOrigin);
			if (clipId) clipIds.add(clipId);
		}
		return clipIds.size === 1 ? clipIds.values().next().value : void 0;
	}
	function getClipIdFromCard(card, kickOrigin) {
		if (!card.querySelector("button[aria-label=\"Open clip modal\"]")) return;
		return getUniqueClipId(Array.from(card.querySelectorAll(CLIP_PERMALINK_SELECTOR), (link) => link.getAttribute("href")), kickOrigin);
	}
	function activateClipDownload(event, clipId, onSelectClip) {
		event.preventDefault();
		event.stopPropagation();
		onSelectClip(clipId);
	}
	function createBatchedCardScheduler(processCards, schedule = queueMicrotask) {
		const pendingCards = new Set();
		let active = true;
		let scheduled = false;
		function flush() {
			scheduled = false;
			if (!active || pendingCards.size === 0) return;
			const cards = [...pendingCards];
			pendingCards.clear();
			processCards(cards);
		}
		return {
			cancel() {
				active = false;
				pendingCards.clear();
			},
			enqueue(card) {
				if (!active) return;
				pendingCards.add(card);
				if (scheduled) return;
				scheduled = true;
				schedule(flush);
			}
		};
	}
	function ClipDownloadAction({ clipId, onSelectClip }) {
		function stopPointerPropagation(event) {
			event.stopPropagation();
		}
		return u("button", {
			"aria-label": "Download source clip",
			class: "ke-clip-download-action",
			"data-ke-clip-download": true,
			onClick: (event) => activateClipDownload(event, clipId, onSelectClip),
			onMouseDown: stopPointerPropagation,
			onPointerDown: stopPointerPropagation,
			type: "button",
			children: u(DownloadIcon, { class: "ke-icon ke-clip-download-action__icon" })
		});
	}
	var icon_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAABACAYAAABC6cT1AAASRklEQVRo3r2be7AkdXXHP+d0z9y5j2VhEUUqWXwbjQTxSYhloCS+YsRoWaISrSSUUVcERVxXwBJBBUFBnqWQGCuAIsEnagIGKUtUBB8QICslhfISFFzcvXvvnTv9O9/80T09M3cee9Fdu/bO9kz3zK/P73ce3/M952evjqc+p0H+vBbTHgSJ5QgiMhruZBYIyj+BmUgyMkRgGIYjZEFSIgj8oXkWvwy0/8t/zmqPhYe30VozA6G9yfwwYBpJ5VUDwxAq/+9+Xl/rvVH1KsBkYOV5+WIytkj6Sj7DmkONeB8gAzJyZYDhGGYOEmbU387LwQb+VJ25B37LFK2rQe3VCt35+d1ka2YhYk/MPwwcUUtkfWLV4lUfCUZc7fvcqCerPJ83+KBC83mDKUsseVgRQkJmhoNBENV8WN/00p2j6ggJgQzHraAg1VqyuiPbdx+UtNYyPxV4czWPg4IwQkgbIfDo9wYsgk6T4nx3L/JUqqi6OtKdJPV9c0CZenpUrXV5WZT/gpCTZKsUOlKAtMbcPoTx5noAq9R2NROwUmgbODdgGfiE4CzIOp45uVBtBta15r4pt6Hf7F3rTU9pdNXzWvRMY7LQRYKIGdw/gPFWRLbCVkvXslLS1WpA+b5AnBvoowZLWeYAeN8DSvW5RhjUyl/sn5yuToggLDCLHQidOolIauH+foyjEPnoVRwzPPUqjZtjAwJxkdBJBgtZltUXyxUv3ZepEt4GPIo0OJKtsPH+Z3EzImA5JgsdAFOe2XEY7waatQ8dZavGuLkffa27BsbFQsdjbMs8G7jspYjW9fm1yOr6MFkpe18EGTYnWRVh5LgJN415olgusJRyc96JsxFolQ9pw2psI2xt8ir3PZaukOK9Ztqidhq6wa0cUd1lHOEou2KXyrFixN50OUIUVNFh5EoXSMppZG8DTkDMIGlgtlcKK8ZrgQ344O59hrhSxrFY9hubv4l8ujksePchDbPKQZURsBRS/b+q/jUeHE99GiZjcArVyCkkOgvulmX/iPEhjDXlY/avtAZXXDsIV91Bel7ZMa5FOtrgHi0W2G7PHqkSLqKUsu+HbIJpjXgEqQ6Appyp3C13p2dTsW0Bm1+w5ixvBH0YsXZgLTXCmLVC3Xd8OOg6SW83tzuXl4N8tjHpZrOuHhumKnwaVv0/FBJ7rn7ABZbPb0a2Deh0r6Slgm3fuhtrtV6Dczpue9W324pVsx0CkXHAxTF+IniHmW1WUdBqNSbPUp+w9IFa9S+DVX/9yt67v2ui5gXpzg7ptCfE7NYg6Cx28KmMNS973N/hdibiMUCsnMWJK7pjD+/ArYTeZvKfSh282dyxelgVkG1H45Tim9WGUb3KQO4ZU/dA47iX6aXfvtN/y9eKW8laOZH0YsM+ifEnVVxlAAFpFMYe6cgGr6kW+g6hd5D59ahDlk2t1i7MpJ7HkjSQ/PRjCKN2eOp5e3ki3RvwntPu+8HVP7Dv8sWFm/CGQ9IhZpwLPB6IUenGMEQYgpzjApYDdyPe6e7XRtHBG01We+Qr9WoAkw2AdPU8uepndcgeKEjvvdyu/2baZz8uKW4jmzaUdBDOecCTUd9K70i1bFUAxYEHEO/+7R1bv7H749eQPwKhu+GsTjHGPUMvKatjuapY8OvANhb2mysP135cvPQTvOFE4rkY5wNPQ7VNr+7Q2NDV72IeQmxU6lyxxxPmyBsZj/TwGmTXQ42CjeoHTAJ3I/ttguMftBu/lGuaS5ZvxFvTKOmZ5lwA7F8LPWmFJ6EwG0pKDNiGODEi/oMsV5bn/D6Hj9O3IT/SzTtLoPNwQh/Yyvx/rtEzuGz7bXizgUU83YzzMJ5d27SNQWNahUcfdHgGLCCdInSRuUV/0vGIBS8BDJhhVXDuBul+OFa9moHPB37KPFsunaEZV2z/PszkRIqn4HYBxkGl0Bqvuiu9tDH53tLptBFnSDrbROcPEbq34hrEEQzCsu4CGbAQ6KOLpH9vsXtcHD+C1iwKHm/u5yJeWMdpbLR670i1R3v+AnFeSB/DrO35HyY0QN5j7jQ88gCU9HYizlhk24U5jeILy7dgJThab865wKED3nsyxh7NmGik8Am4EPQhNxY8+8OFrgBMboZJ/WCityqK8nQ5wVltOL/BXOdzC7diDZDYB+Ms4GUT/bHRnw/sOMcezIYuUXCCZFt3ltBdYG+qiQWrE6TKe5uTFQkuWGD5LCPapz90DY3pQNLe5pyFcVgvRxlK6FfwlKsUvuYwdQVoozlbtrXvYWceeRCBVcRhjdiscmQqAruwIDt9mmzpM/M/oLW7E8Gj3Pk48Jo62g1mLGOyLRuGncYoAsKBKxHvAh7Agt1n1+9Uwd1wTF7TEKrpPZfILl5g8SPG8vbPb3oR03MZEOvcOQ14Xa2WI4WeEKc1KWbLgWuAY3C7t6027jk7+8gzcu+wXFFUXlVJRId0SdA8aYY185/z66HzY1Sk3SzzUzDeNMQzj1JfTYCeGmN64jrQBszvKOa3ML3bOnbF4UGhMseyLng1yL8U+Acz4uHP+fVEkZCYs8xPwjgSVTzTJPihCRowmmBwjB/JbIOZbV5sFzR3kdAAniiqionJME/w1UU6mwx76PN2I1EEEjOW+YkYb68TG1uRWe2IANTYc1UrfQvSBne7aWl7m9npBrvycMfIcAuCguJK8E3Tlv9644UHl0G56Eyb20aMdwKNgWrDJGxtE4CJrUgvxc8EG8z9+ugUTK+ZZlcf7jiG4/iiiM83Ke67XQ9wwPpDSzfXyJ8IHIHUGqANtEJAYzJROMqL9yjaq6MT30tFkDUb/DEOz2limIJiBuLYJYr992MvXviSt0AUSMu3gU4Ce6hWb43ImTUCktqKz0aFrhIDHJ41/B9EWCrSH0fwZdqWKDBcTRrPmqZ1zjyd/dazF4f4k7Dl5WDrA5eATgR+N5C3jsVqmgxVB7M1YTwK49TM/XCssJR2vfCeSN2ykUEWQewPcfp25p+8J9P85fQBsNujk4hPI05EbKto+AkUkfUJp9VQSYF4NNjHjfzvr/HL2dXCu2Fy87oSkkjJsQOnmTpzijVP3FdzHKMjMVlSpE+BPoyxMIKg0WgCoZ/G0qSiTwCPBTvzRfHal7s7KRW7TvCMHKvIVhECkZGlBs0XOPGJguX19/oPeSMHY2YdIp2FdCqwtMK/7zCmq7/W2NWEQb8QGOvBzpHiUPeMVHR22Yp7XRirK6VuQUTQ+WuHMwqKfZb8QfazA8CzZdAZwCcw2kOF1R0RierThNH3BcYTkJ0dioPccorY+cJ7lCtd0ete5Qeq6DKLBo0XzzF3+lza/bHP8BZf/NipYCxB+gjoHKAzdtFtAvlgE9FeAE8zcZ6I52TkRHth5wreG7LXIdNPfeQ0lJO9Qln7ox1t3fOyjZeUSUPYAimdDFyIqraXAX5Nq2NZRkJYlSuPPROzC6T0F+QtOrGwMwWvqqVmfRUSYbgZbqXD60Sic1iTxilGc93rtD9vefgo8Gwb0gmgz1SUk01IQAahrSZnK7XDE88Bu0Cmp+e0aBfLO8vGM+slWl3jM+vnWgPhZDRovL4Bp7S1uHbLumux/zkZ0MMQ78e4rN+NDcA3m0Q02ogU1vq/HpgdZNh5ivSkRtZA6uetf7/D3hQHbkosbcIUXUjabfcaLICXuVsiqSAuSmQnG2y79FUP0/jKXdBe3JtG6+yanJgEYUeVjXaE+YWBriIV/0Kj+csj0n4Urj2n8AMyskagTkDm5LZE2vw4m/3FTx9Y4Kq9fzKOXk41f2t9ddGV3seqrpCMzFs0j5whPyFYnnnjl9ewsPA7aLTuRzoG+FqtKuMSFa2CehouJgqzQ8nzvwZInpHTeqXwS8E+6+QXG/5Zxy9p0HjXeenHxl5LExkYs4FCwoiRreJk8O4bF+mfp2i8t8nM9JHTh8C2bZDZfaCjgau6yf1Irz2uimI7qKeVKDmTgnlrI2wuYCqhPFDT8GYiGh3as4/Ldjcm9F65eus9mgy0weUyM2TI8bxJc4NRHLvA1qnX7nYgsa0As18ibajoI5sIcWwsKaGhyallsMzMmdU0QYpu81LXTqMyxxaOT3CcPizteJesehqsop6jIdJRM8wc7cw23zB3ICwXAHcgbcD4XkUyDFPIk/m43lRICanASBXHrrLM2yBnqixzm6oenvIHc3K3oTaloYKCVW5YI9TchkoaNeQyA0kZ+VSOH5tIsYWtn3x1c//OF7bfQGNu9meKeDvYRRjP7V+zIcc3zNEF8H2MrwL39bqbJNANEoQVlfkFvc4t1dxGG1FMED1Xf5FopF5qjMexMvZLCopWkN49y9RCMPPpN8y+oPjC9htgNr+Z0AbgX4H9BkrGK/P03jAOfEmKowz/VUpBY2qQnNiUXokQXlrqQPtRGf9CGRnJDHEIkDC+M2TjdfqkscY4quJX9k6UUd8ipzEzw8zxLfinm7nL/nZmf+h0MLcbEBuA2ytMPNrTW1/tG51lnv1q+3WnDwld1qweQ5Doa0rUYHdJEbuxrLUSxrcHhL5a4moJOyKevylov89NApNWlg8r6Glmwwx4n9JWb7I2xY+3Uxxm2O++7reRltt4o4lCL8H4FLDvgNoPzq1j3CrFoVf7V+8/R8evncHf1MQf5ZTdt4lOZGQuVBiN54n4K6vqU90+vYLO5ib5txxXkMJpuEgEnZTRXOqQXZ7XyaJMA2zSCjl7mwVMffyT6PYCltKoTHXxrv5kzSlSUeBZ9t+KOAaz84B9hoTvaUJh5sVNfIcp8n0h3gO2DkxmZq5GNWRU1QeP6tG73VdqqPFnhj+j7KLPqt0NLqcpYcugu0rnZjYiqRi2+W7uIevVW2oLqX5DhII0EMeyPCeKDizMf5m5tXPAmYg9RzITZYsnjtGilQcdIIpea5wNtC6MBH3mqrJG64VhFGW1KIw8z6n028bQo/3+UgN5t61w0upWid1oDCXbnjeIVCDiUpPNgJ0GAx2OEOrDUDX7a1YWNtWD/r3gX9v5qKBc1UeEul2LGLmLLPOq69WsF6s1qOID1KGGMoq6/bf7SF4nPsN0Tw6dItRe/DfQRxALw4Rl2X7mQFBEUHQbDVSWuLyvIa2sAPWMlNLhlkVPkFVnvSbGRIogFXkZ+A1Z9Gphg01eK/qh1OcC+nxp1YTsZJTqOTqGZlMtIhUF0tkYs5htBKYQgfcm0JVhuJzMrQxxRsULVjDbhAIiSr7Q1Ofl3cmyLpGKeobneAhT3o0wdTYom5Aqj0d1PfWLsHqVxhF9OZGKNoqPYdkaxFFY3fWbIbL9/QX8r75/V1CcKmKtl32yXnppd8MiUTw/URys2q+WBl6Q/m+W1jdLIaX+rEvYYof4Xl7F4xXuzAhpbCl7aEeUdRsKRJC0mv1HnuVEkRZIOglnFrMjK8y2txlPPjhecf9BN121pbNu3fkxNc3ax26qv/ty/Tl7aJqADTkc0t+OZrgvU9xyrW4++am2t77tt49FblazPzJ6/evlFp0VGaYZVpl0V4WszuBUpvRu5KZVbMbxPCNS2oriBCybQ7weYx3GcUrpF81nnnN3M5bwvKyl6SsXwp13czSbuYfbyGkChbKuJQBBUlCwh2dmKjQBsqKeX4bBbXq1imgY1HSvVrNdrXNGbpBstfvOlr1Ns5h6kKTjcJvFeBXwcvPsMhFfw5sPpqIokyI3IV13Jtnm1/Os7qbAqraf1WyRMBJTFCvb+PoF7/oNyYa6G9UjgU19ttzd7Ti8qcARRRLLsdoezpbNEFvvgrk//RWKd4HNIv4GONCwA8tBraT8McnsrSZtziqhujoXfQlKRoYjGhME9yCqQgJ1PjvSnVnPl/eHtz58ryBUUChG/M5Eld9tPduXFzDZLwi9A/juUHnS67ZDYUZZ10/d2n5Fi1cbSkisrQxh7JhFuYm2t3tVRh85YaLkMaQyvlZBstqmV4VCsCCszJjyDHKHR9aataY1SyoSZHY7aANwI+BUcKtSM7MyxNNihhbTntGwPjXt+hafZpqc8b0zeZPWYqL962oTjZn1tkt2nVkv0NX9UagfNpQx1kSY6Dwolgtbdbty38O0GhTRwclvrlicT2Ksr91ORMhtu0kUtoyRP2DY/UZGVFprWCZ07zX8PF7KUybYeGSXu2ffidKZmWqCvH/bRR0qahZmENh0q60iiO3B4rzx+zXj5d4gLRV4ih9qKjscsz26Q6nMB+4W0LGCoPP1FlObwV1lTLJEok3c+2Y9m2/YrWPH+X9edoYQgIbGYAAAAABJRU5ErkJggg==";
	function DirectClipDownloadAction({ clipId, onSelectClip }) {
		const tooltipId = g$1();
		const label = "Download source clip (KICK Enhancer)";
		return u(S, { children: [u("button", {
			"aria-describedby": tooltipId,
			"aria-label": label,
			className: "ke-direct-clip-download-action",
			"data-ke-direct-clip-download": true,
			onClick: (event) => activateClipDownload(event, clipId, onSelectClip),
			type: "button",
			children: [u("img", {
				alt: "",
				className: "ke-direct-clip-download-action__brand",
				draggable: false,
				src: icon_default
			}), u(DownloadIcon, { class: "ke-icon ke-direct-clip-download-action__icon" })]
		}), u("span", {
			className: "ke-direct-clip-download-tooltip",
			id: tooltipId,
			role: "tooltip",
			children: label
		})] });
	}
	function g(n, t) {
		for (var e in t) n[e] = t[e];
		return n;
	}
	function E(n, t) {
		for (var e in n) if ("__source" !== e && !(e in t)) return !0;
		for (var r in t) if ("__source" !== r && n[r] !== t[r]) return !0;
		return !1;
	}
	function M(n, t) {
		this.props = n, this.context = t;
	}
	function N(n, e) {
		function r(n) {
			var t = this.props.ref;
			return t != n.ref && t && ("function" == typeof t ? t(null) : t.current = null), e ? !e(this.props, n) || t != n.ref : E(this.props, n);
		}
		function u(e) {
			return this.shouldComponentUpdate = r, k$1(n, e);
		}
		return u.displayName = "Memo(" + (n.displayName || n.name) + ")", u.__f = u.prototype.isReactComponent = !0, u.type = n, u;
	}
	(M.prototype = new C$1()).isPureReactComponent = !0, M.prototype.shouldComponentUpdate = function(n, t) {
		return E(this.props, n) || E(this.state, t);
	};
	var T = l$1.__b;
	l$1.__b = function(n) {
		n.type && n.type.__f && n.ref && (n.props.ref = n.ref, n.ref = null), T && T(n);
	};
	"undefined" != typeof Symbol && Symbol.for;
	var O = l$1.__e;
	l$1.__e = function(n, t, e, r) {
		if (n.then) {
			for (var u, o = t; o = o.__;) if ((u = o.__c) && u.__c) return t.__e ?? (t.__e = e.__e, t.__k = e.__k || []), u.__c(n, t);
		}
		O(n, t, e, r);
	};
	var U = l$1.unmount;
	function V(n, t, e) {
		return n && (n.__c && n.__c.__H && (n.__c.__H.__.forEach(function(n) {
			"function" == typeof n.__c && n.__c();
		}), n.__c.__H = null), null != (n = g({}, n)).__c && (n.__c.__P === e && (n.__c.__P = t), n.__c.__e = !0, n.__c = null), n.__k = n.__k && n.__k.map(function(n) {
			return V(n, t, e);
		})), n;
	}
	function W(n, t, e) {
		return n && e && (n.__v = null, n.__k = n.__k && n.__k.map(function(n) {
			return W(n, t, e);
		}), n.__c && n.__c.__P === t && (n.__e && e.appendChild(n.__e), n.__c.__e = !0, n.__c.__P = e)), n;
	}
	function P() {
		this.__u = 0, this.o = null, this.__b = null;
	}
	function j(n) {
		var t = n.__ && n.__.__c;
		return t && t.__a && t.__a(n);
	}
	function B() {
		this.i = null, this.l = null;
	}
	l$1.unmount = function(n) {
		var t = n.__c;
		t && (t.__z = !0), t && t.__R && t.__R(), t && 32 & n.__u && (n.type = null), U && U(n);
	}, (P.prototype = new C$1()).__c = function(n, t) {
		var e = t.__c, r = this;
		r.o ??= [], r.o.push(e);
		var u = j(r.__v), o = !1, i = function() {
			o || r.__z || (o = !0, e.__R = null, u ? u(c) : c());
		};
		e.__R = i;
		var l = e.__P;
		e.__P = null;
		var c = function() {
			if (!--r.__u) {
				if (r.state.__a) {
					var n = r.state.__a;
					r.__v.__k[0] = W(n, n.__c.__P, n.__c.__O);
				}
				var t;
				for (r.setState({ __a: r.__b = null }); t = r.o.pop();) t.__P = l, t.forceUpdate();
			}
		};
		r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), n.then(i, i);
	}, P.prototype.componentWillUnmount = function() {
		this.o = [];
	}, P.prototype.render = function(n, e) {
		if (this.__b) {
			if (this.__v.__k) {
				var r = document.createElement("div"), o = this.__v.__k[0].__c;
				this.__v.__k[0] = V(this.__b, r, o.__O = o.__P);
			}
			this.__b = null;
		}
		var i = e.__a && k$1(S, null, n.fallback);
		return i && (i.__u &= -33), [k$1(S, null, e.__a ? null : n.children), i];
	};
	var H = function(n, t, e) {
		if (++e[1] === e[0] && n.l.delete(t), n.props.revealOrder && ("t" !== n.props.revealOrder[0] || !n.l.size)) for (e = n.i; e;) {
			for (; e.length > 3;) e.pop()();
			if (e[1] < e[0]) break;
			n.i = e = e[2];
		}
	};
	function Z(n) {
		return this.getChildContext = function() {
			return n.context;
		}, n.children;
	}
	function Y(n) {
		var e = this, r = n.h;
		if (e.componentWillUnmount = function() {
			R(null, e.v), e.v = null, e.h = null;
		}, e.h && e.h !== r && e.componentWillUnmount(), !e.v) {
			for (var u = e.__v; null !== u && !u.__m && null !== u.__;) u = u.__;
			e.h = r, e.v = {
				nodeType: 1,
				parentNode: r,
				childNodes: [],
				__k: { __m: u.__m },
				contains: function() {
					return !0;
				},
				namespaceURI: r.namespaceURI,
				insertBefore: function(n, t) {
					this.childNodes.push(n), e.h.insertBefore(n, t);
				},
				removeChild: function(n) {
					this.childNodes.splice(this.childNodes.indexOf(n) >>> 1, 1), e.h.removeChild(n);
				}
			};
		}
		R(k$1(Z, { context: e.context }, n.__v), e.v);
	}
	function $(n, e) {
		var r = k$1(Y, {
			__v: n,
			h: e
		});
		return r.containerInfo = e, r;
	}
	(B.prototype = new C$1()).__a = function(n) {
		var t = this, e = j(t.__v), r = t.l.get(n);
		return r[0]++, function(u) {
			var o = function() {
				t.props.revealOrder ? (r.push(u), H(t, n, r)) : u();
			};
			e ? e(o) : o();
		};
	}, B.prototype.render = function(n) {
		this.i = null, this.l = new Map();
		var t = F(n.children);
		n.revealOrder && "b" === n.revealOrder[0] && t.reverse();
		for (var e = t.length; e--;) this.l.set(t[e], this.i = [
			1,
			0,
			this.i
		]);
		return n.children;
	}, B.prototype.componentDidUpdate = B.prototype.componentDidMount = function() {
		var n = this;
		this.l.forEach(function(t, e) {
			H(n, e, t);
		});
	};
	var q = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
	var G = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
	var J = /^on(Ani|Tra|Tou|BeforeInp|Compo)/;
	var K = /[A-Z0-9]/g;
	var Q = "undefined" != typeof document;
	var X = function(n) {
		return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(n);
	};
	C$1.prototype.isReactComponent = !0, [
		"componentWillMount",
		"componentWillReceiveProps",
		"componentWillUpdate"
	].forEach(function(t) {
		Object.defineProperty(C$1.prototype, t, {
			configurable: !0,
			get: function() {
				return this["UNSAFE_" + t];
			},
			set: function(n) {
				Object.defineProperty(this, t, {
					configurable: !0,
					writable: !0,
					value: n
				});
			}
		});
	});
	var en = l$1.event;
	l$1.event = function(n) {
		return en && (n = en(n)), n.persist = function() {}, n.isPropagationStopped = function() {
			return this.cancelBubble;
		}, n.isDefaultPrevented = function() {
			return this.defaultPrevented;
		}, n.nativeEvent = n;
	};
	var un = {
		configurable: !0,
		get: function() {
			return this.class;
		}
	};
	var on = l$1.vnode;
	l$1.vnode = function(n) {
		"string" == typeof n.type && function(n) {
			var t = n.props, e = n.type, u = {}, o = -1 == e.indexOf("-");
			for (var i in t) {
				var l = t[i];
				if (!("value" === i && "defaultValue" in t && null == l || Q && "children" === i && "noscript" === e || "class" === i || "className" === i)) {
					var c = i.toLowerCase();
					"defaultValue" === i && "value" in t && null == t.value ? i = "value" : "download" === i && !0 === l ? l = "" : "translate" === c && "no" === l ? l = !1 : "o" === c[0] && "n" === c[1] ? "ondoubleclick" === c ? i = "ondblclick" : "onchange" !== c || "input" !== e && "textarea" !== e || X(t.type) ? "onfocus" === c ? i = "onfocusin" : "onblur" === c ? i = "onfocusout" : J.test(i) && (i = c) : c = i = "oninput" : o && G.test(i) ? i = i.replace(K, "-$&").toLowerCase() : null === l && (l = void 0), "oninput" === c && u[i = c] && (i = "oninputCapture"), u[i] = l;
				}
			}
			"select" == e && (u.multiple && Array.isArray(u.value) && (u.value = F(t.children).forEach(function(n) {
				n.props.selected = -1 != u.value.indexOf(n.props.value);
			})), null != u.defaultValue && (u.value = F(t.children).forEach(function(n) {
				n.props.selected = u.multiple ? -1 != u.defaultValue.indexOf(n.props.value) : u.defaultValue == n.props.value;
			}))), t.class && !t.className ? (u.class = t.class, Object.defineProperty(u, "className", un)) : t.className && (u.class = u.className = t.className), n.props = u;
		}(n), n.$$typeof = q, on && on(n);
	};
	var ln = l$1.__r;
	l$1.__r = function(n) {
		ln && ln(n), n.__c;
	};
	var cn = l$1.diffed;
	l$1.diffed = function(n) {
		cn && cn(n);
		var t = n.props, e = n.__e;
		null != e && "textarea" === n.type && "value" in t && t.value !== e.value && (e.value = null == t.value ? "" : t.value);
	};
	function calculateListViewRange(itemCount, rowHeight, overscan, scrollTop, viewportHeight) {
		if (itemCount <= 0) return {
			end: 0,
			start: 0
		};
		const safeRowHeight = Math.max(1, rowHeight);
		const safeOverscan = Number.isFinite(overscan) ? Math.max(0, Math.floor(overscan)) : 0;
		const firstVisible = Math.floor(Math.max(0, scrollTop) / safeRowHeight);
		const afterLastVisible = Math.ceil((Math.max(0, scrollTop) + Math.max(0, viewportHeight)) / safeRowHeight);
		return {
			end: Math.min(itemCount, Math.max(firstVisible + 1, afterLastVisible) + safeOverscan),
			start: Math.min(itemCount, Math.max(0, firstVisible - safeOverscan))
		};
	}
	var EDGE_TOLERANCE = 2;
	function calculateScrollOverflow(scrollTop, viewportHeight, contentHeight) {
		const maximumScrollTop = Math.max(0, contentHeight - viewportHeight);
		const resolvedScrollTop = Math.min(maximumScrollTop, Math.max(0, scrollTop));
		return {
			bottom: maximumScrollTop - resolvedScrollTop > EDGE_TOLERANCE,
			top: resolvedScrollTop > EDGE_TOLERANCE
		};
	}
	function joinClassNames(...values) {
		return values.filter(Boolean).join(" ");
	}
	function ScrollArea({ children, className, contentClassName, heightMode = "fill", minimumThumbSize = 24, onViewportChange, onViewportMetricsChange, onViewportScroll, scrollIndicators = false, scrollbarVariant = "default", viewportAriaLabel, viewportClassName, viewportTabIndex = 0 }) {
		const viewportRef = A$1(null);
		const contentRef = A$1(null);
		const rootRef = A$1(null);
		const thumbRef = A$1(null);
		const animationFrameRef = A$1(null);
		const thumbSizeRef = A$1(minimumThumbSize);
		const thumbVisibleRef = A$1(false);
		const dragRef = A$1(null);
		const updateThumb = q$1(() => {
			const viewport = viewportRef.current;
			const root = rootRef.current;
			const thumb = thumbRef.current;
			if (!viewport || !root || !thumb) return;
			const viewportHeight = viewport.clientHeight;
			const contentHeight = viewport.scrollHeight;
			const maximumScrollTop = Math.max(0, contentHeight - viewportHeight);
			const overflow = calculateScrollOverflow(viewport.scrollTop, viewportHeight, contentHeight);
			root.toggleAttribute("data-overflow-top", scrollIndicators && overflow.top);
			root.toggleAttribute("data-overflow-bottom", scrollIndicators && overflow.bottom);
			if (viewportHeight <= 0 || maximumScrollTop <= 0) {
				thumbVisibleRef.current = false;
				thumb.removeAttribute("data-visible");
				thumb.style.height = "";
				thumb.style.transform = "";
				return;
			}
			const nextSize = Math.min(viewportHeight, Math.max(Math.max(1, minimumThumbSize), Math.round(viewportHeight / contentHeight * viewportHeight)));
			const maximumOffset = Math.max(0, viewportHeight - nextSize);
			const nextOffset = Math.round(viewport.scrollTop / maximumScrollTop * maximumOffset);
			thumbSizeRef.current = nextSize;
			thumbVisibleRef.current = true;
			thumb.dataset.visible = "true";
			thumb.style.height = `${nextSize}px`;
			thumb.style.transform = `translateY(${nextOffset}px)`;
		}, [minimumThumbSize, scrollIndicators]);
		const scheduleThumbUpdate = q$1(() => {
			if (animationFrameRef.current !== null) return;
			animationFrameRef.current = window.requestAnimationFrame(() => {
				animationFrameRef.current = null;
				updateThumb();
			});
		}, [updateThumb]);
		const setViewport = q$1((viewport) => {
			viewportRef.current = viewport;
			onViewportChange?.(viewport);
		}, [onViewportChange]);
		const handleScroll = q$1((event) => {
			onViewportScroll?.(event.currentTarget);
			scheduleThumbUpdate();
		}, [onViewportScroll, scheduleThumbUpdate]);
		h(() => {
			const viewport = viewportRef.current;
			const content = contentRef.current;
			const handleMetricsChange = () => {
				scheduleThumbUpdate();
				if (viewportRef.current) onViewportMetricsChange?.(viewportRef.current);
			};
			const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(handleMetricsChange);
			handleMetricsChange();
			if (viewport) resizeObserver?.observe(viewport);
			if (content) resizeObserver?.observe(content);
			return () => {
				resizeObserver?.disconnect();
				if (animationFrameRef.current !== null) {
					window.cancelAnimationFrame(animationFrameRef.current);
					animationFrameRef.current = null;
				}
			};
		}, [onViewportMetricsChange, scheduleThumbUpdate]);
		const finishDrag = q$1((event) => {
			if (!dragRef.current || event.pointerId !== dragRef.current.pointerId) return;
			if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
			dragRef.current = null;
			rootRef.current?.classList.remove("is-dragging");
		}, []);
		const handleThumbPointerDown = q$1((event) => {
			const viewport = viewportRef.current;
			if (event.button !== 0 || !viewport || !thumbVisibleRef.current) return;
			event.preventDefault();
			event.stopPropagation();
			event.currentTarget.setPointerCapture(event.pointerId);
			dragRef.current = {
				pointerId: event.pointerId,
				startClientY: event.clientY,
				startScrollTop: viewport.scrollTop
			};
			rootRef.current?.classList.add("is-dragging");
		}, []);
		const handleThumbPointerMove = q$1((event) => {
			const drag = dragRef.current;
			const viewport = viewportRef.current;
			if (!drag || drag.pointerId !== event.pointerId || !viewport) return;
			const maximumScrollTop = Math.max(0, viewport.scrollHeight - viewport.clientHeight);
			const maximumThumbOffset = Math.max(1, viewport.clientHeight - thumbSizeRef.current);
			const scrollDelta = (event.clientY - drag.startClientY) * maximumScrollTop / maximumThumbOffset;
			viewport.scrollTop = Math.min(maximumScrollTop, Math.max(0, drag.startScrollTop + scrollDelta));
		}, []);
		return u("div", {
			className: joinClassNames("ke-scroll-area", className),
			"data-height": heightMode,
			"data-scroll-indicators": scrollIndicators ? "true" : void 0,
			"data-scrollbar": scrollbarVariant,
			ref: rootRef,
			children: [u("div", {
				"aria-label": viewportAriaLabel,
				className: joinClassNames("ke-scroll-area__viewport", viewportClassName),
				onScroll: handleScroll,
				ref: setViewport,
				tabIndex: viewportTabIndex,
				children: u("div", {
					className: joinClassNames("ke-scroll-area__content", contentClassName),
					ref: contentRef,
					children
				})
			}), u("div", {
				"aria-hidden": "true",
				className: "ke-scroll-area__thumb",
				onLostPointerCapture: finishDrag,
				onPointerCancel: finishDrag,
				onPointerDown: handleThumbPointerDown,
				onPointerMove: handleThumbPointerMove,
				onPointerUp: finishDrag,
				ref: thumbRef
			})]
		});
	}
	function useListViewRange(itemCount, overscan, rowHeight) {
		const virtualized = rowHeight !== void 0;
		const viewportRef = A$1(null);
		const animationFrameRef = A$1(null);
		const updateRangeRef = A$1(() => void 0);
		const [range, setRange] = d(() => virtualized ? calculateListViewRange(itemCount, rowHeight, overscan, 0, 0) : {
			end: itemCount,
			start: 0
		});
		const updateRange = q$1(() => {
			const viewport = viewportRef.current;
			const nextRange = virtualized && viewport ? calculateListViewRange(itemCount, rowHeight, overscan, viewport.scrollTop, viewport.clientHeight) : {
				end: itemCount,
				start: 0
			};
			setRange((current) => current.start === nextRange.start && current.end === nextRange.end ? current : nextRange);
		}, [
			itemCount,
			overscan,
			rowHeight,
			virtualized
		]);
		updateRangeRef.current = updateRange;
		const scheduleRangeUpdate = q$1(() => {
			if (animationFrameRef.current !== null) return;
			animationFrameRef.current = window.requestAnimationFrame(() => {
				animationFrameRef.current = null;
				updateRangeRef.current();
			});
		}, []);
		const setViewport = q$1((viewport) => {
			viewportRef.current = viewport;
			if (viewport && virtualized) scheduleRangeUpdate();
		}, [scheduleRangeUpdate, virtualized]);
		h(() => {
			if (virtualized) scheduleRangeUpdate();
		}, [
			scheduleRangeUpdate,
			updateRange,
			virtualized
		]);
		h(() => {
			const viewport = viewportRef.current;
			if (!virtualized || !viewport || typeof ResizeObserver === "undefined") return;
			const resizeObserver = new ResizeObserver(scheduleRangeUpdate);
			resizeObserver.observe(viewport);
			return () => resizeObserver.disconnect();
		}, [scheduleRangeUpdate, virtualized]);
		h(() => () => {
			if (animationFrameRef.current !== null) window.cancelAnimationFrame(animationFrameRef.current);
		}, []);
		return {
			range,
			scheduleRangeUpdate,
			setViewport,
			virtualized
		};
	}
	function ListViewRowComponent({ ariaLabel, className, columns, gridTemplateColumns, index, item, itemCount, onItemActivate, rowHeight }) {
		const virtualized = rowHeight !== void 0;
		const rowStyle = {
			gridTemplateColumns,
			...virtualized ? {
				height: `${rowHeight}px`,
				transform: `translateY(${index * rowHeight}px)`
			} : {}
		};
		return u("div", {
			"aria-label": ariaLabel,
			"aria-rowindex": index + 2,
			className: joinClassNames("ke-list-view__row", onItemActivate && "is-interactive", className),
			"data-last-row": index === itemCount - 1 ? "true" : void 0,
			"data-virtualized": virtualized ? "true" : void 0,
			onClick: onItemActivate ? () => onItemActivate(item) : void 0,
			onKeyDown: onItemActivate ? (event) => {
				if (event.key !== "Enter" && event.key !== " ") return;
				event.preventDefault();
				onItemActivate(item);
			} : void 0,
			role: "row",
			style: rowStyle,
			tabIndex: onItemActivate ? 0 : void 0,
			children: columns.map((column) => u("div", {
				className: joinClassNames("ke-list-view__cell", column.cellClassName),
				"data-align": column.align,
				"data-column-id": column.id,
				role: "cell",
				children: u("div", {
					className: "ke-list-view__cell-content",
					children: column.renderCell(item)
				})
			}, column.id))
		});
	}
	var ListViewRow = N(ListViewRowComponent);
	function ListView({ ariaLabel, ariaLive = "off", className, columns, emptyContent = "No items", getItemKey, getRowAriaLabel, getRowClassName, heightMode = "fill", items, onItemActivate, overscan = 8, rowHeight }) {
		if (rowHeight !== void 0 && (!Number.isFinite(rowHeight) || rowHeight <= 0)) throw new Error("ListView rowHeight must be a positive finite number.");
		const gridTemplateColumns = T$1(() => columns.map((column) => column.width).join(" "), [columns]);
		const rowStyle = { gridTemplateColumns };
		const { range, scheduleRangeUpdate, setViewport, virtualized } = useListViewRange(items.length, overscan, rowHeight);
		const rangeStart = Math.min(items.length, range.start);
		const rangeEnd = Math.min(items.length, Math.max(rangeStart, range.end));
		const visibleItems = virtualized ? items.slice(rangeStart, rangeEnd) : items;
		const bodyStyle = virtualized && rowHeight !== void 0 ? { height: `${items.length * rowHeight}px` } : void 0;
		return u("div", {
			"aria-colcount": columns.length,
			"aria-label": ariaLabel,
			"aria-rowcount": items.length + 1,
			className: joinClassNames("ke-list-view", className),
			"data-empty": items.length === 0 ? "true" : "false",
			role: "table",
			children: [u("div", {
				className: "ke-list-view__header-group",
				role: "rowgroup",
				children: u("div", {
					"aria-rowindex": 1,
					className: "ke-list-view__header",
					role: "row",
					style: rowStyle,
					children: columns.map((column) => u("div", {
						className: "ke-list-view__header-cell",
						"data-align": column.align,
						"data-column-id": column.id,
						role: "columnheader",
						children: u("span", {
							className: "ke-list-view__header-label",
							children: column.header
						})
					}, column.id))
				})
			}), u(ScrollArea, {
				className: "ke-list-view__scroll",
				contentClassName: "ke-list-view__scroll-content",
				heightMode,
				onViewportChange: setViewport,
				onViewportScroll: virtualized ? scheduleRangeUpdate : void 0,
				scrollIndicators: true,
				scrollbarVariant: "compact",
				viewportAriaLabel: `${ariaLabel} rows`,
				viewportClassName: "ke-list-view__viewport",
				viewportTabIndex: onItemActivate ? -1 : 0,
				children: [u("div", {
					"aria-live": virtualized ? "off" : ariaLive,
					className: "ke-list-view__body",
					"data-virtualized": virtualized ? "true" : void 0,
					role: "rowgroup",
					style: bodyStyle,
					children: items.length === 0 ? u("div", {
						className: "ke-list-view__empty",
						role: "status",
						children: emptyContent
					}) : visibleItems.map((item, visibleIndex) => {
						const index = virtualized ? rangeStart + visibleIndex : visibleIndex;
						return u(ListViewRow, {
							ariaLabel: getRowAriaLabel?.(item),
							className: getRowClassName?.(item),
							columns,
							gridTemplateColumns,
							index,
							item,
							itemCount: items.length,
							onItemActivate,
							rowHeight
						}, getItemKey(item, index));
					})
				}), virtualized && ariaLive !== "off" ? u("span", {
					"aria-atomic": "true",
					"aria-live": ariaLive,
					className: "ke-list-view__live-status",
					children: [
						items.length,
						" ",
						items.length === 1 ? "row" : "rows"
					]
				}) : null]
			})]
		});
	}
	function Button({ children, className, density = "default", tone = "default", type = "button", ...props }) {
		return u("button", {
			...props,
			className: joinClassNames("ke-button", `ke-button--${density}`, `ke-button--${tone}`, className),
			type,
			children
		});
	}
	function SelectBox({ className, description, id, label, onValueChange, options, ...props }) {
		const generatedId = g$1();
		const selectId = id ?? generatedId;
		const descriptionId = description ? `${selectId}-description` : void 0;
		return u("label", {
			className: "ke-form-field",
			htmlFor: selectId,
			children: [
				u("span", {
					className: "ke-form-field__label",
					children: label
				}),
				description ? u("span", {
					className: "ke-form-field__description",
					id: descriptionId,
					children: description
				}) : null,
				u("span", {
					className: "ke-select-box",
					children: [u("select", {
						...props,
						"aria-describedby": descriptionId,
						className: joinClassNames("ke-select-box__input", className),
						id: selectId,
						onChange: (event) => onValueChange?.(event.currentTarget.value),
						children: options.map((option) => u("option", {
							disabled: option.disabled,
							value: option.value,
							children: option.label
						}, option.value))
					}), u("span", {
						"aria-hidden": "true",
						className: "ke-select-box__chevron"
					})]
				})
			]
		});
	}
	function TextField({ className, description, id, label, onValueChange, suffix, ...props }) {
		const generatedId = g$1();
		const inputId = id ?? generatedId;
		const descriptionId = description ? `${inputId}-description` : void 0;
		const suffixId = suffix ? `${inputId}-suffix` : void 0;
		const describedBy = [descriptionId, suffixId].filter(Boolean).join(" ") || void 0;
		return u("label", {
			className: "ke-form-field",
			htmlFor: inputId,
			children: [
				u("span", {
					className: "ke-form-field__label",
					children: label
				}),
				description ? u("span", {
					className: "ke-form-field__description",
					id: descriptionId,
					children: description
				}) : null,
				u("span", {
					className: suffix ? "ke-text-field-shell" : void 0,
					children: [u("input", {
						...props,
						"aria-describedby": describedBy,
						className: joinClassNames("ke-text-field", className),
						id: inputId,
						onInput: (event) => onValueChange?.(event.currentTarget.value)
					}), suffix ? u("span", {
						className: "ke-text-field__suffix",
						id: suffixId,
						children: suffix
					}) : null]
				})
			]
		});
	}
	function Toggle({ className, description, id, label, onCheckedChange, ...props }) {
		const generatedId = g$1();
		const inputId = id ?? generatedId;
		const descriptionId = description ? `${inputId}-description` : void 0;
		return u("label", {
			className: joinClassNames("ke-toggle", className),
			htmlFor: inputId,
			children: [u("span", {
				className: "ke-toggle__copy",
				children: [u("span", {
					className: "ke-form-field__label",
					children: label
				}), description ? u("span", {
					className: "ke-form-field__description",
					id: descriptionId,
					children: description
				}) : null]
			}), u("span", {
				className: "ke-toggle__control",
				children: [u("input", {
					...props,
					"aria-describedby": descriptionId,
					className: "ke-toggle__input",
					id: inputId,
					onChange: (event) => onCheckedChange?.(event.currentTarget.checked),
					role: "switch",
					type: "checkbox"
				}), u("span", {
					"aria-hidden": "true",
					className: "ke-toggle__track",
					children: u("span", { className: "ke-toggle__thumb" })
				})]
			})]
		});
	}
	function TrackBar({ defaultValue, description, formatValue = String, id, label, max, min, onValueChange, value, ...props }) {
		const generatedId = g$1();
		const inputId = id ?? generatedId;
		const descriptionId = description ? `${inputId}-description` : void 0;
		const [internalValue, setInternalValue] = d(defaultValue ?? min);
		const currentValue = value ?? internalValue;
		const range = max - min;
		const progress = range > 0 ? (currentValue - min) / range * 100 : 0;
		const handleInput = (event) => {
			const nextValue = event.currentTarget.valueAsNumber;
			if (value === void 0) setInternalValue(nextValue);
			onValueChange?.(nextValue);
		};
		return u("label", {
			className: "ke-form-field",
			htmlFor: inputId,
			children: [
				u("span", {
					className: "ke-track-bar__heading",
					children: [u("span", {
						className: "ke-form-field__label",
						children: label
					}), u("output", {
						className: "ke-track-bar__value",
						htmlFor: inputId,
						children: formatValue(currentValue)
					})]
				}),
				description ? u("span", {
					className: "ke-form-field__description",
					id: descriptionId,
					children: description
				}) : null,
				u("input", {
					...props,
					"aria-describedby": descriptionId,
					className: "ke-track-bar",
					id: inputId,
					max,
					min,
					onInput: handleInput,
					style: { "--ke-track-progress": `${progress}%` },
					type: "range",
					value: currentValue
				})
			]
		});
	}
	function useModalFocusRestoration(open) {
		h(() => {
			if (!open) return;
			const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
			return () => {
				if (previousFocus?.isConnected) previousFocus.focus();
			};
		}, [open]);
	}
	function Modal({ children, className, closeLabel = "Close settings", description, dismissDisabled = false, footer, icon, initialFocusRef, onRequestClose, open, title }) {
		const dialogRef = A$1(null);
		const titleId = g$1();
		const descriptionId = g$1();
		useModalFocusRestoration(open);
		h(() => {
			const dialog = dialogRef.current;
			if (!dialog) return;
			if (open && !dialog.open) {
				dialog.showModal();
				initialFocusRef?.current?.focus();
			} else if (!open && dialog.open) dialog.close();
		}, [initialFocusRef, open]);
		const requestClose = () => {
			if (!dismissDisabled) onRequestClose();
		};
		const handleCancel = (event) => {
			event.preventDefault();
			requestClose();
		};
		const handleBackdropPointerDown = (event) => {
			if (event.target === event.currentTarget) requestClose();
		};
		if (!open) return null;
		return $(u("dialog", {
			"aria-describedby": description ? descriptionId : void 0,
			"aria-labelledby": titleId,
			className: joinClassNames("ke-modal", className),
			onCancel: handleCancel,
			onPointerDown: handleBackdropPointerDown,
			ref: dialogRef,
			children: u("div", {
				className: "ke-modal__surface",
				children: [
					u("header", {
						className: "ke-modal__header",
						children: [u("div", {
							className: "ke-modal__identity",
							children: [icon ? u("img", {
								alt: "",
								className: "ke-modal__icon",
								draggable: false,
								src: icon
							}) : null, u("div", {
								className: "ke-modal__heading",
								children: [u("h2", {
									className: "ke-modal__title",
									id: titleId,
									children: title
								}), description ? u("p", {
									className: "ke-modal__description",
									id: descriptionId,
									children: description
								}) : null]
							})]
						}), u(Button, {
							"aria-label": closeLabel,
							className: "ke-modal__close",
							disabled: dismissDisabled,
							onClick: requestClose,
							children: u("span", {
								"aria-hidden": "true",
								children: "×"
							})
						})]
					}),
					u("div", {
						className: "ke-modal__body",
						children
					}),
					footer ? u("footer", {
						className: "ke-modal__footer",
						children: footer
					}) : null
				]
			})
		}), document.body);
	}
	function findEnabledTabIndex(tabs, startIndex, direction) {
		for (let offset = 1; offset <= tabs.length; offset += 1) {
			const index = (startIndex + direction * offset + tabs.length) % tabs.length;
			if (!tabs[index].disabled) return index;
		}
		return -1;
	}
	function findEdgeTabIndex(tabs, fromEnd) {
		const start = fromEnd ? tabs.length - 1 : 0;
		const end = fromEnd ? -1 : tabs.length;
		const step = fromEnd ? -1 : 1;
		for (let index = start; index !== end; index += step) if (!tabs[index].disabled) return index;
		return -1;
	}
	function Tabs({ ariaLabel, className, defaultValue, onChange, panelClassName, tabs, value }) {
		const instanceId = g$1();
		const tabButtonsRef = A$1([]);
		const [uncontrolledValue, setUncontrolledValue] = d(defaultValue);
		const controlled = value !== void 0;
		const requestedValue = controlled ? value : uncontrolledValue;
		let selectedIndex = tabs.findIndex((tab) => !tab.disabled && tab.id === requestedValue);
		if (selectedIndex === -1) selectedIndex = tabs.findIndex((tab) => !tab.disabled);
		const selectTab = (index) => {
			const tab = tabs[index];
			if (!tab || tab.disabled) return;
			if (!controlled) setUncontrolledValue(tab.id);
			if (tab.id !== requestedValue) onChange?.(tab.id);
		};
		const handleKeyDown = (event, currentIndex) => {
			let nextIndex = -1;
			if (event.key === "ArrowLeft") nextIndex = findEnabledTabIndex(tabs, currentIndex, -1);
			else if (event.key === "ArrowRight") nextIndex = findEnabledTabIndex(tabs, currentIndex, 1);
			else if (event.key === "Home") nextIndex = findEdgeTabIndex(tabs, false);
			else if (event.key === "End") nextIndex = findEdgeTabIndex(tabs, true);
			if (nextIndex === -1) return;
			event.preventDefault();
			selectTab(nextIndex);
			tabButtonsRef.current[nextIndex]?.focus();
		};
		return u("div", {
			className: joinClassNames("ke-tabs", className),
			children: [u("div", {
				"aria-label": ariaLabel,
				"aria-orientation": "horizontal",
				className: "ke-tabs__list",
				role: "tablist",
				children: tabs.map((tab, index) => {
					const selected = index === selectedIndex;
					return u("button", {
						"aria-controls": `${instanceId}-panel-${index}`,
						"aria-selected": selected,
						className: "ke-tabs__tab",
						disabled: tab.disabled,
						id: `${instanceId}-tab-${index}`,
						onClick: () => selectTab(index),
						onKeyDown: (event) => handleKeyDown(event, index),
						ref: (button) => {
							tabButtonsRef.current[index] = button;
						},
						role: "tab",
						tabIndex: selected ? 0 : -1,
						type: "button",
						children: tab.label
					}, tab.id);
				})
			}), tabs.map((tab, index) => {
				const selected = index === selectedIndex;
				return u("div", {
					"aria-labelledby": `${instanceId}-tab-${index}`,
					className: joinClassNames("ke-tabs__panel", panelClassName),
					hidden: !selected,
					id: `${instanceId}-panel-${index}`,
					role: "tabpanel",
					children: u(ScrollArea, {
						className: "ke-tabs__scroll",
						contentClassName: joinClassNames("ke-tabs__panel-content", tab.contentClassName),
						scrollIndicators: true,
						scrollbarVariant: "overlay",
						viewportAriaLabel: tab.panelAriaLabel ?? (typeof tab.label === "string" ? `${tab.label} settings` : void 0),
						viewportTabIndex: selected ? 0 : -1,
						children: tab.content
					})
				}, tab.id);
			})]
		});
	}
	var ClipDownloadError = class extends Error {
		code;
		constructor(code, message) {
			super(message);
			this.name = "ClipDownloadError";
			this.code = code;
		}
	};
	function toDisplayError(error) {
		if (error instanceof ClipDownloadError) return {
			code: error.code,
			message: error.message
		};
		if (error instanceof DOMException && error.name === "AbortError") return {
			code: "cancelled",
			message: "The operation was cancelled."
		};
		return {
			code: "media-request",
			message: "The clip download could not be completed."
		};
	}
	var MP4_SIGNATURE_SEARCH_BYTES = 64;
	function inspectMp4Probe(prefix, suffix) {
		if (!hasFtypSignature(prefix)) unsupported$2("The direct clip resource is not an MP4 file.");
		const probes = suffix ? [prefix, suffix] : [prefix];
		const hasMoov = probes.some((bytes) => containsBoxType(bytes, "moov"));
		const hasH264 = probes.some((bytes) => containsBoxType(bytes, "avc1") || containsBoxType(bytes, "avc3"));
		const hasAac = probes.some((bytes) => containsBoxType(bytes, "mp4a"));
		const unsupportedVideo = probes.some((bytes) => containsBoxType(bytes, "hev1") || containsBoxType(bytes, "hvc1") || containsBoxType(bytes, "av01") || containsBoxType(bytes, "vp09"));
		if (!hasMoov) unsupported$2("The MP4 metadata could not be verified within the probe limit.");
		if (!hasH264 || !hasAac || unsupportedVideo) unsupported$2("The direct MP4 uses unsupported codecs.");
		return {
			audioCodec: "aac",
			videoCodec: "h264"
		};
	}
	function hasFtypSignature(bytes) {
		const searchLength = Math.min(bytes.byteLength - 4, MP4_SIGNATURE_SEARCH_BYTES);
		for (let offset = 4; offset <= searchLength; offset += 1) if (readType(bytes, offset) === "ftyp") {
			const size = readUint32(bytes, offset - 4);
			return size >= 8 && offset - 4 + size <= bytes.byteLength;
		}
		return false;
	}
	function containsBoxType(bytes, type) {
		for (let offset = 4; offset + 4 <= bytes.byteLength; offset += 1) {
			if (readType(bytes, offset) !== type) continue;
			const size = readUint32(bytes, offset - 4);
			if (size === 0 || size >= 8) return true;
		}
		return false;
	}
	function readType(bytes, offset) {
		return String.fromCharCode(bytes[offset], bytes[offset + 1], bytes[offset + 2], bytes[offset + 3]);
	}
	function readUint32(bytes, offset) {
		return bytes[offset] * 16777216 + (bytes[offset + 1] << 16) + (bytes[offset + 2] << 8) + bytes[offset + 3];
	}
	function unsupported$2(message) {
		throw new ClipDownloadError("unsupported-media", message);
	}
	var ALLOWED_MEDIA_HOSTS = new Set(["clips.kick.com"]);
	function isAllowedMediaUrl(url) {
		return url.protocol === "https:" && ALLOWED_MEDIA_HOSTS.has(url.hostname.toLowerCase());
	}
	async function readResponseBytes(response, maximumBytes, expectedBytes) {
		const reader = response.body?.getReader();
		if (!reader) throw new ClipDownloadError("media-request", "The media response did not contain a readable body.");
		const chunks = [];
		let receivedBytes = 0;
		try {
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				receivedBytes += value.byteLength;
				if (receivedBytes > maximumBytes) {
					await reader.cancel();
					throw new ClipDownloadError("unsupported-media", "The media response exceeded the inspection limit.");
				}
				chunks.push(value);
			}
		} finally {
			reader.releaseLock();
		}
		if (expectedBytes !== void 0 && receivedBytes !== expectedBytes) throw new ClipDownloadError("media-request", "The media response was truncated.");
		const bytes = new Uint8Array(receivedBytes);
		let offset = 0;
		for (const chunk of chunks) {
			bytes.set(chunk, offset);
			offset += chunk.byteLength;
		}
		return bytes;
	}
	async function fetchExactRange(url, start, length, signal, fetchImplementation = fetch) {
		const end = start + length - 1;
		const response = await fetchImplementation(url, {
			headers: { Range: `bytes=${start}-${end}` },
			signal
		});
		validateFinalMediaUrl(response);
		if (response.status !== 206) {
			await response.body?.cancel();
			throw new ClipDownloadError("media-request", "The media server did not honor a required byte range.");
		}
		const contentRange = parseContentRange(response.headers.get("content-range"));
		if (contentRange.start !== start || contentRange.end !== end || contentRange.total <= end) {
			await response.body?.cancel();
			throw new ClipDownloadError("media-request", "The media server returned an unexpected byte range.");
		}
		return {
			bytes: await readResponseBytes(response, length, length),
			contentRange
		};
	}
	async function fetchInitialMediaProbe(url, maximumBytes, signal, fetchImplementation = fetch) {
		const response = await fetchImplementation(url, {
			headers: { Range: `bytes=0-${maximumBytes - 1}` },
			signal
		});
		validateFinalMediaUrl(response);
		if (response.status === 206) {
			const contentRange = parseContentRange(response.headers.get("content-range"));
			if (contentRange.start !== 0 || contentRange.end >= maximumBytes || contentRange.end < maximumBytes - 1 && contentRange.end !== contentRange.total - 1) {
				await response.body?.cancel();
				throw new ClipDownloadError("media-request", "The media server returned an unexpected probe range.");
			}
			const length = contentRange.end + 1;
			return {
				bytes: await readResponseBytes(response, length, length),
				totalBytes: contentRange.total
			};
		}
		if (!response.ok) throw new ClipDownloadError("media-request", "The clip media could not be inspected.");
		const declaredLength = parseContentLength(response.headers.get("content-length"));
		if (declaredLength === void 0 || declaredLength > maximumBytes) {
			await response.body?.cancel();
			throw new ClipDownloadError("unsupported-media", "The media server ignored the bounded inspection request.");
		}
		return {
			bytes: await readResponseBytes(response, maximumBytes, declaredLength),
			totalBytes: declaredLength
		};
	}
	function parseContentRange(value) {
		const match = /^bytes (\d+)-(\d+)\/(\d+)$/.exec(value ?? "");
		if (!match) throw new ClipDownloadError("media-request", "The media response did not contain a valid byte range.");
		const start = Number(match[1]);
		const end = Number(match[2]);
		const total = Number(match[3]);
		if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || !Number.isSafeInteger(total) || start < 0 || end < start || total <= end) throw new ClipDownloadError("media-request", "The media response contained an invalid byte range.");
		return {
			end,
			start,
			total
		};
	}
	function validateFinalMediaUrl(response) {
		let finalUrl;
		try {
			finalUrl = new URL(response.url);
		} catch {
			throw new ClipDownloadError("media-request", "The media server returned an invalid final URL.");
		}
		if (!isAllowedMediaUrl(finalUrl)) {
			response.body?.cancel().catch(() => void 0);
			throw new ClipDownloadError("media-request", "The media request redirected to an untrusted host.");
		}
	}
	function parseContentLength(value) {
		if (!value || !/^\d+$/.test(value)) return;
		const length = Number(value);
		return Number.isSafeInteger(length) && length >= 0 ? length : void 0;
	}
	var MAX_INPUT_BYTES = 8 * 1024 * 1024;
	var MAX_PROBE_BYTES = 256 * 1024;
	function summarizeMediaPlan(plan) {
		if (plan.kind === "direct-mp4") return {
			kind: plan.kind,
			logicalSegmentCount: 1,
			sourceBytes: plan.sourceBytes,
			uniqueSourceObjectCount: 1
		};
		return {
			duration: plan.duration,
			kind: plan.kind,
			logicalSegmentCount: plan.segments.length,
			sourceBytes: plan.sourceBytes,
			uniqueSourceObjectCount: plan.uniqueSourceObjectCount
		};
	}
	var UNSUPPORTED_TAGS = [
		"#EXT-X-BYTERANGE-START",
		"#EXT-X-DISCONTINUITY",
		"#EXT-X-GAP",
		"#EXT-X-I-FRAMES-ONLY",
		"#EXT-X-I-FRAME-STREAM-INF",
		"#EXT-X-KEY",
		"#EXT-X-MAP",
		"#EXT-X-MEDIA:",
		"#EXT-X-PART",
		"#EXT-X-PRELOAD-HINT",
		"#EXT-X-RENDITION-REPORT",
		"#EXT-X-SKIP",
		"#EXT-X-STREAM-INF"
	];
	var ALLOWED_TAG_PREFIXES = [
		"#EXTM3U",
		"#EXT-X-ENDLIST",
		"#EXT-X-INDEPENDENT-SEGMENTS",
		"#EXT-X-MEDIA-SEQUENCE:",
		"#EXT-X-PLAYLIST-TYPE:",
		"#EXT-X-PROGRAM-DATE-TIME:",
		"#EXT-X-TARGETDURATION:",
		"#EXT-X-VERSION:"
	];
	function parseKickMediaPlaylist(text, { isAllowedMediaUrl, playlistUrl: playlistUrlValue }) {
		const playlistUrl = toUrl(playlistUrlValue);
		const lines = text.split(/\r?\n/);
		const segments = [];
		let ended = false;
		let pendingDuration;
		let pendingRange;
		if (lines[0]?.trim() !== "#EXTM3U") unsupported$1("The clip response is not an HLS playlist.");
		for (const rawLine of lines) {
			const line = rawLine.trim();
			if (!line) continue;
			if (line === "#EXT-X-ENDLIST") {
				ended = true;
				continue;
			}
			if (line.startsWith("#EXTINF:")) {
				if (pendingDuration !== void 0) unsupported$1("The playlist contains an incomplete segment.");
				const durationText = line.slice(8).split(",")[0];
				const duration = Number(durationText);
				if (!Number.isFinite(duration) || duration <= 0) unsupported$1("The playlist contains an invalid segment duration.");
				pendingDuration = duration;
				continue;
			}
			if (line.startsWith("#EXT-X-BYTERANGE:")) {
				const match = /^#EXT-X-BYTERANGE:(\d+)@(\d+)$/.exec(line);
				if (!match) unsupported$1("The playlist uses an unsupported implicit byte range.");
				const length = Number(match[1]);
				const offset = Number(match[2]);
				validateRange(offset, length);
				if (length > 8388608) unsupported$1("A clip segment exceeds the safe processing limit.");
				pendingRange = {
					length,
					offset
				};
				continue;
			}
			if (line.startsWith("#")) {
				if (UNSUPPORTED_TAGS.some((tag) => line.startsWith(tag))) unsupported$1("The clip uses an unsupported HLS layout.");
				if (!ALLOWED_TAG_PREFIXES.some((tag) => line.startsWith(tag))) unsupported$1(`The clip uses an unsupported HLS tag: ${line}`);
				continue;
			}
			if (pendingDuration === void 0) unsupported$1("The playlist segment is missing its duration.");
			if (segments.length >= 256) unsupported$1("The clip contains too many media segments.");
			const mediaUrl = new URL(line, playlistUrl);
			if (!isAllowedMediaUrl(mediaUrl)) unsupported$1("The playlist contains an untrusted media URL.");
			segments.push({
				duration: pendingDuration,
				index: segments.length,
				...pendingRange ?? {},
				url: mediaUrl.href
			});
			pendingDuration = void 0;
			pendingRange = void 0;
		}
		if (!ended) unsupported$1("Only completed clip playlists are supported.");
		if (segments.length === 0 || pendingDuration !== void 0 || pendingRange !== void 0) unsupported$1("The playlist does not contain complete media segments.");
		validateNonOverlappingRanges(segments);
		const sourceBytes = segments.every((segment) => segment.length !== void 0) ? segments.reduce((total, segment) => {
			const next = total + (segment.length ?? 0);
			if (!Number.isSafeInteger(next)) unsupported$1("The playlist media size is invalid.");
			return next;
		}, 0) : void 0;
		return {
			duration: segments.reduce((total, segment) => total + segment.duration, 0),
			kind: "hls-ts",
			playlistUrl: playlistUrl.href,
			segments,
			sourceBytes,
			uniqueSourceObjectCount: new Set(segments.map((segment) => segment.url)).size
		};
	}
	function validateRange(offset, length) {
		const inclusiveEnd = offset + length - 1;
		if (!Number.isSafeInteger(offset) || !Number.isSafeInteger(length) || offset < 0 || length <= 0 || !Number.isSafeInteger(inclusiveEnd)) unsupported$1("The playlist contains an invalid byte range.");
	}
	function validateNonOverlappingRanges(segments) {
		const rangesByUrl = new Map();
		for (const segment of segments) {
			if (segment.length === void 0 || segment.offset === void 0) continue;
			const ranges = rangesByUrl.get(segment.url) ?? [];
			ranges.push({
				end: segment.offset + segment.length - 1,
				start: segment.offset
			});
			rangesByUrl.set(segment.url, ranges);
		}
		for (const ranges of rangesByUrl.values()) {
			ranges.sort((left, right) => left.start - right.start);
			for (let index = 1; index < ranges.length; index += 1) if (ranges[index].start <= ranges[index - 1].end) unsupported$1("The playlist contains overlapping byte ranges.");
		}
	}
	function toUrl(value) {
		try {
			return new URL(value);
		} catch {
			unsupported$1("The clip playlist URL is invalid.");
		}
	}
	function unsupported$1(message) {
		throw new ClipDownloadError("unsupported-media", message);
	}
	var TS_PACKET_BYTES = 188;
	var H264_STREAM_TYPE = 27;
	var AAC_STREAM_TYPES = new Set([15, 17]);
	var ID3_STREAM_TYPE = 21;
	function inspectTransportStream(bytes) {
		if (bytes.byteLength < TS_PACKET_BYTES * 3) unsupported("The media probe is too short to identify its streams.");
		const packetBytes = Math.floor(bytes.byteLength / TS_PACKET_BYTES) * TS_PACKET_BYTES;
		for (let offset = 0; offset < packetBytes; offset += TS_PACKET_BYTES) if (bytes[offset] !== 71) unsupported("The clip media is not a valid MPEG transport stream.");
		const streamTypes = parseStreamTypes(findPsiSection(bytes, parseProgramMapPid(findPsiSection(bytes, 0, 0)), 2));
		const hasH264 = streamTypes.includes(H264_STREAM_TYPE);
		const hasAac = streamTypes.some((type) => AAC_STREAM_TYPES.has(type));
		const unsupportedTypes = streamTypes.filter((type) => type !== H264_STREAM_TYPE && !AAC_STREAM_TYPES.has(type) && type !== ID3_STREAM_TYPE);
		if (!hasH264 || !hasAac || unsupportedTypes.length > 0) unsupported("The clip uses unsupported transport-stream codecs.");
		return {
			audioCodec: "aac",
			metadata: streamTypes.includes(ID3_STREAM_TYPE),
			videoCodec: "h264"
		};
	}
	function findPsiSection(bytes, targetPid, tableId) {
		let sectionBytes = [];
		let expectedLength;
		for (let packetOffset = 0; packetOffset + TS_PACKET_BYTES <= bytes.byteLength; packetOffset += TS_PACKET_BYTES) {
			const byte1 = bytes[packetOffset + 1];
			const byte2 = bytes[packetOffset + 2];
			const byte3 = bytes[packetOffset + 3];
			if (((byte1 & 31) << 8 | byte2) !== targetPid || (byte1 & 128) !== 0) continue;
			const adaptationControl = byte3 >> 4 & 3;
			if (adaptationControl === 0 || adaptationControl === 2) continue;
			let payloadOffset = packetOffset + 4;
			if (adaptationControl === 3) payloadOffset += bytes[payloadOffset] + 1;
			if (payloadOffset >= packetOffset + TS_PACKET_BYTES) continue;
			if ((byte1 & 64) !== 0) {
				const pointer = bytes[payloadOffset];
				payloadOffset += pointer + 1;
				sectionBytes = [];
				expectedLength = void 0;
			}
			for (let index = payloadOffset; index < packetOffset + TS_PACKET_BYTES; index += 1) {
				if (sectionBytes.length === 0 && bytes[index] === 255) break;
				sectionBytes.push(bytes[index]);
				if (sectionBytes.length === 3) {
					if (sectionBytes[0] !== tableId) {
						sectionBytes = [];
						break;
					}
					expectedLength = 3 + ((sectionBytes[1] & 15) << 8 | sectionBytes[2]);
				}
				if (expectedLength !== void 0 && sectionBytes.length === expectedLength) return Uint8Array.from(sectionBytes);
			}
		}
		unsupported("The transport-stream track metadata is incomplete.");
	}
	function parseProgramMapPid(section) {
		for (let offset = 8; offset + 4 <= section.byteLength - 4; offset += 4) if ((section[offset] << 8 | section[offset + 1]) !== 0) return (section[offset + 2] & 31) << 8 | section[offset + 3];
		unsupported("The transport stream does not declare a media program.");
	}
	function parseStreamTypes(section) {
		if (section.byteLength < 16) unsupported("The transport-stream program metadata is invalid.");
		const programInfoLength = (section[10] & 15) << 8 | section[11];
		const streamTypes = [];
		let offset = 12 + programInfoLength;
		const end = section.byteLength - 4;
		while (offset + 5 <= end) {
			const streamType = section[offset];
			const infoLength = (section[offset + 3] & 15) << 8 | section[offset + 4];
			streamTypes.push(streamType);
			offset += 5 + infoLength;
		}
		if (offset !== end || streamTypes.length === 0) unsupported("The transport-stream tracks are invalid.");
		return streamTypes;
	}
	function unsupported(message) {
		throw new ClipDownloadError("unsupported-media", message);
	}
	var MAX_API_RESPONSE_BYTES = 256 * 1024;
	var INITIAL_PROBE_BYTES = MAX_PROBE_BYTES / 2;
	var MAX_METADATA_TEXT_LENGTH = 300;
	async function inspectClip(clipId, signal, { fetchImplementation = fetch, pageUrl = window.location.href } = {}) {
		if (!isValidClipId(clipId)) throw new ClipDownloadError("clip-unavailable", "The clip link contains an invalid clip ID.");
		const response = await fetchImplementation(new URL(`/api/v2/clips/${encodeURIComponent(clipId)}/play`, pageUrl).href, {
			credentials: "same-origin",
			headers: { Accept: "application/json" },
			signal
		});
		if (response.status === 404) throw new ClipDownloadError("clip-unavailable", "This clip is unavailable or has been deleted.");
		if (!response.ok) throw new ClipDownloadError("inspection-blocked", "KICK blocked the clip inspection request. Try again shortly.");
		const clip = getRecord(parseJson(await readResponseBytes(response, MAX_API_RESPONSE_BYTES)).clip);
		const clipUrlValue = clip?.clip_url;
		if (!clip || typeof clipUrlValue !== "string") throw new ClipDownloadError("clip-unavailable", "KICK returned incomplete clip information.");
		validateResponseClipId(clip, clipId);
		const clipUrl = toAllowedMediaUrl(clipUrlValue);
		const initialProbe = await fetchInitialMediaProbe(clipUrl.href, INITIAL_PROBE_BYTES, signal, fetchImplementation);
		const probeText = new TextDecoder().decode(initialProbe.bytes);
		let plan;
		if (probeText.startsWith("#EXTM3U")) {
			if (initialProbe.totalBytes > 131072 || initialProbe.totalBytes !== initialProbe.bytes.byteLength) throw new ClipDownloadError("unsupported-media", "The clip playlist exceeds the safe inspection limit.");
			plan = parseKickMediaPlaylist(probeText, {
				isAllowedMediaUrl,
				playlistUrl: clipUrl.href
			});
			await validateTransportStreamPlan(plan, signal, fetchImplementation);
		} else {
			try {
				inspectMp4Probe(initialProbe.bytes);
			} catch (initialError) {
				const remainingProbeBytes = MAX_PROBE_BYTES - initialProbe.bytes.byteLength;
				if (remainingProbeBytes <= 0 || initialProbe.totalBytes <= initialProbe.bytes.byteLength) throw initialError;
				const suffixStart = Math.max(initialProbe.bytes.byteLength, initialProbe.totalBytes - remainingProbeBytes);
				const suffixLength = initialProbe.totalBytes - suffixStart;
				const suffix = (await fetchExactRange(clipUrl.href, suffixStart, suffixLength, signal, fetchImplementation)).bytes;
				inspectMp4Probe(initialProbe.bytes, suffix);
			}
			plan = {
				kind: "direct-mp4",
				sourceBytes: initialProbe.totalBytes,
				url: clipUrl.href
			};
		}
		return {
			clipId,
			metadata: normalizeMetadata(clip, pageUrl),
			plan
		};
	}
	async function validateTransportStreamPlan(plan, signal, fetchImplementation) {
		const firstSegment = plan.segments[0];
		if (!firstSegment) throw new ClipDownloadError("unsupported-media", "The clip playlist does not contain media.");
		const probeLength = Math.min(MAX_PROBE_BYTES, firstSegment.length ?? 262144);
		inspectTransportStream(firstSegment.length === void 0 ? (await fetchInitialMediaProbe(firstSegment.url, probeLength, signal, fetchImplementation)).bytes : (await fetchExactRange(firstSegment.url, firstSegment.offset ?? 0, probeLength, signal, fetchImplementation)).bytes);
	}
	function normalizeMetadata(clip, pageUrl) {
		const category = getRecord(clip.category);
		const channel = getRecord(clip.channel);
		const creator = getRecord(clip.creator) ?? getRecord(clip.user);
		return {
			category: firstSafeString(category?.name, clip.category),
			channel: firstSafeString(channel?.username, channel?.slug, channel?.name),
			creator: firstSafeString(creator?.username, creator?.name),
			duration: safeDuration(clip.duration),
			likeCount: safeCount(clip.likes),
			pageUrl,
			publishedAt: safeTimestamp(clip.created_at),
			thumbnailUrl: safeThumbnailUrl(clip.thumbnail_url ?? clip.thumbnail),
			title: firstSafeString(clip.title),
			viewCount: safeCount(clip.views)
		};
	}
	function validateResponseClipId(clip, expectedClipId) {
		const declaredIds = [clip.id, clip.clip_id].filter((value) => typeof value === "string" && value.startsWith("clip_"));
		if (declaredIds.length > 0 && declaredIds.some((value) => value !== expectedClipId)) throw new ClipDownloadError("clip-unavailable", "KICK returned information for a different clip.");
	}
	function parseJson(bytes) {
		try {
			const record = getRecord(JSON.parse(new TextDecoder().decode(bytes)));
			if (record) return record;
		} catch {}
		throw new ClipDownloadError("clip-unavailable", "KICK returned malformed clip information.");
	}
	function getRecord(value) {
		return value && typeof value === "object" && !Array.isArray(value) ? value : void 0;
	}
	function firstSafeString(...values) {
		for (const value of values) {
			if (typeof value !== "string") continue;
			const normalized = value.replace(/\s+/g, " ").trim();
			if (normalized) return normalized.slice(0, MAX_METADATA_TEXT_LENGTH);
		}
	}
	function safeDuration(value) {
		return typeof value === "number" && Number.isFinite(value) && value > 0 && value <= 180 ? value : void 0;
	}
	function safeCount(value) {
		return typeof value === "number" && Number.isSafeInteger(value) && value >= 0 ? value : void 0;
	}
	function safeTimestamp(value) {
		if (typeof value !== "string") return;
		const timestamp = Date.parse(value);
		return Number.isFinite(timestamp) ? timestamp : void 0;
	}
	function safeThumbnailUrl(value) {
		if (typeof value !== "string") return;
		try {
			const url = new URL(value);
			return url.protocol === "https:" && (url.hostname === "kick.com" || url.hostname.endsWith(".kick.com")) ? url.href : void 0;
		} catch {
			return;
		}
	}
	function toAllowedMediaUrl(value) {
		let url;
		try {
			url = new URL(value);
		} catch {
			throw new ClipDownloadError("unsupported-media", "KICK returned an invalid clip media URL.");
		}
		if (!isAllowedMediaUrl(url)) throw new ClipDownloadError("unsupported-media", "KICK returned an untrusted clip media URL.");
		return url;
	}
	var jsContent = "(function() {\n	//#region \\0rolldown/runtime.js\n	var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);\n	//#endregion\n	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/utils/stream.js\n	/**\n	* mux.js\n	*\n	* Copyright (c) Brightcove\n	* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE\n	*\n	* A lightweight readable stream implemention that handles event dispatching.\n	* Objects that inherit from streams should call init in their constructors.\n	*/\n	var require_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {\n		var Stream = function Stream() {\n			this.init = function() {\n				var listeners = {};\n				/**\n				* Add a listener for a specified event type.\n				* @param type {string} the event name\n				* @param listener {function} the callback to be invoked when an event of\n				* the specified type occurs\n				*/\n				this.on = function(type, listener) {\n					if (!listeners[type]) listeners[type] = [];\n					listeners[type] = listeners[type].concat(listener);\n				};\n				/**\n				* Remove a listener for a specified event type.\n				* @param type {string} the event name\n				* @param listener {function} a function previously registered for this\n				* type of event through `on`\n				*/\n				this.off = function(type, listener) {\n					var index;\n					if (!listeners[type]) return false;\n					index = listeners[type].indexOf(listener);\n					listeners[type] = listeners[type].slice();\n					listeners[type].splice(index, 1);\n					return index > -1;\n				};\n				/**\n				* Trigger an event of the specified type on this stream. Any additional\n				* arguments to this function are passed as parameters to event listeners.\n				* @param type {string} the event name\n				*/\n				this.trigger = function(type) {\n					var callbacks = listeners[type], i, length, args;\n					if (!callbacks) return;\n					if (arguments.length === 2) {\n						length = callbacks.length;\n						for (i = 0; i < length; ++i) callbacks[i].call(this, arguments[1]);\n					} else {\n						args = [];\n						i = arguments.length;\n						for (i = 1; i < arguments.length; ++i) args.push(arguments[i]);\n						length = callbacks.length;\n						for (i = 0; i < length; ++i) callbacks[i].apply(this, args);\n					}\n				};\n				/**\n				* Destroys the stream and cleans up.\n				*/\n				this.dispose = function() {\n					listeners = {};\n				};\n			};\n		};\n		/**\n		* Forwards all `data` events on this stream to the destination stream. The\n		* destination stream should provide a method `push` to receive the data\n		* events as they arrive.\n		* @param destination {stream} the stream that will receive all `data` events\n		* @param autoFlush {boolean} if false, we will not call `flush` on the destination\n		*                            when the current stream emits a 'done' event\n		* @see http://nodejs.org/api/stream.html#stream_readable_pipe_destination_options\n		*/\n		Stream.prototype.pipe = function(destination) {\n			this.on(\"data\", function(data) {\n				destination.push(data);\n			});\n			this.on(\"done\", function(flushSource) {\n				destination.flush(flushSource);\n			});\n			this.on(\"partialdone\", function(flushSource) {\n				destination.partialFlush(flushSource);\n			});\n			this.on(\"endedtimeline\", function(flushSource) {\n				destination.endTimeline(flushSource);\n			});\n			this.on(\"reset\", function(flushSource) {\n				destination.reset(flushSource);\n			});\n			return destination;\n		};\n		Stream.prototype.push = function(data) {\n			this.trigger(\"data\", data);\n		};\n		Stream.prototype.flush = function(flushSource) {\n			this.trigger(\"done\", flushSource);\n		};\n		Stream.prototype.partialFlush = function(flushSource) {\n			this.trigger(\"partialdone\", flushSource);\n		};\n		Stream.prototype.endTimeline = function(flushSource) {\n			this.trigger(\"endedtimeline\", flushSource);\n		};\n		Stream.prototype.reset = function(flushSource) {\n			this.trigger(\"reset\", flushSource);\n		};\n		module.exports = Stream;\n	}));\n	//#endregion\n	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/utils/numbers.js\n	var require_numbers = /* @__PURE__ */ __commonJSMin(((exports, module) => {\n		var MAX_UINT32 = Math.pow(2, 32);\n		module.exports = {\n			getUint64: function getUint64(uint8) {\n				var dv = new DataView(uint8.buffer, uint8.byteOffset, uint8.byteLength);\n				var value;\n				if (dv.getBigUint64) {\n					value = dv.getBigUint64(0);\n					if (value < Number.MAX_SAFE_INTEGER) return Number(value);\n					return value;\n				}\n				return dv.getUint32(0) * MAX_UINT32 + dv.getUint32(4);\n			},\n			MAX_UINT32\n		};\n	}));\n	//#endregion\n	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/mp4/mp4-generator.js\n	/**\n	* mux.js\n	*\n	* Copyright (c) Brightcove\n	* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE\n	*\n	* Functions that generate fragmented MP4s suitable for use with Media\n	* Source Extensions.\n	*/\n	var require_mp4_generator = /* @__PURE__ */ __commonJSMin(((exports, module) => {\n		var MAX_UINT32 = require_numbers().MAX_UINT32;\n		var box;\n		var dinf;\n		var esds;\n		var ftyp;\n		var mdat;\n		var mfhd;\n		var minf;\n		var moof;\n		var moov;\n		var mvex;\n		var mvhd;\n		var trak;\n		var tkhd;\n		var mdia;\n		var mdhd;\n		var hdlr;\n		var sdtp;\n		var stbl;\n		var stsd;\n		var traf;\n		var trex;\n		var trun;\n		var types;\n		var MAJOR_BRAND;\n		var MINOR_VERSION;\n		var AVC1_BRAND;\n		var VIDEO_HDLR;\n		var AUDIO_HDLR;\n		var HDLR_TYPES;\n		var VMHD;\n		var SMHD;\n		var DREF;\n		var STCO;\n		var STSC;\n		var STSZ;\n		var STTS;\n		(function() {\n			var i;\n			types = {\n				avc1: [],\n				avcC: [],\n				btrt: [],\n				dinf: [],\n				dref: [],\n				esds: [],\n				ftyp: [],\n				hdlr: [],\n				mdat: [],\n				mdhd: [],\n				mdia: [],\n				mfhd: [],\n				minf: [],\n				moof: [],\n				moov: [],\n				mp4a: [],\n				mvex: [],\n				mvhd: [],\n				pasp: [],\n				sdtp: [],\n				smhd: [],\n				stbl: [],\n				stco: [],\n				stsc: [],\n				stsd: [],\n				stsz: [],\n				stts: [],\n				styp: [],\n				tfdt: [],\n				tfhd: [],\n				traf: [],\n				trak: [],\n				trun: [],\n				trex: [],\n				tkhd: [],\n				vmhd: []\n			};\n			if (typeof Uint8Array === \"undefined\") return;\n			for (i in types) if (types.hasOwnProperty(i)) types[i] = [\n				i.charCodeAt(0),\n				i.charCodeAt(1),\n				i.charCodeAt(2),\n				i.charCodeAt(3)\n			];\n			MAJOR_BRAND = new Uint8Array([\n				\"i\".charCodeAt(0),\n				\"s\".charCodeAt(0),\n				\"o\".charCodeAt(0),\n				\"m\".charCodeAt(0)\n			]);\n			AVC1_BRAND = new Uint8Array([\n				\"a\".charCodeAt(0),\n				\"v\".charCodeAt(0),\n				\"c\".charCodeAt(0),\n				\"1\".charCodeAt(0)\n			]);\n			MINOR_VERSION = new Uint8Array([\n				0,\n				0,\n				0,\n				1\n			]);\n			VIDEO_HDLR = new Uint8Array([\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				118,\n				105,\n				100,\n				101,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				86,\n				105,\n				100,\n				101,\n				111,\n				72,\n				97,\n				110,\n				100,\n				108,\n				101,\n				114,\n				0\n			]);\n			AUDIO_HDLR = new Uint8Array([\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				115,\n				111,\n				117,\n				110,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				83,\n				111,\n				117,\n				110,\n				100,\n				72,\n				97,\n				110,\n				100,\n				108,\n				101,\n				114,\n				0\n			]);\n			HDLR_TYPES = {\n				video: VIDEO_HDLR,\n				audio: AUDIO_HDLR\n			};\n			DREF = new Uint8Array([\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				1,\n				0,\n				0,\n				0,\n				12,\n				117,\n				114,\n				108,\n				32,\n				0,\n				0,\n				0,\n				1\n			]);\n			SMHD = new Uint8Array([\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0\n			]);\n			STCO = new Uint8Array([\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0\n			]);\n			STSC = STCO;\n			STSZ = new Uint8Array([\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0\n			]);\n			STTS = STCO;\n			VMHD = new Uint8Array([\n				0,\n				0,\n				0,\n				1,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0\n			]);\n		})();\n		box = function box(type) {\n			var payload = [], size = 0, i, result, view;\n			for (i = 1; i < arguments.length; i++) payload.push(arguments[i]);\n			i = payload.length;\n			while (i--) size += payload[i].byteLength;\n			result = new Uint8Array(size + 8);\n			view = new DataView(result.buffer, result.byteOffset, result.byteLength);\n			view.setUint32(0, result.byteLength);\n			result.set(type, 4);\n			for (i = 0, size = 8; i < payload.length; i++) {\n				result.set(payload[i], size);\n				size += payload[i].byteLength;\n			}\n			return result;\n		};\n		dinf = function dinf() {\n			return box(types.dinf, box(types.dref, DREF));\n		};\n		esds = function esds(track) {\n			return box(types.esds, new Uint8Array([\n				0,\n				0,\n				0,\n				0,\n				3,\n				25,\n				0,\n				0,\n				0,\n				4,\n				17,\n				64,\n				21,\n				0,\n				6,\n				0,\n				0,\n				0,\n				218,\n				192,\n				0,\n				0,\n				218,\n				192,\n				5,\n				2,\n				track.audioobjecttype << 3 | track.samplingfrequencyindex >>> 1,\n				track.samplingfrequencyindex << 7 | track.channelcount << 3,\n				6,\n				1,\n				2\n			]));\n		};\n		ftyp = function ftyp() {\n			return box(types.ftyp, MAJOR_BRAND, MINOR_VERSION, MAJOR_BRAND, AVC1_BRAND);\n		};\n		hdlr = function hdlr(type) {\n			return box(types.hdlr, HDLR_TYPES[type]);\n		};\n		mdat = function mdat(data) {\n			return box(types.mdat, data);\n		};\n		mdhd = function mdhd(track) {\n			var result = new Uint8Array([\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				2,\n				0,\n				0,\n				0,\n				3,\n				0,\n				1,\n				95,\n				144,\n				track.duration >>> 24 & 255,\n				track.duration >>> 16 & 255,\n				track.duration >>> 8 & 255,\n				track.duration & 255,\n				85,\n				196,\n				0,\n				0\n			]);\n			if (track.samplerate) {\n				result[12] = track.samplerate >>> 24 & 255;\n				result[13] = track.samplerate >>> 16 & 255;\n				result[14] = track.samplerate >>> 8 & 255;\n				result[15] = track.samplerate & 255;\n			}\n			return box(types.mdhd, result);\n		};\n		mdia = function mdia(track) {\n			return box(types.mdia, mdhd(track), hdlr(track.type), minf(track));\n		};\n		mfhd = function mfhd(sequenceNumber) {\n			return box(types.mfhd, new Uint8Array([\n				0,\n				0,\n				0,\n				0,\n				(sequenceNumber & 4278190080) >> 24,\n				(sequenceNumber & 16711680) >> 16,\n				(sequenceNumber & 65280) >> 8,\n				sequenceNumber & 255\n			]));\n		};\n		minf = function minf(track) {\n			return box(types.minf, track.type === \"video\" ? box(types.vmhd, VMHD) : box(types.smhd, SMHD), dinf(), stbl(track));\n		};\n		moof = function moof(sequenceNumber, tracks) {\n			var trackFragments = [], i = tracks.length;\n			while (i--) trackFragments[i] = traf(tracks[i]);\n			return box.apply(null, [types.moof, mfhd(sequenceNumber)].concat(trackFragments));\n		};\n		/**\n		* Returns a movie box.\n		* @param tracks {array} the tracks associated with this movie\n		* @see ISO/IEC 14496-12:2012(E), section 8.2.1\n		*/\n		moov = function moov(tracks) {\n			var i = tracks.length, boxes = [];\n			while (i--) boxes[i] = trak(tracks[i]);\n			return box.apply(null, [types.moov, mvhd(4294967295)].concat(boxes).concat(mvex(tracks)));\n		};\n		mvex = function mvex(tracks) {\n			var i = tracks.length, boxes = [];\n			while (i--) boxes[i] = trex(tracks[i]);\n			return box.apply(null, [types.mvex].concat(boxes));\n		};\n		mvhd = function mvhd(duration) {\n			var bytes = new Uint8Array([\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				1,\n				0,\n				0,\n				0,\n				2,\n				0,\n				1,\n				95,\n				144,\n				(duration & 4278190080) >> 24,\n				(duration & 16711680) >> 16,\n				(duration & 65280) >> 8,\n				duration & 255,\n				0,\n				1,\n				0,\n				0,\n				1,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				1,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				1,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				64,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				255,\n				255,\n				255,\n				255\n			]);\n			return box(types.mvhd, bytes);\n		};\n		sdtp = function sdtp(track) {\n			var samples = track.samples || [], bytes = new Uint8Array(4 + samples.length), flags, i;\n			for (i = 0; i < samples.length; i++) {\n				flags = samples[i].flags;\n				bytes[i + 4] = flags.dependsOn << 4 | flags.isDependedOn << 2 | flags.hasRedundancy;\n			}\n			return box(types.sdtp, bytes);\n		};\n		stbl = function stbl(track) {\n			return box(types.stbl, stsd(track), box(types.stts, STTS), box(types.stsc, STSC), box(types.stsz, STSZ), box(types.stco, STCO));\n		};\n		(function() {\n			var videoSample, audioSample;\n			stsd = function stsd(track) {\n				return box(types.stsd, new Uint8Array([\n					0,\n					0,\n					0,\n					0,\n					0,\n					0,\n					0,\n					1\n				]), track.type === \"video\" ? videoSample(track) : audioSample(track));\n			};\n			videoSample = function videoSample(track) {\n				var sps = track.sps || [], pps = track.pps || [], sequenceParameterSets = [], pictureParameterSets = [], i, avc1Box;\n				for (i = 0; i < sps.length; i++) {\n					sequenceParameterSets.push((sps[i].byteLength & 65280) >>> 8);\n					sequenceParameterSets.push(sps[i].byteLength & 255);\n					sequenceParameterSets = sequenceParameterSets.concat(Array.prototype.slice.call(sps[i]));\n				}\n				for (i = 0; i < pps.length; i++) {\n					pictureParameterSets.push((pps[i].byteLength & 65280) >>> 8);\n					pictureParameterSets.push(pps[i].byteLength & 255);\n					pictureParameterSets = pictureParameterSets.concat(Array.prototype.slice.call(pps[i]));\n				}\n				avc1Box = [\n					types.avc1,\n					new Uint8Array([\n						0,\n						0,\n						0,\n						0,\n						0,\n						0,\n						0,\n						1,\n						0,\n						0,\n						0,\n						0,\n						0,\n						0,\n						0,\n						0,\n						0,\n						0,\n						0,\n						0,\n						0,\n						0,\n						0,\n						0,\n						(track.width & 65280) >> 8,\n						track.width & 255,\n						(track.height & 65280) >> 8,\n						track.height & 255,\n						0,\n						72,\n						0,\n						0,\n						0,\n						72,\n						0,\n						0,\n						0,\n						0,\n						0,\n						0,\n						0,\n						1,\n						19,\n						118,\n						105,\n						100,\n						101,\n						111,\n						106,\n						115,\n						45,\n						99,\n						111,\n						110,\n						116,\n						114,\n						105,\n						98,\n						45,\n						104,\n						108,\n						115,\n						0,\n						0,\n						0,\n						0,\n						0,\n						0,\n						0,\n						0,\n						0,\n						0,\n						0,\n						0,\n						0,\n						24,\n						17,\n						17\n					]),\n					box(types.avcC, new Uint8Array([\n						1,\n						track.profileIdc,\n						track.profileCompatibility,\n						track.levelIdc,\n						255\n					].concat([sps.length], sequenceParameterSets, [pps.length], pictureParameterSets))),\n					box(types.btrt, new Uint8Array([\n						0,\n						28,\n						156,\n						128,\n						0,\n						45,\n						198,\n						192,\n						0,\n						45,\n						198,\n						192\n					]))\n				];\n				if (track.sarRatio) {\n					var hSpacing = track.sarRatio[0], vSpacing = track.sarRatio[1];\n					avc1Box.push(box(types.pasp, new Uint8Array([\n						(hSpacing & 4278190080) >> 24,\n						(hSpacing & 16711680) >> 16,\n						(hSpacing & 65280) >> 8,\n						hSpacing & 255,\n						(vSpacing & 4278190080) >> 24,\n						(vSpacing & 16711680) >> 16,\n						(vSpacing & 65280) >> 8,\n						vSpacing & 255\n					])));\n				}\n				return box.apply(null, avc1Box);\n			};\n			audioSample = function audioSample(track) {\n				return box(types.mp4a, new Uint8Array([\n					0,\n					0,\n					0,\n					0,\n					0,\n					0,\n					0,\n					1,\n					0,\n					0,\n					0,\n					0,\n					0,\n					0,\n					0,\n					0,\n					(track.channelcount & 65280) >> 8,\n					track.channelcount & 255,\n					(track.samplesize & 65280) >> 8,\n					track.samplesize & 255,\n					0,\n					0,\n					0,\n					0,\n					(track.samplerate & 65280) >> 8,\n					track.samplerate & 255,\n					0,\n					0\n				]), esds(track));\n			};\n		})();\n		tkhd = function tkhd(track) {\n			var result = new Uint8Array([\n				0,\n				0,\n				0,\n				7,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				(track.id & 4278190080) >> 24,\n				(track.id & 16711680) >> 16,\n				(track.id & 65280) >> 8,\n				track.id & 255,\n				0,\n				0,\n				0,\n				0,\n				(track.duration & 4278190080) >> 24,\n				(track.duration & 16711680) >> 16,\n				(track.duration & 65280) >> 8,\n				track.duration & 255,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				1,\n				0,\n				0,\n				0,\n				0,\n				1,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				1,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				64,\n				0,\n				0,\n				0,\n				(track.width & 65280) >> 8,\n				track.width & 255,\n				0,\n				0,\n				(track.height & 65280) >> 8,\n				track.height & 255,\n				0,\n				0\n			]);\n			return box(types.tkhd, result);\n		};\n		/**\n		* Generate a track fragment (traf) box. A traf box collects metadata\n		* about tracks in a movie fragment (moof) box.\n		*/\n		traf = function traf(track) {\n			var trackFragmentHeader = box(types.tfhd, new Uint8Array([\n				0,\n				0,\n				0,\n				58,\n				(track.id & 4278190080) >> 24,\n				(track.id & 16711680) >> 16,\n				(track.id & 65280) >> 8,\n				track.id & 255,\n				0,\n				0,\n				0,\n				1,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0\n			])), trackFragmentDecodeTime, trackFragmentRun, sampleDependencyTable, dataOffset, upperWordBaseMediaDecodeTime = Math.floor(track.baseMediaDecodeTime / MAX_UINT32), lowerWordBaseMediaDecodeTime = Math.floor(track.baseMediaDecodeTime % MAX_UINT32);\n			trackFragmentDecodeTime = box(types.tfdt, new Uint8Array([\n				1,\n				0,\n				0,\n				0,\n				upperWordBaseMediaDecodeTime >>> 24 & 255,\n				upperWordBaseMediaDecodeTime >>> 16 & 255,\n				upperWordBaseMediaDecodeTime >>> 8 & 255,\n				upperWordBaseMediaDecodeTime & 255,\n				lowerWordBaseMediaDecodeTime >>> 24 & 255,\n				lowerWordBaseMediaDecodeTime >>> 16 & 255,\n				lowerWordBaseMediaDecodeTime >>> 8 & 255,\n				lowerWordBaseMediaDecodeTime & 255\n			]));\n			dataOffset = 92;\n			if (track.type === \"audio\") {\n				trackFragmentRun = trun(track, dataOffset);\n				return box(types.traf, trackFragmentHeader, trackFragmentDecodeTime, trackFragmentRun);\n			}\n			sampleDependencyTable = sdtp(track);\n			trackFragmentRun = trun(track, sampleDependencyTable.length + dataOffset);\n			return box(types.traf, trackFragmentHeader, trackFragmentDecodeTime, trackFragmentRun, sampleDependencyTable);\n		};\n		/**\n		* Generate a track box.\n		* @param track {object} a track definition\n		* @return {Uint8Array} the track box\n		*/\n		trak = function trak(track) {\n			track.duration = track.duration || 4294967295;\n			return box(types.trak, tkhd(track), mdia(track));\n		};\n		trex = function trex(track) {\n			var result = new Uint8Array([\n				0,\n				0,\n				0,\n				0,\n				(track.id & 4278190080) >> 24,\n				(track.id & 16711680) >> 16,\n				(track.id & 65280) >> 8,\n				track.id & 255,\n				0,\n				0,\n				0,\n				1,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				0,\n				1,\n				0,\n				1\n			]);\n			if (track.type !== \"video\") result[result.length - 1] = 0;\n			return box(types.trex, result);\n		};\n		(function() {\n			var audioTrun, videoTrun, trunHeader = function trunHeader(samples, offset) {\n				var durationPresent = 0, sizePresent = 0, flagsPresent = 0, compositionTimeOffset = 0;\n				if (samples.length) {\n					if (samples[0].duration !== void 0) durationPresent = 1;\n					if (samples[0].size !== void 0) sizePresent = 2;\n					if (samples[0].flags !== void 0) flagsPresent = 4;\n					if (samples[0].compositionTimeOffset !== void 0) compositionTimeOffset = 8;\n				}\n				return [\n					0,\n					0,\n					durationPresent | sizePresent | flagsPresent | compositionTimeOffset,\n					1,\n					(samples.length & 4278190080) >>> 24,\n					(samples.length & 16711680) >>> 16,\n					(samples.length & 65280) >>> 8,\n					samples.length & 255,\n					(offset & 4278190080) >>> 24,\n					(offset & 16711680) >>> 16,\n					(offset & 65280) >>> 8,\n					offset & 255\n				];\n			};\n			videoTrun = function videoTrun(track, offset) {\n				var bytesOffest, bytes, header, samples = track.samples || [], sample, i;\n				offset += 20 + 16 * samples.length;\n				header = trunHeader(samples, offset);\n				bytes = new Uint8Array(header.length + samples.length * 16);\n				bytes.set(header);\n				bytesOffest = header.length;\n				for (i = 0; i < samples.length; i++) {\n					sample = samples[i];\n					bytes[bytesOffest++] = (sample.duration & 4278190080) >>> 24;\n					bytes[bytesOffest++] = (sample.duration & 16711680) >>> 16;\n					bytes[bytesOffest++] = (sample.duration & 65280) >>> 8;\n					bytes[bytesOffest++] = sample.duration & 255;\n					bytes[bytesOffest++] = (sample.size & 4278190080) >>> 24;\n					bytes[bytesOffest++] = (sample.size & 16711680) >>> 16;\n					bytes[bytesOffest++] = (sample.size & 65280) >>> 8;\n					bytes[bytesOffest++] = sample.size & 255;\n					bytes[bytesOffest++] = sample.flags.isLeading << 2 | sample.flags.dependsOn;\n					bytes[bytesOffest++] = sample.flags.isDependedOn << 6 | sample.flags.hasRedundancy << 4 | sample.flags.paddingValue << 1 | sample.flags.isNonSyncSample;\n					bytes[bytesOffest++] = sample.flags.degradationPriority & 61440;\n					bytes[bytesOffest++] = sample.flags.degradationPriority & 15;\n					bytes[bytesOffest++] = (sample.compositionTimeOffset & 4278190080) >>> 24;\n					bytes[bytesOffest++] = (sample.compositionTimeOffset & 16711680) >>> 16;\n					bytes[bytesOffest++] = (sample.compositionTimeOffset & 65280) >>> 8;\n					bytes[bytesOffest++] = sample.compositionTimeOffset & 255;\n				}\n				return box(types.trun, bytes);\n			};\n			audioTrun = function audioTrun(track, offset) {\n				var bytes, bytesOffest, header, samples = track.samples || [], sample, i;\n				offset += 20 + 8 * samples.length;\n				header = trunHeader(samples, offset);\n				bytes = new Uint8Array(header.length + samples.length * 8);\n				bytes.set(header);\n				bytesOffest = header.length;\n				for (i = 0; i < samples.length; i++) {\n					sample = samples[i];\n					bytes[bytesOffest++] = (sample.duration & 4278190080) >>> 24;\n					bytes[bytesOffest++] = (sample.duration & 16711680) >>> 16;\n					bytes[bytesOffest++] = (sample.duration & 65280) >>> 8;\n					bytes[bytesOffest++] = sample.duration & 255;\n					bytes[bytesOffest++] = (sample.size & 4278190080) >>> 24;\n					bytes[bytesOffest++] = (sample.size & 16711680) >>> 16;\n					bytes[bytesOffest++] = (sample.size & 65280) >>> 8;\n					bytes[bytesOffest++] = sample.size & 255;\n				}\n				return box(types.trun, bytes);\n			};\n			trun = function trun(track, offset) {\n				if (track.type === \"audio\") return audioTrun(track, offset);\n				return videoTrun(track, offset);\n			};\n		})();\n		module.exports = {\n			ftyp,\n			mdat,\n			moof,\n			moov,\n			initSegment: function initSegment(tracks) {\n				var fileType = ftyp(), movie = moov(tracks), result = new Uint8Array(fileType.byteLength + movie.byteLength);\n				result.set(fileType);\n				result.set(movie, fileType.byteLength);\n				return result;\n			}\n		};\n	}));\n	//#endregion\n	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/mp4/frame-utils.js\n	var require_frame_utils = /* @__PURE__ */ __commonJSMin(((exports, module) => {\n		/**\n		* mux.js\n		*\n		* Copyright (c) Brightcove\n		* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE\n		*/\n		var groupNalsIntoFrames = function groupNalsIntoFrames(nalUnits) {\n			var i, currentNal, currentFrame = [], frames = [];\n			frames.byteLength = 0;\n			frames.nalCount = 0;\n			frames.duration = 0;\n			currentFrame.byteLength = 0;\n			for (i = 0; i < nalUnits.length; i++) {\n				currentNal = nalUnits[i];\n				if (currentNal.nalUnitType === \"access_unit_delimiter_rbsp\") {\n					if (currentFrame.length) {\n						currentFrame.duration = currentNal.dts - currentFrame.dts;\n						frames.byteLength += currentFrame.byteLength;\n						frames.nalCount += currentFrame.length;\n						frames.duration += currentFrame.duration;\n						frames.push(currentFrame);\n					}\n					currentFrame = [currentNal];\n					currentFrame.byteLength = currentNal.data.byteLength;\n					currentFrame.pts = currentNal.pts;\n					currentFrame.dts = currentNal.dts;\n				} else {\n					if (currentNal.nalUnitType === \"slice_layer_without_partitioning_rbsp_idr\") currentFrame.keyFrame = true;\n					currentFrame.duration = currentNal.dts - currentFrame.dts;\n					currentFrame.byteLength += currentNal.data.byteLength;\n					currentFrame.push(currentNal);\n				}\n			}\n			if (frames.length && (!currentFrame.duration || currentFrame.duration <= 0)) currentFrame.duration = frames[frames.length - 1].duration;\n			frames.byteLength += currentFrame.byteLength;\n			frames.nalCount += currentFrame.length;\n			frames.duration += currentFrame.duration;\n			frames.push(currentFrame);\n			return frames;\n		};\n		var groupFramesIntoGops = function groupFramesIntoGops(frames) {\n			var i, currentFrame, currentGop = [], gops = [];\n			currentGop.byteLength = 0;\n			currentGop.nalCount = 0;\n			currentGop.duration = 0;\n			currentGop.pts = frames[0].pts;\n			currentGop.dts = frames[0].dts;\n			gops.byteLength = 0;\n			gops.nalCount = 0;\n			gops.duration = 0;\n			gops.pts = frames[0].pts;\n			gops.dts = frames[0].dts;\n			for (i = 0; i < frames.length; i++) {\n				currentFrame = frames[i];\n				if (currentFrame.keyFrame) {\n					if (currentGop.length) {\n						gops.push(currentGop);\n						gops.byteLength += currentGop.byteLength;\n						gops.nalCount += currentGop.nalCount;\n						gops.duration += currentGop.duration;\n					}\n					currentGop = [currentFrame];\n					currentGop.nalCount = currentFrame.length;\n					currentGop.byteLength = currentFrame.byteLength;\n					currentGop.pts = currentFrame.pts;\n					currentGop.dts = currentFrame.dts;\n					currentGop.duration = currentFrame.duration;\n				} else {\n					currentGop.duration += currentFrame.duration;\n					currentGop.nalCount += currentFrame.length;\n					currentGop.byteLength += currentFrame.byteLength;\n					currentGop.push(currentFrame);\n				}\n			}\n			if (gops.length && currentGop.duration <= 0) currentGop.duration = gops[gops.length - 1].duration;\n			gops.byteLength += currentGop.byteLength;\n			gops.nalCount += currentGop.nalCount;\n			gops.duration += currentGop.duration;\n			gops.push(currentGop);\n			return gops;\n		};\n		var extendFirstKeyFrame = function extendFirstKeyFrame(gops) {\n			var currentGop;\n			if (!gops[0][0].keyFrame && gops.length > 1) {\n				currentGop = gops.shift();\n				gops.byteLength -= currentGop.byteLength;\n				gops.nalCount -= currentGop.nalCount;\n				gops[0][0].dts = currentGop.dts;\n				gops[0][0].pts = currentGop.pts;\n				gops[0][0].duration += currentGop.duration;\n			}\n			return gops;\n		};\n		/**\n		* Default sample object\n		* see ISO/IEC 14496-12:2012, section 8.6.4.3\n		*/\n		var createDefaultSample = function createDefaultSample() {\n			return {\n				size: 0,\n				flags: {\n					isLeading: 0,\n					dependsOn: 1,\n					isDependedOn: 0,\n					hasRedundancy: 0,\n					degradationPriority: 0,\n					isNonSyncSample: 1\n				}\n			};\n		};\n		var sampleForFrame = function sampleForFrame(frame, dataOffset) {\n			var sample = createDefaultSample();\n			sample.dataOffset = dataOffset;\n			sample.compositionTimeOffset = frame.pts - frame.dts;\n			sample.duration = frame.duration;\n			sample.size = 4 * frame.length;\n			sample.size += frame.byteLength;\n			if (frame.keyFrame) {\n				sample.flags.dependsOn = 2;\n				sample.flags.isNonSyncSample = 0;\n			}\n			return sample;\n		};\n		module.exports = {\n			groupNalsIntoFrames,\n			groupFramesIntoGops,\n			extendFirstKeyFrame,\n			generateSampleTable: function generateSampleTable(gops, baseDataOffset) {\n				var h, i, sample, currentGop, currentFrame, dataOffset = baseDataOffset || 0, samples = [];\n				for (h = 0; h < gops.length; h++) {\n					currentGop = gops[h];\n					for (i = 0; i < currentGop.length; i++) {\n						currentFrame = currentGop[i];\n						sample = sampleForFrame(currentFrame, dataOffset);\n						dataOffset += sample.size;\n						samples.push(sample);\n					}\n				}\n				return samples;\n			},\n			concatenateNalData: function concatenateNalData(gops) {\n				var h, i, j, currentGop, currentFrame, currentNal, dataOffset = 0, totalByteLength = gops.byteLength + 4 * gops.nalCount, data = new Uint8Array(totalByteLength), view = new DataView(data.buffer);\n				for (h = 0; h < gops.length; h++) {\n					currentGop = gops[h];\n					for (i = 0; i < currentGop.length; i++) {\n						currentFrame = currentGop[i];\n						for (j = 0; j < currentFrame.length; j++) {\n							currentNal = currentFrame[j];\n							view.setUint32(dataOffset, currentNal.data.byteLength);\n							dataOffset += 4;\n							data.set(currentNal.data, dataOffset);\n							dataOffset += currentNal.data.byteLength;\n						}\n					}\n				}\n				return data;\n			},\n			generateSampleTableForFrame: function generateSampleTableForFrame(frame, baseDataOffset) {\n				var sample, dataOffset = baseDataOffset || 0, samples = [];\n				sample = sampleForFrame(frame, dataOffset);\n				samples.push(sample);\n				return samples;\n			},\n			concatenateNalDataForFrame: function concatenateNalDataForFrame(frame) {\n				var i, currentNal, dataOffset = 0, totalByteLength = frame.byteLength + 4 * frame.length, data = new Uint8Array(totalByteLength), view = new DataView(data.buffer);\n				for (i = 0; i < frame.length; i++) {\n					currentNal = frame[i];\n					view.setUint32(dataOffset, currentNal.data.byteLength);\n					dataOffset += 4;\n					data.set(currentNal.data, dataOffset);\n					dataOffset += currentNal.data.byteLength;\n				}\n				return data;\n			}\n		};\n	}));\n	//#endregion\n	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/data/silence.js\n	var require_silence = /* @__PURE__ */ __commonJSMin(((exports, module) => {\n		/**\n		* mux.js\n		*\n		* Copyright (c) Brightcove\n		* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE\n		*/\n		var highPrefix = [\n			33,\n			16,\n			5,\n			32,\n			164,\n			27\n		];\n		var lowPrefix = [\n			33,\n			65,\n			108,\n			84,\n			1,\n			2,\n			4,\n			8,\n			168,\n			2,\n			4,\n			8,\n			17,\n			191,\n			252\n		];\n		var zeroFill = function zeroFill(count) {\n			var a = [];\n			while (count--) a.push(0);\n			return a;\n		};\n		var makeTable = function makeTable(metaTable) {\n			return Object.keys(metaTable).reduce(function(obj, key) {\n				obj[key] = new Uint8Array(metaTable[key].reduce(function(arr, part) {\n					return arr.concat(part);\n				}, []));\n				return obj;\n			}, {});\n		};\n		var silence;\n		module.exports = function() {\n			if (!silence) silence = makeTable({\n				96e3: [\n					highPrefix,\n					[227, 64],\n					zeroFill(154),\n					[56]\n				],\n				88200: [\n					highPrefix,\n					[231],\n					zeroFill(170),\n					[56]\n				],\n				64e3: [\n					highPrefix,\n					[248, 192],\n					zeroFill(240),\n					[56]\n				],\n				48e3: [\n					highPrefix,\n					[255, 192],\n					zeroFill(268),\n					[\n						55,\n						148,\n						128\n					],\n					zeroFill(54),\n					[112]\n				],\n				44100: [\n					highPrefix,\n					[255, 192],\n					zeroFill(268),\n					[\n						55,\n						163,\n						128\n					],\n					zeroFill(84),\n					[112]\n				],\n				32e3: [\n					highPrefix,\n					[255, 192],\n					zeroFill(268),\n					[55, 234],\n					zeroFill(226),\n					[112]\n				],\n				24e3: [\n					highPrefix,\n					[255, 192],\n					zeroFill(268),\n					[\n						55,\n						255,\n						128\n					],\n					zeroFill(268),\n					[111, 112],\n					zeroFill(126),\n					[224]\n				],\n				16e3: [\n					highPrefix,\n					[255, 192],\n					zeroFill(268),\n					[\n						55,\n						255,\n						128\n					],\n					zeroFill(268),\n					[111, 255],\n					zeroFill(269),\n					[223, 108],\n					zeroFill(195),\n					[1, 192]\n				],\n				12e3: [\n					lowPrefix,\n					zeroFill(268),\n					[\n						3,\n						127,\n						248\n					],\n					zeroFill(268),\n					[\n						6,\n						255,\n						240\n					],\n					zeroFill(268),\n					[\n						13,\n						255,\n						224\n					],\n					zeroFill(268),\n					[\n						27,\n						253,\n						128\n					],\n					zeroFill(259),\n					[56]\n				],\n				11025: [\n					lowPrefix,\n					zeroFill(268),\n					[\n						3,\n						127,\n						248\n					],\n					zeroFill(268),\n					[\n						6,\n						255,\n						240\n					],\n					zeroFill(268),\n					[\n						13,\n						255,\n						224\n					],\n					zeroFill(268),\n					[\n						27,\n						255,\n						192\n					],\n					zeroFill(268),\n					[\n						55,\n						175,\n						128\n					],\n					zeroFill(108),\n					[112]\n				],\n				8e3: [\n					lowPrefix,\n					zeroFill(268),\n					[\n						3,\n						121,\n						16\n					],\n					zeroFill(47),\n					[7]\n				]\n			});\n			return silence;\n		};\n	}));\n	//#endregion\n	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/utils/clock.js\n	var require_clock = /* @__PURE__ */ __commonJSMin(((exports, module) => {\n		/**\n		* mux.js\n		*\n		* Copyright (c) Brightcove\n		* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE\n		*/\n		var ONE_SECOND_IN_TS = 9e4;\n		var secondsToVideoTs = function secondsToVideoTs(seconds) {\n			return seconds * ONE_SECOND_IN_TS;\n		};\n		var secondsToAudioTs = function secondsToAudioTs(seconds, sampleRate) {\n			return seconds * sampleRate;\n		};\n		var videoTsToSeconds = function videoTsToSeconds(timestamp) {\n			return timestamp / ONE_SECOND_IN_TS;\n		};\n		var audioTsToSeconds = function audioTsToSeconds(timestamp, sampleRate) {\n			return timestamp / sampleRate;\n		};\n		module.exports = {\n			ONE_SECOND_IN_TS,\n			secondsToVideoTs,\n			secondsToAudioTs,\n			videoTsToSeconds,\n			audioTsToSeconds,\n			audioTsToVideoTs: function audioTsToVideoTs(timestamp, sampleRate) {\n				return secondsToVideoTs(audioTsToSeconds(timestamp, sampleRate));\n			},\n			videoTsToAudioTs: function videoTsToAudioTs(timestamp, sampleRate) {\n				return secondsToAudioTs(videoTsToSeconds(timestamp), sampleRate);\n			},\n			metadataTsToSeconds: function metadataTsToSeconds(timestamp, timelineStartPts, keepOriginalTimestamps) {\n				return videoTsToSeconds(keepOriginalTimestamps ? timestamp : timestamp - timelineStartPts);\n			}\n		};\n	}));\n	//#endregion\n	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/mp4/audio-frame-utils.js\n	var require_audio_frame_utils = /* @__PURE__ */ __commonJSMin(((exports, module) => {\n		/**\n		* mux.js\n		*\n		* Copyright (c) Brightcove\n		* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE\n		*/\n		var coneOfSilence = require_silence();\n		var clock = require_clock();\n		/**\n		* Sum the `byteLength` properties of the data in each AAC frame\n		*/\n		var sumFrameByteLengths = function sumFrameByteLengths(array) {\n			var i, currentObj, sum = 0;\n			for (i = 0; i < array.length; i++) {\n				currentObj = array[i];\n				sum += currentObj.data.byteLength;\n			}\n			return sum;\n		};\n		module.exports = {\n			prefixWithSilence: function prefixWithSilence(track, frames, audioAppendStartTs, videoBaseMediaDecodeTime) {\n				var baseMediaDecodeTimeTs, frameDuration = 0, audioGapDuration = 0, audioFillFrameCount = 0, audioFillDuration = 0, silentFrame, i, firstFrame;\n				if (!frames.length) return;\n				baseMediaDecodeTimeTs = clock.audioTsToVideoTs(track.baseMediaDecodeTime, track.samplerate);\n				frameDuration = Math.ceil(clock.ONE_SECOND_IN_TS / (track.samplerate / 1024));\n				if (audioAppendStartTs && videoBaseMediaDecodeTime) {\n					audioGapDuration = baseMediaDecodeTimeTs - Math.max(audioAppendStartTs, videoBaseMediaDecodeTime);\n					audioFillFrameCount = Math.floor(audioGapDuration / frameDuration);\n					audioFillDuration = audioFillFrameCount * frameDuration;\n				}\n				if (audioFillFrameCount < 1 || audioFillDuration > clock.ONE_SECOND_IN_TS / 2) return;\n				silentFrame = coneOfSilence()[track.samplerate];\n				if (!silentFrame) silentFrame = frames[0].data;\n				for (i = 0; i < audioFillFrameCount; i++) {\n					firstFrame = frames[0];\n					frames.splice(0, 0, {\n						data: silentFrame,\n						dts: firstFrame.dts - frameDuration,\n						pts: firstFrame.pts - frameDuration\n					});\n				}\n				track.baseMediaDecodeTime -= Math.floor(clock.videoTsToAudioTs(audioFillDuration, track.samplerate));\n				return audioFillDuration;\n			},\n			trimAdtsFramesByEarliestDts: function trimAdtsFramesByEarliestDts(adtsFrames, track, earliestAllowedDts) {\n				if (track.minSegmentDts >= earliestAllowedDts) return adtsFrames;\n				track.minSegmentDts = Infinity;\n				return adtsFrames.filter(function(currentFrame) {\n					if (currentFrame.dts >= earliestAllowedDts) {\n						track.minSegmentDts = Math.min(track.minSegmentDts, currentFrame.dts);\n						track.minSegmentPts = track.minSegmentDts;\n						return true;\n					}\n					return false;\n				});\n			},\n			generateSampleTable: function generateSampleTable(frames) {\n				var i, currentFrame, samples = [];\n				for (i = 0; i < frames.length; i++) {\n					currentFrame = frames[i];\n					samples.push({\n						size: currentFrame.data.byteLength,\n						duration: 1024\n					});\n				}\n				return samples;\n			},\n			concatenateFrameData: function concatenateFrameData(frames) {\n				var i, currentFrame, dataOffset = 0, data = new Uint8Array(sumFrameByteLengths(frames));\n				for (i = 0; i < frames.length; i++) {\n					currentFrame = frames[i];\n					data.set(currentFrame.data, dataOffset);\n					dataOffset += currentFrame.data.byteLength;\n				}\n				return data;\n			}\n		};\n	}));\n	//#endregion\n	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/mp4/track-decode-info.js\n	var require_track_decode_info = /* @__PURE__ */ __commonJSMin(((exports, module) => {\n		/**\n		* mux.js\n		*\n		* Copyright (c) Brightcove\n		* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE\n		*/\n		var ONE_SECOND_IN_TS = require_clock().ONE_SECOND_IN_TS;\n		module.exports = {\n			clearDtsInfo: function clearDtsInfo(track) {\n				delete track.minSegmentDts;\n				delete track.maxSegmentDts;\n				delete track.minSegmentPts;\n				delete track.maxSegmentPts;\n			},\n			calculateTrackBaseMediaDecodeTime: function calculateTrackBaseMediaDecodeTime(track, keepOriginalTimestamps) {\n				var baseMediaDecodeTime, scale, minSegmentDts = track.minSegmentDts;\n				if (!keepOriginalTimestamps) minSegmentDts -= track.timelineStartInfo.dts;\n				baseMediaDecodeTime = track.timelineStartInfo.baseMediaDecodeTime;\n				baseMediaDecodeTime += minSegmentDts;\n				baseMediaDecodeTime = Math.max(0, baseMediaDecodeTime);\n				if (track.type === \"audio\") {\n					scale = track.samplerate / ONE_SECOND_IN_TS;\n					baseMediaDecodeTime *= scale;\n					baseMediaDecodeTime = Math.floor(baseMediaDecodeTime);\n				}\n				return baseMediaDecodeTime;\n			},\n			collectDtsInfo: function collectDtsInfo(track, data) {\n				if (typeof data.pts === \"number\") {\n					if (track.timelineStartInfo.pts === void 0) track.timelineStartInfo.pts = data.pts;\n					if (track.minSegmentPts === void 0) track.minSegmentPts = data.pts;\n					else track.minSegmentPts = Math.min(track.minSegmentPts, data.pts);\n					if (track.maxSegmentPts === void 0) track.maxSegmentPts = data.pts;\n					else track.maxSegmentPts = Math.max(track.maxSegmentPts, data.pts);\n				}\n				if (typeof data.dts === \"number\") {\n					if (track.timelineStartInfo.dts === void 0) track.timelineStartInfo.dts = data.dts;\n					if (track.minSegmentDts === void 0) track.minSegmentDts = data.dts;\n					else track.minSegmentDts = Math.min(track.minSegmentDts, data.dts);\n					if (track.maxSegmentDts === void 0) track.maxSegmentDts = data.dts;\n					else track.maxSegmentDts = Math.max(track.maxSegmentDts, data.dts);\n				}\n			}\n		};\n	}));\n	//#endregion\n	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/tools/caption-packet-parser.js\n	/**\n	* mux.js\n	*\n	* Copyright (c) Brightcove\n	* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE\n	*\n	* Reads in-band caption information from a video elementary\n	* stream. Captions must follow the CEA-708 standard for injection\n	* into an MPEG-2 transport streams.\n	* @see https://en.wikipedia.org/wiki/CEA-708\n	* @see https://www.gpo.gov/fdsys/pkg/CFR-2007-title47-vol1/pdf/CFR-2007-title47-vol1-sec15-119.pdf\n	*/\n	var require_caption_packet_parser = /* @__PURE__ */ __commonJSMin(((exports, module) => {\n		var USER_DATA_REGISTERED_ITU_T_T35 = 4;\n		var RBSP_TRAILING_BITS = 128;\n		module.exports = {\n			parseSei: function parseSei(bytes) {\n				var i = 0, result = {\n					payloadType: -1,\n					payloadSize: 0\n				}, payloadType = 0, payloadSize = 0;\n				while (i < bytes.byteLength) {\n					if (bytes[i] === RBSP_TRAILING_BITS) break;\n					while (bytes[i] === 255) {\n						payloadType += 255;\n						i++;\n					}\n					payloadType += bytes[i++];\n					while (bytes[i] === 255) {\n						payloadSize += 255;\n						i++;\n					}\n					payloadSize += bytes[i++];\n					if (!result.payload && payloadType === USER_DATA_REGISTERED_ITU_T_T35) if (String.fromCharCode(bytes[i + 3], bytes[i + 4], bytes[i + 5], bytes[i + 6]) === \"GA94\") {\n						result.payloadType = payloadType;\n						result.payloadSize = payloadSize;\n						result.payload = bytes.subarray(i, i + payloadSize);\n						break;\n					} else result.payload = void 0;\n					i += payloadSize;\n					payloadType = 0;\n					payloadSize = 0;\n				}\n				return result;\n			},\n			parseUserData: function parseUserData(sei) {\n				if (sei.payload[0] !== 181) return null;\n				if ((sei.payload[1] << 8 | sei.payload[2]) !== 49) return null;\n				if (String.fromCharCode(sei.payload[3], sei.payload[4], sei.payload[5], sei.payload[6]) !== \"GA94\") return null;\n				if (sei.payload[7] !== 3) return null;\n				return sei.payload.subarray(8, sei.payload.length - 1);\n			},\n			parseCaptionPackets: function parseCaptionPackets(pts, userData) {\n				var results = [], i, count, offset, data;\n				if (!(userData[0] & 64)) return results;\n				count = userData[0] & 31;\n				for (i = 0; i < count; i++) {\n					offset = i * 3;\n					data = {\n						type: userData[offset + 2] & 3,\n						pts\n					};\n					if (userData[offset + 2] & 4) {\n						data.ccData = userData[offset + 3] << 8 | userData[offset + 4];\n						results.push(data);\n					}\n				}\n				return results;\n			},\n			discardEmulationPreventionBytes: function discardEmulationPreventionBytes(data) {\n				var length = data.byteLength, emulationPreventionBytesPositions = [], i = 1, newLength, newData;\n				while (i < length - 2) if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 3) {\n					emulationPreventionBytesPositions.push(i + 2);\n					i += 2;\n				} else i++;\n				if (emulationPreventionBytesPositions.length === 0) return data;\n				newLength = length - emulationPreventionBytesPositions.length;\n				newData = new Uint8Array(newLength);\n				var sourceIndex = 0;\n				for (i = 0; i < newLength; sourceIndex++, i++) {\n					if (sourceIndex === emulationPreventionBytesPositions[0]) {\n						sourceIndex++;\n						emulationPreventionBytesPositions.shift();\n					}\n					newData[i] = data[sourceIndex];\n				}\n				return newData;\n			},\n			USER_DATA_REGISTERED_ITU_T_T35\n		};\n	}));\n	//#endregion\n	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/m2ts/caption-stream.js\n	/**\n	* mux.js\n	*\n	* Copyright (c) Brightcove\n	* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE\n	*\n	* Reads in-band caption information from a video elementary\n	* stream. Captions must follow the CEA-708 standard for injection\n	* into an MPEG-2 transport streams.\n	* @see https://en.wikipedia.org/wiki/CEA-708\n	* @see https://www.gpo.gov/fdsys/pkg/CFR-2007-title47-vol1/pdf/CFR-2007-title47-vol1-sec15-119.pdf\n	*/\n	var require_caption_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {\n		var Stream = require_stream();\n		var cea708Parser = require_caption_packet_parser();\n		var CaptionStream = function CaptionStream(options) {\n			options = options || {};\n			CaptionStream.prototype.init.call(this);\n			this.parse708captions_ = typeof options.parse708captions === \"boolean\" ? options.parse708captions : true;\n			this.captionPackets_ = [];\n			this.ccStreams_ = [\n				new Cea608Stream(0, 0),\n				new Cea608Stream(0, 1),\n				new Cea608Stream(1, 0),\n				new Cea608Stream(1, 1)\n			];\n			if (this.parse708captions_) this.cc708Stream_ = new Cea708Stream({ captionServices: options.captionServices });\n			this.reset();\n			this.ccStreams_.forEach(function(cc) {\n				cc.on(\"data\", this.trigger.bind(this, \"data\"));\n				cc.on(\"partialdone\", this.trigger.bind(this, \"partialdone\"));\n				cc.on(\"done\", this.trigger.bind(this, \"done\"));\n			}, this);\n			if (this.parse708captions_) {\n				this.cc708Stream_.on(\"data\", this.trigger.bind(this, \"data\"));\n				this.cc708Stream_.on(\"partialdone\", this.trigger.bind(this, \"partialdone\"));\n				this.cc708Stream_.on(\"done\", this.trigger.bind(this, \"done\"));\n			}\n		};\n		CaptionStream.prototype = new Stream();\n		CaptionStream.prototype.push = function(event) {\n			var sei, userData, newCaptionPackets;\n			if (event.nalUnitType !== \"sei_rbsp\") return;\n			sei = cea708Parser.parseSei(event.escapedRBSP);\n			if (!sei.payload) return;\n			if (sei.payloadType !== cea708Parser.USER_DATA_REGISTERED_ITU_T_T35) return;\n			userData = cea708Parser.parseUserData(sei);\n			if (!userData) return;\n			if (event.dts < this.latestDts_) {\n				this.ignoreNextEqualDts_ = true;\n				return;\n			} else if (event.dts === this.latestDts_ && this.ignoreNextEqualDts_) {\n				this.numSameDts_--;\n				if (!this.numSameDts_) this.ignoreNextEqualDts_ = false;\n				return;\n			}\n			newCaptionPackets = cea708Parser.parseCaptionPackets(event.pts, userData);\n			this.captionPackets_ = this.captionPackets_.concat(newCaptionPackets);\n			if (this.latestDts_ !== event.dts) this.numSameDts_ = 0;\n			this.numSameDts_++;\n			this.latestDts_ = event.dts;\n		};\n		CaptionStream.prototype.flushCCStreams = function(flushType) {\n			this.ccStreams_.forEach(function(cc) {\n				return flushType === \"flush\" ? cc.flush() : cc.partialFlush();\n			}, this);\n		};\n		CaptionStream.prototype.flushStream = function(flushType) {\n			if (!this.captionPackets_.length) {\n				this.flushCCStreams(flushType);\n				return;\n			}\n			this.captionPackets_.forEach(function(elem, idx) {\n				elem.presortIndex = idx;\n			});\n			this.captionPackets_.sort(function(a, b) {\n				if (a.pts === b.pts) return a.presortIndex - b.presortIndex;\n				return a.pts - b.pts;\n			});\n			this.captionPackets_.forEach(function(packet) {\n				if (packet.type < 2) this.dispatchCea608Packet(packet);\n				else this.dispatchCea708Packet(packet);\n			}, this);\n			this.captionPackets_.length = 0;\n			this.flushCCStreams(flushType);\n		};\n		CaptionStream.prototype.flush = function() {\n			return this.flushStream(\"flush\");\n		};\n		CaptionStream.prototype.partialFlush = function() {\n			return this.flushStream(\"partialFlush\");\n		};\n		CaptionStream.prototype.reset = function() {\n			this.latestDts_ = null;\n			this.ignoreNextEqualDts_ = false;\n			this.numSameDts_ = 0;\n			this.activeCea608Channel_ = [null, null];\n			this.ccStreams_.forEach(function(ccStream) {\n				ccStream.reset();\n			});\n		};\n		CaptionStream.prototype.dispatchCea608Packet = function(packet) {\n			if (this.setsTextOrXDSActive(packet)) this.activeCea608Channel_[packet.type] = null;\n			else if (this.setsChannel1Active(packet)) this.activeCea608Channel_[packet.type] = 0;\n			else if (this.setsChannel2Active(packet)) this.activeCea608Channel_[packet.type] = 1;\n			if (this.activeCea608Channel_[packet.type] === null) return;\n			this.ccStreams_[(packet.type << 1) + this.activeCea608Channel_[packet.type]].push(packet);\n		};\n		CaptionStream.prototype.setsChannel1Active = function(packet) {\n			return (packet.ccData & 30720) === 4096;\n		};\n		CaptionStream.prototype.setsChannel2Active = function(packet) {\n			return (packet.ccData & 30720) === 6144;\n		};\n		CaptionStream.prototype.setsTextOrXDSActive = function(packet) {\n			return (packet.ccData & 28928) === 256 || (packet.ccData & 30974) === 4138 || (packet.ccData & 30974) === 6186;\n		};\n		CaptionStream.prototype.dispatchCea708Packet = function(packet) {\n			if (this.parse708captions_) this.cc708Stream_.push(packet);\n		};\n		var CHARACTER_TRANSLATION_708 = {\n			127: 9834,\n			4128: 32,\n			4129: 160,\n			4133: 8230,\n			4138: 352,\n			4140: 338,\n			4144: 9608,\n			4145: 8216,\n			4146: 8217,\n			4147: 8220,\n			4148: 8221,\n			4149: 8226,\n			4153: 8482,\n			4154: 353,\n			4156: 339,\n			4157: 8480,\n			4159: 376,\n			4214: 8539,\n			4215: 8540,\n			4216: 8541,\n			4217: 8542,\n			4218: 9168,\n			4219: 9124,\n			4220: 9123,\n			4221: 9135,\n			4222: 9126,\n			4223: 9121,\n			4256: 12600\n		};\n		var get708CharFromCode = function get708CharFromCode(code) {\n			var newCode = CHARACTER_TRANSLATION_708[code] || code;\n			if (code & 4096 && code === newCode) return \"\";\n			return String.fromCharCode(newCode);\n		};\n		var within708TextBlock = function within708TextBlock(b) {\n			return 32 <= b && b <= 127 || 160 <= b && b <= 255;\n		};\n		var Cea708Window = function Cea708Window(windowNum) {\n			this.windowNum = windowNum;\n			this.reset();\n		};\n		Cea708Window.prototype.reset = function() {\n			this.clearText();\n			this.pendingNewLine = false;\n			this.winAttr = {};\n			this.penAttr = {};\n			this.penLoc = {};\n			this.penColor = {};\n			this.visible = 0;\n			this.rowLock = 0;\n			this.columnLock = 0;\n			this.priority = 0;\n			this.relativePositioning = 0;\n			this.anchorVertical = 0;\n			this.anchorHorizontal = 0;\n			this.anchorPoint = 0;\n			this.rowCount = 1;\n			this.virtualRowCount = this.rowCount + 1;\n			this.columnCount = 41;\n			this.windowStyle = 0;\n			this.penStyle = 0;\n		};\n		Cea708Window.prototype.getText = function() {\n			return this.rows.join(\"\\n\");\n		};\n		Cea708Window.prototype.clearText = function() {\n			this.rows = [\"\"];\n			this.rowIdx = 0;\n		};\n		Cea708Window.prototype.newLine = function(pts) {\n			if (this.rows.length >= this.virtualRowCount && typeof this.beforeRowOverflow === \"function\") this.beforeRowOverflow(pts);\n			if (this.rows.length > 0) {\n				this.rows.push(\"\");\n				this.rowIdx++;\n			}\n			while (this.rows.length > this.virtualRowCount) {\n				this.rows.shift();\n				this.rowIdx--;\n			}\n		};\n		Cea708Window.prototype.isEmpty = function() {\n			if (this.rows.length === 0) return true;\n			else if (this.rows.length === 1) return this.rows[0] === \"\";\n			return false;\n		};\n		Cea708Window.prototype.addText = function(text) {\n			this.rows[this.rowIdx] += text;\n		};\n		Cea708Window.prototype.backspace = function() {\n			if (!this.isEmpty()) {\n				var row = this.rows[this.rowIdx];\n				this.rows[this.rowIdx] = row.substr(0, row.length - 1);\n			}\n		};\n		var Cea708Service = function Cea708Service(serviceNum, encoding, stream) {\n			this.serviceNum = serviceNum;\n			this.text = \"\";\n			this.currentWindow = new Cea708Window(-1);\n			this.windows = [];\n			this.stream = stream;\n			if (typeof encoding === \"string\") this.createTextDecoder(encoding);\n		};\n		/**\n		* Initialize service windows\n		* Must be run before service use\n		*\n		* @param  {Integer}  pts               PTS value\n		* @param  {Function} beforeRowOverflow Function to execute before row overflow of a window\n		*/\n		Cea708Service.prototype.init = function(pts, beforeRowOverflow) {\n			this.startPts = pts;\n			for (var win = 0; win < 8; win++) {\n				this.windows[win] = new Cea708Window(win);\n				if (typeof beforeRowOverflow === \"function\") this.windows[win].beforeRowOverflow = beforeRowOverflow;\n			}\n		};\n		/**\n		* Set current window of service to be affected by commands\n		*\n		* @param  {Integer} windowNum Window number\n		*/\n		Cea708Service.prototype.setCurrentWindow = function(windowNum) {\n			this.currentWindow = this.windows[windowNum];\n		};\n		/**\n		* Try to create a TextDecoder if it is natively supported\n		*/\n		Cea708Service.prototype.createTextDecoder = function(encoding) {\n			if (typeof TextDecoder === \"undefined\") this.stream.trigger(\"log\", {\n				level: \"warn\",\n				message: \"The `encoding` option is unsupported without TextDecoder support\"\n			});\n			else try {\n				this.textDecoder_ = new TextDecoder(encoding);\n			} catch (error) {\n				this.stream.trigger(\"log\", {\n					level: \"warn\",\n					message: \"TextDecoder could not be created with \" + encoding + \" encoding. \" + error\n				});\n			}\n		};\n		var Cea708Stream = function Cea708Stream(options) {\n			options = options || {};\n			Cea708Stream.prototype.init.call(this);\n			var self = this;\n			var captionServices = options.captionServices || {};\n			var captionServiceEncodings = {};\n			var serviceProps;\n			Object.keys(captionServices).forEach(function(serviceName) {\n				serviceProps = captionServices[serviceName];\n				if (/^SERVICE/.test(serviceName)) captionServiceEncodings[serviceName] = serviceProps.encoding;\n			});\n			this.serviceEncodings = captionServiceEncodings;\n			this.current708Packet = null;\n			this.services = {};\n			this.push = function(packet) {\n				if (packet.type === 3) {\n					self.new708Packet();\n					self.add708Bytes(packet);\n				} else {\n					if (self.current708Packet === null) self.new708Packet();\n					self.add708Bytes(packet);\n				}\n			};\n		};\n		Cea708Stream.prototype = new Stream();\n		/**\n		* Push current 708 packet, create new 708 packet.\n		*/\n		Cea708Stream.prototype.new708Packet = function() {\n			if (this.current708Packet !== null) this.push708Packet();\n			this.current708Packet = {\n				data: [],\n				ptsVals: []\n			};\n		};\n		/**\n		* Add pts and both bytes from packet into current 708 packet.\n		*/\n		Cea708Stream.prototype.add708Bytes = function(packet) {\n			var data = packet.ccData;\n			var byte0 = data >>> 8;\n			var byte1 = data & 255;\n			this.current708Packet.ptsVals.push(packet.pts);\n			this.current708Packet.data.push(byte0);\n			this.current708Packet.data.push(byte1);\n		};\n		/**\n		* Parse completed 708 packet into service blocks and push each service block.\n		*/\n		Cea708Stream.prototype.push708Packet = function() {\n			var packet708 = this.current708Packet;\n			var packetData = packet708.data;\n			var serviceNum = null;\n			var blockSize = null;\n			var i = 0;\n			var b = packetData[i++];\n			packet708.seq = b >> 6;\n			packet708.sizeCode = b & 63;\n			for (; i < packetData.length; i++) {\n				b = packetData[i++];\n				serviceNum = b >> 5;\n				blockSize = b & 31;\n				if (serviceNum === 7 && blockSize > 0) {\n					b = packetData[i++];\n					serviceNum = b;\n				}\n				this.pushServiceBlock(serviceNum, i, blockSize);\n				if (blockSize > 0) i += blockSize - 1;\n			}\n		};\n		/**\n		* Parse service block, execute commands, read text.\n		*\n		* Note: While many of these commands serve important purposes,\n		* many others just parse out the parameters or attributes, but\n		* nothing is done with them because this is not a full and complete\n		* implementation of the entire 708 spec.\n		*\n		* @param  {Integer} serviceNum Service number\n		* @param  {Integer} start      Start index of the 708 packet data\n		* @param  {Integer} size       Block size\n		*/\n		Cea708Stream.prototype.pushServiceBlock = function(serviceNum, start, size) {\n			var b;\n			var i = start;\n			var packetData = this.current708Packet.data;\n			var service = this.services[serviceNum];\n			if (!service) service = this.initService(serviceNum, i);\n			for (; i < start + size && i < packetData.length; i++) {\n				b = packetData[i];\n				if (within708TextBlock(b)) i = this.handleText(i, service);\n				else if (b === 24) i = this.multiByteCharacter(i, service);\n				else if (b === 16) i = this.extendedCommands(i, service);\n				else if (128 <= b && b <= 135) i = this.setCurrentWindow(i, service);\n				else if (152 <= b && b <= 159) i = this.defineWindow(i, service);\n				else if (b === 136) i = this.clearWindows(i, service);\n				else if (b === 140) i = this.deleteWindows(i, service);\n				else if (b === 137) i = this.displayWindows(i, service);\n				else if (b === 138) i = this.hideWindows(i, service);\n				else if (b === 139) i = this.toggleWindows(i, service);\n				else if (b === 151) i = this.setWindowAttributes(i, service);\n				else if (b === 144) i = this.setPenAttributes(i, service);\n				else if (b === 145) i = this.setPenColor(i, service);\n				else if (b === 146) i = this.setPenLocation(i, service);\n				else if (b === 143) service = this.reset(i, service);\n				else if (b === 8) service.currentWindow.backspace();\n				else if (b === 12) service.currentWindow.clearText();\n				else if (b === 13) service.currentWindow.pendingNewLine = true;\n				else if (b === 14) service.currentWindow.clearText();\n				else if (b === 141) i++;\n				else if (b === 142) {} else if (b === 3) {} else if (b === 0) {}\n			}\n		};\n		/**\n		* Execute an extended command\n		*\n		* @param  {Integer} i        Current index in the 708 packet\n		* @param  {Service} service  The service object to be affected\n		* @return {Integer}          New index after parsing\n		*/\n		Cea708Stream.prototype.extendedCommands = function(i, service) {\n			var b = this.current708Packet.data[++i];\n			if (within708TextBlock(b)) i = this.handleText(i, service, { isExtended: true });\n			return i;\n		};\n		/**\n		* Get PTS value of a given byte index\n		*\n		* @param  {Integer} byteIndex  Index of the byte\n		* @return {Integer}            PTS\n		*/\n		Cea708Stream.prototype.getPts = function(byteIndex) {\n			return this.current708Packet.ptsVals[Math.floor(byteIndex / 2)];\n		};\n		/**\n		* Initializes a service\n		*\n		* @param  {Integer} serviceNum Service number\n		* @return {Service}            Initialized service object\n		*/\n		Cea708Stream.prototype.initService = function(serviceNum, i) {\n			var serviceName = \"SERVICE\" + serviceNum;\n			var self = this;\n			var serviceName;\n			var encoding;\n			if (serviceName in this.serviceEncodings) encoding = this.serviceEncodings[serviceName];\n			this.services[serviceNum] = new Cea708Service(serviceNum, encoding, self);\n			this.services[serviceNum].init(this.getPts(i), function(pts) {\n				self.flushDisplayed(pts, self.services[serviceNum]);\n			});\n			return this.services[serviceNum];\n		};\n		/**\n		* Execute text writing to current window\n		*\n		* @param  {Integer} i        Current index in the 708 packet\n		* @param  {Service} service  The service object to be affected\n		* @return {Integer}          New index after parsing\n		*/\n		Cea708Stream.prototype.handleText = function(i, service, options) {\n			var isExtended = options && options.isExtended;\n			var isMultiByte = options && options.isMultiByte;\n			var packetData = this.current708Packet.data;\n			var extended = isExtended ? 4096 : 0;\n			var currentByte = packetData[i];\n			var nextByte = packetData[i + 1];\n			var win = service.currentWindow;\n			var char;\n			var charCodeArray;\n			if (service.textDecoder_ && !isExtended) {\n				if (isMultiByte) {\n					charCodeArray = [currentByte, nextByte];\n					i++;\n				} else charCodeArray = [currentByte];\n				char = service.textDecoder_.decode(new Uint8Array(charCodeArray));\n			} else char = get708CharFromCode(extended | currentByte);\n			if (win.pendingNewLine && !win.isEmpty()) win.newLine(this.getPts(i));\n			win.pendingNewLine = false;\n			win.addText(char);\n			return i;\n		};\n		/**\n		* Handle decoding of multibyte character\n		*\n		* @param  {Integer} i        Current index in the 708 packet\n		* @param  {Service} service  The service object to be affected\n		* @return {Integer}          New index after parsing\n		*/\n		Cea708Stream.prototype.multiByteCharacter = function(i, service) {\n			var packetData = this.current708Packet.data;\n			var firstByte = packetData[i + 1];\n			var secondByte = packetData[i + 2];\n			if (within708TextBlock(firstByte) && within708TextBlock(secondByte)) i = this.handleText(++i, service, { isMultiByte: true });\n			return i;\n		};\n		/**\n		* Parse and execute the CW# command.\n		*\n		* Set the current window.\n		*\n		* @param  {Integer} i        Current index in the 708 packet\n		* @param  {Service} service  The service object to be affected\n		* @return {Integer}          New index after parsing\n		*/\n		Cea708Stream.prototype.setCurrentWindow = function(i, service) {\n			var windowNum = this.current708Packet.data[i] & 7;\n			service.setCurrentWindow(windowNum);\n			return i;\n		};\n		/**\n		* Parse and execute the DF# command.\n		*\n		* Define a window and set it as the current window.\n		*\n		* @param  {Integer} i        Current index in the 708 packet\n		* @param  {Service} service  The service object to be affected\n		* @return {Integer}          New index after parsing\n		*/\n		Cea708Stream.prototype.defineWindow = function(i, service) {\n			var packetData = this.current708Packet.data;\n			var b = packetData[i];\n			var windowNum = b & 7;\n			service.setCurrentWindow(windowNum);\n			var win = service.currentWindow;\n			b = packetData[++i];\n			win.visible = (b & 32) >> 5;\n			win.rowLock = (b & 16) >> 4;\n			win.columnLock = (b & 8) >> 3;\n			win.priority = b & 7;\n			b = packetData[++i];\n			win.relativePositioning = (b & 128) >> 7;\n			win.anchorVertical = b & 127;\n			b = packetData[++i];\n			win.anchorHorizontal = b;\n			b = packetData[++i];\n			win.anchorPoint = (b & 240) >> 4;\n			win.rowCount = b & 15;\n			b = packetData[++i];\n			win.columnCount = b & 63;\n			b = packetData[++i];\n			win.windowStyle = (b & 56) >> 3;\n			win.penStyle = b & 7;\n			win.virtualRowCount = win.rowCount + 1;\n			return i;\n		};\n		/**\n		* Parse and execute the SWA command.\n		*\n		* Set attributes of the current window.\n		*\n		* @param  {Integer} i        Current index in the 708 packet\n		* @param  {Service} service  The service object to be affected\n		* @return {Integer}          New index after parsing\n		*/\n		Cea708Stream.prototype.setWindowAttributes = function(i, service) {\n			var packetData = this.current708Packet.data;\n			var b = packetData[i];\n			var winAttr = service.currentWindow.winAttr;\n			b = packetData[++i];\n			winAttr.fillOpacity = (b & 192) >> 6;\n			winAttr.fillRed = (b & 48) >> 4;\n			winAttr.fillGreen = (b & 12) >> 2;\n			winAttr.fillBlue = b & 3;\n			b = packetData[++i];\n			winAttr.borderType = (b & 192) >> 6;\n			winAttr.borderRed = (b & 48) >> 4;\n			winAttr.borderGreen = (b & 12) >> 2;\n			winAttr.borderBlue = b & 3;\n			b = packetData[++i];\n			winAttr.borderType += (b & 128) >> 5;\n			winAttr.wordWrap = (b & 64) >> 6;\n			winAttr.printDirection = (b & 48) >> 4;\n			winAttr.scrollDirection = (b & 12) >> 2;\n			winAttr.justify = b & 3;\n			b = packetData[++i];\n			winAttr.effectSpeed = (b & 240) >> 4;\n			winAttr.effectDirection = (b & 12) >> 2;\n			winAttr.displayEffect = b & 3;\n			return i;\n		};\n		/**\n		* Gather text from all displayed windows and push a caption to output.\n		*\n		* @param  {Integer} i        Current index in the 708 packet\n		* @param  {Service} service  The service object to be affected\n		*/\n		Cea708Stream.prototype.flushDisplayed = function(pts, service) {\n			var displayedText = [];\n			for (var winId = 0; winId < 8; winId++) if (service.windows[winId].visible && !service.windows[winId].isEmpty()) displayedText.push(service.windows[winId].getText());\n			service.endPts = pts;\n			service.text = displayedText.join(\"\\n\\n\");\n			this.pushCaption(service);\n			service.startPts = pts;\n		};\n		/**\n		* Push a caption to output if the caption contains text.\n		*\n		* @param  {Service} service  The service object to be affected\n		*/\n		Cea708Stream.prototype.pushCaption = function(service) {\n			if (service.text !== \"\") {\n				this.trigger(\"data\", {\n					startPts: service.startPts,\n					endPts: service.endPts,\n					text: service.text,\n					stream: \"cc708_\" + service.serviceNum\n				});\n				service.text = \"\";\n				service.startPts = service.endPts;\n			}\n		};\n		/**\n		* Parse and execute the DSW command.\n		*\n		* Set visible property of windows based on the parsed bitmask.\n		*\n		* @param  {Integer} i        Current index in the 708 packet\n		* @param  {Service} service  The service object to be affected\n		* @return {Integer}          New index after parsing\n		*/\n		Cea708Stream.prototype.displayWindows = function(i, service) {\n			var b = this.current708Packet.data[++i];\n			var pts = this.getPts(i);\n			this.flushDisplayed(pts, service);\n			for (var winId = 0; winId < 8; winId++) if (b & 1 << winId) service.windows[winId].visible = 1;\n			return i;\n		};\n		/**\n		* Parse and execute the HDW command.\n		*\n		* Set visible property of windows based on the parsed bitmask.\n		*\n		* @param  {Integer} i        Current index in the 708 packet\n		* @param  {Service} service  The service object to be affected\n		* @return {Integer}          New index after parsing\n		*/\n		Cea708Stream.prototype.hideWindows = function(i, service) {\n			var b = this.current708Packet.data[++i];\n			var pts = this.getPts(i);\n			this.flushDisplayed(pts, service);\n			for (var winId = 0; winId < 8; winId++) if (b & 1 << winId) service.windows[winId].visible = 0;\n			return i;\n		};\n		/**\n		* Parse and execute the TGW command.\n		*\n		* Set visible property of windows based on the parsed bitmask.\n		*\n		* @param  {Integer} i        Current index in the 708 packet\n		* @param  {Service} service  The service object to be affected\n		* @return {Integer}          New index after parsing\n		*/\n		Cea708Stream.prototype.toggleWindows = function(i, service) {\n			var b = this.current708Packet.data[++i];\n			var pts = this.getPts(i);\n			this.flushDisplayed(pts, service);\n			for (var winId = 0; winId < 8; winId++) if (b & 1 << winId) service.windows[winId].visible ^= 1;\n			return i;\n		};\n		/**\n		* Parse and execute the CLW command.\n		*\n		* Clear text of windows based on the parsed bitmask.\n		*\n		* @param  {Integer} i        Current index in the 708 packet\n		* @param  {Service} service  The service object to be affected\n		* @return {Integer}          New index after parsing\n		*/\n		Cea708Stream.prototype.clearWindows = function(i, service) {\n			var b = this.current708Packet.data[++i];\n			var pts = this.getPts(i);\n			this.flushDisplayed(pts, service);\n			for (var winId = 0; winId < 8; winId++) if (b & 1 << winId) service.windows[winId].clearText();\n			return i;\n		};\n		/**\n		* Parse and execute the DLW command.\n		*\n		* Re-initialize windows based on the parsed bitmask.\n		*\n		* @param  {Integer} i        Current index in the 708 packet\n		* @param  {Service} service  The service object to be affected\n		* @return {Integer}          New index after parsing\n		*/\n		Cea708Stream.prototype.deleteWindows = function(i, service) {\n			var b = this.current708Packet.data[++i];\n			var pts = this.getPts(i);\n			this.flushDisplayed(pts, service);\n			for (var winId = 0; winId < 8; winId++) if (b & 1 << winId) service.windows[winId].reset();\n			return i;\n		};\n		/**\n		* Parse and execute the SPA command.\n		*\n		* Set pen attributes of the current window.\n		*\n		* @param  {Integer} i        Current index in the 708 packet\n		* @param  {Service} service  The service object to be affected\n		* @return {Integer}          New index after parsing\n		*/\n		Cea708Stream.prototype.setPenAttributes = function(i, service) {\n			var packetData = this.current708Packet.data;\n			var b = packetData[i];\n			var penAttr = service.currentWindow.penAttr;\n			b = packetData[++i];\n			penAttr.textTag = (b & 240) >> 4;\n			penAttr.offset = (b & 12) >> 2;\n			penAttr.penSize = b & 3;\n			b = packetData[++i];\n			penAttr.italics = (b & 128) >> 7;\n			penAttr.underline = (b & 64) >> 6;\n			penAttr.edgeType = (b & 56) >> 3;\n			penAttr.fontStyle = b & 7;\n			return i;\n		};\n		/**\n		* Parse and execute the SPC command.\n		*\n		* Set pen color of the current window.\n		*\n		* @param  {Integer} i        Current index in the 708 packet\n		* @param  {Service} service  The service object to be affected\n		* @return {Integer}          New index after parsing\n		*/\n		Cea708Stream.prototype.setPenColor = function(i, service) {\n			var packetData = this.current708Packet.data;\n			var b = packetData[i];\n			var penColor = service.currentWindow.penColor;\n			b = packetData[++i];\n			penColor.fgOpacity = (b & 192) >> 6;\n			penColor.fgRed = (b & 48) >> 4;\n			penColor.fgGreen = (b & 12) >> 2;\n			penColor.fgBlue = b & 3;\n			b = packetData[++i];\n			penColor.bgOpacity = (b & 192) >> 6;\n			penColor.bgRed = (b & 48) >> 4;\n			penColor.bgGreen = (b & 12) >> 2;\n			penColor.bgBlue = b & 3;\n			b = packetData[++i];\n			penColor.edgeRed = (b & 48) >> 4;\n			penColor.edgeGreen = (b & 12) >> 2;\n			penColor.edgeBlue = b & 3;\n			return i;\n		};\n		/**\n		* Parse and execute the SPL command.\n		*\n		* Set pen location of the current window.\n		*\n		* @param  {Integer} i        Current index in the 708 packet\n		* @param  {Service} service  The service object to be affected\n		* @return {Integer}          New index after parsing\n		*/\n		Cea708Stream.prototype.setPenLocation = function(i, service) {\n			var packetData = this.current708Packet.data;\n			var b = packetData[i];\n			var penLoc = service.currentWindow.penLoc;\n			service.currentWindow.pendingNewLine = true;\n			b = packetData[++i];\n			penLoc.row = b & 15;\n			b = packetData[++i];\n			penLoc.column = b & 63;\n			return i;\n		};\n		/**\n		* Execute the RST command.\n		*\n		* Reset service to a clean slate. Re-initialize.\n		*\n		* @param  {Integer} i        Current index in the 708 packet\n		* @param  {Service} service  The service object to be affected\n		* @return {Service}          Re-initialized service\n		*/\n		Cea708Stream.prototype.reset = function(i, service) {\n			var pts = this.getPts(i);\n			this.flushDisplayed(pts, service);\n			return this.initService(service.serviceNum, i);\n		};\n		var CHARACTER_TRANSLATION = {\n			42: 225,\n			92: 233,\n			94: 237,\n			95: 243,\n			96: 250,\n			123: 231,\n			124: 247,\n			125: 209,\n			126: 241,\n			127: 9608,\n			304: 174,\n			305: 176,\n			306: 189,\n			307: 191,\n			308: 8482,\n			309: 162,\n			310: 163,\n			311: 9834,\n			312: 224,\n			313: 160,\n			314: 232,\n			315: 226,\n			316: 234,\n			317: 238,\n			318: 244,\n			319: 251,\n			544: 193,\n			545: 201,\n			546: 211,\n			547: 218,\n			548: 220,\n			549: 252,\n			550: 8216,\n			551: 161,\n			552: 42,\n			553: 39,\n			554: 8212,\n			555: 169,\n			556: 8480,\n			557: 8226,\n			558: 8220,\n			559: 8221,\n			560: 192,\n			561: 194,\n			562: 199,\n			563: 200,\n			564: 202,\n			565: 203,\n			566: 235,\n			567: 206,\n			568: 207,\n			569: 239,\n			570: 212,\n			571: 217,\n			572: 249,\n			573: 219,\n			574: 171,\n			575: 187,\n			800: 195,\n			801: 227,\n			802: 205,\n			803: 204,\n			804: 236,\n			805: 210,\n			806: 242,\n			807: 213,\n			808: 245,\n			809: 123,\n			810: 125,\n			811: 92,\n			812: 94,\n			813: 95,\n			814: 124,\n			815: 126,\n			816: 196,\n			817: 228,\n			818: 214,\n			819: 246,\n			820: 223,\n			821: 165,\n			822: 164,\n			823: 9474,\n			824: 197,\n			825: 229,\n			826: 216,\n			827: 248,\n			828: 9484,\n			829: 9488,\n			830: 9492,\n			831: 9496\n		};\n		var getCharFromCode = function getCharFromCode(code) {\n			if (code === null) return \"\";\n			code = CHARACTER_TRANSLATION[code] || code;\n			return String.fromCharCode(code);\n		};\n		var BOTTOM_ROW = 14;\n		var ROWS = [\n			4352,\n			4384,\n			4608,\n			4640,\n			5376,\n			5408,\n			5632,\n			5664,\n			5888,\n			5920,\n			4096,\n			4864,\n			4896,\n			5120,\n			5152\n		];\n		var createDisplayBuffer = function createDisplayBuffer() {\n			var result = [], i = BOTTOM_ROW + 1;\n			while (i--) result.push(\"\");\n			return result;\n		};\n		var Cea608Stream = function Cea608Stream(field, dataChannel) {\n			Cea608Stream.prototype.init.call(this);\n			this.field_ = field || 0;\n			this.dataChannel_ = dataChannel || 0;\n			this.name_ = \"CC\" + ((this.field_ << 1 | this.dataChannel_) + 1);\n			this.setConstants();\n			this.reset();\n			this.push = function(packet) {\n				var data = packet.ccData & 32639, swap, char0, char1, text;\n				if (data === this.lastControlCode_) {\n					this.lastControlCode_ = null;\n					return;\n				}\n				if ((data & 61440) === 4096) this.lastControlCode_ = data;\n				else if (data !== this.PADDING_) this.lastControlCode_ = null;\n				char0 = data >>> 8;\n				char1 = data & 255;\n				if (data === this.PADDING_) return;\n				else if (data === this.RESUME_CAPTION_LOADING_) this.mode_ = \"popOn\";\n				else if (data === this.END_OF_CAPTION_) {\n					this.mode_ = \"popOn\";\n					this.clearFormatting(packet.pts);\n					this.flushDisplayed(packet.pts);\n					swap = this.displayed_;\n					this.displayed_ = this.nonDisplayed_;\n					this.nonDisplayed_ = swap;\n					this.startPts_ = packet.pts;\n				} else if (data === this.ROLL_UP_2_ROWS_) {\n					this.rollUpRows_ = 2;\n					this.setRollUp(packet.pts);\n				} else if (data === this.ROLL_UP_3_ROWS_) {\n					this.rollUpRows_ = 3;\n					this.setRollUp(packet.pts);\n				} else if (data === this.ROLL_UP_4_ROWS_) {\n					this.rollUpRows_ = 4;\n					this.setRollUp(packet.pts);\n				} else if (data === this.CARRIAGE_RETURN_) {\n					this.clearFormatting(packet.pts);\n					this.flushDisplayed(packet.pts);\n					this.shiftRowsUp_();\n					this.startPts_ = packet.pts;\n				} else if (data === this.BACKSPACE_) if (this.mode_ === \"popOn\") this.nonDisplayed_[this.row_] = this.nonDisplayed_[this.row_].slice(0, -1);\n				else this.displayed_[this.row_] = this.displayed_[this.row_].slice(0, -1);\n				else if (data === this.ERASE_DISPLAYED_MEMORY_) {\n					this.flushDisplayed(packet.pts);\n					this.displayed_ = createDisplayBuffer();\n				} else if (data === this.ERASE_NON_DISPLAYED_MEMORY_) this.nonDisplayed_ = createDisplayBuffer();\n				else if (data === this.RESUME_DIRECT_CAPTIONING_) {\n					if (this.mode_ !== \"paintOn\") {\n						this.flushDisplayed(packet.pts);\n						this.displayed_ = createDisplayBuffer();\n					}\n					this.mode_ = \"paintOn\";\n					this.startPts_ = packet.pts;\n				} else if (this.isSpecialCharacter(char0, char1)) {\n					char0 = (char0 & 3) << 8;\n					text = getCharFromCode(char0 | char1);\n					this[this.mode_](packet.pts, text);\n					this.column_++;\n				} else if (this.isExtCharacter(char0, char1)) {\n					if (this.mode_ === \"popOn\") this.nonDisplayed_[this.row_] = this.nonDisplayed_[this.row_].slice(0, -1);\n					else this.displayed_[this.row_] = this.displayed_[this.row_].slice(0, -1);\n					char0 = (char0 & 3) << 8;\n					text = getCharFromCode(char0 | char1);\n					this[this.mode_](packet.pts, text);\n					this.column_++;\n				} else if (this.isMidRowCode(char0, char1)) {\n					this.clearFormatting(packet.pts);\n					this[this.mode_](packet.pts, \" \");\n					this.column_++;\n					if ((char1 & 14) === 14) this.addFormatting(packet.pts, [\"i\"]);\n					if ((char1 & 1) === 1) this.addFormatting(packet.pts, [\"u\"]);\n				} else if (this.isOffsetControlCode(char0, char1)) this.column_ += char1 & 3;\n				else if (this.isPAC(char0, char1)) {\n					var row = ROWS.indexOf(data & 7968);\n					if (this.mode_ === \"rollUp\") {\n						if (row - this.rollUpRows_ + 1 < 0) row = this.rollUpRows_ - 1;\n						this.setRollUp(packet.pts, row);\n					}\n					if (row !== this.row_) {\n						this.clearFormatting(packet.pts);\n						this.row_ = row;\n					}\n					if (char1 & 1 && this.formatting_.indexOf(\"u\") === -1) this.addFormatting(packet.pts, [\"u\"]);\n					if ((data & 16) === 16) this.column_ = ((data & 14) >> 1) * 4;\n					if (this.isColorPAC(char1)) {\n						if ((char1 & 14) === 14) this.addFormatting(packet.pts, [\"i\"]);\n					}\n				} else if (this.isNormalChar(char0)) {\n					if (char1 === 0) char1 = null;\n					text = getCharFromCode(char0);\n					text += getCharFromCode(char1);\n					this[this.mode_](packet.pts, text);\n					this.column_ += text.length;\n				}\n			};\n		};\n		Cea608Stream.prototype = new Stream();\n		Cea608Stream.prototype.flushDisplayed = function(pts) {\n			var content = this.displayed_.map(function(row, index) {\n				try {\n					return row.trim();\n				} catch (e) {\n					this.trigger(\"log\", {\n						level: \"warn\",\n						message: \"Skipping a malformed 608 caption at index \" + index + \".\"\n					});\n					return \"\";\n				}\n			}, this).join(\"\\n\").replace(/^\\n+|\\n+$/g, \"\");\n			if (content.length) this.trigger(\"data\", {\n				startPts: this.startPts_,\n				endPts: pts,\n				text: content,\n				stream: this.name_\n			});\n		};\n		/**\n		* Zero out the data, used for startup and on seek\n		*/\n		Cea608Stream.prototype.reset = function() {\n			this.mode_ = \"popOn\";\n			this.topRow_ = 0;\n			this.startPts_ = 0;\n			this.displayed_ = createDisplayBuffer();\n			this.nonDisplayed_ = createDisplayBuffer();\n			this.lastControlCode_ = null;\n			this.column_ = 0;\n			this.row_ = BOTTOM_ROW;\n			this.rollUpRows_ = 2;\n			this.formatting_ = [];\n		};\n		/**\n		* Sets up control code and related constants for this instance\n		*/\n		Cea608Stream.prototype.setConstants = function() {\n			if (this.dataChannel_ === 0) {\n				this.BASE_ = 16;\n				this.EXT_ = 17;\n				this.CONTROL_ = (20 | this.field_) << 8;\n				this.OFFSET_ = 23;\n			} else if (this.dataChannel_ === 1) {\n				this.BASE_ = 24;\n				this.EXT_ = 25;\n				this.CONTROL_ = (28 | this.field_) << 8;\n				this.OFFSET_ = 31;\n			}\n			this.PADDING_ = 0;\n			this.RESUME_CAPTION_LOADING_ = this.CONTROL_ | 32;\n			this.END_OF_CAPTION_ = this.CONTROL_ | 47;\n			this.ROLL_UP_2_ROWS_ = this.CONTROL_ | 37;\n			this.ROLL_UP_3_ROWS_ = this.CONTROL_ | 38;\n			this.ROLL_UP_4_ROWS_ = this.CONTROL_ | 39;\n			this.CARRIAGE_RETURN_ = this.CONTROL_ | 45;\n			this.RESUME_DIRECT_CAPTIONING_ = this.CONTROL_ | 41;\n			this.BACKSPACE_ = this.CONTROL_ | 33;\n			this.ERASE_DISPLAYED_MEMORY_ = this.CONTROL_ | 44;\n			this.ERASE_NON_DISPLAYED_MEMORY_ = this.CONTROL_ | 46;\n		};\n		/**\n		* Detects if the 2-byte packet data is a special character\n		*\n		* Special characters have a second byte in the range 0x30 to 0x3f,\n		* with the first byte being 0x11 (for data channel 1) or 0x19 (for\n		* data channel 2).\n		*\n		* @param  {Integer} char0 The first byte\n		* @param  {Integer} char1 The second byte\n		* @return {Boolean}       Whether the 2 bytes are an special character\n		*/\n		Cea608Stream.prototype.isSpecialCharacter = function(char0, char1) {\n			return char0 === this.EXT_ && char1 >= 48 && char1 <= 63;\n		};\n		/**\n		* Detects if the 2-byte packet data is an extended character\n		*\n		* Extended characters have a second byte in the range 0x20 to 0x3f,\n		* with the first byte being 0x12 or 0x13 (for data channel 1) or\n		* 0x1a or 0x1b (for data channel 2).\n		*\n		* @param  {Integer} char0 The first byte\n		* @param  {Integer} char1 The second byte\n		* @return {Boolean}       Whether the 2 bytes are an extended character\n		*/\n		Cea608Stream.prototype.isExtCharacter = function(char0, char1) {\n			return (char0 === this.EXT_ + 1 || char0 === this.EXT_ + 2) && char1 >= 32 && char1 <= 63;\n		};\n		/**\n		* Detects if the 2-byte packet is a mid-row code\n		*\n		* Mid-row codes have a second byte in the range 0x20 to 0x2f, with\n		* the first byte being 0x11 (for data channel 1) or 0x19 (for data\n		* channel 2).\n		*\n		* @param  {Integer} char0 The first byte\n		* @param  {Integer} char1 The second byte\n		* @return {Boolean}       Whether the 2 bytes are a mid-row code\n		*/\n		Cea608Stream.prototype.isMidRowCode = function(char0, char1) {\n			return char0 === this.EXT_ && char1 >= 32 && char1 <= 47;\n		};\n		/**\n		* Detects if the 2-byte packet is an offset control code\n		*\n		* Offset control codes have a second byte in the range 0x21 to 0x23,\n		* with the first byte being 0x17 (for data channel 1) or 0x1f (for\n		* data channel 2).\n		*\n		* @param  {Integer} char0 The first byte\n		* @param  {Integer} char1 The second byte\n		* @return {Boolean}       Whether the 2 bytes are an offset control code\n		*/\n		Cea608Stream.prototype.isOffsetControlCode = function(char0, char1) {\n			return char0 === this.OFFSET_ && char1 >= 33 && char1 <= 35;\n		};\n		/**\n		* Detects if the 2-byte packet is a Preamble Address Code\n		*\n		* PACs have a first byte in the range 0x10 to 0x17 (for data channel 1)\n		* or 0x18 to 0x1f (for data channel 2), with the second byte in the\n		* range 0x40 to 0x7f.\n		*\n		* @param  {Integer} char0 The first byte\n		* @param  {Integer} char1 The second byte\n		* @return {Boolean}       Whether the 2 bytes are a PAC\n		*/\n		Cea608Stream.prototype.isPAC = function(char0, char1) {\n			return char0 >= this.BASE_ && char0 < this.BASE_ + 8 && char1 >= 64 && char1 <= 127;\n		};\n		/**\n		* Detects if a packet's second byte is in the range of a PAC color code\n		*\n		* PAC color codes have the second byte be in the range 0x40 to 0x4f, or\n		* 0x60 to 0x6f.\n		*\n		* @param  {Integer} char1 The second byte\n		* @return {Boolean}       Whether the byte is a color PAC\n		*/\n		Cea608Stream.prototype.isColorPAC = function(char1) {\n			return char1 >= 64 && char1 <= 79 || char1 >= 96 && char1 <= 127;\n		};\n		/**\n		* Detects if a single byte is in the range of a normal character\n		*\n		* Normal text bytes are in the range 0x20 to 0x7f.\n		*\n		* @param  {Integer} char  The byte\n		* @return {Boolean}       Whether the byte is a normal character\n		*/\n		Cea608Stream.prototype.isNormalChar = function(char) {\n			return char >= 32 && char <= 127;\n		};\n		/**\n		* Configures roll-up\n		*\n		* @param  {Integer} pts         Current PTS\n		* @param  {Integer} newBaseRow  Used by PACs to slide the current window to\n		*                               a new position\n		*/\n		Cea608Stream.prototype.setRollUp = function(pts, newBaseRow) {\n			if (this.mode_ !== \"rollUp\") {\n				this.row_ = BOTTOM_ROW;\n				this.mode_ = \"rollUp\";\n				this.flushDisplayed(pts);\n				this.nonDisplayed_ = createDisplayBuffer();\n				this.displayed_ = createDisplayBuffer();\n			}\n			if (newBaseRow !== void 0 && newBaseRow !== this.row_) for (var i = 0; i < this.rollUpRows_; i++) {\n				this.displayed_[newBaseRow - i] = this.displayed_[this.row_ - i];\n				this.displayed_[this.row_ - i] = \"\";\n			}\n			if (newBaseRow === void 0) newBaseRow = this.row_;\n			this.topRow_ = newBaseRow - this.rollUpRows_ + 1;\n		};\n		Cea608Stream.prototype.addFormatting = function(pts, format) {\n			this.formatting_ = this.formatting_.concat(format);\n			var text = format.reduce(function(text, format) {\n				return text + \"<\" + format + \">\";\n			}, \"\");\n			this[this.mode_](pts, text);\n		};\n		Cea608Stream.prototype.clearFormatting = function(pts) {\n			if (!this.formatting_.length) return;\n			var text = this.formatting_.reverse().reduce(function(text, format) {\n				return text + \"</\" + format + \">\";\n			}, \"\");\n			this.formatting_ = [];\n			this[this.mode_](pts, text);\n		};\n		Cea608Stream.prototype.popOn = function(pts, text) {\n			var baseRow = this.nonDisplayed_[this.row_];\n			baseRow += text;\n			this.nonDisplayed_[this.row_] = baseRow;\n		};\n		Cea608Stream.prototype.rollUp = function(pts, text) {\n			var baseRow = this.displayed_[this.row_];\n			baseRow += text;\n			this.displayed_[this.row_] = baseRow;\n		};\n		Cea608Stream.prototype.shiftRowsUp_ = function() {\n			var i;\n			for (i = 0; i < this.topRow_; i++) this.displayed_[i] = \"\";\n			for (i = this.row_ + 1; i < BOTTOM_ROW + 1; i++) this.displayed_[i] = \"\";\n			for (i = this.topRow_; i < this.row_; i++) this.displayed_[i] = this.displayed_[i + 1];\n			this.displayed_[this.row_] = \"\";\n		};\n		Cea608Stream.prototype.paintOn = function(pts, text) {\n			var baseRow = this.displayed_[this.row_];\n			baseRow += text;\n			this.displayed_[this.row_] = baseRow;\n		};\n		module.exports = {\n			CaptionStream,\n			Cea608Stream,\n			Cea708Stream\n		};\n	}));\n	//#endregion\n	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/m2ts/stream-types.js\n	/**\n	* mux.js\n	*\n	* Copyright (c) Brightcove\n	* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE\n	*/\n	var require_stream_types = /* @__PURE__ */ __commonJSMin(((exports, module) => {\n		module.exports = {\n			H264_STREAM_TYPE: 27,\n			ADTS_STREAM_TYPE: 15,\n			METADATA_STREAM_TYPE: 21\n		};\n	}));\n	//#endregion\n	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/m2ts/timestamp-rollover-stream.js\n	/**\n	* mux.js\n	*\n	* Copyright (c) Brightcove\n	* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE\n	*\n	* Accepts program elementary stream (PES) data events and corrects\n	* decode and presentation time stamps to account for a rollover\n	* of the 33 bit value.\n	*/\n	var require_timestamp_rollover_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {\n		var Stream = require_stream();\n		var MAX_TS = 8589934592;\n		var RO_THRESH = 4294967296;\n		var TYPE_SHARED = \"shared\";\n		var handleRollover = function handleRollover(value, reference) {\n			var direction = 1;\n			if (value > reference) direction = -1;\n			while (Math.abs(reference - value) > RO_THRESH) value += direction * MAX_TS;\n			return value;\n		};\n		var TimestampRolloverStream = function TimestampRolloverStream(type) {\n			var lastDTS, referenceDTS;\n			TimestampRolloverStream.prototype.init.call(this);\n			this.type_ = type || TYPE_SHARED;\n			this.push = function(data) {\n				if (this.type_ !== TYPE_SHARED && data.type !== this.type_) return;\n				if (referenceDTS === void 0) referenceDTS = data.dts;\n				data.dts = handleRollover(data.dts, referenceDTS);\n				data.pts = handleRollover(data.pts, referenceDTS);\n				lastDTS = data.dts;\n				this.trigger(\"data\", data);\n			};\n			this.flush = function() {\n				referenceDTS = lastDTS;\n				this.trigger(\"done\");\n			};\n			this.endTimeline = function() {\n				this.flush();\n				this.trigger(\"endedtimeline\");\n			};\n			this.discontinuity = function() {\n				referenceDTS = void 0;\n				lastDTS = void 0;\n			};\n			this.reset = function() {\n				this.discontinuity();\n				this.trigger(\"reset\");\n			};\n		};\n		TimestampRolloverStream.prototype = new Stream();\n		module.exports = {\n			TimestampRolloverStream,\n			handleRollover\n		};\n	}));\n	//#endregion\n	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/utils/typed-array.js\n	var require_typed_array = /* @__PURE__ */ __commonJSMin(((exports, module) => {\n		module.exports = { typedArrayIndexOf: function typedArrayIndexOf(typedArray, element, fromIndex) {\n			if (!typedArray) return -1;\n			var currentIndex = fromIndex;\n			for (; currentIndex < typedArray.length; currentIndex++) if (typedArray[currentIndex] === element) return currentIndex;\n			return -1;\n		} };\n	}));\n	//#endregion\n	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/tools/parse-id3.js\n	/**\n	* mux.js\n	*\n	* Copyright (c) Brightcove\n	* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE\n	*\n	* Tools for parsing ID3 frame data\n	* @see http://id3.org/id3v2.3.0\n	*/\n	var require_parse_id3 = /* @__PURE__ */ __commonJSMin(((exports, module) => {\n		var typedArrayIndexOf = require_typed_array().typedArrayIndexOf;\n		var textEncodingDescriptionByte = {\n			Iso88591: 0,\n			Utf16: 1,\n			Utf16be: 2,\n			Utf8: 3\n		};\n		var percentEncode = function percentEncode(bytes, start, end) {\n			var i, result = \"\";\n			for (i = start; i < end; i++) result += \"%\" + (\"00\" + bytes[i].toString(16)).slice(-2);\n			return result;\n		};\n		var parseUtf8 = function parseUtf8(bytes, start, end) {\n			return decodeURIComponent(percentEncode(bytes, start, end));\n		};\n		var parseIso88591 = function parseIso88591(bytes, start, end) {\n			return unescape(percentEncode(bytes, start, end));\n		};\n		var parseSyncSafeInteger = function parseSyncSafeInteger(data) {\n			return data[0] << 21 | data[1] << 14 | data[2] << 7 | data[3];\n		};\n		var frameParsers = {\n			\"APIC\": function APIC(frame) {\n				var i = 1, mimeTypeEndIndex, descriptionEndIndex, LINK_MIME_TYPE = \"-->\";\n				if (frame.data[0] !== textEncodingDescriptionByte.Utf8) return;\n				mimeTypeEndIndex = typedArrayIndexOf(frame.data, 0, i);\n				if (mimeTypeEndIndex < 0) return;\n				frame.mimeType = parseIso88591(frame.data, i, mimeTypeEndIndex);\n				i = mimeTypeEndIndex + 1;\n				frame.pictureType = frame.data[i];\n				i++;\n				descriptionEndIndex = typedArrayIndexOf(frame.data, 0, i);\n				if (descriptionEndIndex < 0) return;\n				frame.description = parseUtf8(frame.data, i, descriptionEndIndex);\n				i = descriptionEndIndex + 1;\n				if (frame.mimeType === LINK_MIME_TYPE) frame.url = parseIso88591(frame.data, i, frame.data.length);\n				else frame.pictureData = frame.data.subarray(i, frame.data.length);\n			},\n			\"T*\": function T(frame) {\n				if (frame.data[0] !== textEncodingDescriptionByte.Utf8) return;\n				frame.value = parseUtf8(frame.data, 1, frame.data.length).replace(/\\0*$/, \"\");\n				frame.values = frame.value.split(\"\\0\");\n			},\n			\"TXXX\": function TXXX(frame) {\n				var descriptionEndIndex;\n				if (frame.data[0] !== textEncodingDescriptionByte.Utf8) return;\n				descriptionEndIndex = typedArrayIndexOf(frame.data, 0, 1);\n				if (descriptionEndIndex === -1) return;\n				frame.description = parseUtf8(frame.data, 1, descriptionEndIndex);\n				frame.value = parseUtf8(frame.data, descriptionEndIndex + 1, frame.data.length).replace(/\\0*$/, \"\");\n				frame.data = frame.value;\n			},\n			\"W*\": function W(frame) {\n				frame.url = parseIso88591(frame.data, 0, frame.data.length).replace(/\\0.*$/, \"\");\n			},\n			\"WXXX\": function WXXX(frame) {\n				var descriptionEndIndex;\n				if (frame.data[0] !== textEncodingDescriptionByte.Utf8) return;\n				descriptionEndIndex = typedArrayIndexOf(frame.data, 0, 1);\n				if (descriptionEndIndex === -1) return;\n				frame.description = parseUtf8(frame.data, 1, descriptionEndIndex);\n				frame.url = parseIso88591(frame.data, descriptionEndIndex + 1, frame.data.length).replace(/\\0.*$/, \"\");\n			},\n			\"PRIV\": function PRIV(frame) {\n				var i;\n				for (i = 0; i < frame.data.length; i++) if (frame.data[i] === 0) {\n					frame.owner = parseIso88591(frame.data, 0, i);\n					break;\n				}\n				frame.privateData = frame.data.subarray(i + 1);\n				frame.data = frame.privateData;\n			}\n		};\n		module.exports = {\n			parseId3Frames: function parseId3Frames(data) {\n				var frameSize, frameHeader, frameStart = 10, tagSize = 0, frames = [];\n				if (data.length < 10 || data[0] !== \"I\".charCodeAt(0) || data[1] !== \"D\".charCodeAt(0) || data[2] !== \"3\".charCodeAt(0)) return;\n				tagSize = parseSyncSafeInteger(data.subarray(6, 10));\n				tagSize += 10;\n				if (data[5] & 64) {\n					frameStart += 4;\n					frameStart += parseSyncSafeInteger(data.subarray(10, 14));\n					tagSize -= parseSyncSafeInteger(data.subarray(16, 20));\n				}\n				do {\n					frameSize = parseSyncSafeInteger(data.subarray(frameStart + 4, frameStart + 8));\n					if (frameSize < 1) break;\n					frameHeader = String.fromCharCode(data[frameStart], data[frameStart + 1], data[frameStart + 2], data[frameStart + 3]);\n					var frame = {\n						id: frameHeader,\n						data: data.subarray(frameStart + 10, frameStart + frameSize + 10)\n					};\n					frame.key = frame.id;\n					if (frameParsers[frame.id]) frameParsers[frame.id](frame);\n					else if (frame.id[0] === \"T\") frameParsers[\"T*\"](frame);\n					else if (frame.id[0] === \"W\") frameParsers[\"W*\"](frame);\n					frames.push(frame);\n					frameStart += 10;\n					frameStart += frameSize;\n				} while (frameStart < tagSize);\n				return frames;\n			},\n			parseSyncSafeInteger,\n			frameParsers\n		};\n	}));\n	//#endregion\n	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/m2ts/metadata-stream.js\n	/**\n	* mux.js\n	*\n	* Copyright (c) Brightcove\n	* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE\n	*\n	* Accepts program elementary stream (PES) data events and parses out\n	* ID3 metadata from them, if present.\n	* @see http://id3.org/id3v2.3.0\n	*/\n	var require_metadata_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {\n		var Stream = require_stream();\n		var StreamTypes = require_stream_types();\n		var id3 = require_parse_id3();\n		var _MetadataStream = function MetadataStream(options) {\n			var settings = { descriptor: options && options.descriptor }, tagSize = 0, buffer = [], bufferSize = 0, i;\n			_MetadataStream.prototype.init.call(this);\n			this.dispatchType = StreamTypes.METADATA_STREAM_TYPE.toString(16);\n			if (settings.descriptor) for (i = 0; i < settings.descriptor.length; i++) this.dispatchType += (\"00\" + settings.descriptor[i].toString(16)).slice(-2);\n			this.push = function(chunk) {\n				var tag, frameStart, frameSize, frame, i, frameHeader;\n				if (chunk.type !== \"timed-metadata\") return;\n				if (chunk.dataAlignmentIndicator) {\n					bufferSize = 0;\n					buffer.length = 0;\n				}\n				if (buffer.length === 0 && (chunk.data.length < 10 || chunk.data[0] !== \"I\".charCodeAt(0) || chunk.data[1] !== \"D\".charCodeAt(0) || chunk.data[2] !== \"3\".charCodeAt(0))) {\n					this.trigger(\"log\", {\n						level: \"warn\",\n						message: \"Skipping unrecognized metadata packet\"\n					});\n					return;\n				}\n				buffer.push(chunk);\n				bufferSize += chunk.data.byteLength;\n				if (buffer.length === 1) {\n					tagSize = id3.parseSyncSafeInteger(chunk.data.subarray(6, 10));\n					tagSize += 10;\n				}\n				if (bufferSize < tagSize) return;\n				tag = {\n					data: new Uint8Array(tagSize),\n					frames: [],\n					pts: buffer[0].pts,\n					dts: buffer[0].dts\n				};\n				for (i = 0; i < tagSize;) {\n					tag.data.set(buffer[0].data.subarray(0, tagSize - i), i);\n					i += buffer[0].data.byteLength;\n					bufferSize -= buffer[0].data.byteLength;\n					buffer.shift();\n				}\n				frameStart = 10;\n				if (tag.data[5] & 64) {\n					frameStart += 4;\n					frameStart += id3.parseSyncSafeInteger(tag.data.subarray(10, 14));\n					tagSize -= id3.parseSyncSafeInteger(tag.data.subarray(16, 20));\n				}\n				do {\n					frameSize = id3.parseSyncSafeInteger(tag.data.subarray(frameStart + 4, frameStart + 8));\n					if (frameSize < 1) {\n						this.trigger(\"log\", {\n							level: \"warn\",\n							message: \"Malformed ID3 frame encountered. Skipping remaining metadata parsing.\"\n						});\n						break;\n					}\n					frameHeader = String.fromCharCode(tag.data[frameStart], tag.data[frameStart + 1], tag.data[frameStart + 2], tag.data[frameStart + 3]);\n					frame = {\n						id: frameHeader,\n						data: tag.data.subarray(frameStart + 10, frameStart + frameSize + 10)\n					};\n					frame.key = frame.id;\n					if (id3.frameParsers[frame.id]) id3.frameParsers[frame.id](frame);\n					else if (frame.id[0] === \"T\") id3.frameParsers[\"T*\"](frame);\n					else if (frame.id[0] === \"W\") id3.frameParsers[\"W*\"](frame);\n					if (frame.owner === \"com.apple.streaming.transportStreamTimestamp\") {\n						var d = frame.data, size = (d[3] & 1) << 30 | d[4] << 22 | d[5] << 14 | d[6] << 6 | d[7] >>> 2;\n						size *= 4;\n						size += d[7] & 3;\n						frame.timeStamp = size;\n						if (tag.pts === void 0 && tag.dts === void 0) {\n							tag.pts = frame.timeStamp;\n							tag.dts = frame.timeStamp;\n						}\n						this.trigger(\"timestamp\", frame);\n					}\n					tag.frames.push(frame);\n					frameStart += 10;\n					frameStart += frameSize;\n				} while (frameStart < tagSize);\n				this.trigger(\"data\", tag);\n			};\n		};\n		_MetadataStream.prototype = new Stream();\n		module.exports = _MetadataStream;\n	}));\n	//#endregion\n	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/m2ts/m2ts.js\n	/**\n	* mux.js\n	*\n	* Copyright (c) Brightcove\n	* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE\n	*\n	* A stream-based mp2t to mp4 converter. This utility can be used to\n	* deliver mp4s to a SourceBuffer on platforms that support native\n	* Media Source Extensions.\n	*/\n	var require_m2ts = /* @__PURE__ */ __commonJSMin(((exports, module) => {\n		var Stream = require_stream();\n		var CaptionStream = require_caption_stream();\n		var StreamTypes = require_stream_types();\n		var TimestampRolloverStream = require_timestamp_rollover_stream().TimestampRolloverStream;\n		var _TransportPacketStream;\n		var _TransportParseStream;\n		var _ElementaryStream;\n		var MP2T_PACKET_LENGTH = 188;\n		var SYNC_BYTE = 71;\n		/**\n		* Splits an incoming stream of binary data into MPEG-2 Transport\n		* Stream packets.\n		*/\n		_TransportPacketStream = function TransportPacketStream() {\n			var buffer = new Uint8Array(MP2T_PACKET_LENGTH), bytesInBuffer = 0;\n			_TransportPacketStream.prototype.init.call(this);\n			/**\n			* Split a stream of data into M2TS packets\n			**/\n			this.push = function(bytes) {\n				var startIndex = 0, endIndex = MP2T_PACKET_LENGTH, everything;\n				if (bytesInBuffer) {\n					everything = new Uint8Array(bytes.byteLength + bytesInBuffer);\n					everything.set(buffer.subarray(0, bytesInBuffer));\n					everything.set(bytes, bytesInBuffer);\n					bytesInBuffer = 0;\n				} else everything = bytes;\n				while (endIndex < everything.byteLength) {\n					if (everything[startIndex] === SYNC_BYTE && everything[endIndex] === SYNC_BYTE) {\n						this.trigger(\"data\", everything.subarray(startIndex, endIndex));\n						startIndex += MP2T_PACKET_LENGTH;\n						endIndex += MP2T_PACKET_LENGTH;\n						continue;\n					}\n					startIndex++;\n					endIndex++;\n				}\n				if (startIndex < everything.byteLength) {\n					buffer.set(everything.subarray(startIndex), 0);\n					bytesInBuffer = everything.byteLength - startIndex;\n				}\n			};\n			/**\n			* Passes identified M2TS packets to the TransportParseStream to be parsed\n			**/\n			this.flush = function() {\n				if (bytesInBuffer === MP2T_PACKET_LENGTH && buffer[0] === SYNC_BYTE) {\n					this.trigger(\"data\", buffer);\n					bytesInBuffer = 0;\n				}\n				this.trigger(\"done\");\n			};\n			this.endTimeline = function() {\n				this.flush();\n				this.trigger(\"endedtimeline\");\n			};\n			this.reset = function() {\n				bytesInBuffer = 0;\n				this.trigger(\"reset\");\n			};\n		};\n		_TransportPacketStream.prototype = new Stream();\n		/**\n		* Accepts an MP2T TransportPacketStream and emits data events with parsed\n		* forms of the individual transport stream packets.\n		*/\n		_TransportParseStream = function TransportParseStream() {\n			var parsePsi, parsePat, parsePmt, self;\n			_TransportParseStream.prototype.init.call(this);\n			self = this;\n			this.packetsWaitingForPmt = [];\n			this.programMapTable = void 0;\n			parsePsi = function parsePsi(payload, psi) {\n				var offset = 0;\n				if (psi.payloadUnitStartIndicator) offset += payload[offset] + 1;\n				if (psi.type === \"pat\") parsePat(payload.subarray(offset), psi);\n				else parsePmt(payload.subarray(offset), psi);\n			};\n			parsePat = function parsePat(payload, pat) {\n				pat.section_number = payload[7];\n				pat.last_section_number = payload[8];\n				self.pmtPid = (payload[10] & 31) << 8 | payload[11];\n				pat.pmtPid = self.pmtPid;\n			};\n			/**\n			* Parse out the relevant fields of a Program Map Table (PMT).\n			* @param payload {Uint8Array} the PMT-specific portion of an MP2T\n			* packet. The first byte in this array should be the table_id\n			* field.\n			* @param pmt {object} the object that should be decorated with\n			* fields parsed from the PMT.\n			*/\n			parsePmt = function parsePmt(payload, pmt) {\n				var sectionLength, tableEnd, programInfoLength, offset;\n				if (!(payload[5] & 1)) return;\n				self.programMapTable = {\n					video: null,\n					audio: null,\n					\"timed-metadata\": {}\n				};\n				sectionLength = (payload[1] & 15) << 8 | payload[2];\n				tableEnd = 3 + sectionLength - 4;\n				programInfoLength = (payload[10] & 15) << 8 | payload[11];\n				offset = 12 + programInfoLength;\n				while (offset < tableEnd) {\n					var streamType = payload[offset];\n					var pid = (payload[offset + 1] & 31) << 8 | payload[offset + 2];\n					if (streamType === StreamTypes.H264_STREAM_TYPE && self.programMapTable.video === null) self.programMapTable.video = pid;\n					else if (streamType === StreamTypes.ADTS_STREAM_TYPE && self.programMapTable.audio === null) self.programMapTable.audio = pid;\n					else if (streamType === StreamTypes.METADATA_STREAM_TYPE) self.programMapTable[\"timed-metadata\"][pid] = streamType;\n					offset += ((payload[offset + 3] & 15) << 8 | payload[offset + 4]) + 5;\n				}\n				pmt.programMapTable = self.programMapTable;\n			};\n			/**\n			* Deliver a new MP2T packet to the next stream in the pipeline.\n			*/\n			this.push = function(packet) {\n				var result = {}, offset = 4;\n				result.payloadUnitStartIndicator = !!(packet[1] & 64);\n				result.pid = packet[1] & 31;\n				result.pid <<= 8;\n				result.pid |= packet[2];\n				if ((packet[3] & 48) >>> 4 > 1) offset += packet[offset] + 1;\n				if (result.pid === 0) {\n					result.type = \"pat\";\n					parsePsi(packet.subarray(offset), result);\n					this.trigger(\"data\", result);\n				} else if (result.pid === this.pmtPid) {\n					result.type = \"pmt\";\n					parsePsi(packet.subarray(offset), result);\n					this.trigger(\"data\", result);\n					while (this.packetsWaitingForPmt.length) this.processPes_.apply(this, this.packetsWaitingForPmt.shift());\n				} else if (this.programMapTable === void 0) this.packetsWaitingForPmt.push([\n					packet,\n					offset,\n					result\n				]);\n				else this.processPes_(packet, offset, result);\n			};\n			this.processPes_ = function(packet, offset, result) {\n				if (result.pid === this.programMapTable.video) result.streamType = StreamTypes.H264_STREAM_TYPE;\n				else if (result.pid === this.programMapTable.audio) result.streamType = StreamTypes.ADTS_STREAM_TYPE;\n				else result.streamType = this.programMapTable[\"timed-metadata\"][result.pid];\n				result.type = \"pes\";\n				result.data = packet.subarray(offset);\n				this.trigger(\"data\", result);\n			};\n		};\n		_TransportParseStream.prototype = new Stream();\n		_TransportParseStream.STREAM_TYPES = {\n			h264: 27,\n			adts: 15\n		};\n		/**\n		* Reconsistutes program elementary stream (PES) packets from parsed\n		* transport stream packets. That is, if you pipe an\n		* mp2t.TransportParseStream into a mp2t.ElementaryStream, the output\n		* events will be events which capture the bytes for individual PES\n		* packets plus relevant metadata that has been extracted from the\n		* container.\n		*/\n		_ElementaryStream = function ElementaryStream() {\n			var self = this, segmentHadPmt = false, video = {\n				data: [],\n				size: 0\n			}, audio = {\n				data: [],\n				size: 0\n			}, timedMetadata = {\n				data: [],\n				size: 0\n			}, programMapTable, parsePes = function parsePes(payload, pes) {\n				var ptsDtsFlags;\n				var startPrefix = payload[0] << 16 | payload[1] << 8 | payload[2];\n				pes.data = /* @__PURE__ */ new Uint8Array();\n				if (startPrefix !== 1) return;\n				pes.packetLength = 6 + (payload[4] << 8 | payload[5]);\n				pes.dataAlignmentIndicator = (payload[6] & 4) !== 0;\n				ptsDtsFlags = payload[7];\n				if (ptsDtsFlags & 192) {\n					pes.pts = (payload[9] & 14) << 27 | (payload[10] & 255) << 20 | (payload[11] & 254) << 12 | (payload[12] & 255) << 5 | (payload[13] & 254) >>> 3;\n					pes.pts *= 4;\n					pes.pts += (payload[13] & 6) >>> 1;\n					pes.dts = pes.pts;\n					if (ptsDtsFlags & 64) {\n						pes.dts = (payload[14] & 14) << 27 | (payload[15] & 255) << 20 | (payload[16] & 254) << 12 | (payload[17] & 255) << 5 | (payload[18] & 254) >>> 3;\n						pes.dts *= 4;\n						pes.dts += (payload[18] & 6) >>> 1;\n					}\n				}\n				pes.data = payload.subarray(9 + payload[8]);\n			}, flushStream = function flushStream(stream, type, forceFlush) {\n				var packetData = new Uint8Array(stream.size), event = { type }, i = 0, offset = 0, packetFlushable = false, fragment;\n				if (!stream.data.length || stream.size < 9) return;\n				event.trackId = stream.data[0].pid;\n				for (i = 0; i < stream.data.length; i++) {\n					fragment = stream.data[i];\n					packetData.set(fragment.data, offset);\n					offset += fragment.data.byteLength;\n				}\n				parsePes(packetData, event);\n				packetFlushable = type === \"video\" || event.packetLength <= stream.size;\n				if (forceFlush || packetFlushable) {\n					stream.size = 0;\n					stream.data.length = 0;\n				}\n				if (packetFlushable) self.trigger(\"data\", event);\n			};\n			_ElementaryStream.prototype.init.call(this);\n			/**\n			* Identifies M2TS packet types and parses PES packets using metadata\n			* parsed from the PMT\n			**/\n			this.push = function(data) {\n				({\n					pat: function pat() {},\n					pes: function pes() {\n						var stream, streamType;\n						switch (data.streamType) {\n							case StreamTypes.H264_STREAM_TYPE:\n								stream = video;\n								streamType = \"video\";\n								break;\n							case StreamTypes.ADTS_STREAM_TYPE:\n								stream = audio;\n								streamType = \"audio\";\n								break;\n							case StreamTypes.METADATA_STREAM_TYPE:\n								stream = timedMetadata;\n								streamType = \"timed-metadata\";\n								break;\n							default: return;\n						}\n						if (data.payloadUnitStartIndicator) flushStream(stream, streamType, true);\n						stream.data.push(data);\n						stream.size += data.data.byteLength;\n					},\n					pmt: function pmt() {\n						var event = {\n							type: \"metadata\",\n							tracks: []\n						};\n						programMapTable = data.programMapTable;\n						if (programMapTable.video !== null) event.tracks.push({\n							timelineStartInfo: { baseMediaDecodeTime: 0 },\n							id: +programMapTable.video,\n							codec: \"avc\",\n							type: \"video\"\n						});\n						if (programMapTable.audio !== null) event.tracks.push({\n							timelineStartInfo: { baseMediaDecodeTime: 0 },\n							id: +programMapTable.audio,\n							codec: \"adts\",\n							type: \"audio\"\n						});\n						segmentHadPmt = true;\n						self.trigger(\"data\", event);\n					}\n				})[data.type]();\n			};\n			this.reset = function() {\n				video.size = 0;\n				video.data.length = 0;\n				audio.size = 0;\n				audio.data.length = 0;\n				this.trigger(\"reset\");\n			};\n			/**\n			* Flush any remaining input. Video PES packets may be of variable\n			* length. Normally, the start of a new video packet can trigger the\n			* finalization of the previous packet. That is not possible if no\n			* more video is forthcoming, however. In that case, some other\n			* mechanism (like the end of the file) has to be employed. When it is\n			* clear that no additional data is forthcoming, calling this method\n			* will flush the buffered packets.\n			*/\n			this.flushStreams_ = function() {\n				flushStream(video, \"video\");\n				flushStream(audio, \"audio\");\n				flushStream(timedMetadata, \"timed-metadata\");\n			};\n			this.flush = function() {\n				if (!segmentHadPmt && programMapTable) {\n					var pmt = {\n						type: \"metadata\",\n						tracks: []\n					};\n					if (programMapTable.video !== null) pmt.tracks.push({\n						timelineStartInfo: { baseMediaDecodeTime: 0 },\n						id: +programMapTable.video,\n						codec: \"avc\",\n						type: \"video\"\n					});\n					if (programMapTable.audio !== null) pmt.tracks.push({\n						timelineStartInfo: { baseMediaDecodeTime: 0 },\n						id: +programMapTable.audio,\n						codec: \"adts\",\n						type: \"audio\"\n					});\n					self.trigger(\"data\", pmt);\n				}\n				segmentHadPmt = false;\n				this.flushStreams_();\n				this.trigger(\"done\");\n			};\n		};\n		_ElementaryStream.prototype = new Stream();\n		var m2ts = {\n			PAT_PID: 0,\n			MP2T_PACKET_LENGTH,\n			TransportPacketStream: _TransportPacketStream,\n			TransportParseStream: _TransportParseStream,\n			ElementaryStream: _ElementaryStream,\n			TimestampRolloverStream,\n			CaptionStream: CaptionStream.CaptionStream,\n			Cea608Stream: CaptionStream.Cea608Stream,\n			Cea708Stream: CaptionStream.Cea708Stream,\n			MetadataStream: require_metadata_stream()\n		};\n		for (var type in StreamTypes) if (StreamTypes.hasOwnProperty(type)) m2ts[type] = StreamTypes[type];\n		module.exports = m2ts;\n	}));\n	//#endregion\n	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/codecs/adts.js\n	/**\n	* mux.js\n	*\n	* Copyright (c) Brightcove\n	* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE\n	*/\n	var require_adts = /* @__PURE__ */ __commonJSMin(((exports, module) => {\n		var Stream = require_stream();\n		var ONE_SECOND_IN_TS = require_clock().ONE_SECOND_IN_TS;\n		var _AdtsStream;\n		var ADTS_SAMPLING_FREQUENCIES = [\n			96e3,\n			88200,\n			64e3,\n			48e3,\n			44100,\n			32e3,\n			24e3,\n			22050,\n			16e3,\n			12e3,\n			11025,\n			8e3,\n			7350\n		];\n		_AdtsStream = function AdtsStream(handlePartialSegments) {\n			var buffer, frameNum = 0;\n			_AdtsStream.prototype.init.call(this);\n			this.skipWarn_ = function(start, end) {\n				this.trigger(\"log\", {\n					level: \"warn\",\n					message: \"adts skiping bytes \" + start + \" to \" + end + \" in frame \" + frameNum + \" outside syncword\"\n				});\n			};\n			this.push = function(packet) {\n				var i = 0, frameLength, protectionSkipBytes, oldBuffer, sampleCount, adtsFrameDuration;\n				if (!handlePartialSegments) frameNum = 0;\n				if (packet.type !== \"audio\") return;\n				if (buffer && buffer.length) {\n					oldBuffer = buffer;\n					buffer = new Uint8Array(oldBuffer.byteLength + packet.data.byteLength);\n					buffer.set(oldBuffer);\n					buffer.set(packet.data, oldBuffer.byteLength);\n				} else buffer = packet.data;\n				var skip;\n				while (i + 7 < buffer.length) {\n					if (buffer[i] !== 255 || (buffer[i + 1] & 246) !== 240) {\n						if (typeof skip !== \"number\") skip = i;\n						i++;\n						continue;\n					}\n					if (typeof skip === \"number\") {\n						this.skipWarn_(skip, i);\n						skip = null;\n					}\n					protectionSkipBytes = (~buffer[i + 1] & 1) * 2;\n					frameLength = (buffer[i + 3] & 3) << 11 | buffer[i + 4] << 3 | (buffer[i + 5] & 224) >> 5;\n					sampleCount = ((buffer[i + 6] & 3) + 1) * 1024;\n					adtsFrameDuration = sampleCount * ONE_SECOND_IN_TS / ADTS_SAMPLING_FREQUENCIES[(buffer[i + 2] & 60) >>> 2];\n					if (buffer.byteLength - i < frameLength) break;\n					this.trigger(\"data\", {\n						pts: packet.pts + frameNum * adtsFrameDuration,\n						dts: packet.dts + frameNum * adtsFrameDuration,\n						sampleCount,\n						audioobjecttype: (buffer[i + 2] >>> 6 & 3) + 1,\n						channelcount: (buffer[i + 2] & 1) << 2 | (buffer[i + 3] & 192) >>> 6,\n						samplerate: ADTS_SAMPLING_FREQUENCIES[(buffer[i + 2] & 60) >>> 2],\n						samplingfrequencyindex: (buffer[i + 2] & 60) >>> 2,\n						samplesize: 16,\n						data: buffer.subarray(i + 7 + protectionSkipBytes, i + frameLength)\n					});\n					frameNum++;\n					i += frameLength;\n				}\n				if (typeof skip === \"number\") {\n					this.skipWarn_(skip, i);\n					skip = null;\n				}\n				buffer = buffer.subarray(i);\n			};\n			this.flush = function() {\n				frameNum = 0;\n				this.trigger(\"done\");\n			};\n			this.reset = function() {\n				buffer = void 0;\n				this.trigger(\"reset\");\n			};\n			this.endTimeline = function() {\n				buffer = void 0;\n				this.trigger(\"endedtimeline\");\n			};\n		};\n		_AdtsStream.prototype = new Stream();\n		module.exports = _AdtsStream;\n	}));\n	//#endregion\n	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/utils/exp-golomb.js\n	/**\n	* mux.js\n	*\n	* Copyright (c) Brightcove\n	* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE\n	*/\n	var require_exp_golomb = /* @__PURE__ */ __commonJSMin(((exports, module) => {\n		module.exports = function ExpGolomb(workingData) {\n			var workingBytesAvailable = workingData.byteLength, workingWord = 0, workingBitsAvailable = 0;\n			this.length = function() {\n				return 8 * workingBytesAvailable;\n			};\n			this.bitsAvailable = function() {\n				return 8 * workingBytesAvailable + workingBitsAvailable;\n			};\n			this.loadWord = function() {\n				var position = workingData.byteLength - workingBytesAvailable, workingBytes = /* @__PURE__ */ new Uint8Array(4), availableBytes = Math.min(4, workingBytesAvailable);\n				if (availableBytes === 0) throw new Error(\"no bytes available\");\n				workingBytes.set(workingData.subarray(position, position + availableBytes));\n				workingWord = new DataView(workingBytes.buffer).getUint32(0);\n				workingBitsAvailable = availableBytes * 8;\n				workingBytesAvailable -= availableBytes;\n			};\n			this.skipBits = function(count) {\n				var skipBytes;\n				if (workingBitsAvailable > count) {\n					workingWord <<= count;\n					workingBitsAvailable -= count;\n				} else {\n					count -= workingBitsAvailable;\n					skipBytes = Math.floor(count / 8);\n					count -= skipBytes * 8;\n					workingBytesAvailable -= skipBytes;\n					this.loadWord();\n					workingWord <<= count;\n					workingBitsAvailable -= count;\n				}\n			};\n			this.readBits = function(size) {\n				var bits = Math.min(workingBitsAvailable, size), valu = workingWord >>> 32 - bits;\n				workingBitsAvailable -= bits;\n				if (workingBitsAvailable > 0) workingWord <<= bits;\n				else if (workingBytesAvailable > 0) this.loadWord();\n				bits = size - bits;\n				if (bits > 0) return valu << bits | this.readBits(bits);\n				return valu;\n			};\n			this.skipLeadingZeros = function() {\n				var leadingZeroCount;\n				for (leadingZeroCount = 0; leadingZeroCount < workingBitsAvailable; ++leadingZeroCount) if ((workingWord & 2147483648 >>> leadingZeroCount) !== 0) {\n					workingWord <<= leadingZeroCount;\n					workingBitsAvailable -= leadingZeroCount;\n					return leadingZeroCount;\n				}\n				this.loadWord();\n				return leadingZeroCount + this.skipLeadingZeros();\n			};\n			this.skipUnsignedExpGolomb = function() {\n				this.skipBits(1 + this.skipLeadingZeros());\n			};\n			this.skipExpGolomb = function() {\n				this.skipBits(1 + this.skipLeadingZeros());\n			};\n			this.readUnsignedExpGolomb = function() {\n				var clz = this.skipLeadingZeros();\n				return this.readBits(clz + 1) - 1;\n			};\n			this.readExpGolomb = function() {\n				var valu = this.readUnsignedExpGolomb();\n				if (1 & valu) return 1 + valu >>> 1;\n				return -1 * (valu >>> 1);\n			};\n			this.readBoolean = function() {\n				return this.readBits(1) === 1;\n			};\n			this.readUnsignedByte = function() {\n				return this.readBits(8);\n			};\n			this.loadWord();\n		};\n	}));\n	//#endregion\n	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/codecs/h264.js\n	/**\n	* mux.js\n	*\n	* Copyright (c) Brightcove\n	* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE\n	*/\n	var require_h264 = /* @__PURE__ */ __commonJSMin(((exports, module) => {\n		var Stream = require_stream();\n		var ExpGolomb = require_exp_golomb();\n		var _H264Stream;\n		var _NalByteStream;\n		var PROFILES_WITH_OPTIONAL_SPS_DATA;\n		/**\n		* Accepts a NAL unit byte stream and unpacks the embedded NAL units.\n		*/\n		_NalByteStream = function NalByteStream() {\n			var syncPoint = 0, i, buffer;\n			_NalByteStream.prototype.init.call(this);\n			this.push = function(data) {\n				var swapBuffer;\n				if (!buffer) buffer = data.data;\n				else {\n					swapBuffer = new Uint8Array(buffer.byteLength + data.data.byteLength);\n					swapBuffer.set(buffer);\n					swapBuffer.set(data.data, buffer.byteLength);\n					buffer = swapBuffer;\n				}\n				var len = buffer.byteLength;\n				for (; syncPoint < len - 3; syncPoint++) if (buffer[syncPoint + 2] === 1) {\n					i = syncPoint + 5;\n					break;\n				}\n				while (i < len) switch (buffer[i]) {\n					case 0:\n						if (buffer[i - 1] !== 0) {\n							i += 2;\n							break;\n						} else if (buffer[i - 2] !== 0) {\n							i++;\n							break;\n						}\n						if (syncPoint + 3 !== i - 2) this.trigger(\"data\", buffer.subarray(syncPoint + 3, i - 2));\n						do\n							i++;\n						while (buffer[i] !== 1 && i < len);\n						syncPoint = i - 2;\n						i += 3;\n						break;\n					case 1:\n						if (buffer[i - 1] !== 0 || buffer[i - 2] !== 0) {\n							i += 3;\n							break;\n						}\n						this.trigger(\"data\", buffer.subarray(syncPoint + 3, i - 2));\n						syncPoint = i - 2;\n						i += 3;\n						break;\n					default:\n						i += 3;\n						break;\n				}\n				buffer = buffer.subarray(syncPoint);\n				i -= syncPoint;\n				syncPoint = 0;\n			};\n			this.reset = function() {\n				buffer = null;\n				syncPoint = 0;\n				this.trigger(\"reset\");\n			};\n			this.flush = function() {\n				if (buffer && buffer.byteLength > 3) this.trigger(\"data\", buffer.subarray(syncPoint + 3));\n				buffer = null;\n				syncPoint = 0;\n				this.trigger(\"done\");\n			};\n			this.endTimeline = function() {\n				this.flush();\n				this.trigger(\"endedtimeline\");\n			};\n		};\n		_NalByteStream.prototype = new Stream();\n		PROFILES_WITH_OPTIONAL_SPS_DATA = {\n			100: true,\n			110: true,\n			122: true,\n			244: true,\n			44: true,\n			83: true,\n			86: true,\n			118: true,\n			128: true,\n			138: true,\n			139: true,\n			134: true\n		};\n		/**\n		* Accepts input from a ElementaryStream and produces H.264 NAL unit data\n		* events.\n		*/\n		_H264Stream = function H264Stream() {\n			var nalByteStream = new _NalByteStream(), self, trackId, currentPts, currentDts, discardEmulationPreventionBytes, readSequenceParameterSet, skipScalingList;\n			_H264Stream.prototype.init.call(this);\n			self = this;\n			this.push = function(packet) {\n				if (packet.type !== \"video\") return;\n				trackId = packet.trackId;\n				currentPts = packet.pts;\n				currentDts = packet.dts;\n				nalByteStream.push(packet);\n			};\n			nalByteStream.on(\"data\", function(data) {\n				var event = {\n					trackId,\n					pts: currentPts,\n					dts: currentDts,\n					data,\n					nalUnitTypeCode: data[0] & 31\n				};\n				switch (event.nalUnitTypeCode) {\n					case 5:\n						event.nalUnitType = \"slice_layer_without_partitioning_rbsp_idr\";\n						break;\n					case 6:\n						event.nalUnitType = \"sei_rbsp\";\n						event.escapedRBSP = discardEmulationPreventionBytes(data.subarray(1));\n						break;\n					case 7:\n						event.nalUnitType = \"seq_parameter_set_rbsp\";\n						event.escapedRBSP = discardEmulationPreventionBytes(data.subarray(1));\n						event.config = readSequenceParameterSet(event.escapedRBSP);\n						break;\n					case 8:\n						event.nalUnitType = \"pic_parameter_set_rbsp\";\n						break;\n					case 9:\n						event.nalUnitType = \"access_unit_delimiter_rbsp\";\n						break;\n					default: break;\n				}\n				self.trigger(\"data\", event);\n			});\n			nalByteStream.on(\"done\", function() {\n				self.trigger(\"done\");\n			});\n			nalByteStream.on(\"partialdone\", function() {\n				self.trigger(\"partialdone\");\n			});\n			nalByteStream.on(\"reset\", function() {\n				self.trigger(\"reset\");\n			});\n			nalByteStream.on(\"endedtimeline\", function() {\n				self.trigger(\"endedtimeline\");\n			});\n			this.flush = function() {\n				nalByteStream.flush();\n			};\n			this.partialFlush = function() {\n				nalByteStream.partialFlush();\n			};\n			this.reset = function() {\n				nalByteStream.reset();\n			};\n			this.endTimeline = function() {\n				nalByteStream.endTimeline();\n			};\n			/**\n			* Advance the ExpGolomb decoder past a scaling list. The scaling\n			* list is optionally transmitted as part of a sequence parameter\n			* set and is not relevant to transmuxing.\n			* @param count {number} the number of entries in this scaling list\n			* @param expGolombDecoder {object} an ExpGolomb pointed to the\n			* start of a scaling list\n			* @see Recommendation ITU-T H.264, Section 7.3.2.1.1.1\n			*/\n			skipScalingList = function skipScalingList(count, expGolombDecoder) {\n				var lastScale = 8, nextScale = 8, j, deltaScale;\n				for (j = 0; j < count; j++) {\n					if (nextScale !== 0) {\n						deltaScale = expGolombDecoder.readExpGolomb();\n						nextScale = (lastScale + deltaScale + 256) % 256;\n					}\n					lastScale = nextScale === 0 ? lastScale : nextScale;\n				}\n			};\n			/**\n			* Expunge any \"Emulation Prevention\" bytes from a \"Raw Byte\n			* Sequence Payload\"\n			* @param data {Uint8Array} the bytes of a RBSP from a NAL\n			* unit\n			* @return {Uint8Array} the RBSP without any Emulation\n			* Prevention Bytes\n			*/\n			discardEmulationPreventionBytes = function discardEmulationPreventionBytes(data) {\n				var length = data.byteLength, emulationPreventionBytesPositions = [], i = 1, newLength, newData;\n				while (i < length - 2) if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 3) {\n					emulationPreventionBytesPositions.push(i + 2);\n					i += 2;\n				} else i++;\n				if (emulationPreventionBytesPositions.length === 0) return data;\n				newLength = length - emulationPreventionBytesPositions.length;\n				newData = new Uint8Array(newLength);\n				var sourceIndex = 0;\n				for (i = 0; i < newLength; sourceIndex++, i++) {\n					if (sourceIndex === emulationPreventionBytesPositions[0]) {\n						sourceIndex++;\n						emulationPreventionBytesPositions.shift();\n					}\n					newData[i] = data[sourceIndex];\n				}\n				return newData;\n			};\n			/**\n			* Read a sequence parameter set and return some interesting video\n			* properties. A sequence parameter set is the H264 metadata that\n			* describes the properties of upcoming video frames.\n			* @param data {Uint8Array} the bytes of a sequence parameter set\n			* @return {object} an object with configuration parsed from the\n			* sequence parameter set, including the dimensions of the\n			* associated video frames.\n			*/\n			readSequenceParameterSet = function readSequenceParameterSet(data) {\n				var frameCropLeftOffset = 0, frameCropRightOffset = 0, frameCropTopOffset = 0, frameCropBottomOffset = 0, expGolombDecoder, profileIdc, levelIdc, profileCompatibility, chromaFormatIdc, picOrderCntType, numRefFramesInPicOrderCntCycle, picWidthInMbsMinus1, picHeightInMapUnitsMinus1, frameMbsOnlyFlag, scalingListCount, sarRatio = [1, 1], aspectRatioIdc, i;\n				expGolombDecoder = new ExpGolomb(data);\n				profileIdc = expGolombDecoder.readUnsignedByte();\n				profileCompatibility = expGolombDecoder.readUnsignedByte();\n				levelIdc = expGolombDecoder.readUnsignedByte();\n				expGolombDecoder.skipUnsignedExpGolomb();\n				if (PROFILES_WITH_OPTIONAL_SPS_DATA[profileIdc]) {\n					chromaFormatIdc = expGolombDecoder.readUnsignedExpGolomb();\n					if (chromaFormatIdc === 3) expGolombDecoder.skipBits(1);\n					expGolombDecoder.skipUnsignedExpGolomb();\n					expGolombDecoder.skipUnsignedExpGolomb();\n					expGolombDecoder.skipBits(1);\n					if (expGolombDecoder.readBoolean()) {\n						scalingListCount = chromaFormatIdc !== 3 ? 8 : 12;\n						for (i = 0; i < scalingListCount; i++) if (expGolombDecoder.readBoolean()) if (i < 6) skipScalingList(16, expGolombDecoder);\n						else skipScalingList(64, expGolombDecoder);\n					}\n				}\n				expGolombDecoder.skipUnsignedExpGolomb();\n				picOrderCntType = expGolombDecoder.readUnsignedExpGolomb();\n				if (picOrderCntType === 0) expGolombDecoder.readUnsignedExpGolomb();\n				else if (picOrderCntType === 1) {\n					expGolombDecoder.skipBits(1);\n					expGolombDecoder.skipExpGolomb();\n					expGolombDecoder.skipExpGolomb();\n					numRefFramesInPicOrderCntCycle = expGolombDecoder.readUnsignedExpGolomb();\n					for (i = 0; i < numRefFramesInPicOrderCntCycle; i++) expGolombDecoder.skipExpGolomb();\n				}\n				expGolombDecoder.skipUnsignedExpGolomb();\n				expGolombDecoder.skipBits(1);\n				picWidthInMbsMinus1 = expGolombDecoder.readUnsignedExpGolomb();\n				picHeightInMapUnitsMinus1 = expGolombDecoder.readUnsignedExpGolomb();\n				frameMbsOnlyFlag = expGolombDecoder.readBits(1);\n				if (frameMbsOnlyFlag === 0) expGolombDecoder.skipBits(1);\n				expGolombDecoder.skipBits(1);\n				if (expGolombDecoder.readBoolean()) {\n					frameCropLeftOffset = expGolombDecoder.readUnsignedExpGolomb();\n					frameCropRightOffset = expGolombDecoder.readUnsignedExpGolomb();\n					frameCropTopOffset = expGolombDecoder.readUnsignedExpGolomb();\n					frameCropBottomOffset = expGolombDecoder.readUnsignedExpGolomb();\n				}\n				if (expGolombDecoder.readBoolean()) {\n					if (expGolombDecoder.readBoolean()) {\n						aspectRatioIdc = expGolombDecoder.readUnsignedByte();\n						switch (aspectRatioIdc) {\n							case 1:\n								sarRatio = [1, 1];\n								break;\n							case 2:\n								sarRatio = [12, 11];\n								break;\n							case 3:\n								sarRatio = [10, 11];\n								break;\n							case 4:\n								sarRatio = [16, 11];\n								break;\n							case 5:\n								sarRatio = [40, 33];\n								break;\n							case 6:\n								sarRatio = [24, 11];\n								break;\n							case 7:\n								sarRatio = [20, 11];\n								break;\n							case 8:\n								sarRatio = [32, 11];\n								break;\n							case 9:\n								sarRatio = [80, 33];\n								break;\n							case 10:\n								sarRatio = [18, 11];\n								break;\n							case 11:\n								sarRatio = [15, 11];\n								break;\n							case 12:\n								sarRatio = [64, 33];\n								break;\n							case 13:\n								sarRatio = [160, 99];\n								break;\n							case 14:\n								sarRatio = [4, 3];\n								break;\n							case 15:\n								sarRatio = [3, 2];\n								break;\n							case 16:\n								sarRatio = [2, 1];\n								break;\n							case 255:\n								sarRatio = [expGolombDecoder.readUnsignedByte() << 8 | expGolombDecoder.readUnsignedByte(), expGolombDecoder.readUnsignedByte() << 8 | expGolombDecoder.readUnsignedByte()];\n								break;\n						}\n						if (sarRatio) sarRatio[0] / sarRatio[1];\n					}\n				}\n				return {\n					profileIdc,\n					levelIdc,\n					profileCompatibility,\n					width: (picWidthInMbsMinus1 + 1) * 16 - frameCropLeftOffset * 2 - frameCropRightOffset * 2,\n					height: (2 - frameMbsOnlyFlag) * (picHeightInMapUnitsMinus1 + 1) * 16 - frameCropTopOffset * 2 - frameCropBottomOffset * 2,\n					sarRatio\n				};\n			};\n		};\n		_H264Stream.prototype = new Stream();\n		module.exports = {\n			H264Stream: _H264Stream,\n			NalByteStream: _NalByteStream\n		};\n	}));\n	//#endregion\n	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/aac/utils.js\n	/**\n	* mux.js\n	*\n	* Copyright (c) Brightcove\n	* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE\n	*\n	* Utilities to detect basic properties and metadata about Aac data.\n	*/\n	var require_utils = /* @__PURE__ */ __commonJSMin(((exports, module) => {\n		var ADTS_SAMPLING_FREQUENCIES = [\n			96e3,\n			88200,\n			64e3,\n			48e3,\n			44100,\n			32e3,\n			24e3,\n			22050,\n			16e3,\n			12e3,\n			11025,\n			8e3,\n			7350\n		];\n		var parseId3TagSize = function parseId3TagSize(header, byteIndex) {\n			var returnSize = header[byteIndex + 6] << 21 | header[byteIndex + 7] << 14 | header[byteIndex + 8] << 7 | header[byteIndex + 9], footerPresent = (header[byteIndex + 5] & 16) >> 4;\n			returnSize = returnSize >= 0 ? returnSize : 0;\n			if (footerPresent) return returnSize + 20;\n			return returnSize + 10;\n		};\n		var getId3Offset = function getId3Offset(data, offset) {\n			if (data.length - offset < 10 || data[offset] !== \"I\".charCodeAt(0) || data[offset + 1] !== \"D\".charCodeAt(0) || data[offset + 2] !== \"3\".charCodeAt(0)) return offset;\n			offset += parseId3TagSize(data, offset);\n			return getId3Offset(data, offset);\n		};\n		var isLikelyAacData = function isLikelyAacData(data) {\n			var offset = getId3Offset(data, 0);\n			return data.length >= offset + 2 && (data[offset] & 255) === 255 && (data[offset + 1] & 240) === 240 && (data[offset + 1] & 22) === 16;\n		};\n		var parseSyncSafeInteger = function parseSyncSafeInteger(data) {\n			return data[0] << 21 | data[1] << 14 | data[2] << 7 | data[3];\n		};\n		var percentEncode = function percentEncode(bytes, start, end) {\n			var i, result = \"\";\n			for (i = start; i < end; i++) result += \"%\" + (\"00\" + bytes[i].toString(16)).slice(-2);\n			return result;\n		};\n		var parseIso88591 = function parseIso88591(bytes, start, end) {\n			return unescape(percentEncode(bytes, start, end));\n		};\n		module.exports = {\n			isLikelyAacData,\n			parseId3TagSize,\n			parseAdtsSize: function parseAdtsSize(header, byteIndex) {\n				var lowThree = (header[byteIndex + 5] & 224) >> 5, middle = header[byteIndex + 4] << 3;\n				return header[byteIndex + 3] & 6144 | middle | lowThree;\n			},\n			parseType: function parseType(header, byteIndex) {\n				if (header[byteIndex] === \"I\".charCodeAt(0) && header[byteIndex + 1] === \"D\".charCodeAt(0) && header[byteIndex + 2] === \"3\".charCodeAt(0)) return \"timed-metadata\";\n				else if (header[byteIndex] & true && (header[byteIndex + 1] & 240) === 240) return \"audio\";\n				return null;\n			},\n			parseSampleRate: function parseSampleRate(packet) {\n				var i = 0;\n				while (i + 5 < packet.length) {\n					if (packet[i] !== 255 || (packet[i + 1] & 246) !== 240) {\n						i++;\n						continue;\n					}\n					return ADTS_SAMPLING_FREQUENCIES[(packet[i + 2] & 60) >>> 2];\n				}\n				return null;\n			},\n			parseAacTimestamp: function parseAacTimestamp(packet) {\n				var frameStart = 10, frameSize, frame, frameHeader;\n				if (packet[5] & 64) {\n					frameStart += 4;\n					frameStart += parseSyncSafeInteger(packet.subarray(10, 14));\n				}\n				do {\n					frameSize = parseSyncSafeInteger(packet.subarray(frameStart + 4, frameStart + 8));\n					if (frameSize < 1) return null;\n					frameHeader = String.fromCharCode(packet[frameStart], packet[frameStart + 1], packet[frameStart + 2], packet[frameStart + 3]);\n					if (frameHeader === \"PRIV\") {\n						frame = packet.subarray(frameStart + 10, frameStart + frameSize + 10);\n						for (var i = 0; i < frame.byteLength; i++) if (frame[i] === 0) {\n							if (parseIso88591(frame, 0, i) === \"com.apple.streaming.transportStreamTimestamp\") {\n								var d = frame.subarray(i + 1);\n								var size = (d[3] & 1) << 30 | d[4] << 22 | d[5] << 14 | d[6] << 6 | d[7] >>> 2;\n								size *= 4;\n								size += d[7] & 3;\n								return size;\n							}\n							break;\n						}\n					}\n					frameStart += 10;\n					frameStart += frameSize;\n				} while (frameStart < packet.byteLength);\n				return null;\n			}\n		};\n	}));\n	//#endregion\n	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/aac/index.js\n	/**\n	* mux.js\n	*\n	* Copyright (c) Brightcove\n	* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE\n	*\n	* A stream-based aac to mp4 converter. This utility can be used to\n	* deliver mp4s to a SourceBuffer on platforms that support native\n	* Media Source Extensions.\n	*/\n	var require_aac = /* @__PURE__ */ __commonJSMin(((exports, module) => {\n		var Stream = require_stream();\n		var aacUtils = require_utils();\n		var _AacStream = function AacStream() {\n			var everything = /* @__PURE__ */ new Uint8Array(), timeStamp = 0;\n			_AacStream.prototype.init.call(this);\n			this.setTimestamp = function(timestamp) {\n				timeStamp = timestamp;\n			};\n			this.push = function(bytes) {\n				var frameSize = 0, byteIndex = 0, bytesLeft, chunk, packet, tempLength;\n				if (everything.length) {\n					tempLength = everything.length;\n					everything = new Uint8Array(bytes.byteLength + tempLength);\n					everything.set(everything.subarray(0, tempLength));\n					everything.set(bytes, tempLength);\n				} else everything = bytes;\n				while (everything.length - byteIndex >= 3) {\n					if (everything[byteIndex] === \"I\".charCodeAt(0) && everything[byteIndex + 1] === \"D\".charCodeAt(0) && everything[byteIndex + 2] === \"3\".charCodeAt(0)) {\n						if (everything.length - byteIndex < 10) break;\n						frameSize = aacUtils.parseId3TagSize(everything, byteIndex);\n						if (byteIndex + frameSize > everything.length) break;\n						chunk = {\n							type: \"timed-metadata\",\n							data: everything.subarray(byteIndex, byteIndex + frameSize)\n						};\n						this.trigger(\"data\", chunk);\n						byteIndex += frameSize;\n						continue;\n					} else if ((everything[byteIndex] & 255) === 255 && (everything[byteIndex + 1] & 240) === 240) {\n						if (everything.length - byteIndex < 7) break;\n						frameSize = aacUtils.parseAdtsSize(everything, byteIndex);\n						if (byteIndex + frameSize > everything.length) break;\n						packet = {\n							type: \"audio\",\n							data: everything.subarray(byteIndex, byteIndex + frameSize),\n							pts: timeStamp,\n							dts: timeStamp\n						};\n						this.trigger(\"data\", packet);\n						byteIndex += frameSize;\n						continue;\n					}\n					byteIndex++;\n				}\n				bytesLeft = everything.length - byteIndex;\n				if (bytesLeft > 0) everything = everything.subarray(byteIndex);\n				else everything = /* @__PURE__ */ new Uint8Array();\n			};\n			this.reset = function() {\n				everything = /* @__PURE__ */ new Uint8Array();\n				this.trigger(\"reset\");\n			};\n			this.endTimeline = function() {\n				everything = /* @__PURE__ */ new Uint8Array();\n				this.trigger(\"endedtimeline\");\n			};\n		};\n		_AacStream.prototype = new Stream();\n		module.exports = _AacStream;\n	}));\n	//#endregion\n	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/constants/audio-properties.js\n	var require_audio_properties = /* @__PURE__ */ __commonJSMin(((exports, module) => {\n		module.exports = [\n			\"audioobjecttype\",\n			\"channelcount\",\n			\"samplerate\",\n			\"samplingfrequencyindex\",\n			\"samplesize\"\n		];\n	}));\n	//#endregion\n	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/constants/video-properties.js\n	var require_video_properties = /* @__PURE__ */ __commonJSMin(((exports, module) => {\n		module.exports = [\n			\"width\",\n			\"height\",\n			\"profileIdc\",\n			\"levelIdc\",\n			\"profileCompatibility\",\n			\"sarRatio\"\n		];\n	}));\n	//#endregion\n	//#region src/features/clipDownloads/byteBuffers.ts\n	var import_transmuxer = (/* @__PURE__ */ __commonJSMin(((exports, module) => {\n		var Stream = require_stream();\n		var mp4 = require_mp4_generator();\n		var frameUtils = require_frame_utils();\n		var audioFrameUtils = require_audio_frame_utils();\n		var trackDecodeInfo = require_track_decode_info();\n		var m2ts = require_m2ts();\n		var clock = require_clock();\n		var AdtsStream = require_adts();\n		var H264Stream = require_h264().H264Stream;\n		var AacStream = require_aac();\n		var isLikelyAacData = require_utils().isLikelyAacData;\n		var ONE_SECOND_IN_TS = require_clock().ONE_SECOND_IN_TS;\n		var AUDIO_PROPERTIES = require_audio_properties();\n		var VIDEO_PROPERTIES = require_video_properties();\n		var _VideoSegmentStream;\n		var _AudioSegmentStream;\n		var _Transmuxer;\n		var _CoalesceStream;\n		var retriggerForStream = function retriggerForStream(key, event) {\n			event.stream = key;\n			this.trigger(\"log\", event);\n		};\n		var addPipelineLogRetriggers = function addPipelineLogRetriggers(transmuxer, pipeline) {\n			var keys = Object.keys(pipeline);\n			for (var i = 0; i < keys.length; i++) {\n				var key = keys[i];\n				if (key === \"headOfPipeline\" || !pipeline[key].on) continue;\n				pipeline[key].on(\"log\", retriggerForStream.bind(transmuxer, key));\n			}\n		};\n		/**\n		* Compare two arrays (even typed) for same-ness\n		*/\n		var arrayEquals = function arrayEquals(a, b) {\n			var i;\n			if (a.length !== b.length) return false;\n			for (i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;\n			return true;\n		};\n		var generateSegmentTimingInfo = function generateSegmentTimingInfo(baseMediaDecodeTime, startDts, startPts, endDts, endPts, prependedContentDuration) {\n			var ptsOffsetFromDts = startPts - startDts, decodeDuration = endDts - startDts, presentationDuration = endPts - startPts;\n			return {\n				start: {\n					dts: baseMediaDecodeTime,\n					pts: baseMediaDecodeTime + ptsOffsetFromDts\n				},\n				end: {\n					dts: baseMediaDecodeTime + decodeDuration,\n					pts: baseMediaDecodeTime + presentationDuration\n				},\n				prependedContentDuration,\n				baseMediaDecodeTime\n			};\n		};\n		/**\n		* Constructs a single-track, ISO BMFF media segment from AAC data\n		* events. The output of this stream can be fed to a SourceBuffer\n		* configured with a suitable initialization segment.\n		* @param track {object} track metadata configuration\n		* @param options {object} transmuxer options object\n		* @param options.keepOriginalTimestamps {boolean} If true, keep the timestamps\n		*        in the source; false to adjust the first segment to start at 0.\n		*/\n		_AudioSegmentStream = function AudioSegmentStream(track, options) {\n			var adtsFrames = [], sequenceNumber, earliestAllowedDts = 0, audioAppendStartTs = 0, videoBaseMediaDecodeTime = Infinity;\n			options = options || {};\n			sequenceNumber = options.firstSequenceNumber || 0;\n			_AudioSegmentStream.prototype.init.call(this);\n			this.push = function(data) {\n				trackDecodeInfo.collectDtsInfo(track, data);\n				if (track) AUDIO_PROPERTIES.forEach(function(prop) {\n					track[prop] = data[prop];\n				});\n				adtsFrames.push(data);\n			};\n			this.setEarliestDts = function(earliestDts) {\n				earliestAllowedDts = earliestDts;\n			};\n			this.setVideoBaseMediaDecodeTime = function(baseMediaDecodeTime) {\n				videoBaseMediaDecodeTime = baseMediaDecodeTime;\n			};\n			this.setAudioAppendStart = function(timestamp) {\n				audioAppendStartTs = timestamp;\n			};\n			this.flush = function() {\n				var frames, moof, mdat, boxes, frameDuration, segmentDuration, videoClockCyclesOfSilencePrefixed;\n				if (adtsFrames.length === 0) {\n					this.trigger(\"done\", \"AudioSegmentStream\");\n					return;\n				}\n				frames = audioFrameUtils.trimAdtsFramesByEarliestDts(adtsFrames, track, earliestAllowedDts);\n				track.baseMediaDecodeTime = trackDecodeInfo.calculateTrackBaseMediaDecodeTime(track, options.keepOriginalTimestamps);\n				videoClockCyclesOfSilencePrefixed = audioFrameUtils.prefixWithSilence(track, frames, audioAppendStartTs, videoBaseMediaDecodeTime);\n				track.samples = audioFrameUtils.generateSampleTable(frames);\n				mdat = mp4.mdat(audioFrameUtils.concatenateFrameData(frames));\n				adtsFrames = [];\n				moof = mp4.moof(sequenceNumber, [track]);\n				boxes = new Uint8Array(moof.byteLength + mdat.byteLength);\n				sequenceNumber++;\n				boxes.set(moof);\n				boxes.set(mdat, moof.byteLength);\n				trackDecodeInfo.clearDtsInfo(track);\n				frameDuration = Math.ceil(ONE_SECOND_IN_TS * 1024 / track.samplerate);\n				if (frames.length) {\n					segmentDuration = frames.length * frameDuration;\n					this.trigger(\"segmentTimingInfo\", generateSegmentTimingInfo(clock.audioTsToVideoTs(track.baseMediaDecodeTime, track.samplerate), frames[0].dts, frames[0].pts, frames[0].dts + segmentDuration, frames[0].pts + segmentDuration, videoClockCyclesOfSilencePrefixed || 0));\n					this.trigger(\"timingInfo\", {\n						start: frames[0].pts,\n						end: frames[0].pts + segmentDuration\n					});\n				}\n				this.trigger(\"data\", {\n					track,\n					boxes\n				});\n				this.trigger(\"done\", \"AudioSegmentStream\");\n			};\n			this.reset = function() {\n				trackDecodeInfo.clearDtsInfo(track);\n				adtsFrames = [];\n				this.trigger(\"reset\");\n			};\n		};\n		_AudioSegmentStream.prototype = new Stream();\n		/**\n		* Constructs a single-track, ISO BMFF media segment from H264 data\n		* events. The output of this stream can be fed to a SourceBuffer\n		* configured with a suitable initialization segment.\n		* @param track {object} track metadata configuration\n		* @param options {object} transmuxer options object\n		* @param options.alignGopsAtEnd {boolean} If true, start from the end of the\n		*        gopsToAlignWith list when attempting to align gop pts\n		* @param options.keepOriginalTimestamps {boolean} If true, keep the timestamps\n		*        in the source; false to adjust the first segment to start at 0.\n		*/\n		_VideoSegmentStream = function VideoSegmentStream(track, options) {\n			var sequenceNumber, nalUnits = [], gopsToAlignWith = [], config, pps;\n			options = options || {};\n			sequenceNumber = options.firstSequenceNumber || 0;\n			_VideoSegmentStream.prototype.init.call(this);\n			delete track.minPTS;\n			this.gopCache_ = [];\n			/**\n			* Constructs a ISO BMFF segment given H264 nalUnits\n			* @param {Object} nalUnit A data event representing a nalUnit\n			* @param {String} nalUnit.nalUnitType\n			* @param {Object} nalUnit.config Properties for a mp4 track\n			* @param {Uint8Array} nalUnit.data The nalUnit bytes\n			* @see lib/codecs/h264.js\n			**/\n			this.push = function(nalUnit) {\n				trackDecodeInfo.collectDtsInfo(track, nalUnit);\n				if (nalUnit.nalUnitType === \"seq_parameter_set_rbsp\" && !config) {\n					config = nalUnit.config;\n					track.sps = [nalUnit.data];\n					VIDEO_PROPERTIES.forEach(function(prop) {\n						track[prop] = config[prop];\n					}, this);\n				}\n				if (nalUnit.nalUnitType === \"pic_parameter_set_rbsp\" && !pps) {\n					pps = nalUnit.data;\n					track.pps = [nalUnit.data];\n				}\n				nalUnits.push(nalUnit);\n			};\n			/**\n			* Pass constructed ISO BMFF track and boxes on to the\n			* next stream in the pipeline\n			**/\n			this.flush = function() {\n				var frames, gopForFusion, gops, moof, mdat, boxes, prependedContentDuration = 0, firstGop, lastGop;\n				while (nalUnits.length) {\n					if (nalUnits[0].nalUnitType === \"access_unit_delimiter_rbsp\") break;\n					nalUnits.shift();\n				}\n				if (nalUnits.length === 0) {\n					this.resetStream_();\n					this.trigger(\"done\", \"VideoSegmentStream\");\n					return;\n				}\n				frames = frameUtils.groupNalsIntoFrames(nalUnits);\n				gops = frameUtils.groupFramesIntoGops(frames);\n				if (!gops[0][0].keyFrame) {\n					gopForFusion = this.getGopForFusion_(nalUnits[0], track);\n					if (gopForFusion) {\n						prependedContentDuration = gopForFusion.duration;\n						gops.unshift(gopForFusion);\n						gops.byteLength += gopForFusion.byteLength;\n						gops.nalCount += gopForFusion.nalCount;\n						gops.pts = gopForFusion.pts;\n						gops.dts = gopForFusion.dts;\n						gops.duration += gopForFusion.duration;\n					} else gops = frameUtils.extendFirstKeyFrame(gops);\n				}\n				if (gopsToAlignWith.length) {\n					var alignedGops;\n					if (options.alignGopsAtEnd) alignedGops = this.alignGopsAtEnd_(gops);\n					else alignedGops = this.alignGopsAtStart_(gops);\n					if (!alignedGops) {\n						this.gopCache_.unshift({\n							gop: gops.pop(),\n							pps: track.pps,\n							sps: track.sps\n						});\n						this.gopCache_.length = Math.min(6, this.gopCache_.length);\n						nalUnits = [];\n						this.resetStream_();\n						this.trigger(\"done\", \"VideoSegmentStream\");\n						return;\n					}\n					trackDecodeInfo.clearDtsInfo(track);\n					gops = alignedGops;\n				}\n				trackDecodeInfo.collectDtsInfo(track, gops);\n				track.samples = frameUtils.generateSampleTable(gops);\n				mdat = mp4.mdat(frameUtils.concatenateNalData(gops));\n				track.baseMediaDecodeTime = trackDecodeInfo.calculateTrackBaseMediaDecodeTime(track, options.keepOriginalTimestamps);\n				this.trigger(\"processedGopsInfo\", gops.map(function(gop) {\n					return {\n						pts: gop.pts,\n						dts: gop.dts,\n						byteLength: gop.byteLength\n					};\n				}));\n				firstGop = gops[0];\n				lastGop = gops[gops.length - 1];\n				this.trigger(\"segmentTimingInfo\", generateSegmentTimingInfo(track.baseMediaDecodeTime, firstGop.dts, firstGop.pts, lastGop.dts + lastGop.duration, lastGop.pts + lastGop.duration, prependedContentDuration));\n				this.trigger(\"timingInfo\", {\n					start: gops[0].pts,\n					end: gops[gops.length - 1].pts + gops[gops.length - 1].duration\n				});\n				this.gopCache_.unshift({\n					gop: gops.pop(),\n					pps: track.pps,\n					sps: track.sps\n				});\n				this.gopCache_.length = Math.min(6, this.gopCache_.length);\n				nalUnits = [];\n				this.trigger(\"baseMediaDecodeTime\", track.baseMediaDecodeTime);\n				this.trigger(\"timelineStartInfo\", track.timelineStartInfo);\n				moof = mp4.moof(sequenceNumber, [track]);\n				boxes = new Uint8Array(moof.byteLength + mdat.byteLength);\n				sequenceNumber++;\n				boxes.set(moof);\n				boxes.set(mdat, moof.byteLength);\n				this.trigger(\"data\", {\n					track,\n					boxes\n				});\n				this.resetStream_();\n				this.trigger(\"done\", \"VideoSegmentStream\");\n			};\n			this.reset = function() {\n				this.resetStream_();\n				nalUnits = [];\n				this.gopCache_.length = 0;\n				gopsToAlignWith.length = 0;\n				this.trigger(\"reset\");\n			};\n			this.resetStream_ = function() {\n				trackDecodeInfo.clearDtsInfo(track);\n				config = void 0;\n				pps = void 0;\n			};\n			this.getGopForFusion_ = function(nalUnit) {\n				var halfSecond = 45e3, allowableOverlap = 1e4, nearestDistance = Infinity, dtsDistance, nearestGopObj, currentGop, currentGopObj, i;\n				for (i = 0; i < this.gopCache_.length; i++) {\n					currentGopObj = this.gopCache_[i];\n					currentGop = currentGopObj.gop;\n					if (!(track.pps && arrayEquals(track.pps[0], currentGopObj.pps[0])) || !(track.sps && arrayEquals(track.sps[0], currentGopObj.sps[0]))) continue;\n					if (currentGop.dts < track.timelineStartInfo.dts) continue;\n					dtsDistance = nalUnit.dts - currentGop.dts - currentGop.duration;\n					if (dtsDistance >= -allowableOverlap && dtsDistance <= halfSecond) {\n						if (!nearestGopObj || nearestDistance > dtsDistance) {\n							nearestGopObj = currentGopObj;\n							nearestDistance = dtsDistance;\n						}\n					}\n				}\n				if (nearestGopObj) return nearestGopObj.gop;\n				return null;\n			};\n			this.alignGopsAtStart_ = function(gops) {\n				var alignIndex, gopIndex, align, gop, byteLength = gops.byteLength, nalCount = gops.nalCount, duration = gops.duration, alignedGops;\n				alignIndex = gopIndex = 0;\n				while (alignIndex < gopsToAlignWith.length && gopIndex < gops.length) {\n					align = gopsToAlignWith[alignIndex];\n					gop = gops[gopIndex];\n					if (align.pts === gop.pts) break;\n					if (gop.pts > align.pts) {\n						alignIndex++;\n						continue;\n					}\n					gopIndex++;\n					byteLength -= gop.byteLength;\n					nalCount -= gop.nalCount;\n					duration -= gop.duration;\n				}\n				if (gopIndex === 0) return gops;\n				if (gopIndex === gops.length) return null;\n				alignedGops = gops.slice(gopIndex);\n				alignedGops.byteLength = byteLength;\n				alignedGops.duration = duration;\n				alignedGops.nalCount = nalCount;\n				alignedGops.pts = alignedGops[0].pts;\n				alignedGops.dts = alignedGops[0].dts;\n				return alignedGops;\n			};\n			this.alignGopsAtEnd_ = function(gops) {\n				var alignIndex = gopsToAlignWith.length - 1, gopIndex = gops.length - 1, align, gop, alignEndIndex = null, matchFound = false;\n				while (alignIndex >= 0 && gopIndex >= 0) {\n					align = gopsToAlignWith[alignIndex];\n					gop = gops[gopIndex];\n					if (align.pts === gop.pts) {\n						matchFound = true;\n						break;\n					}\n					if (align.pts > gop.pts) {\n						alignIndex--;\n						continue;\n					}\n					if (alignIndex === gopsToAlignWith.length - 1) alignEndIndex = gopIndex;\n					gopIndex--;\n				}\n				if (!matchFound && alignEndIndex === null) return null;\n				var trimIndex;\n				if (matchFound) trimIndex = gopIndex;\n				else trimIndex = alignEndIndex;\n				if (trimIndex === 0) return gops;\n				var alignedGops = gops.slice(trimIndex);\n				var metadata = alignedGops.reduce(function(total, gop) {\n					total.byteLength += gop.byteLength;\n					total.duration += gop.duration;\n					total.nalCount += gop.nalCount;\n					return total;\n				}, {\n					byteLength: 0,\n					duration: 0,\n					nalCount: 0\n				});\n				alignedGops.byteLength = metadata.byteLength;\n				alignedGops.duration = metadata.duration;\n				alignedGops.nalCount = metadata.nalCount;\n				alignedGops.pts = alignedGops[0].pts;\n				alignedGops.dts = alignedGops[0].dts;\n				return alignedGops;\n			};\n			this.alignGopsWith = function(newGopsToAlignWith) {\n				gopsToAlignWith = newGopsToAlignWith;\n			};\n		};\n		_VideoSegmentStream.prototype = new Stream();\n		/**\n		* A Stream that can combine multiple streams (ie. audio & video)\n		* into a single output segment for MSE. Also supports audio-only\n		* and video-only streams.\n		* @param options {object} transmuxer options object\n		* @param options.keepOriginalTimestamps {boolean} If true, keep the timestamps\n		*        in the source; false to adjust the first segment to start at media timeline start.\n		*/\n		_CoalesceStream = function CoalesceStream(options, metadataStream) {\n			this.numberOfTracks = 0;\n			this.metadataStream = metadataStream;\n			options = options || {};\n			if (typeof options.remux !== \"undefined\") this.remuxTracks = !!options.remux;\n			else this.remuxTracks = true;\n			if (typeof options.keepOriginalTimestamps === \"boolean\") this.keepOriginalTimestamps = options.keepOriginalTimestamps;\n			else this.keepOriginalTimestamps = false;\n			this.pendingTracks = [];\n			this.videoTrack = null;\n			this.pendingBoxes = [];\n			this.pendingCaptions = [];\n			this.pendingMetadata = [];\n			this.pendingBytes = 0;\n			this.emittedTracks = 0;\n			_CoalesceStream.prototype.init.call(this);\n			this.push = function(output) {\n				if (output.text) return this.pendingCaptions.push(output);\n				if (output.frames) return this.pendingMetadata.push(output);\n				this.pendingTracks.push(output.track);\n				this.pendingBytes += output.boxes.byteLength;\n				if (output.track.type === \"video\") {\n					this.videoTrack = output.track;\n					this.pendingBoxes.push(output.boxes);\n				}\n				if (output.track.type === \"audio\") {\n					this.audioTrack = output.track;\n					this.pendingBoxes.unshift(output.boxes);\n				}\n			};\n		};\n		_CoalesceStream.prototype = new Stream();\n		_CoalesceStream.prototype.flush = function(flushSource) {\n			var offset = 0, event = {\n				captions: [],\n				captionStreams: {},\n				metadata: [],\n				info: {}\n			}, caption, id3, initSegment, timelineStartPts = 0, i;\n			if (this.pendingTracks.length < this.numberOfTracks) {\n				if (flushSource !== \"VideoSegmentStream\" && flushSource !== \"AudioSegmentStream\") return;\n				else if (this.remuxTracks) return;\n				else if (this.pendingTracks.length === 0) {\n					this.emittedTracks++;\n					if (this.emittedTracks >= this.numberOfTracks) {\n						this.trigger(\"done\");\n						this.emittedTracks = 0;\n					}\n					return;\n				}\n			}\n			if (this.videoTrack) {\n				timelineStartPts = this.videoTrack.timelineStartInfo.pts;\n				VIDEO_PROPERTIES.forEach(function(prop) {\n					event.info[prop] = this.videoTrack[prop];\n				}, this);\n			} else if (this.audioTrack) {\n				timelineStartPts = this.audioTrack.timelineStartInfo.pts;\n				AUDIO_PROPERTIES.forEach(function(prop) {\n					event.info[prop] = this.audioTrack[prop];\n				}, this);\n			}\n			if (this.videoTrack || this.audioTrack) {\n				if (this.pendingTracks.length === 1) event.type = this.pendingTracks[0].type;\n				else event.type = \"combined\";\n				this.emittedTracks += this.pendingTracks.length;\n				initSegment = mp4.initSegment(this.pendingTracks);\n				event.initSegment = new Uint8Array(initSegment.byteLength);\n				event.initSegment.set(initSegment);\n				event.data = new Uint8Array(this.pendingBytes);\n				for (i = 0; i < this.pendingBoxes.length; i++) {\n					event.data.set(this.pendingBoxes[i], offset);\n					offset += this.pendingBoxes[i].byteLength;\n				}\n				for (i = 0; i < this.pendingCaptions.length; i++) {\n					caption = this.pendingCaptions[i];\n					caption.startTime = clock.metadataTsToSeconds(caption.startPts, timelineStartPts, this.keepOriginalTimestamps);\n					caption.endTime = clock.metadataTsToSeconds(caption.endPts, timelineStartPts, this.keepOriginalTimestamps);\n					event.captionStreams[caption.stream] = true;\n					event.captions.push(caption);\n				}\n				for (i = 0; i < this.pendingMetadata.length; i++) {\n					id3 = this.pendingMetadata[i];\n					id3.cueTime = clock.metadataTsToSeconds(id3.pts, timelineStartPts, this.keepOriginalTimestamps);\n					event.metadata.push(id3);\n				}\n				event.metadata.dispatchType = this.metadataStream.dispatchType;\n				this.pendingTracks.length = 0;\n				this.videoTrack = null;\n				this.pendingBoxes.length = 0;\n				this.pendingCaptions.length = 0;\n				this.pendingBytes = 0;\n				this.pendingMetadata.length = 0;\n				this.trigger(\"data\", event);\n				for (i = 0; i < event.captions.length; i++) {\n					caption = event.captions[i];\n					this.trigger(\"caption\", caption);\n				}\n				for (i = 0; i < event.metadata.length; i++) {\n					id3 = event.metadata[i];\n					this.trigger(\"id3Frame\", id3);\n				}\n			}\n			if (this.emittedTracks >= this.numberOfTracks) {\n				this.trigger(\"done\");\n				this.emittedTracks = 0;\n			}\n		};\n		_CoalesceStream.prototype.setRemux = function(val) {\n			this.remuxTracks = val;\n		};\n		/**\n		* A Stream that expects MP2T binary data as input and produces\n		* corresponding media segments, suitable for use with Media Source\n		* Extension (MSE) implementations that support the ISO BMFF byte\n		* stream format, like Chrome.\n		*/\n		_Transmuxer = function Transmuxer(options) {\n			var self = this, hasFlushed = true, videoTrack, audioTrack;\n			_Transmuxer.prototype.init.call(this);\n			options = options || {};\n			this.baseMediaDecodeTime = options.baseMediaDecodeTime || 0;\n			this.transmuxPipeline_ = {};\n			this.setupAacPipeline = function() {\n				var pipeline = {};\n				this.transmuxPipeline_ = pipeline;\n				pipeline.type = \"aac\";\n				pipeline.metadataStream = new m2ts.MetadataStream();\n				pipeline.aacStream = new AacStream();\n				pipeline.audioTimestampRolloverStream = new m2ts.TimestampRolloverStream(\"audio\");\n				pipeline.timedMetadataTimestampRolloverStream = new m2ts.TimestampRolloverStream(\"timed-metadata\");\n				pipeline.adtsStream = new AdtsStream();\n				pipeline.coalesceStream = new _CoalesceStream(options, pipeline.metadataStream);\n				pipeline.headOfPipeline = pipeline.aacStream;\n				pipeline.aacStream.pipe(pipeline.audioTimestampRolloverStream).pipe(pipeline.adtsStream);\n				pipeline.aacStream.pipe(pipeline.timedMetadataTimestampRolloverStream).pipe(pipeline.metadataStream).pipe(pipeline.coalesceStream);\n				pipeline.metadataStream.on(\"timestamp\", function(frame) {\n					pipeline.aacStream.setTimestamp(frame.timeStamp);\n				});\n				pipeline.aacStream.on(\"data\", function(data) {\n					if (data.type !== \"timed-metadata\" && data.type !== \"audio\" || pipeline.audioSegmentStream) return;\n					audioTrack = audioTrack || {\n						timelineStartInfo: { baseMediaDecodeTime: self.baseMediaDecodeTime },\n						codec: \"adts\",\n						type: \"audio\"\n					};\n					pipeline.coalesceStream.numberOfTracks++;\n					pipeline.audioSegmentStream = new _AudioSegmentStream(audioTrack, options);\n					pipeline.audioSegmentStream.on(\"log\", self.getLogTrigger_(\"audioSegmentStream\"));\n					pipeline.audioSegmentStream.on(\"timingInfo\", self.trigger.bind(self, \"audioTimingInfo\"));\n					pipeline.adtsStream.pipe(pipeline.audioSegmentStream).pipe(pipeline.coalesceStream);\n					self.trigger(\"trackinfo\", {\n						hasAudio: !!audioTrack,\n						hasVideo: !!videoTrack\n					});\n				});\n				pipeline.coalesceStream.on(\"data\", this.trigger.bind(this, \"data\"));\n				pipeline.coalesceStream.on(\"done\", this.trigger.bind(this, \"done\"));\n				addPipelineLogRetriggers(this, pipeline);\n			};\n			this.setupTsPipeline = function() {\n				var pipeline = {};\n				this.transmuxPipeline_ = pipeline;\n				pipeline.type = \"ts\";\n				pipeline.metadataStream = new m2ts.MetadataStream();\n				pipeline.packetStream = new m2ts.TransportPacketStream();\n				pipeline.parseStream = new m2ts.TransportParseStream();\n				pipeline.elementaryStream = new m2ts.ElementaryStream();\n				pipeline.timestampRolloverStream = new m2ts.TimestampRolloverStream();\n				pipeline.adtsStream = new AdtsStream();\n				pipeline.h264Stream = new H264Stream();\n				pipeline.captionStream = new m2ts.CaptionStream(options);\n				pipeline.coalesceStream = new _CoalesceStream(options, pipeline.metadataStream);\n				pipeline.headOfPipeline = pipeline.packetStream;\n				pipeline.packetStream.pipe(pipeline.parseStream).pipe(pipeline.elementaryStream).pipe(pipeline.timestampRolloverStream);\n				pipeline.timestampRolloverStream.pipe(pipeline.h264Stream);\n				pipeline.timestampRolloverStream.pipe(pipeline.adtsStream);\n				pipeline.timestampRolloverStream.pipe(pipeline.metadataStream).pipe(pipeline.coalesceStream);\n				pipeline.h264Stream.pipe(pipeline.captionStream).pipe(pipeline.coalesceStream);\n				pipeline.elementaryStream.on(\"data\", function(data) {\n					var i;\n					if (data.type === \"metadata\") {\n						i = data.tracks.length;\n						while (i--) if (!videoTrack && data.tracks[i].type === \"video\") {\n							videoTrack = data.tracks[i];\n							videoTrack.timelineStartInfo.baseMediaDecodeTime = self.baseMediaDecodeTime;\n						} else if (!audioTrack && data.tracks[i].type === \"audio\") {\n							audioTrack = data.tracks[i];\n							audioTrack.timelineStartInfo.baseMediaDecodeTime = self.baseMediaDecodeTime;\n						}\n						if (videoTrack && !pipeline.videoSegmentStream) {\n							pipeline.coalesceStream.numberOfTracks++;\n							pipeline.videoSegmentStream = new _VideoSegmentStream(videoTrack, options);\n							pipeline.videoSegmentStream.on(\"log\", self.getLogTrigger_(\"videoSegmentStream\"));\n							pipeline.videoSegmentStream.on(\"timelineStartInfo\", function(timelineStartInfo) {\n								if (audioTrack && !options.keepOriginalTimestamps) {\n									audioTrack.timelineStartInfo = timelineStartInfo;\n									pipeline.audioSegmentStream.setEarliestDts(timelineStartInfo.dts - self.baseMediaDecodeTime);\n								}\n							});\n							pipeline.videoSegmentStream.on(\"processedGopsInfo\", self.trigger.bind(self, \"gopInfo\"));\n							pipeline.videoSegmentStream.on(\"segmentTimingInfo\", self.trigger.bind(self, \"videoSegmentTimingInfo\"));\n							pipeline.videoSegmentStream.on(\"baseMediaDecodeTime\", function(baseMediaDecodeTime) {\n								if (audioTrack) pipeline.audioSegmentStream.setVideoBaseMediaDecodeTime(baseMediaDecodeTime);\n							});\n							pipeline.videoSegmentStream.on(\"timingInfo\", self.trigger.bind(self, \"videoTimingInfo\"));\n							pipeline.h264Stream.pipe(pipeline.videoSegmentStream).pipe(pipeline.coalesceStream);\n						}\n						if (audioTrack && !pipeline.audioSegmentStream) {\n							pipeline.coalesceStream.numberOfTracks++;\n							pipeline.audioSegmentStream = new _AudioSegmentStream(audioTrack, options);\n							pipeline.audioSegmentStream.on(\"log\", self.getLogTrigger_(\"audioSegmentStream\"));\n							pipeline.audioSegmentStream.on(\"timingInfo\", self.trigger.bind(self, \"audioTimingInfo\"));\n							pipeline.audioSegmentStream.on(\"segmentTimingInfo\", self.trigger.bind(self, \"audioSegmentTimingInfo\"));\n							pipeline.adtsStream.pipe(pipeline.audioSegmentStream).pipe(pipeline.coalesceStream);\n						}\n						self.trigger(\"trackinfo\", {\n							hasAudio: !!audioTrack,\n							hasVideo: !!videoTrack\n						});\n					}\n				});\n				pipeline.coalesceStream.on(\"data\", this.trigger.bind(this, \"data\"));\n				pipeline.coalesceStream.on(\"id3Frame\", function(id3Frame) {\n					id3Frame.dispatchType = pipeline.metadataStream.dispatchType;\n					self.trigger(\"id3Frame\", id3Frame);\n				});\n				pipeline.coalesceStream.on(\"caption\", this.trigger.bind(this, \"caption\"));\n				pipeline.coalesceStream.on(\"done\", this.trigger.bind(this, \"done\"));\n				addPipelineLogRetriggers(this, pipeline);\n			};\n			this.setBaseMediaDecodeTime = function(baseMediaDecodeTime) {\n				var pipeline = this.transmuxPipeline_;\n				if (!options.keepOriginalTimestamps) this.baseMediaDecodeTime = baseMediaDecodeTime;\n				if (audioTrack) {\n					audioTrack.timelineStartInfo.dts = void 0;\n					audioTrack.timelineStartInfo.pts = void 0;\n					trackDecodeInfo.clearDtsInfo(audioTrack);\n					if (pipeline.audioTimestampRolloverStream) pipeline.audioTimestampRolloverStream.discontinuity();\n				}\n				if (videoTrack) {\n					if (pipeline.videoSegmentStream) pipeline.videoSegmentStream.gopCache_ = [];\n					videoTrack.timelineStartInfo.dts = void 0;\n					videoTrack.timelineStartInfo.pts = void 0;\n					trackDecodeInfo.clearDtsInfo(videoTrack);\n					pipeline.captionStream.reset();\n				}\n				if (pipeline.timestampRolloverStream) pipeline.timestampRolloverStream.discontinuity();\n			};\n			this.setAudioAppendStart = function(timestamp) {\n				if (audioTrack) this.transmuxPipeline_.audioSegmentStream.setAudioAppendStart(timestamp);\n			};\n			this.setRemux = function(val) {\n				var pipeline = this.transmuxPipeline_;\n				options.remux = val;\n				if (pipeline && pipeline.coalesceStream) pipeline.coalesceStream.setRemux(val);\n			};\n			this.alignGopsWith = function(gopsToAlignWith) {\n				if (videoTrack && this.transmuxPipeline_.videoSegmentStream) this.transmuxPipeline_.videoSegmentStream.alignGopsWith(gopsToAlignWith);\n			};\n			this.getLogTrigger_ = function(key) {\n				var self = this;\n				return function(event) {\n					event.stream = key;\n					self.trigger(\"log\", event);\n				};\n			};\n			this.push = function(data) {\n				if (hasFlushed) {\n					var isAac = isLikelyAacData(data);\n					if (isAac && this.transmuxPipeline_.type !== \"aac\") this.setupAacPipeline();\n					else if (!isAac && this.transmuxPipeline_.type !== \"ts\") this.setupTsPipeline();\n					hasFlushed = false;\n				}\n				this.transmuxPipeline_.headOfPipeline.push(data);\n			};\n			this.flush = function() {\n				hasFlushed = true;\n				this.transmuxPipeline_.headOfPipeline.flush();\n			};\n			this.endTimeline = function() {\n				this.transmuxPipeline_.headOfPipeline.endTimeline();\n			};\n			this.reset = function() {\n				if (this.transmuxPipeline_.headOfPipeline) this.transmuxPipeline_.headOfPipeline.reset();\n			};\n			this.resetCaptions = function() {\n				if (this.transmuxPipeline_.captionStream) this.transmuxPipeline_.captionStream.reset();\n			};\n		};\n		_Transmuxer.prototype = new Stream();\n		module.exports = {\n			Transmuxer: _Transmuxer,\n			VideoSegmentStream: _VideoSegmentStream,\n			AudioSegmentStream: _AudioSegmentStream,\n			AUDIO_PROPERTIES,\n			VIDEO_PROPERTIES,\n			generateSegmentTimingInfo\n		};\n	})))();\n	function copyBytesToArrayBuffer(bytes) {\n		const copy = new Uint8Array(bytes.byteLength);\n		copy.set(bytes);\n		return copy.buffer;\n	}\n	function toTransferableArrayBuffer(bytes) {\n		if (bytes.buffer instanceof ArrayBuffer && bytes.byteOffset === 0 && bytes.byteLength === bytes.buffer.byteLength) return bytes.buffer;\n		return copyBytesToArrayBuffer(bytes);\n	}\n	//#endregion\n	//#region src/features/clipDownloads/transmuxerSession.ts\n	const ISOLATED_TRACK_TYPES = /* @__PURE__ */ new Set([\"audio\", \"video\"]);\n	function createTransmuxerSession(transmuxer) {\n		let firstInitSegment;\n		let pendingSegments = [];\n		transmuxer.on(\"data\", (segment) => {\n			pendingSegments.push(segment);\n		});\n		function push(bytes) {\n			transmuxer.push(bytes);\n		}\n		function flush() {\n			pendingSegments = [];\n			transmuxer.flush();\n			const isolatedTrackRecovered = pendingSegments.length === 0 && firstInitSegment !== void 0;\n			if (isolatedTrackRecovered) try {\n				transmuxer.setRemux(false);\n				transmuxer.flush();\n			} finally {\n				transmuxer.setRemux(true);\n			}\n			if (pendingSegments.length !== 1) throw new Error(\"The segment produced an unexpected output layout.\");\n			const [segment] = pendingSegments;\n			pendingSegments = [];\n			if (segment.type !== \"combined\" && !(isolatedTrackRecovered && ISOLATED_TRACK_TYPES.has(segment.type))) throw new Error(\"The clip did not produce supported audio and video tracks.\");\n			if (segment.data.byteLength > 8388608) throw new Error(\"The MP4 fragment exceeds the safe output limit.\");\n			let initSegment;\n			if (segment.type === \"combined\") {\n				if (!firstInitSegment) {\n					firstInitSegment = segment.initSegment.slice();\n					initSegment = firstInitSegment.slice();\n				} else if (!equalBytes(firstInitSegment, segment.initSegment)) throw new Error(\"The clip track metadata changes during playback.\");\n			}\n			return {\n				data: segment.data,\n				...initSegment ? { initSegment } : {}\n			};\n		}\n		return {\n			flush,\n			push\n		};\n	}\n	function equalBytes(left, right) {\n		if (left.byteLength !== right.byteLength) return false;\n		for (let index = 0; index < left.byteLength; index += 1) if (left[index] !== right[index]) return false;\n		return true;\n	}\n	//#endregion\n	//#region src/features/clipDownloads/download.worker.ts\n	const worker = self;\n	const session = createTransmuxerSession(new import_transmuxer.Transmuxer({ remux: true }));\n	worker.onmessage = (event) => {\n		const message = event.data;\n		try {\n			if (message.type === \"cancel\") {\n				worker.close();\n				return;\n			}\n			if (message.type === \"push\") {\n				session.push(new Uint8Array(message.bytes));\n				respond({\n					requestId: message.requestId,\n					type: \"pushed\"\n				});\n				return;\n			}\n			const fragment = session.flush();\n			const data = toTransferableArrayBuffer(fragment.data);\n			const initSegment = fragment.initSegment ? toTransferableArrayBuffer(fragment.initSegment) : void 0;\n			respond({\n				data,\n				...initSegment ? { initSegment } : {},\n				requestId: message.requestId,\n				type: \"fragment\"\n			}, initSegment ? [initSegment, data] : [data]);\n		} catch {\n			respond({\n				message: \"The clip could not be converted to MP4.\",\n				requestId: message.type === \"cancel\" ? void 0 : message.requestId,\n				type: \"error\"\n			});\n		}\n	};\n	function respond(message, transfer = []) {\n		worker.postMessage(message, transfer);\n	}\n	//#endregion\n})();\n";
	var blob = typeof self !== "undefined" && self.Blob && new Blob(["(self.URL || self.webkitURL).revokeObjectURL(self.location.href);", jsContent], { type: "text/javascript;charset=utf-8" });
	function WorkerWrapper(options) {
		let objURL;
		try {
			objURL = blob && (self.URL || self.webkitURL).createObjectURL(blob);
			if (!objURL) throw "";
			const worker = new Worker(objURL, { name: options?.name });
			worker.addEventListener("error", () => {
				(self.URL || self.webkitURL).revokeObjectURL(objURL);
			});
			return worker;
		} catch (e) {
			return new Worker("data:text/javascript;charset=utf-8," + encodeURIComponent(jsContent), { name: options?.name });
		}
	}
	function copyBytesToArrayBuffer(bytes) {
		const copy = new Uint8Array(bytes.byteLength);
		copy.set(bytes);
		return copy.buffer;
	}
	function toTransferableArrayBuffer(bytes) {
		if (bytes.buffer instanceof ArrayBuffer && bytes.byteOffset === 0 && bytes.byteLength === bytes.buffer.byteLength) return bytes.buffer;
		return copyBytesToArrayBuffer(bytes);
	}
	function toWritableBufferSource(bytes) {
		return bytes.buffer instanceof ArrayBuffer ? bytes : copyBytesToArrayBuffer(bytes);
	}
	var TransmuxWorkerClient = class {
		worker = new WorkerWrapper();
		nextRequestId = 1;
		pending = new Map();
		constructor() {
			this.worker.onmessage = (event) => {
				const message = event.data;
				if (message.type === "error") {
					const error = new ClipDownloadError("transmuxing", message.message);
					if (message.requestId !== void 0) this.rejectRequest(message.requestId, error);
					else this.rejectAll(error);
					return;
				}
				const request = this.pending.get(message.requestId);
				if (!request) return;
				this.pending.delete(message.requestId);
				request.resolve(message);
			};
			this.worker.onerror = () => {
				this.rejectAll(new ClipDownloadError("transmuxing", "The MP4 conversion worker stopped unexpectedly."));
			};
		}
		async push(bytes) {
			const buffer = toTransferableArrayBuffer(bytes);
			if ((await this.request({
				bytes: buffer,
				requestId: this.nextRequestId,
				type: "push"
			}, [buffer])).type !== "pushed") throw unexpectedResponse();
		}
		async flush() {
			const response = await this.request({
				requestId: this.nextRequestId,
				type: "flush"
			});
			if (response.type !== "fragment") throw unexpectedResponse();
			return {
				data: new Uint8Array(response.data),
				...response.initSegment ? { initSegment: new Uint8Array(response.initSegment) } : {}
			};
		}
		terminate(reason = "The MP4 conversion was cancelled.") {
			this.worker.postMessage({ type: "cancel" });
			this.worker.terminate();
			this.rejectAll(new ClipDownloadError("cancelled", reason));
		}
		request(message, transfer = []) {
			const requestId = message.requestId;
			this.nextRequestId += 1;
			return new Promise((resolve, reject) => {
				this.pending.set(requestId, {
					reject,
					resolve
				});
				this.worker.postMessage(message, transfer);
			});
		}
		rejectRequest(requestId, error) {
			const request = this.pending.get(requestId);
			if (!request) return;
			this.pending.delete(requestId);
			request.reject(error);
		}
		rejectAll(error) {
			for (const request of this.pending.values()) request.reject(error);
			this.pending.clear();
		}
	};
	function unexpectedResponse() {
		return new ClipDownloadError("transmuxing", "The MP4 conversion worker returned an invalid response.");
	}
	var WORKER_INPUT_CHUNK_BYTES = 256 * 1024;
	async function downloadMediaPlan(plan, sink, signal, { createWorker = () => new TransmuxWorkerClient(), fetchImplementation = fetch, onProgress = () => void 0 } = {}) {
		if (plan.kind === "direct-mp4") {
			await downloadDirectMp4(plan.url, plan.sourceBytes, sink, signal, fetchImplementation, onProgress);
			return;
		}
		const worker = createWorker();
		let completedSegments = 0;
		let fetchedBytes = 0;
		let processedBytes = 0;
		let writtenBytes = 0;
		try {
			for (const segment of plan.segments) {
				assertNotAborted(signal);
				const segmentBytes = await pushSegment(segment, worker, signal, fetchImplementation, (chunkBytes) => {
					fetchedBytes += chunkBytes;
					onProgress({
						completedSegments,
						fetchedBytes,
						phase: "fetching",
						processedBytes,
						writtenBytes
					});
				});
				onProgress({
					completedSegments,
					fetchedBytes,
					phase: "transmuxing",
					processedBytes,
					writtenBytes
				});
				const fragment = await worker.flush();
				processedBytes += segmentBytes;
				onProgress({
					completedSegments,
					fetchedBytes,
					phase: "writing",
					processedBytes,
					writtenBytes
				});
				if (fragment.initSegment) await sink.write(fragment.initSegment);
				await sink.write(fragment.data);
				writtenBytes += segmentBytes;
				completedSegments += 1;
				onProgress({
					completedSegments,
					fetchedBytes,
					phase: "fetching",
					processedBytes,
					writtenBytes
				});
			}
		} finally {
			worker.terminate();
		}
	}
	async function pushSegment(segment, worker, signal, fetchImplementation, onFetched) {
		if (segment.length !== void 0 && segment.offset !== void 0) {
			const end = segment.offset + segment.length - 1;
			const response = await fetchImplementation(segment.url, {
				headers: { Range: `bytes=${segment.offset}-${end}` },
				signal
			});
			validateFinalMediaUrl(response);
			if (response.status !== 206) {
				await response.body?.cancel();
				throw new ClipDownloadError("media-request", "The media server did not honor a required byte range.");
			}
			const contentRange = parseContentRange(response.headers.get("content-range"));
			if (contentRange.start !== segment.offset || contentRange.end !== end || contentRange.total <= end) {
				await response.body?.cancel();
				throw new ClipDownloadError("media-request", "The media server returned an unexpected byte range.");
			}
			return streamSegmentResponse(response, segment.length, worker, signal, onFetched);
		}
		const response = await fetchImplementation(segment.url, { signal });
		validateFinalMediaUrl(response);
		if (!response.ok) throw new ClipDownloadError("media-request", "A clip media segment could not be downloaded.");
		return streamSegmentResponse(response, void 0, worker, signal, onFetched);
	}
	async function streamSegmentResponse(response, expectedBytes, worker, signal, onFetched) {
		const reader = response.body?.getReader();
		if (!reader) throw new ClipDownloadError("media-request", "A clip media segment did not contain a readable body.");
		let segmentBytes = 0;
		try {
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				segmentBytes += value.byteLength;
				if (segmentBytes > 8388608) {
					await reader.cancel();
					throw new ClipDownloadError("unsupported-media", "A clip segment exceeds the safe processing limit.");
				}
				onFetched(value.byteLength);
				await pushBoundedChunks(value, worker, signal);
			}
		} finally {
			reader.releaseLock();
		}
		if (expectedBytes !== void 0 && segmentBytes !== expectedBytes) throw new ClipDownloadError("media-request", "A clip media segment was truncated.");
		return segmentBytes;
	}
	async function pushBoundedChunks(bytes, worker, signal) {
		for (let offset = 0; offset < bytes.byteLength; offset += WORKER_INPUT_CHUNK_BYTES) {
			assertNotAborted(signal);
			await worker.push(bytes.subarray(offset, offset + WORKER_INPUT_CHUNK_BYTES));
		}
	}
	async function downloadDirectMp4(url, expectedBytes, sink, signal, fetchImplementation, onProgress) {
		const response = await fetchImplementation(url, { signal });
		validateFinalMediaUrl(response);
		if (!response.ok) throw new ClipDownloadError("media-request", "The MP4 clip could not be downloaded.");
		const reader = response.body?.getReader();
		if (!reader) throw new ClipDownloadError("media-request", "The MP4 response did not contain a readable body.");
		let fetchedBytes = 0;
		let pendingChunks = [];
		const signaturePrefix = new Uint8Array(64);
		let signatureBytes = 0;
		let signatureChecked = false;
		let writtenBytes = 0;
		try {
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				assertNotAborted(signal);
				fetchedBytes += value.byteLength;
				if (!signatureChecked) {
					pendingChunks.push(value);
					const copyBytes = Math.min(signaturePrefix.byteLength - signatureBytes, value.byteLength);
					signaturePrefix.set(value.subarray(0, copyBytes), signatureBytes);
					signatureBytes += copyBytes;
					if (signatureBytes < signaturePrefix.byteLength) continue;
					if (!isMp4Prefix(signaturePrefix)) {
						await reader.cancel();
						throw new ClipDownloadError("media-request", "The direct media response is no longer a valid MP4 file.");
					}
					signatureChecked = true;
					for (const pendingChunk of pendingChunks) writtenBytes = await writeDirectChunk(pendingChunk, sink, fetchedBytes, onProgress, writtenBytes);
					pendingChunks = [];
					continue;
				}
				writtenBytes = await writeDirectChunk(value, sink, fetchedBytes, onProgress, writtenBytes);
			}
		} finally {
			reader.releaseLock();
		}
		if (!signatureChecked) {
			if (!isMp4Prefix(signaturePrefix.subarray(0, signatureBytes))) throw new ClipDownloadError("media-request", "The direct media response is no longer a valid MP4 file.");
			for (const pendingChunk of pendingChunks) writtenBytes = await writeDirectChunk(pendingChunk, sink, fetchedBytes, onProgress, writtenBytes);
		}
		if (expectedBytes !== void 0 && fetchedBytes !== expectedBytes) throw new ClipDownloadError("media-request", "The MP4 response size changed after inspection.");
		onProgress({
			completedSegments: 1,
			fetchedBytes,
			phase: "writing",
			processedBytes: fetchedBytes,
			writtenBytes: fetchedBytes
		});
	}
	async function writeDirectChunk(bytes, sink, fetchedBytes, onProgress, startingWrittenBytes) {
		let chunkWritten = 0;
		for (let offset = 0; offset < bytes.byteLength; offset += MAX_INPUT_BYTES) {
			const chunk = bytes.subarray(offset, offset + MAX_INPUT_BYTES);
			onProgress({
				completedSegments: 0,
				fetchedBytes,
				phase: "writing",
				processedBytes: fetchedBytes,
				writtenBytes: startingWrittenBytes + chunkWritten
			});
			await sink.write(chunk);
			chunkWritten += chunk.byteLength;
		}
		onProgress({
			completedSegments: 0,
			fetchedBytes,
			phase: "fetching",
			processedBytes: fetchedBytes,
			writtenBytes: startingWrittenBytes + chunkWritten
		});
		return startingWrittenBytes + chunkWritten;
	}
	function isMp4Prefix(bytes) {
		const searchEnd = Math.min(64, bytes.byteLength - 4);
		for (let index = 4; index <= searchEnd; index += 1) if (bytes[index] === 102 && bytes[index + 1] === 116 && bytes[index + 2] === 121 && bytes[index + 3] === 112) return true;
		return false;
	}
	function assertNotAborted(signal) {
		if (signal.aborted) throw signal.reason instanceof Error ? signal.reason : new DOMException("The operation was aborted.", "AbortError");
	}
	function getSaveFilePicker() {
		const browserWindow = window;
		return browserWindow.showSaveFilePicker?.bind(browserWindow);
	}
	async function createFileSystemSink(handle) {
		let writable;
		try {
			try {
				writable = await handle.createWritable({
					keepExistingData: false,
					mode: "exclusive"
				});
			} catch (error) {
				if (!(error instanceof TypeError)) throw error;
				writable = await handle.createWritable({ keepExistingData: false });
			}
		} catch (error) {
			throw new ClipDownloadError("file-access", error instanceof DOMException && error.name === "NotAllowedError" ? "Permission to write the selected file was denied." : "The selected file could not be opened for writing.");
		}
		return {
			abort: async (reason) => {
				try {
					await writable.abort(reason);
				} catch {}
			},
			close: async () => {
				try {
					await writable.close();
				} catch {
					throw new ClipDownloadError("file-write", "The MP4 file could not be finalized.");
				}
			},
			filename: handle.name,
			write: async (bytes) => {
				try {
					await writable.write(toWritableBufferSource(bytes));
				} catch {
					throw new ClipDownloadError("file-write", "The MP4 file could not be written.");
				}
			}
		};
	}
	function createBlobSink(filename, triggerDownload = triggerBlobDownload) {
		let parts = [];
		let closed = false;
		return {
			abort: async () => {
				parts = [];
				closed = true;
			},
			close: async () => {
				if (closed) return;
				const blob = new Blob(parts, { type: "video/mp4" });
				parts = [];
				closed = true;
				triggerDownload(blob, filename);
			},
			filename,
			write: async (bytes) => {
				if (closed) throw new ClipDownloadError("file-write", "The memory-backed output is already closed.");
				parts.push(copyBytesToArrayBuffer(bytes));
			}
		};
	}
	function triggerBlobDownload(blob, filename) {
		const url = URL.createObjectURL(blob);
		const anchor = document.createElement("a");
		anchor.download = filename;
		anchor.href = url;
		anchor.style.display = "none";
		document.body.append(anchor);
		anchor.click();
		anchor.remove();
		window.setTimeout(() => URL.revokeObjectURL(url), 0);
	}
	var INVALID_FILENAME_CHARACTERS = /[\u0000-\u001f<>:"/\\|?*]/g;
	var RESERVED_WINDOWS_NAME = /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\..*)?$/i;
	var MAX_BASENAME_LENGTH = 180;
	function createDefaultBasename({ channel, clipId, title }) {
		const candidates = [
			channel && title ? `${channel} - ${title}` : void 0,
			title,
			channel ? `${channel} - ${clipId}` : void 0,
			clipId
		];
		for (const candidate of candidates) {
			if (!candidate) continue;
			const sanitized = sanitizeBasename(candidate, clipId);
			if (sanitized) return sanitized;
		}
		return clipId;
	}
	function sanitizeBasename(value, fallback) {
		let basename = value.replace(INVALID_FILENAME_CHARACTERS, " ").replace(/\s+/g, " ").trim().replace(/[ .]+$/g, "");
		if (basename.length > MAX_BASENAME_LENGTH) basename = basename.slice(0, MAX_BASENAME_LENGTH).trimEnd();
		if (RESERVED_WINDOWS_NAME.test(basename)) basename = `${basename}_`;
		if (!basename) basename = fallback.replace(INVALID_FILENAME_CHARACTERS, " ").trim();
		return basename || "kick-clip";
	}
	function createMp4Filename(basename, fallback) {
		return `${sanitizeBasename(basename, fallback)}.mp4`;
	}
	var TERMINAL_STATUSES = new Set([
		"cancelled",
		"completed",
		"failed"
	]);
	var REMOVABLE_STATUSES = new Set([...TERMINAL_STATUSES, "ready"]);
	var ACTIVE_STATUSES = new Set([
		"active",
		"choosing-destination",
		"inspecting"
	]);
	var ATTENTION_STATUSES = new Set(["awaiting-destination", "ready"]);
	var MAX_INSPECTIONS = 2;
	var PROGRESS_INTERVAL_MS = 100;
	var EMPTY_ACTIVITY_SUMMARY = {
		activeCount: 0,
		attention: false,
		error: false,
		queuedCount: 0,
		visible: false
	};
	var nextJobNumber = 1;
	function createDownloadManager(dependencies) {
		const jobs = new Map();
		const runtimes = new Map();
		const listeners = new Set();
		const inspectionQueue = [];
		const mediaQueue = [];
		let activeInspections = 0;
		let activitySummary = EMPTY_ACTIVITY_SUMMARY;
		let snapshot = { jobs: [] };
		let reservedMediaJobId;
		function publish() {
			rebuildPublishedViews();
			for (const listener of listeners) listener();
		}
		function getSnapshot() {
			return snapshot;
		}
		function rebuildPublishedViews() {
			const queuePositions = new Map();
			let activeCount = 0;
			let attention = false;
			let error = false;
			let queuedCount = 0;
			for (let index = 0; index < mediaQueue.length; index += 1) {
				const jobId = mediaQueue[index];
				if (jobId) queuePositions.set(jobId, index + 1);
			}
			const snapshotJobs = [...jobs.values()].map((job) => {
				if (ACTIVE_STATUSES.has(job.status)) activeCount += 1;
				if (job.status === "queued" || job.status === "awaiting-destination") queuedCount += 1;
				if (ATTENTION_STATUSES.has(job.status) || TERMINAL_STATUSES.has(job.status) && !job.acknowledged) attention = true;
				if (job.status === "failed" && !job.acknowledged) error = true;
				return {
					...job,
					queuePosition: job.status === "queued" ? queuePositions.get(job.id) : void 0
				};
			});
			const nextActivitySummary = {
				activeCount,
				attention,
				error,
				queuedCount,
				visible: activeCount > 0 || queuedCount > 0 || attention
			};
			snapshot = { jobs: snapshotJobs };
			if (!activitySummariesEqual(activitySummary, nextActivitySummary)) activitySummary = nextActivitySummary;
		}
		function inspectClip(clipId, pageUrl = window.location.href) {
			const existing = [...jobs.values()].find((job) => job.clipId === clipId && !TERMINAL_STATUSES.has(job.status));
			if (existing) return existing.id;
			const id = createJobId();
			const job = {
				acknowledged: false,
				basename: clipId,
				clipId,
				completedSegments: 0,
				createdAt: dependencies.now(),
				fetchedBytes: 0,
				filename: `${clipId}.mp4`,
				id,
				pageUrl,
				phase: "inspecting",
				processedBytes: 0,
				status: "inspecting",
				writtenBytes: 0
			};
			jobs.set(id, job);
			runtimes.set(id, { generation: 0 });
			inspectionQueue.push(id);
			publish();
			drainInspectionQueue();
			return id;
		}
		function drainInspectionQueue() {
			while (activeInspections < MAX_INSPECTIONS && inspectionQueue.length > 0) {
				const jobId = inspectionQueue.shift();
				const job = jobId ? jobs.get(jobId) : void 0;
				if (!job || job.status !== "inspecting") continue;
				activeInspections += 1;
				runInspection(job).finally(() => {
					activeInspections -= 1;
					drainInspectionQueue();
				});
			}
		}
		async function runInspection(job) {
			const runtime = getRuntime(job.id);
			const generation = runtime.generation + 1;
			const abortController = new AbortController();
			runtime.generation = generation;
			runtime.abortController = abortController;
			try {
				const inspection = await dependencies.inspectClip(job.clipId, abortController.signal, { pageUrl: job.pageUrl });
				if (!isCurrent(job.id, generation)) return;
				applyInspection(job, runtime, inspection);
				publish();
			} catch (error) {
				if (!isCurrent(job.id, generation)) return;
				const displayError = toDisplayError(error);
				job.phase = void 0;
				job.status = displayError.code === "cancelled" ? "cancelled" : "failed";
				job.error = displayError.code === "cancelled" ? void 0 : displayError;
				job.completedAt = dependencies.now();
				job.acknowledged = false;
				publish();
			} finally {
				if (isCurrent(job.id, generation)) runtime.abortController = void 0;
			}
		}
		function applyInspection(job, runtime, inspection) {
			const { metadata, plan } = inspection;
			const basename = createDefaultBasename({
				channel: metadata.channel,
				clipId: job.clipId,
				title: metadata.title
			});
			const media = summarizeMediaPlan(plan);
			runtime.plan = plan;
			job.basename = basename;
			job.category = metadata.category;
			job.channel = metadata.channel;
			job.creator = metadata.creator;
			job.error = void 0;
			job.filename = createMp4Filename(basename, job.clipId);
			job.likeCount = metadata.likeCount;
			job.media = {
				...media,
				duration: media.duration ?? metadata.duration
			};
			job.pageUrl = metadata.pageUrl;
			job.phase = void 0;
			job.publishedAt = metadata.publishedAt;
			job.status = "ready";
			job.thumbnailUrl = metadata.thumbnailUrl;
			job.title = metadata.title;
			job.viewCount = metadata.viewCount;
			job.acknowledged = false;
		}
		function updateBasename(jobId, value) {
			const job = jobs.get(jobId);
			if (!job || job.status !== "ready") return;
			job.basename = value;
			job.filename = createMp4Filename(value, job.clipId);
			publish();
		}
		function requestDownload(jobId, strategy) {
			const job = jobs.get(jobId);
			const runtime = runtimes.get(jobId);
			if (!job || !runtime || job.status !== "ready" || !runtime.plan) return;
			job.basename = sanitizeBasename(job.basename, job.clipId);
			job.filename = createMp4Filename(job.basename, job.clipId);
			job.error = void 0;
			job.saveStrategy = strategy;
			runtime.saveStrategy = strategy;
			if (reservedMediaJobId) {
				job.status = "queued";
				mediaQueue.push(jobId);
				publish();
				return;
			}
			reservedMediaJobId = jobId;
			if (strategy === "file-system") chooseDestination(jobId);
			else startReservedJob(jobId);
		}
		async function chooseDestination(jobId) {
			const job = jobs.get(jobId);
			const runtime = runtimes.get(jobId);
			if (!job || !runtime || reservedMediaJobId !== jobId || !runtime.plan || job.status !== "ready" && job.status !== "awaiting-destination") return;
			const picker = dependencies.getSaveFilePicker();
			if (!picker) {
				returnFileAccessToReady(job, "Direct file access is unavailable. Use the memory-backed download.");
				releaseMediaSlot(jobId);
				return;
			}
			job.status = "choosing-destination";
			publish();
			let handle;
			try {
				handle = await picker({
					excludeAcceptAllOption: true,
					suggestedName: job.filename,
					types: [{
						accept: { "video/mp4": [".mp4"] },
						description: "MP4 video"
					}]
				});
			} catch (error) {
				if (error instanceof DOMException && error.name === "AbortError") {
					job.status = "ready";
					job.error = void 0;
				} else returnFileAccessToReady(job, "The file destination could not be selected. You can try again or use the memory-backed download.");
				releaseMediaSlot(jobId);
				return;
			}
			if (reservedMediaJobId !== jobId || job.status !== "choosing-destination") return;
			try {
				runtime.sink = await dependencies.createFileSystemSink(handle);
				job.filename = runtime.sink.filename;
			} catch (error) {
				returnFileAccessToReady(job, toDisplayError(error).message);
				releaseMediaSlot(jobId);
				return;
			}
			await startReservedJob(jobId);
		}
		async function startReservedJob(jobId) {
			const job = jobs.get(jobId);
			const runtime = runtimes.get(jobId);
			if (!job || !runtime || !runtime.plan || reservedMediaJobId !== jobId) return;
			const sink = runtime.sink ?? dependencies.createBlobSink(job.filename);
			const abortController = new AbortController();
			const generation = runtime.generation + 1;
			runtime.abortController = abortController;
			runtime.generation = generation;
			runtime.sink = sink;
			job.acknowledged = false;
			job.completedAt = void 0;
			job.completedSegments = 0;
			job.error = void 0;
			job.fetchedBytes = 0;
			job.phase = "fetching";
			job.processedBytes = 0;
			job.startedAt = dependencies.now();
			job.status = "active";
			job.writtenBytes = 0;
			publish();
			try {
				await dependencies.downloadMediaPlan(runtime.plan, sink, abortController.signal, { onProgress: (progress) => {
					publishProgress(jobId, generation, progress);
				} });
				await sink.close();
				if (!isCurrent(jobId, generation)) return;
				flushProgressTimer(runtime);
				job.completedAt = dependencies.now();
				job.phase = void 0;
				job.status = "completed";
				job.acknowledged = false;
				cleanupAttempt(runtime);
				releaseMediaSlot(jobId);
			} catch (error) {
				if (!isCurrent(jobId, generation)) return;
				await sink.abort(error);
				const displayError = toDisplayError(error);
				flushProgressTimer(runtime);
				job.completedAt = dependencies.now();
				job.error = displayError.code === "cancelled" ? void 0 : displayError;
				job.phase = void 0;
				job.status = displayError.code === "cancelled" ? "cancelled" : "failed";
				job.acknowledged = false;
				cleanupAttempt(runtime);
				releaseMediaSlot(jobId);
			}
		}
		function publishProgress(jobId, generation, progress) {
			const job = jobs.get(jobId);
			const runtime = runtimes.get(jobId);
			if (!job || !runtime || !isCurrent(jobId, generation)) return;
			job.completedSegments = progress.completedSegments;
			job.fetchedBytes = progress.fetchedBytes;
			job.phase = progress.phase;
			job.processedBytes = progress.processedBytes;
			job.writtenBytes = progress.writtenBytes;
			if (runtime.progressTimer) return;
			runtime.progressTimer = setTimeout(() => {
				runtime.progressTimer = void 0;
				if (isCurrent(jobId, generation)) publish();
			}, PROGRESS_INTERVAL_MS);
		}
		function cancel(jobId) {
			const job = jobs.get(jobId);
			const runtime = runtimes.get(jobId);
			if (!job || !runtime || TERMINAL_STATUSES.has(job.status)) return;
			runtime.generation += 1;
			runtime.abortController?.abort(new DOMException("The operation was cancelled.", "AbortError"));
			runtime.sink?.abort("cancelled");
			flushProgressTimer(runtime);
			removeFromQueue(inspectionQueue, jobId);
			removeFromQueue(mediaQueue, jobId);
			job.completedAt = dependencies.now();
			job.error = void 0;
			job.phase = void 0;
			job.status = "cancelled";
			job.acknowledged = false;
			cleanupAttempt(runtime);
			if (reservedMediaJobId === jobId) releaseMediaSlot(jobId);
			else publish();
		}
		function retry(jobId) {
			const job = jobs.get(jobId);
			const runtime = runtimes.get(jobId);
			if (!job || !runtime || !TERMINAL_STATUSES.has(job.status)) return;
			runtime.generation += 1;
			job.acknowledged = false;
			job.completedAt = void 0;
			job.completedSegments = 0;
			job.error = void 0;
			job.fetchedBytes = 0;
			job.processedBytes = 0;
			job.saveStrategy = void 0;
			job.startedAt = void 0;
			job.writtenBytes = 0;
			if (runtime.plan) {
				job.phase = void 0;
				job.status = "ready";
				publish();
			} else {
				job.phase = "inspecting";
				job.status = "inspecting";
				inspectionQueue.push(jobId);
				publish();
				drainInspectionQueue();
			}
		}
		function remove(jobId) {
			const job = jobs.get(jobId);
			const runtime = runtimes.get(jobId);
			if (!job || !runtime || !REMOVABLE_STATUSES.has(job.status)) return;
			flushProgressTimer(runtime);
			jobs.delete(jobId);
			runtimes.delete(jobId);
			publish();
		}
		function clearInactive() {
			let changed = false;
			for (const [jobId, job] of jobs) {
				if (!REMOVABLE_STATUSES.has(job.status)) continue;
				const runtime = runtimes.get(jobId);
				if (runtime) flushProgressTimer(runtime);
				jobs.delete(jobId);
				runtimes.delete(jobId);
				changed = true;
			}
			if (changed) publish();
		}
		function acknowledgeAttention() {
			let changed = false;
			for (const job of jobs.values()) if (TERMINAL_STATUSES.has(job.status) && !job.acknowledged) {
				job.acknowledged = true;
				changed = true;
			}
			if (changed) publish();
		}
		function getActivitySummary() {
			return activitySummary;
		}
		function releaseMediaSlot(jobId) {
			if (reservedMediaJobId === jobId) reservedMediaJobId = void 0;
			advanceMediaQueue();
			publish();
		}
		function advanceMediaQueue() {
			if (reservedMediaJobId) return;
			while (mediaQueue.length > 0) {
				const jobId = mediaQueue.shift();
				const job = jobId ? jobs.get(jobId) : void 0;
				const runtime = jobId ? runtimes.get(jobId) : void 0;
				if (!jobId || !job || !runtime || job.status !== "queued") continue;
				reservedMediaJobId = jobId;
				if (runtime.saveStrategy === "file-system") {
					job.status = "awaiting-destination";
					job.acknowledged = false;
				} else startReservedJob(jobId);
				return;
			}
		}
		function returnFileAccessToReady(job, message) {
			job.error = {
				code: "file-access",
				message
			};
			job.phase = void 0;
			job.status = "ready";
			job.acknowledged = false;
		}
		function cleanupAttempt(runtime) {
			runtime.abortController = void 0;
			runtime.sink = void 0;
			runtime.saveStrategy = void 0;
		}
		function flushProgressTimer(runtime) {
			if (runtime.progressTimer) {
				clearTimeout(runtime.progressTimer);
				runtime.progressTimer = void 0;
			}
		}
		function isCurrent(jobId, generation) {
			return runtimes.get(jobId)?.generation === generation;
		}
		function getRuntime(jobId) {
			const runtime = runtimes.get(jobId);
			if (!runtime) throw new Error(`Missing runtime for download job ${jobId}.`);
			return runtime;
		}
		return {
			acknowledgeAttention,
			cancel,
			chooseDestination,
			clearInactive,
			getActivitySummary,
			getSnapshot,
			inspectClip,
			remove,
			requestDownload,
			retry,
			subscribe(listener) {
				listeners.add(listener);
				return () => {
					listeners.delete(listener);
				};
			},
			updateBasename
		};
	}
	function createJobId() {
		const id = `clip-download-${nextJobNumber}`;
		nextJobNumber += 1;
		return id;
	}
	function removeFromQueue(queue, jobId) {
		const index = queue.indexOf(jobId);
		if (index !== -1) queue.splice(index, 1);
	}
	function activitySummariesEqual(left, right) {
		return left.activeCount === right.activeCount && left.attention === right.attention && left.error === right.error && left.queuedCount === right.queuedCount && left.visible === right.visible;
	}
	var downloadManager = createDownloadManager({
		createBlobSink,
		createFileSystemSink,
		downloadMediaPlan,
		getSaveFilePicker,
		inspectClip,
		now: Date.now
	});
	var listeners = new Set();
	var snapshot = { open: false };
	function publish(update) {
		snapshot = update;
		for (const listener of listeners) listener();
	}
	function openDownloadCenterForClip(clipId, pageUrl = window.location.href) {
		const jobId = downloadManager.inspectClip(clipId, pageUrl);
		openDownloadCenter(jobId);
		return jobId;
	}
	function openDownloadCenter(focusedJobId) {
		downloadManager.acknowledgeAttention();
		publish({
			focusedJobId: focusedJobId ?? snapshot.focusedJobId,
			open: true
		});
	}
	function focusDownloadJob(focusedJobId) {
		publish({
			focusedJobId,
			open: snapshot.open
		});
	}
	function minimizeDownloadCenter() {
		publish({
			...snapshot,
			open: false
		});
	}
	function getDownloadCenterSnapshot() {
		return snapshot;
	}
	function subscribeDownloadCenter(listener) {
		listeners.add(listener);
		return () => {
			listeners.delete(listener);
		};
	}
	var MINIMUM_ESTIMATE_AGE_MS = 1e3;
	function estimateDownloadTransfer(fetchedBytes, totalBytes, startedAt, now) {
		if (fetchedBytes <= 0 || startedAt === void 0 || now - startedAt < MINIMUM_ESTIMATE_AGE_MS) return;
		const bytesPerSecond = fetchedBytes / ((now - startedAt) / 1e3);
		if (!Number.isFinite(bytesPerSecond) || bytesPerSecond <= 0) return;
		const remainingBytes = totalBytes === void 0 ? void 0 : Math.max(0, totalBytes - fetchedBytes);
		return {
			bytesPerSecond,
			remainingSeconds: remainingBytes === void 0 || remainingBytes === 0 ? void 0 : remainingBytes / bytesPerSecond
		};
	}
	var subscribeDownloads = (listener) => downloadManager.subscribe(listener);
	var getDownloadsSnapshot = () => downloadManager.getSnapshot();
	var getDownloadActivity = () => downloadManager.getActivitySummary();
	function useDownloads() {
		return useStoreSnapshot(subscribeDownloads, getDownloadsSnapshot);
	}
	function useDownloadActivity() {
		return useStoreSnapshot(subscribeDownloads, getDownloadActivity);
	}
	function useDownloadCenter() {
		return useStoreSnapshot(subscribeDownloadCenter, getDownloadCenterSnapshot);
	}
	function useStoreSnapshot(subscribe, getSnapshot) {
		const [snapshot, setSnapshot] = d(getSnapshot);
		h(() => {
			const updateSnapshot = () => {
				setSnapshot(getSnapshot());
			};
			const unsubscribe = subscribe(updateSnapshot);
			updateSnapshot();
			return unsubscribe;
		}, [getSnapshot, subscribe]);
		return snapshot;
	}
	var MEMORY_WARNING_BYTES = 128 * 1024 * 1024;
	var CLIP_DATE_FORMATTER = new Intl.DateTimeFormat(void 0, {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
	var COUNT_FORMATTER = new Intl.NumberFormat();
	var DOWNLOAD_COLUMNS = [
		{
			header: "Clip",
			id: "clip",
			renderCell: (job) => u("div", {
				className: "ke-download-queue__clip",
				children: [job.thumbnailUrl ? u("img", {
					alt: "",
					className: "ke-download-queue__thumbnail",
					referrerPolicy: "no-referrer",
					src: job.thumbnailUrl
				}) : null, u("span", {
					className: "ke-download-queue__title",
					children: job.title ?? job.clipId
				})]
			}),
			width: "minmax(12rem, 1fr)"
		},
		{
			align: "center",
			header: "Channel",
			id: "channel",
			renderCell: (job) => job.channel ?? "Unknown",
			width: "9rem"
		},
		{
			align: "center",
			header: "Status",
			id: "status",
			renderCell: (job) => u("span", {
				className: "ke-download-queue__status",
				"data-status": job.status,
				children: formatStatus(job)
			}),
			width: "9rem"
		},
		{
			align: "center",
			header: "Duration",
			id: "duration",
			renderCell: (job) => formatDuration(job.media?.duration),
			width: "5.5rem"
		},
		{
			align: "center",
			header: "Size",
			id: "size",
			renderCell: (job) => job.media?.sourceBytes ? formatBytes(job.media.sourceBytes) : "Unknown",
			width: "6.5rem"
		}
	];
	function clearInactiveDownloads() {
		downloadManager.clearInactive();
		closeDownloadCenterIfEmpty();
	}
	function removeDownload(jobId) {
		downloadManager.remove(jobId);
		closeDownloadCenterIfEmpty();
	}
	function closeDownloadCenterIfEmpty() {
		if (downloadManager.getSnapshot().jobs.length === 0) minimizeDownloadCenter();
	}
	function DownloadCenter() {
		const center = useDownloadCenter();
		const { activeCount } = useDownloadActivity();
		const { jobs } = useDownloads();
		const [activeTab, setActiveTab] = d("selected");
		const listedJobs = jobs.filter((job) => job.media !== void 0);
		const focusedJob = jobs.find(({ id }) => id === center.focusedJobId) ?? jobs.at(-1);
		h(() => {
			if (center.open && !focusedJob) minimizeDownloadCenter();
		}, [center.open, focusedJob]);
		h(() => {
			if (center.open && focusedJob && focusedJob.id !== center.focusedJobId) focusDownloadJob(focusedJob.id);
		}, [
			center.focusedJobId,
			center.open,
			focusedJob
		]);
		h(() => {
			if (center.open && center.focusedJobId) setActiveTab("selected");
		}, [center.focusedJobId, center.open]);
		return u(Modal, {
			className: "ke-workspace-modal ke-download-center",
			closeLabel: "Close Download Manager",
			description: "Manage clip downloads.",
			footer: u(S, { children: [u(Button, {
				disabled: !jobs.some((job) => [
					"cancelled",
					"completed",
					"failed",
					"ready"
				].includes(job.status)),
				onClick: clearInactiveDownloads,
				children: "Clear inactive"
			}), u(Button, {
				className: "ke-button--primary",
				onClick: minimizeDownloadCenter,
				children: "Hide"
			})] }),
			icon: icon_default,
			onRequestClose: minimizeDownloadCenter,
			open: center.open,
			title: "Download Manager",
			children: u(Tabs, {
				ariaLabel: "Download Manager views",
				className: "ke-download-center__tabs",
				onChange: setActiveTab,
				tabs: [{
					content: focusedJob ? u(DownloadJobDetail, { job: focusedJob }) : u("div", {
						className: "ke-download-center__placeholder",
						children: "No clip selected."
					}),
					contentClassName: "ke-download-center__selected-panel",
					disabled: !focusedJob,
					id: "selected",
					label: "Selected",
					panelAriaLabel: "Selected clip download details"
				}, {
					content: u(DownloadQueue, {
						focusedJobId: focusedJob?.id,
						jobs: listedJobs,
						onSelect: (jobId) => {
							focusDownloadJob(jobId);
							setActiveTab("selected");
						}
					}),
					contentClassName: "ke-download-center__downloads-panel",
					id: "downloads",
					label: u("span", {
						className: "ke-download-center__tab-label",
						children: ["Downloads", activeCount > 0 ? u(LoadingSpinnerIcon, { class: "ke-icon ke-download-center__activity-indicator ke-icon--spinner" }) : null]
					}),
					panelAriaLabel: "Clip download queue and history"
				}],
				value: activeTab
			})
		});
	}
	function DownloadQueue({ focusedJobId, jobs, onSelect }) {
		return u(ListView, {
			ariaLabel: "Clip downloads",
			ariaLive: "polite",
			className: "ke-download-queue",
			columns: DOWNLOAD_COLUMNS,
			emptyContent: null,
			getItemKey: (job) => job.id,
			getRowAriaLabel: (job) => `View ${job.title ?? job.clipId}, ${formatStatus(job)}`,
			getRowClassName: (job) => job.id === focusedJobId ? "ke-download-queue__row--selected" : void 0,
			items: jobs,
			onItemActivate: (job) => onSelect(job.id)
		});
	}
	function DownloadJobDetail({ job }) {
		if (job.status === "inspecting") return u("section", {
			"aria-live": "polite",
			className: "ke-download-detail-loading",
			role: "status",
			children: [u(LoadingSpinnerIcon, { class: "ke-icon ke-download-detail-loading__icon ke-icon--spinner" }), u("p", { children: "Loading clip…" })]
		});
		return u("article", {
			className: "ke-download-detail",
			children: [
				u("section", {
					className: `ke-download-detail__summary${job.thumbnailUrl ? "" : " has-no-thumbnail"}`,
					children: [job.thumbnailUrl ? u("div", {
						className: "ke-download-detail__thumbnail-frame",
						children: u("img", {
							alt: "",
							className: "ke-download-detail__thumbnail",
							referrerPolicy: "no-referrer",
							src: job.thumbnailUrl
						})
					}) : null, u("div", {
						className: "ke-download-detail__overview",
						children: [u("header", {
							className: "ke-download-detail__header",
							children: u("div", {
								className: "ke-download-detail__identity",
								children: [
									job.category || job.publishedAt ? u("div", {
										className: "ke-download-detail__context",
										children: [job.category ? u("span", {
											className: "ke-download-detail__category",
											children: job.category
										}) : null, job.publishedAt ? u("time", {
											dateTime: new Date(job.publishedAt).toISOString(),
											children: CLIP_DATE_FORMATTER.format(job.publishedAt)
										}) : null]
									}) : null,
									u("h3", {
										className: "ke-download-detail__title",
										children: job.channel ? u("a", {
											className: "ke-download-detail__title-link",
											href: `https://kick.com/${encodeURIComponent(job.channel)}/clips/${encodeURIComponent(job.clipId)}`,
											rel: "noreferrer",
											target: "_blank",
											children: job.title ?? "KICK clip"
										}) : job.title ?? "KICK clip"
									}),
									u("p", {
										className: "ke-download-detail__metadata",
										children: [job.channel ? u("a", {
											className: "ke-download-detail__channel",
											href: `https://kick.com/${encodeURIComponent(job.channel)}`,
											rel: "noreferrer",
											target: "_blank",
											children: job.channel
										}) : "Unknown channel", job.creator ? u(S, { children: [u("span", {
											"aria-hidden": "true",
											className: "ke-download-detail__separator",
											children: "–"
										}), u("span", { children: [
											"Clipped by",
											" ",
											u("a", {
												className: "ke-download-detail__creator",
												href: `https://kick.com/${encodeURIComponent(job.creator)}`,
												rel: "noreferrer",
												target: "_blank",
												children: job.creator
											})
										] })] }) : null]
									})
								]
							})
						}), job.media ? u(MediaFacts, { job }) : null]
					})]
				}),
				job.status === "ready" ? u(ReadyView, { job }) : null,
				job.status === "queued" ? u(StatusPanel, {
					message: `Waiting in queue${job.queuePosition ? ` (position ${job.queuePosition})` : ""}.`,
					children: u(Button, {
						onClick: () => downloadManager.cancel(job.id),
						children: "Cancel"
					})
				}) : null,
				job.status === "awaiting-destination" ? u(StatusPanel, {
					message: "This download is next. Choose its destination to start.",
					children: [u(Button, {
						className: "ke-button--primary",
						onClick: () => {
							downloadManager.chooseDestination(job.id);
						},
						children: "Choose file and start"
					}), u(Button, {
						onClick: () => downloadManager.cancel(job.id),
						children: "Cancel"
					})]
				}) : null,
				job.status === "choosing-destination" ? u(StatusPanel, {
					icon: true,
					message: "Waiting for a file destination…"
				}) : null,
				job.status === "active" ? u(ActiveView, { job }) : null,
				job.status === "completed" ? u(TerminalView, {
					job,
					message: `Saved ${job.filename}`,
					primaryLabel: "Download again"
				}) : null,
				job.status === "failed" ? u(TerminalView, {
					job,
					message: job.error?.message ?? "The clip download failed.",
					primaryLabel: "Retry"
				}) : null,
				job.status === "cancelled" ? u(TerminalView, {
					job,
					message: "The download was cancelled.",
					primaryLabel: "Retry"
				}) : null
			]
		});
	}
	function ReadyView({ job }) {
		const hasFilePicker = Boolean(getSaveFilePicker());
		const isLargeFallback = job.media?.sourceBytes !== void 0 && job.media.sourceBytes >= MEMORY_WARNING_BYTES;
		return u("form", {
			className: "ke-download-ready",
			onSubmit: (event) => {
				event.preventDefault();
				downloadManager.requestDownload(job.id, hasFilePicker ? "file-system" : "memory");
			},
			children: [
				u(TextField, {
					label: "Output filename",
					maxLength: 180,
					onValueChange: (value) => downloadManager.updateBasename(job.id, value),
					suffix: ".mp4",
					value: job.basename
				}),
				job.error ? u("p", {
					className: "ke-download-message is-error",
					role: "alert",
					children: job.error.message
				}) : null,
				!hasFilePicker && isLargeFallback ? u("p", {
					className: "ke-download-message is-warning",
					children: "This browser must keep the final MP4 in memory. The clip is unusually large, so close memory-heavy tabs before continuing."
				}) : null,
				hasFilePicker ? u("p", {
					className: "ke-download-message",
					children: "If you select an existing file, the browser may clear it before processing finishes."
				}) : null,
				u("div", {
					className: "ke-download-actions",
					children: [
						u(Button, {
							className: "ke-button--primary",
							type: "submit",
							children: "Download"
						}),
						hasFilePicker ? u(Button, {
							onClick: () => downloadManager.requestDownload(job.id, "memory"),
							children: "Use memory download"
						}) : null,
						u(Button, {
							onClick: () => removeDownload(job.id),
							children: "Remove"
						})
					]
				})
			]
		});
	}
	function ActiveView({ job }) {
		const total = job.media?.sourceBytes;
		const percentage = total && total > 0 ? Math.min(100, job.writtenBytes / total * 100) : void 0;
		return u("section", {
			className: "ke-download-active",
			children: [u("div", {
				className: "ke-download-progress",
				children: [u("div", {
					className: "ke-download-progress__heading",
					children: [u("span", { children: job.phase === "fetching" ? formatFetchingStatus(job, Date.now()) : formatPhase(job.phase) }), u("span", { children: [formatBytes(job.writtenBytes), total ? ` of ${formatBytes(total)} - ${percentage?.toFixed(1)}%` : ` - ${job.completedSegments}/${job.media?.logicalSegmentCount ?? "?"} segments`] })]
				}), u("progress", {
					"aria-label": "Download progress",
					className: "ke-download-progress__bar",
					max: total ?? void 0,
					value: total ? job.writtenBytes : void 0
				})]
			}), u("div", {
				className: "ke-download-actions",
				children: u(Button, {
					tone: "danger",
					onClick: () => downloadManager.cancel(job.id),
					children: "Cancel"
				})
			})]
		});
	}
	function TerminalView({ job, message, primaryLabel }) {
		return u(StatusPanel, {
			error: job.status === "failed",
			message,
			children: [u(Button, {
				className: "ke-button--primary",
				onClick: () => downloadManager.retry(job.id),
				children: primaryLabel
			}), u(Button, {
				onClick: () => removeDownload(job.id),
				children: "Remove"
			})]
		});
	}
	function MediaFacts({ job }) {
		const media = job.media;
		if (!media) return null;
		return u("dl", {
			className: "ke-download-facts",
			children: [
				u("div", { children: [u("dt", { children: "Duration" }), u("dd", { children: formatDuration(media.duration) })] }),
				u("div", { children: [u("dt", { children: "Download size" }), u("dd", { children: [media.sourceBytes ? formatBytes(media.sourceBytes) : "Unknown", u("span", {
					className: "ke-download-facts__secondary",
					children: [
						" ",
						"(",
						media.logicalSegmentCount,
						" ",
						media.logicalSegmentCount === 1 ? "segment" : "segments",
						")"
					]
				})] })] }),
				job.viewCount !== void 0 ? u("div", { children: [u("dt", { children: "Views" }), u("dd", { children: COUNT_FORMATTER.format(job.viewCount) })] }) : null,
				job.likeCount !== void 0 ? u("div", { children: [u("dt", { children: "Likes" }), u("dd", { children: COUNT_FORMATTER.format(job.likeCount) })] }) : null
			]
		});
	}
	function StatusPanel({ children, error = false, icon = false, message }) {
		return u("section", {
			className: "ke-download-status",
			children: [u("p", {
				className: `ke-download-message${error ? " is-error" : ""}`,
				role: error ? "alert" : "status",
				children: [icon ? u(LoadingSpinnerIcon, { class: "ke-icon ke-icon--spinner" }) : null, u("span", { children: message })]
			}), children ? u("div", {
				className: "ke-download-actions",
				children
			}) : null]
		});
	}
	function formatStatus(job) {
		return {
			active: formatPhase(job.phase),
			"awaiting-destination": "Choose file",
			cancelled: "Cancelled",
			"choosing-destination": "Choosing file",
			completed: "Completed",
			failed: "Failed",
			inspecting: "Inspecting",
			queued: job.queuePosition ? `Queued ${job.queuePosition}` : "Queued",
			ready: "Ready"
		}[job.status];
	}
	function formatPhase(phase) {
		return phase ? {
			fetching: "Downloading",
			inspecting: "Inspecting",
			transmuxing: "Converting to MP4",
			writing: "Writing MP4"
		}[phase] : "Working";
	}
	function formatFetchingStatus(job, now) {
		const segmentCount = job.media?.logicalSegmentCount;
		const label = segmentCount && segmentCount > 1 ? `Segment ${Math.min(segmentCount, job.completedSegments + 1)}/${segmentCount}` : "Downloading";
		const estimate = estimateDownloadTransfer(job.fetchedBytes, job.media?.sourceBytes, job.startedAt, now);
		if (!estimate) return label;
		const remaining = estimate.remainingSeconds === void 0 ? "" : ` - ${formatRemainingTime(estimate.remainingSeconds)} remaining`;
		return `${label}: ${formatBytes(estimate.bytesPerSecond)}/s${remaining}`;
	}
	function formatRemainingTime(duration) {
		const seconds = Math.max(1, Math.ceil(duration));
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor(seconds % 3600 / 60);
		const remainingSeconds = seconds % 60;
		if (hours > 0) return `${hours}h ${minutes}m`;
		if (minutes > 0) return `${minutes}m ${remainingSeconds}s`;
		return `${remainingSeconds}s`;
	}
	function formatBytes(bytes) {
		if (bytes < 1024) return `${bytes} B`;
		const units = [
			"KiB",
			"MiB",
			"GiB"
		];
		let value = bytes / 1024;
		let unit = units[0];
		for (let index = 1; index < units.length && value >= 1024; index += 1) {
			value /= 1024;
			unit = units[index];
		}
		return `${value.toFixed(value >= 100 ? 0 : 1)} ${unit}`;
	}
	function formatDuration(duration) {
		if (!duration) return "Unknown";
		const seconds = Math.round(duration);
		return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
	}
	function createClipCardReconciler({ isCardConnected, isMountConnected, mount, resolve, unmount, update }) {
		const mountedByCard = new WeakMap();
		const mountedCards = new Set();
		function removeMountedCard(mounted) {
			unmount(mounted.mount);
			mountedByCard.delete(mounted.card);
			mountedCards.delete(mounted);
		}
		function reconcile(card) {
			const mounted = mountedByCard.get(card);
			const resolution = resolve(card);
			if (!resolution) {
				if (mounted) removeMountedCard(mounted);
				return;
			}
			if (mounted && mounted.container === resolution.container && isMountConnected(mounted.mount)) {
				if (mounted.clipId !== resolution.clipId) {
					mounted.clipId = resolution.clipId;
					update(mounted.mount, resolution);
				}
				return;
			}
			if (mounted) removeMountedCard(mounted);
			const mountedCard = {
				card,
				clipId: resolution.clipId,
				container: resolution.container,
				mount: mount(resolution)
			};
			mountedByCard.set(card, mountedCard);
			mountedCards.add(mountedCard);
		}
		return {
			reconcile,
			removeDisconnected() {
				for (const mounted of mountedCards) if (!isCardConnected(mounted.card) || !isMountConnected(mounted.mount)) removeMountedCard(mounted);
			},
			teardown() {
				for (const mounted of [...mountedCards]) removeMountedCard(mounted);
			}
		};
	}
	var clipDownloads_default = ".ke-clip-download-host {\n  display: contents;\n}\n\n.ke-download-center-host {\n  display: contents;\n}\n\n.ke-direct-clip-download-host {\n  position: relative;\n  display: flex;\n  flex: 0 0 auto;\n}\n\n.ke-direct-clip-download-action {\n  display: flex;\n  box-sizing: border-box;\n  width: auto;\n  height: 2.5rem;\n  flex: 0 0 auto;\n  align-items: center;\n  justify-content: center;\n  padding: 0 0.5rem;\n  gap: 0.15rem;\n  border: 0;\n  border-radius: 0.25rem;\n  outline: 0;\n  background: #212931;\n  color: var(--neon-secondary-onSecondary, #fff);\n  cursor: pointer;\n  transition: none;\n}\n.ke-direct-clip-download-action:hover {\n  background: #2d3442;\n}\n.ke-direct-clip-download-action:focus-visible {\n  outline: 2px solid #fff;\n  outline-offset: 2px;\n}\n.ke-direct-clip-download-action:active {\n  transform: scale(0.95);\n}\n.ke-direct-clip-download-action__brand {\n  display: block;\n  width: 1.05rem;\n  height: 1.05rem;\n  flex: 0 0 auto;\n  object-fit: contain;\n  pointer-events: none;\n}\n.ke-direct-clip-download-action__icon {\n  display: block;\n  width: 1rem;\n  height: 1rem;\n  flex: 0 0 auto;\n  pointer-events: none;\n}\n\n.ke-direct-clip-download-tooltip {\n  position: absolute;\n  z-index: 1000;\n  bottom: calc(100% + 0.5rem);\n  left: 50%;\n  width: max-content;\n  max-width: 16rem;\n  padding: 0.35rem 0.5rem;\n  visibility: hidden;\n  border-radius: 0.25rem;\n  background: #232629;\n  color: #fff;\n  font-size: 0.75rem;\n  font-weight: 600;\n  line-height: 1.25;\n  opacity: 0;\n  pointer-events: none;\n  transform: translateX(-50%);\n}\n.ke-direct-clip-download-tooltip::after {\n  position: absolute;\n  top: 100%;\n  left: 50%;\n  border: 0.3rem solid transparent;\n  border-top-color: #232629;\n  content: \"\";\n  transform: translateX(-50%);\n}\n\n.ke-direct-clip-download-host:hover .ke-direct-clip-download-tooltip,\n.ke-direct-clip-download-host:focus-within .ke-direct-clip-download-tooltip {\n  visibility: visible;\n  opacity: 1;\n}\n\n.ke-clip-download-action {\n  position: absolute;\n  top: 4px;\n  right: 4px;\n  z-index: 203;\n  display: flex;\n  box-sizing: border-box;\n  align-items: center;\n  justify-content: center;\n  width: 1.75rem;\n  height: 1.75rem;\n  padding: 0;\n  border: 0;\n  border-radius: 4px;\n  outline: 0;\n  background: rgba(0, 0, 0, 0.82);\n  color: #fff;\n  backdrop-filter: blur(2px);\n  cursor: pointer;\n  transition: none;\n}\n.ke-clip-download-action:hover {\n  border: 0;\n  background: rgba(0, 0, 0, 0.82);\n  box-shadow: none;\n  color: #53fc18;\n  transform: none;\n}\n.ke-clip-download-action:hover > .ke-clip-download-action__icon {\n  transform: none;\n}\n.ke-clip-download-action:focus-visible {\n  outline: 2px solid #fff;\n  outline-offset: 2px;\n}\n.ke-clip-download-action:active {\n  transform: scale(0.94);\n}\n.ke-clip-download-action__icon {\n  display: block;\n  width: 1.125rem;\n  height: 1.125rem;\n  pointer-events: none;\n  transition: none;\n}";
	var downloadCenter_default = ".ke-modal.ke-download-center {\n  --ke-workspace-modal-height: 36rem;\n  --ke-workspace-modal-width: 68rem;\n}\n\n.ke-download-center__tabs {\n  min-width: 0;\n  min-height: 0;\n}\n\n.ke-download-center__tab-label {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.ke-download-center__activity-indicator {\n  color: #53fc18;\n}\n\n.ke-tabs__panel-content.ke-download-center__selected-panel {\n  width: 100%;\n  height: 100%;\n  min-height: 100%;\n  padding: 0;\n}\n\n.ke-tabs__panel-content.ke-download-center__downloads-panel {\n  position: relative;\n  min-height: 100%;\n  padding: 0;\n}\n\n.ke-download-center__placeholder {\n  margin: 0;\n  padding: 1rem;\n  color: #8c8c8c;\n  font-size: 0.8rem;\n  text-align: center;\n}\n\n.ke-list-view.ke-download-queue {\n  position: absolute;\n  inset: 0;\n  border: 0;\n  border-radius: 0;\n  background-color: #080808;\n}\n\n.ke-download-queue__clip {\n  display: flex;\n  min-width: 0;\n  align-items: center;\n  gap: 0.65rem;\n}\n\n.ke-download-queue__thumbnail {\n  width: 3.5rem;\n  aspect-ratio: 16/9;\n  flex: 0 0 auto;\n  border-radius: 0.25rem;\n  object-fit: cover;\n  background: #0a0a0a;\n}\n\n.ke-download-queue__title {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  color: #f2f2f2;\n  font-weight: 700;\n}\n\n.ke-download-queue .ke-list-view__row {\n  min-height: 0;\n}\n\n.ke-download-queue__row--selected {\n  box-shadow: inset 0.2rem 0 #53fc18;\n}\n\n.ke-download-queue__status {\n  display: inline-flex;\n  max-width: 100%;\n  align-items: center;\n  padding: 0.15rem 0.45rem;\n  overflow: hidden;\n  border: 1px solid #303030;\n  border-radius: 0.3rem;\n  color: #8c8c8c;\n  font-size: 0.68rem;\n  font-weight: 700;\n  line-height: 1.35;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.ke-download-queue__status[data-status=active], .ke-download-queue__status[data-status=ready] {\n  border-color: rgba(83, 252, 24, 0.4);\n  color: #53fc18;\n}\n.ke-download-queue__status[data-status=awaiting-destination], .ke-download-queue__status[data-status=choosing-destination], .ke-download-queue__status[data-status=inspecting], .ke-download-queue__status[data-status=queued] {\n  border-color: rgba(242, 184, 75, 0.4);\n  color: #f2b84b;\n}\n.ke-download-queue__status[data-status=completed] {\n  border-color: rgba(101, 169, 255, 0.4);\n  color: #65a9ff;\n}\n.ke-download-queue__status[data-status=failed] {\n  border-color: rgba(255, 107, 107, 0.45);\n  color: #ff6b6b;\n}\n\n.ke-download-detail {\n  display: flex;\n  min-height: 100%;\n  flex-direction: column;\n  padding: 1.5rem;\n  gap: 1.5rem;\n}\n\n.ke-download-detail-loading {\n  display: flex;\n  width: 100%;\n  height: 100%;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  gap: 0.65rem;\n  color: #8c8c8c;\n}\n.ke-download-detail-loading p {\n  margin: 0;\n  font-size: 0.8rem;\n}\n\n.ke-download-detail-loading__icon {\n  width: 1.35rem;\n  height: 1.35rem;\n  color: #f2f2f2;\n}\n\n.ke-download-detail__summary {\n  display: grid;\n  min-width: 0;\n  grid-template-columns: minmax(18rem, 24rem) minmax(0, 1fr);\n  align-items: start;\n  gap: 1.5rem;\n}\n.ke-download-detail__summary.has-no-thumbnail {\n  grid-template-columns: minmax(0, 1fr);\n}\n\n.ke-download-detail__overview {\n  min-width: 0;\n  padding-top: 0;\n}\n\n.ke-download-detail__header {\n  display: flex;\n  min-width: 0;\n  align-items: center;\n  gap: 0.9rem;\n}\n\n.ke-download-detail__thumbnail-frame {\n  position: relative;\n  min-width: 0;\n  min-height: 0;\n  aspect-ratio: 16/9;\n  overflow: hidden;\n  border-radius: 0.25rem;\n  background: #0a0a0a;\n}\n\n.ke-download-detail__thumbnail {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n.ke-download-detail__identity {\n  min-width: 0;\n  overflow: hidden;\n}\n\n.ke-download-detail__context {\n  display: flex;\n  min-width: 0;\n  align-items: center;\n  flex-wrap: wrap;\n  margin-bottom: 0.65rem;\n  gap: 0.55rem;\n  color: #747474;\n  font-size: 0.72rem;\n  font-weight: 500;\n}\n\n.ke-download-detail__category {\n  max-width: 100%;\n  padding: 0.12rem 0.45rem;\n  overflow: hidden;\n  border: 1px solid rgba(83, 252, 24, 0.4);\n  border-radius: 0.3rem;\n  color: #53fc18;\n  font-size: 0.68rem;\n  font-weight: 750;\n  line-height: 1.35;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.ke-download-detail__title {\n  width: 100%;\n  margin: 0;\n  overflow: hidden;\n  color: #f2f2f2;\n  font-size: 1.1rem;\n  font-weight: 700;\n  line-height: 1.25;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.ke-download-detail__title-link {\n  display: block;\n  overflow: hidden;\n  color: inherit;\n  text-decoration: none;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.ke-download-detail__title-link:hover {\n  text-decoration: underline;\n}\n\n.ke-download-detail__metadata {\n  display: flex;\n  align-items: baseline;\n  flex-wrap: wrap;\n  margin: 0.45rem 0 0;\n  gap: 0.4rem;\n  color: #8c8c8c;\n  font-size: 0.8rem;\n  font-weight: 500;\n}\n\n.ke-download-detail__channel,\n.ke-download-detail__creator {\n  text-decoration: none;\n}\n.ke-download-detail__channel:hover,\n.ke-download-detail__creator:hover {\n  text-decoration: underline;\n}\n\n.ke-download-detail__channel {\n  color: #53fc18;\n}\n\n.ke-download-detail__separator {\n  color: #747474;\n}\n\n.ke-download-detail__creator {\n  color: #f2f2f2;\n  font-weight: 650;\n}\n\n.ke-download-facts {\n  display: grid;\n  margin: 1rem 0 0;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  border-top: 1px solid #1b1b1b;\n  border-bottom: 1px solid #1b1b1b;\n}\n.ke-download-facts div {\n  display: grid;\n  min-width: 0;\n  align-content: start;\n  padding: 0.65rem 0;\n  gap: 0.2rem;\n}\n.ke-download-facts div:nth-child(even) {\n  padding-left: 1rem;\n  border-left: 1px solid #1b1b1b;\n}\n.ke-download-facts div:nth-child(n+3) {\n  border-top: 1px solid #1b1b1b;\n}\n.ke-download-facts dt {\n  color: #747474;\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 0.035em;\n  text-transform: uppercase;\n}\n.ke-download-facts dd {\n  margin: 0;\n  color: #f2f2f2;\n  font-size: 0.86rem;\n  font-weight: 700;\n  font-variant-numeric: tabular-nums;\n}\n\n.ke-download-facts__secondary {\n  color: #8c8c8c;\n  font-size: inherit;\n  font-weight: 600;\n  white-space: nowrap;\n}\n\n.ke-download-ready,\n.ke-download-active,\n.ke-download-status {\n  display: grid;\n  width: 100%;\n  min-height: 3.85rem;\n  grid-template-columns: minmax(0, 1fr) auto;\n  align-items: center;\n  margin-top: auto;\n  padding-top: 1.5rem;\n  border-top: 1px solid #1b1b1b;\n  gap: 1rem;\n}\n\n.ke-download-ready {\n  align-items: end;\n}\n.ke-download-ready > .ke-form-field .ke-form-field__label {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border: 0;\n}\n.ke-download-ready > .ke-download-message {\n  grid-column: 1/-1;\n}\n.ke-download-ready > .ke-download-actions {\n  grid-column: 2;\n  grid-row: 1;\n}\n\n.ke-download-active > .ke-download-actions {\n  align-self: stretch;\n  align-items: center;\n  padding-left: 1rem;\n  border-left: 1px solid #1b1b1b;\n}\n\n.ke-download-actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.65rem;\n}\n\n.ke-download-message {\n  display: flex;\n  align-items: center;\n  margin: 0;\n  gap: 0.55rem;\n  color: #8c8c8c;\n  font-size: 0.8rem;\n  line-height: 1.5;\n}\n.ke-download-message.is-error {\n  color: #ff6b6b;\n}\n.ke-download-message.is-warning {\n  padding: 0.65rem 0.75rem;\n  border: 1px solid #6c5528;\n  border-radius: 0.45rem;\n  background: #19150d;\n  color: #f5c451;\n}\n\n.ke-icon--spinner {\n  width: 1rem;\n  height: 1rem;\n  flex: 0 0 auto;\n  animation: ke-icon-spin 800ms linear infinite;\n}\n\n.ke-download-progress__heading {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  color: #f2f2f2;\n  font-size: 0.78rem;\n  font-variant-numeric: tabular-nums;\n}\n\n.ke-download-progress {\n  display: grid;\n  min-width: 0;\n  gap: 0.55rem;\n}\n\n.ke-download-progress__bar {\n  width: 100%;\n  height: 0.55rem;\n  overflow: hidden;\n  appearance: none;\n  border: 0;\n  border-radius: 999px;\n  background: #1b1b1b;\n}\n.ke-download-progress__bar::-webkit-progress-bar {\n  background: #1b1b1b;\n}\n.ke-download-progress__bar::-webkit-progress-value {\n  background: #53fc18;\n}\n.ke-download-progress__bar::-moz-progress-bar {\n  background: #53fc18;\n}\n\n@keyframes ke-icon-spin {\n  to {\n    transform: rotate(1turn);\n  }\n}\n@media (max-width: 44rem) {\n  .ke-download-detail__summary {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  .ke-download-detail__overview {\n    padding-top: 0;\n  }\n  .ke-download-detail__thumbnail-frame {\n    display: none;\n  }\n}\n@media (max-width: 34rem) {\n  .ke-download-queue .ke-list-view__header,\n  .ke-download-queue .ke-list-view__row {\n    grid-template-columns: minmax(12rem, 1fr) 9rem !important;\n  }\n  .ke-download-queue :is(.ke-list-view__header-cell,\n  .ke-list-view__cell)[data-column-id=channel],\n  .ke-download-queue :is(.ke-list-view__header-cell,\n  .ke-list-view__cell)[data-column-id=duration],\n  .ke-download-queue :is(.ke-list-view__header-cell,\n  .ke-list-view__cell)[data-column-id=size] {\n    display: none;\n  }\n  .ke-download-detail {\n    padding: 1rem;\n    gap: 1rem;\n  }\n  .ke-download-detail__thumbnail-frame {\n    width: 100%;\n  }\n  .ke-download-ready,\n  .ke-download-active,\n  .ke-download-status {\n    min-height: 0;\n    grid-template-columns: 1fr;\n  }\n  .ke-download-ready > .ke-download-actions,\n  .ke-download-active > .ke-download-actions,\n  .ke-download-status > .ke-download-actions {\n    grid-column: 1;\n    grid-row: auto;\n  }\n  .ke-download-active > .ke-download-actions {\n    padding-top: 1rem;\n    padding-left: 0;\n    border-top: 1px solid #1b1b1b;\n    border-left: 0;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .ke-icon--spinner {\n    animation: none;\n  }\n}";
	var STYLE_ID$6 = "kick-enhancer-clip-download-styles";
	var CENTER_HOST_ID = "kick-enhancer-download-center";
	var ACTION_SELECTOR = "[data-ke-clip-download]";
	var HOST_SELECTOR = "[data-ke-clip-download-host]";
	var DIRECT_ACTION_ANCHOR_SELECTOR = "[data-testid=\"follow-button\"]";
	var DIRECT_HOST_SELECTOR = "[data-ke-direct-clip-download-host]";
	var CHATROOM_MESSAGES_SELECTOR$1 = "#chatroom-messages";
	var log$8 = createLogger("clip-downloads");
	var stopActiveIntegration;
	function defaultSelectClip(clipId) {
		log$8.info("Manager opened", { clipId });
		openDownloadCenterForClip(clipId);
	}
	function installStyles$1() {
		installSharedUiStyles();
		if (document.getElementById(STYLE_ID$6)) return;
		const style = document.createElement("style");
		style.id = STYLE_ID$6;
		style.textContent = `${clipDownloads_default}\n${downloadCenter_default}`;
		document.documentElement.append(style);
	}
	function mountDownloadCenter() {
		if (document.getElementById(CENTER_HOST_ID) || !document.body) return;
		const host = document.createElement("span");
		host.id = CENTER_HOST_ID;
		host.className = "ke-download-center-host";
		document.body.append(host);
		R(u(DownloadCenter, {}), host);
	}
	function startClipDownloadActions(onSelectClip = defaultSelectClip) {
		stopActiveIntegration?.();
		let observer;
		let actionsVisible = getSettings().ui.showClipDownloadButtons;
		let directActionClipId;
		let directActionHost;
		let lastUrl = window.location.href;
		let stopped = false;
		const reconciler = createClipCardReconciler({
			isCardConnected: (card) => card.isConnected,
			isMountConnected: (host) => host.isConnected,
			mount: ({ card, clipId, container }) => {
				for (const staleAction of card.querySelectorAll(ACTION_SELECTOR)) staleAction.remove();
				for (const staleHost of card.querySelectorAll(HOST_SELECTOR)) staleHost.remove();
				const host = document.createElement("span");
				host.className = "ke-clip-download-host";
				host.setAttribute("data-ke-clip-download-host", "");
				container.append(host);
				R(u(ClipDownloadAction, {
					clipId,
					onSelectClip
				}), host);
				return host;
			},
			resolve: (card) => {
				const clipId = getClipIdFromCard(card, window.location.origin);
				const container = card.querySelector(CLIP_MODAL_BUTTON_SELECTOR)?.parentElement;
				return clipId && container ? {
					card,
					clipId,
					container
				} : void 0;
			},
			unmount: (host) => {
				R(null, host);
				host.remove();
			},
			update: (host, { clipId }) => {
				R(u(ClipDownloadAction, {
					clipId,
					onSelectClip
				}), host);
			}
		});
		const scheduler = createBatchedCardScheduler((cards) => {
			if (stopped || !actionsVisible) return;
			reconciler.removeDisconnected();
			for (const card of cards) if (card?.isConnected) reconciler.reconcile(card);
		});
		function removeDirectClipAction() {
			if (!directActionHost) return;
			R(null, directActionHost);
			directActionHost.remove();
			directActionClipId = void 0;
			directActionHost = void 0;
		}
		function reconcileDirectClipAction() {
			if (directActionHost && !directActionHost.isConnected) {
				R(null, directActionHost);
				directActionClipId = void 0;
				directActionHost = void 0;
			}
			const clipId = actionsVisible ? getClipIdFromHref(window.location.href, window.location.origin) : void 0;
			const anchor = clipId ? document.querySelector(DIRECT_ACTION_ANCHOR_SELECTOR) : void 0;
			const container = anchor?.parentElement;
			if (!clipId || !anchor || !container) {
				removeDirectClipAction();
				return;
			}
			if (directActionHost && directActionHost.parentElement === container) {
				if (directActionClipId !== clipId) {
					R(u(DirectClipDownloadAction, {
						clipId,
						onSelectClip
					}), directActionHost);
					directActionClipId = clipId;
				}
				return;
			}
			removeDirectClipAction();
			for (const staleHost of document.querySelectorAll(DIRECT_HOST_SELECTOR)) staleHost.remove();
			const host = document.createElement("span");
			host.className = "ke-direct-clip-download-host";
			host.setAttribute("data-ke-direct-clip-download-host", "");
			anchor.after(host);
			R(u(DirectClipDownloadAction, {
				clipId,
				onSelectClip
			}), host);
			directActionClipId = clipId;
			directActionHost = host;
		}
		function enqueueClosestCard(element) {
			const card = element.closest(CLIP_CARD_SELECTOR);
			if (card) scheduler.enqueue(card);
		}
		function enqueueCardsFromSubtree(node) {
			if (!(node instanceof Element)) return;
			enqueueClosestCard(node);
			for (const card of node.querySelectorAll(CLIP_CARD_SELECTOR)) scheduler.enqueue(card);
		}
		function handleMutations(records) {
			const currentUrl = window.location.href;
			let directSurfaceChanged = currentUrl !== lastUrl || Boolean(directActionHost && !directActionHost.isConnected);
			let shouldCleanDisconnectedActions = false;
			lastUrl = currentUrl;
			for (const record of records) {
				const target = record.target instanceof Element ? record.target : record.target.parentElement;
				if (target?.closest(CHATROOM_MESSAGES_SELECTOR$1)) continue;
				if (record.type === "attributes") {
					enqueueClosestCard(record.target);
					directSurfaceChanged ||= target?.matches(DIRECT_ACTION_ANCHOR_SELECTOR) ?? false;
					continue;
				}
				if (record.removedNodes.length > 0) {
					shouldCleanDisconnectedActions = true;
					for (const node of record.removedNodes) directSurfaceChanged ||= nodeTouchesSelector(node, DIRECT_ACTION_ANCHOR_SELECTOR);
				}
				enqueueClosestCard(record.target);
				for (const node of record.addedNodes) {
					enqueueCardsFromSubtree(node);
					directSurfaceChanged ||= nodeTouchesSelector(node, DIRECT_ACTION_ANCHOR_SELECTOR);
				}
			}
			if (shouldCleanDisconnectedActions) scheduler.enqueue(void 0);
			if (directSurfaceChanged) reconcileDirectClipAction();
		}
		function reconcileExistingActions() {
			reconcileDirectClipAction();
			for (const card of document.querySelectorAll(CLIP_CARD_SELECTOR)) scheduler.enqueue(card);
		}
		function connectActionObserver() {
			if (stopped || !actionsVisible || observer || !document.documentElement) return;
			lastUrl = window.location.href;
			reconcileExistingActions();
			observer = new MutationObserver(handleMutations);
			observer.observe(document.documentElement, {
				attributeFilter: ["href"],
				attributes: true,
				childList: true,
				subtree: true
			});
		}
		function disconnectActionObserver() {
			observer?.disconnect();
			observer = void 0;
			reconciler.teardown();
			removeDirectClipAction();
		}
		function beginObserving() {
			if (stopped) return;
			installStyles$1();
			mountDownloadCenter();
			connectActionObserver();
		}
		const stopWaitingForDocument = onDocumentElementReady(beginObserving);
		const stopWatchingSettings = observeSetting((settings) => settings.ui.showClipDownloadButtons, (visible) => {
			if (actionsVisible === visible) return;
			actionsVisible = visible;
			if (!visible) {
				disconnectActionObserver();
				return;
			}
			connectActionObserver();
		});
		const stop = () => {
			if (stopped) return;
			stopped = true;
			stopWaitingForDocument();
			disconnectActionObserver();
			stopWatchingSettings?.();
			scheduler.cancel();
			const centerHost = document.getElementById(CENTER_HOST_ID);
			if (centerHost) {
				R(null, centerHost);
				centerHost.remove();
			}
			document.getElementById(STYLE_ID$6)?.remove();
			if (stopActiveIntegration === stop) stopActiveIntegration = void 0;
		};
		stopActiveIntegration = stop;
		return stop;
	}
	function nodeTouchesSelector(node, selector) {
		return node instanceof Element && (node.matches(selector) || Boolean(node.querySelector(selector)));
	}
	var startFollowingRecommendationsVisibility = createStyleSettingFeature({
		id: "kick-enhancer-hide-following-recommendations",
		selectEnabled: (settings) => settings.ui.hideFollowingRecommendations,
		styles: "[data-testid=following] [data-testid=followed-livestreams] + section {\n  display: none !important;\n}"
	});
	var gamblingStreams_default = "[data-testid=followed-livestreams] [data-testid=livestream-results-card]:has(a[href=\"/category/slots\"]),\n#sidebar-wrapper [data-kick-enhancer-gambling-stream] {\n  display: none !important;\n}";
	var STYLE_ID$4 = "kick-enhancer-hide-gambling-streams";
	var SIDEBAR_GAMBLING_ATTRIBUTE = "data-kick-enhancer-gambling-stream";
	var SIDEBAR_FOLLOWING_SELECTOR = "a[data-testid^=\"sidebar-following-channel-\"]";
	var GAMBLING_SURFACE_SELECTOR = ["[data-testid=\"followed-livestreams\"]", "#sidebar-wrapper"].join(", ");
	var CHATROOM_MESSAGES_SELECTOR = "#chatroom-messages";
	var gamblingStreamsHidden = false;
	var featureActive$1 = false;
	var sidebarScanFrame;
	var stopActiveFeature$3;
	function applyGamblingStreamsVisibility(hidden) {
		applyStyleToggle(STYLE_ID$4, gamblingStreams_default, hidden);
	}
	function getFollowedGamblingChannelPaths() {
		const paths = new Set();
		for (const card of document.querySelectorAll("[data-testid=\"followed-livestreams\"] [data-testid=\"livestream-results-card\"]:has(a[href=\"/category/slots\"])")) {
			const path = card.querySelector("a[data-testid=\"media-card-thumbnail\"]")?.getAttribute("href");
			if (path) paths.add(path);
		}
		return paths;
	}
	function isSlotsAndCasinoRow(link, gamblingChannelPaths) {
		const path = link.getAttribute("href");
		if (path && gamblingChannelPaths.has(path)) return true;
		for (const span of link.querySelectorAll("span")) if (span.textContent?.trim() === "Slots & Casino") return true;
		return false;
	}
	function updateSidebarRows() {
		sidebarScanFrame = void 0;
		if (!gamblingStreamsHidden) {
			for (const row of document.querySelectorAll(`[${SIDEBAR_GAMBLING_ATTRIBUTE}]`)) row.removeAttribute(SIDEBAR_GAMBLING_ATTRIBUTE);
			return;
		}
		const gamblingChannelPaths = getFollowedGamblingChannelPaths();
		for (const link of document.querySelectorAll(SIDEBAR_FOLLOWING_SELECTOR)) (link.closest("button") ?? link).toggleAttribute(SIDEBAR_GAMBLING_ATTRIBUTE, isSlotsAndCasinoRow(link, gamblingChannelPaths));
	}
	function scheduleSidebarScan() {
		if (!featureActive$1 || sidebarScanFrame !== void 0) return;
		sidebarScanFrame = window.requestAnimationFrame(updateSidebarRows);
	}
	function mutationsTouchGamblingSurfaces(records) {
		for (const record of records) {
			const target = record.target instanceof Element ? record.target : record.target.parentElement;
			if (target?.closest(CHATROOM_MESSAGES_SELECTOR)) continue;
			if (target?.closest(GAMBLING_SURFACE_SELECTOR)) return true;
			for (const node of record.addedNodes) if (node instanceof Element && (node.matches(GAMBLING_SURFACE_SELECTOR) || node.querySelector(GAMBLING_SURFACE_SELECTOR))) return true;
			for (const node of record.removedNodes) if (node instanceof Element && (node.matches(GAMBLING_SURFACE_SELECTOR) || node.querySelector(GAMBLING_SURFACE_SELECTOR))) return true;
		}
		return false;
	}
	function startGamblingStreamsVisibility() {
		stopActiveFeature$3?.();
		featureActive$1 = true;
		const observer = new MutationObserver((records) => {
			if (gamblingStreamsHidden && mutationsTouchGamblingSurfaces(records)) scheduleSidebarScan();
		});
		function cancelSidebarScan() {
			if (sidebarScanFrame === void 0) return;
			window.cancelAnimationFrame(sidebarScanFrame);
			sidebarScanFrame = void 0;
		}
		function setVisibility(hidden) {
			if (gamblingStreamsHidden === hidden) return;
			gamblingStreamsHidden = hidden;
			applyGamblingStreamsVisibility(hidden);
			if (hidden) {
				observer.observe(document.documentElement, {
					characterData: true,
					childList: true,
					subtree: true
				});
				scheduleSidebarScan();
				return;
			}
			observer.disconnect();
			cancelSidebarScan();
			updateSidebarRows();
		}
		const stopObserving = observeSetting((settings) => settings.ui.hideGamblingStreams, setVisibility);
		let stopped = false;
		const stop = () => {
			if (stopped) return;
			stopped = true;
			featureActive$1 = false;
			observer.disconnect();
			stopObserving();
			cancelSidebarScan();
			gamblingStreamsHidden = false;
			applyGamblingStreamsVisibility(false);
			updateSidebarRows();
			if (stopActiveFeature$3 === stop) stopActiveFeature$3 = void 0;
		};
		stopActiveFeature$3 = stop;
		return stop;
	}
	var startHomepageCarouselVisibility = createStyleSettingFeature({
		id: "kick-enhancer-hide-homepage-carousel",
		selectEnabled: (settings) => settings.ui.hideHomepageCarousel,
		styles: "#main-container main div:has(> [data-testid=carousel]),\n#main-container main div:has(> div > [aria-hidden=true].invisible.aspect-video) {\n  display: none !important;\n}"
	});
	var startRecommendedChannelsVisibility = createStyleSettingFeature({
		id: "kick-enhancer-hide-recommended-channels",
		selectEnabled: (settings) => settings.ui.hideRecommendedChannels,
		styles: "#sidebar-wrapper section:has([data-testid^=sidebar-recommended-channel-]),\n#sidebar-wrapper section:has([data-testid^=sidebar-recommended-channel-]) + div:has([data-testid*=recommended]) {\n  display: none !important;\n}"
	});
	var SIDEBAR_BUTTON_SELECTOR = [
		"button[aria-controls=\"sidebar-wrapper\"]",
		"button[aria-label=\"Collapse sidebar\"]",
		"button[aria-label=\"Expand sidebar\"]",
		"button[data-testid=\"sidebar-collapse\"]",
		"button[data-testid=\"sidebar-expand\"]"
	].join(", ");
	var log$7 = createLogger("sidebar");
	var activeLayout = null;
	var featureActive = false;
	var rememberSidebarState = false;
	var restoreRequested = false;
	var restoreTarget;
	var stopActiveFeature$2;
	function getSidebarButton() {
		return document.querySelector(SIDEBAR_BUTTON_SELECTOR);
	}
	function getSidebarLayout() {
		return document.querySelector("[data-sidebar][data-chat][data-theatre]") ?? document.querySelector("[data-sidebar]");
	}
	function getCollapsedState() {
		const sidebarVisible = getSidebarLayout()?.getAttribute("data-sidebar");
		if (sidebarVisible === "true") return false;
		if (sidebarVisible === "false") return true;
		const expanded = getSidebarButton()?.getAttribute("aria-expanded");
		if (expanded === "true") return false;
		if (expanded === "false") return true;
	}
	function attemptRestore() {
		if (!featureActive || !restoreRequested || !rememberSidebarState) return;
		const collapsed = getCollapsedState();
		if (collapsed === void 0) return;
		const rememberedCollapsed = getSettings().ui.sidebarCollapsed;
		if (collapsed === rememberedCollapsed) {
			restoreRequested = false;
			return;
		}
		const button = getSidebarButton();
		if (!button) return;
		restoreRequested = false;
		restoreTarget = rememberedCollapsed;
		log$7.info("Restoring state", { collapsed: rememberedCollapsed });
		button.click();
	}
	function requestRestore() {
		if (!featureActive || !rememberSidebarState) return;
		restoreRequested = true;
		restoreTarget = void 0;
		queueMicrotask(attemptRestore);
	}
	function rememberCollapsedState(collapsed) {
		if (getSettings().ui.sidebarCollapsed === collapsed) return;
		log$7.info("State saved", { collapsed });
		updateSettings((settings) => ({
			...settings,
			ui: {
				...settings.ui,
				sidebarCollapsed: collapsed
			}
		}));
	}
	function setRememberSidebarState(enabled) {
		const collapsed = enabled ? getCollapsedState() : void 0;
		log$7.info(enabled ? "Memory enabled" : "Memory disabled");
		return updateSettings((settings) => ({
			...settings,
			ui: {
				...settings.ui,
				rememberSidebarState: enabled,
				sidebarCollapsed: collapsed ?? settings.ui.sidebarCollapsed
			}
		}));
	}
	function startSidebarStateMemory() {
		stopActiveFeature$2?.();
		featureActive = true;
		rememberSidebarState = getSettings().ui.rememberSidebarState;
		let observerConnected = false;
		const observer = new MutationObserver((records) => {
			const layout = getSidebarLayout();
			if (layout !== activeLayout) {
				activeLayout = layout;
				if (rememberSidebarState) requestRestore();
			}
			if (records.some((record) => record.type === "attributes" && record.attributeName === "data-sidebar" && record.target === layout)) {
				const collapsed = getCollapsedState();
				if (collapsed === void 0) return;
				if (restoreTarget !== void 0) {
					if (collapsed === restoreTarget) restoreTarget = void 0;
					return;
				}
				if (restoreRequested) {
					attemptRestore();
					return;
				}
				if (rememberSidebarState) rememberCollapsedState(collapsed);
			}
			if (restoreRequested && records.some((record) => record.type === "childList")) attemptRestore();
		});
		function connectObserver() {
			if (observerConnected || !featureActive || !rememberSidebarState) return;
			activeLayout = getSidebarLayout();
			observer.observe(document.documentElement, {
				attributeFilter: ["data-sidebar"],
				attributes: true,
				childList: true,
				subtree: true
			});
			observerConnected = true;
			requestRestore();
		}
		function disconnectObserver() {
			if (observerConnected) {
				observer.disconnect();
				observerConnected = false;
			}
			activeLayout = null;
			restoreRequested = false;
			restoreTarget = void 0;
		}
		const stopObserving = subscribeSettings((settings) => {
			if (settings.ui.rememberSidebarState === rememberSidebarState) return;
			rememberSidebarState = settings.ui.rememberSidebarState;
			if (rememberSidebarState) connectObserver();
			else disconnectObserver();
		});
		if (rememberSidebarState) connectObserver();
		let stopped = false;
		const stop = () => {
			if (stopped) return;
			stopped = true;
			featureActive = false;
			disconnectObserver();
			stopObserving();
			rememberSidebarState = false;
			if (stopActiveFeature$2 === stop) stopActiveFeature$2 = void 0;
		};
		stopActiveFeature$2 = stop;
		return stop;
	}
	function createBrowserAcquisitionTiming() {
		return {
			cancelInterval: (handle) => window.clearInterval(handle),
			cancelTimeout: (handle) => window.clearTimeout(handle),
			now: Date.now,
			scheduleInterval: (callback, delay) => window.setInterval(callback, delay),
			scheduleTimeout: (callback, delay) => window.setTimeout(callback, delay)
		};
	}
	var RESERVED_ROUTES = new Set([
		"about",
		"browse",
		"category",
		"dashboard",
		"following",
		"privacy",
		"search",
		"settings",
		"subscriptions",
		"terms"
	]);
	var SLUG_PATTERN = /^[a-z0-9][a-z0-9_-]*$/i;
	function normalizeChannelSlug(value) {
		if (typeof value !== "string") return;
		const normalized = safeDecode(value).trim().toLowerCase();
		if (!normalized || RESERVED_ROUTES.has(normalized) || !SLUG_PATTERN.test(normalized)) return;
		return normalized;
	}
	function getChannelSlugFromHref(href) {
		if (!href) return;
		try {
			const url = new URL(href, window.location.href);
			if (url.hostname !== "kick.com" && url.hostname !== "www.kick.com") return;
			return getChannelSlugFromPath(url.pathname);
		} catch {
			return;
		}
	}
	function getChannelSlugFromPath(pathname) {
		const segments = pathname.split("/").filter(Boolean);
		if (segments.length !== 1) return;
		return normalizeChannelSlug(segments[0]);
	}
	function safeDecode(value) {
		try {
			return decodeURIComponent(value);
		} catch {
			return value;
		}
	}
	var MAX_CLOCK_SKEW_MS = 300 * 1e3;
	var KICK_UTC_TIMESTAMP_PATTERN = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(?:\.\d+)?$/;
	function parseStreamStartedAt(value) {
		if (typeof value !== "string") return;
		const trimmed = value.trim();
		if (!trimmed) return;
		const normalized = KICK_UTC_TIMESTAMP_PATTERN.test(trimmed) ? `${trimmed.replace(" ", "T")}Z` : trimmed;
		const timestamp = Date.parse(normalized);
		return Number.isFinite(timestamp) && timestamp >= 0 ? timestamp : void 0;
	}
	function formatStreamUptime(startedAt, now = Date.now()) {
		if (!Number.isFinite(startedAt) || !Number.isFinite(now) || startedAt > now + MAX_CLOCK_SKEW_MS) return;
		const totalMinutes = Math.floor(Math.max(0, now - startedAt) / (60 * 1e3));
		if (totalMinutes < 1) return "<1m";
		if (totalMinutes < 60) return `${totalMinutes}m`;
		const totalHours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;
		if (totalHours < 24) return minutes > 0 ? `${totalHours}h ${minutes}m` : `${totalHours}h`;
		const days = Math.floor(totalHours / 24);
		const hours = totalHours % 24;
		return hours > 0 ? `${days}d ${hours}h` : `${days}d`;
	}
	var SOURCE_BY_ENDPOINT = {
		CHANNEL_DETAILS: "channel-details",
		FEATURED_LIVESTREAMS: "featured",
		FOLLOWED_CHANNELS: "followed-channels",
		PAGINATED_RECOMMENDED_LIVESTREAMS: "recommendations",
		RECOMMENDED_LIVESTREAMS: "recommendations",
		SIDEBAR_LIVESTREAMS: "sidebar-recommendations",
		USER_LIVESTREAMS: "user-livestreams"
	};
	function normalizeViewerCountPayload(endpoint, payload, capturedAt) {
		if (endpoint === "CURRENT_VIEWERS") return {
			currentViewers: normalizeCurrentViewers(payload, capturedAt),
			kind: "current-viewers"
		};
		const source = SOURCE_BY_ENDPOINT[endpoint];
		let values;
		if (endpoint === "SIDEBAR_LIVESTREAMS" || endpoint === "FEATURED_LIVESTREAMS" || endpoint === "PAGINATED_RECOMMENDED_LIVESTREAMS") values = readNestedArray(payload, "data", "livestreams");
		else if (endpoint === "RECOMMENDED_LIVESTREAMS") values = readNestedArray(payload, "data");
		else if (endpoint === "FOLLOWED_CHANNELS") values = readNestedArray(payload, "channels");
		else if (endpoint === "USER_LIVESTREAMS") values = Array.isArray(payload) ? payload : [];
		else values = [payload];
		return {
			kind: "streams",
			streams: values.map((value) => normalizeStream(endpoint, source, value, capturedAt)).filter((stream) => stream !== void 0)
		};
	}
	function normalizeStream(endpoint, source, value, capturedAt) {
		if (!isRecord$1(value)) return;
		if (endpoint === "CHANNEL_DETAILS") return normalizeChannelDetails(value, source, capturedAt);
		if (endpoint === "FOLLOWED_CHANNELS") return normalizeFollowedChannel(value, source, capturedAt);
		if (endpoint === "USER_LIVESTREAMS") return normalizeUserLivestream(value, source, capturedAt);
		return normalizeRecommendation(value, source, capturedAt);
	}
	function normalizeChannelDetails(channel, source, capturedAt) {
		if (!isRecord$1(channel.livestream)) return;
		const livestream = channel.livestream;
		const livestreamChannel = isRecord$1(livestream.channel) ? livestream.channel : void 0;
		const channelSlug = normalizeChannelSlug(channel.slug) ?? normalizeChannelSlug(livestreamChannel?.slug);
		const viewerCount = readCount(livestream.viewer_count) ?? readCount(livestream.viewers);
		const startedAt = readStreamStartedAt(livestream);
		if (!channelSlug || viewerCount === void 0) return;
		return createRecord({
			capturedAt,
			channelId: readId(channel.id) ?? readId(livestream.channel_id),
			channelSlug,
			isLive: readBoolean(livestream.is_live ?? channel.is_live, true),
			livestreamId: readId(livestream.id),
			showViewCount: readBoolean(livestream.show_view_count ?? channel.show_view_count, true),
			source,
			...startedAt === void 0 ? {} : { startedAt },
			viewerCount
		});
	}
	function normalizeFollowedChannel(channel, source, capturedAt) {
		const channelSlug = normalizeChannelSlug(channel.channel_slug);
		const viewerCount = readCount(channel.viewer_count);
		const isLive = readBoolean(channel.is_live, false);
		const startedAt = readStreamStartedAt(channel);
		if (!channelSlug || viewerCount === void 0 || !isLive) return;
		return createRecord({
			capturedAt,
			channelSlug,
			isLive,
			showViewCount: readBoolean(channel.show_view_count, true),
			source,
			...startedAt === void 0 ? {} : { startedAt },
			viewerCount
		});
	}
	function normalizeUserLivestream(livestream, source, capturedAt) {
		const channel = isRecord$1(livestream.channel) ? livestream.channel : void 0;
		const channelSlug = normalizeChannelSlug(channel?.slug);
		const viewerCount = readCount(livestream.viewer_count) ?? readCount(livestream.viewers);
		const isLive = readBoolean(livestream.is_live, false);
		const startedAt = readStreamStartedAt(livestream);
		if (!channelSlug || viewerCount === void 0 || !isLive) return;
		return createRecord({
			capturedAt,
			channelId: readId(channel?.id) ?? readId(livestream.channel_id),
			channelSlug,
			isLive,
			livestreamId: readId(livestream.id),
			showViewCount: readBoolean(livestream.show_view_count, true),
			source,
			...startedAt === void 0 ? {} : { startedAt },
			viewerCount
		});
	}
	function normalizeRecommendation(livestream, source, capturedAt) {
		const channel = isRecord$1(livestream.channel) ? livestream.channel : void 0;
		const channelSlug = normalizeChannelSlug(channel?.slug);
		const viewerCount = readCount(livestream.viewer_count);
		const startedAt = readStreamStartedAt(livestream);
		if (!channelSlug || viewerCount === void 0) return;
		return createRecord({
			capturedAt,
			channelId: readId(channel?.id),
			channelSlug,
			isLive: true,
			livestreamId: readId(livestream.id),
			showViewCount: readBoolean(livestream.show_view_count, true),
			source,
			...startedAt === void 0 ? {} : { startedAt },
			viewerCount
		});
	}
	function readStreamStartedAt(stream) {
		return parseStreamStartedAt(stream.start_time) ?? parseStreamStartedAt(stream.started_at) ?? parseStreamStartedAt(stream.created_at);
	}
	function normalizeCurrentViewers(payload, capturedAt) {
		if (!Array.isArray(payload)) return [];
		return payload.map((value) => {
			if (!isRecord$1(value)) return;
			const livestreamId = readId(value.livestream_id);
			const viewerCount = readCount(value.viewers);
			if (livestreamId === void 0 || viewerCount === void 0) return;
			const showViewCount = typeof value.show_view_count === "boolean" ? value.show_view_count : void 0;
			return {
				capturedAt,
				livestreamId,
				...showViewCount === void 0 ? {} : { showViewCount },
				viewerCount
			};
		}).filter((entry) => entry !== void 0);
	}
	function createRecord(record) {
		return record;
	}
	function readNestedArray(value, ...path) {
		let current = value;
		for (const key of path) {
			if (!isRecord$1(current)) return [];
			current = current[key];
		}
		return Array.isArray(current) ? current : [];
	}
	function readCount(value) {
		if (typeof value !== "number" || !Number.isFinite(value) || value < 0) return;
		return Math.floor(value);
	}
	function readId(value) {
		const numericValue = typeof value === "string" && /^(0|[1-9]\d*)$/.test(value) ? Number(value) : value;
		if (typeof numericValue !== "number" || !Number.isSafeInteger(numericValue) || numericValue < 0) return;
		return numericValue;
	}
	function readBoolean(value, fallback) {
		if (typeof value === "boolean") return value;
		if (value === 0 || value === "0" || value === "false") return false;
		if (value === 1 || value === "1" || value === "true") return true;
		return fallback;
	}
	function isRecord$1(value) {
		return typeof value === "object" && value !== null;
	}
	async function requestViewerJson(url, signal) {
		const startedAt = performance.now();
		try {
			const response = await fetch(url, {
				credentials: "include",
				headers: {
					Accept: "application/json",
					"x-app-platform": "web"
				},
				signal
			});
			const durationMs = performance.now() - startedAt;
			if (!response.ok) return {
				durationMs,
				httpStatus: response.status,
				kind: "failed",
				summary: `KICK returned HTTP ${response.status}.`
			};
			try {
				const payload = await response.json();
				return {
					durationMs,
					httpStatus: response.status,
					kind: "passed",
					payload
				};
			} catch (error) {
				if (signal.aborted || isAbortError(error)) throw error;
				return {
					durationMs,
					httpStatus: response.status,
					kind: "failed",
					summary: "KICK returned a response that was not valid JSON."
				};
			}
		} catch (error) {
			if (signal.aborted || isAbortError(error)) throw error;
			return {
				durationMs: performance.now() - startedAt,
				kind: "failed",
				summary: "Network request failed before KICK responded."
			};
		}
	}
	function isAbortError(error) {
		return error instanceof DOMException && error.name === "AbortError";
	}
	var VIEWER_COUNT_ENDPOINTS = [
		"CHANNEL_DETAILS",
		"CURRENT_VIEWERS",
		"FOLLOWED_CHANNELS",
		"USER_LIVESTREAMS",
		"SIDEBAR_LIVESTREAMS",
		"RECOMMENDED_LIVESTREAMS",
		"PAGINATED_RECOMMENDED_LIVESTREAMS",
		"FEATURED_LIVESTREAMS"
	];
	var VIEWER_COUNT_ENDPOINT_LABELS = {
		CHANNEL_DETAILS: "Channel details",
		CURRENT_VIEWERS: "Current viewers",
		FEATURED_LIVESTREAMS: "Featured streams",
		FOLLOWED_CHANNELS: "Followed channels",
		PAGINATED_RECOMMENDED_LIVESTREAMS: "Discovery list",
		RECOMMENDED_LIVESTREAMS: "Recommended streams",
		SIDEBAR_LIVESTREAMS: "Sidebar streams",
		USER_LIVESTREAMS: "User livestreams"
	};
	var OBSERVATION_NOTIFY_INTERVAL_MS = 200;
	var log$6 = createLogger("diagnostics");
	var observations = new Map();
	var observationListeners = new Set();
	var observationNotifyTimer;
	function recordViewerEndpointObservation(endpoint, normalized, observedAt, source) {
		const streams = normalized.kind === "streams" ? normalized.streams : [];
		const records = normalized.kind === "streams" ? streams.length : normalized.currentViewers.length;
		const observation = {
			endpoint,
			hiddenViewerCounts: normalized.kind === "streams" ? streams.filter((stream) => !stream.showViewCount).length : normalized.currentViewers.filter((entry) => entry.showViewCount === false).length,
			observedAt,
			records,
			source,
			startTimes: streams.filter((stream) => stream.startedAt !== void 0).length
		};
		observations.set(endpoint, observation);
		scheduleObservationNotification();
		return observation;
	}
	function getViewerEndpointObservations() {
		return VIEWER_COUNT_ENDPOINTS.flatMap((endpoint) => {
			const observation = observations.get(endpoint);
			return observation ? [observation] : [];
		});
	}
	function subscribeViewerEndpointObservations(listener) {
		observationListeners.add(listener);
		return () => {
			observationListeners.delete(listener);
			if (observationListeners.size === 0 && observationNotifyTimer !== void 0) {
				globalThis.clearTimeout(observationNotifyTimer);
				observationNotifyTimer = void 0;
			}
		};
	}
	function scheduleObservationNotification() {
		if (observationListeners.size === 0 || observationNotifyTimer !== void 0) return;
		observationNotifyTimer = globalThis.setTimeout(() => {
			observationNotifyTimer = void 0;
			notifyObservationListeners();
		}, OBSERVATION_NOTIFY_INTERVAL_MS);
	}
	async function runViewerEndpointChecks(rawSlug, signal) {
		const slug = normalizeChannelSlug(rawSlug);
		if (!slug) return [{
			endpoint: "CHANNEL_DETAILS",
			status: "failed",
			summary: "Enter a valid KICK channel name."
		}, unavailableCurrentViewers("Channel check did not run.")];
		log$6.info("Checks started", { slug });
		const channelResponse = await requestViewerJson(new URL(`/api/v2/channels/${encodeURIComponent(slug)}`, window.location.origin), signal);
		if (channelResponse.kind === "failed") {
			const results = [{
				durationMs: channelResponse.durationMs,
				endpoint: "CHANNEL_DETAILS",
				...channelResponse.httpStatus === void 0 ? {} : { httpStatus: channelResponse.httpStatus },
				status: "failed",
				summary: channelResponse.summary
			}, unavailableCurrentViewers("No livestream ID was available for this check.")];
			log$6.warn("Checks failed", {
				endpoint: "CHANNEL_DETAILS",
				slug
			});
			return results;
		}
		const capturedAt = Date.now();
		const normalized = normalizeViewerCountPayload("CHANNEL_DETAILS", channelResponse.payload, capturedAt);
		const stream = normalized.kind === "streams" ? normalized.streams.find((entry) => entry.channelSlug === slug && entry.isLive) : void 0;
		if (!stream) {
			const offline = isOfflineChannelPayload(channelResponse.payload);
			const results = [{
				durationMs: channelResponse.durationMs,
				endpoint: "CHANNEL_DETAILS",
				httpStatus: channelResponse.httpStatus,
				status: offline ? "unavailable" : "degraded",
				summary: offline ? "Channel resolved, but it is not live." : "Response was reachable but no usable live stream was found."
			}, unavailableCurrentViewers(offline ? "The channel is offline." : "The channel response did not expose a livestream ID.")];
			log$6.info("Checks complete", {
				status: results[0].status,
				slug
			});
			return results;
		}
		const channelCheck = {
			durationMs: channelResponse.durationMs,
			endpoint: "CHANNEL_DETAILS",
			httpStatus: channelResponse.httpStatus,
			status: stream.livestreamId === void 0 ? "degraded" : "passed",
			summary: [
				`viewers=${stream.viewerCount.toLocaleString()}`,
				`count=${stream.showViewCount ? "public" : "hidden"}`,
				`started=${stream.startedAt === void 0 ? "no" : "yes"}`,
				`livestream=${stream.livestreamId ?? "missing"}`
			].join("; ")
		};
		if (stream.livestreamId === void 0) return [channelCheck, unavailableCurrentViewers("The live response did not include a livestream ID.")];
		const viewersUrl = new URL("/current-viewers", window.location.origin);
		viewersUrl.searchParams.append("ids[]", String(stream.livestreamId));
		const viewersResponse = await requestViewerJson(viewersUrl, signal);
		if (viewersResponse.kind === "failed") {
			const result = {
				durationMs: viewersResponse.durationMs,
				endpoint: "CURRENT_VIEWERS",
				...viewersResponse.httpStatus === void 0 ? {} : { httpStatus: viewersResponse.httpStatus },
				status: "failed",
				summary: viewersResponse.summary
			};
			log$6.warn("Checks failed", {
				endpoint: "CURRENT_VIEWERS",
				slug
			});
			return [channelCheck, result];
		}
		const current = normalizeViewerCountPayload("CURRENT_VIEWERS", viewersResponse.payload, Date.now());
		const entry = current.kind === "current-viewers" ? current.currentViewers.find(({ livestreamId }) => livestreamId === stream.livestreamId) : void 0;
		const currentCheck = {
			durationMs: viewersResponse.durationMs,
			endpoint: "CURRENT_VIEWERS",
			httpStatus: viewersResponse.httpStatus,
			status: entry ? "passed" : "degraded",
			summary: entry ? `viewers=${entry.viewerCount.toLocaleString()}` : "No matching viewer record."
		};
		log$6.info("Checks complete", {
			status: currentCheck.status,
			slug
		});
		return [channelCheck, currentCheck];
	}
	function notifyObservationListeners() {
		const snapshot = getViewerEndpointObservations();
		for (const listener of observationListeners) try {
			listener(snapshot);
		} catch (error) {
			console.error("[KICK Enhancer] Endpoint observation listener failed.", error);
		}
	}
	function unavailableCurrentViewers(summary) {
		return {
			endpoint: "CURRENT_VIEWERS",
			status: "unavailable",
			summary
		};
	}
	function isOfflineChannelPayload(payload) {
		return typeof payload === "object" && payload !== null && "livestream" in payload && payload.livestream === null;
	}
	var CHANNEL_FETCH_CONCURRENCY = 5;
	var RETRY_COOLDOWN_MS = 60 * 1e3;
	var log$5 = createLogger("viewer-counts:network");
	var ChannelDetailsScheduler = class {
		#getOrigin;
		#inFlightSlugs = new Map();
		#onActiveChannelResolved;
		#onData;
		#queuedSlugs = new Set();
		#request;
		#retryAfterBySlug = new Map();
		#store;
		#targetSlugs = new Set();
		#timing;
		#abortController = new AbortController();
		#activeChannelSlug;
		#activeFetches = 0;
		#enabled = false;
		#generation = 0;
		#retryTimer;
		constructor({ getOrigin = () => window.location.origin, onActiveChannelResolved, onData, request = requestViewerJson, store, timing }) {
			this.#getOrigin = getOrigin;
			this.#onActiveChannelResolved = onActiveChannelResolved;
			this.#onData = onData;
			this.#request = request;
			this.#store = store;
			this.#timing = timing;
		}
		start() {
			this.#enabled = true;
		}
		stop() {
			if (!this.#enabled) return;
			this.#enabled = false;
			this.#resetRouteState();
			this.#retryAfterBySlug.clear();
			if (this.#retryTimer !== void 0) {
				this.#timing.cancelTimeout(this.#retryTimer);
				this.#retryTimer = void 0;
			}
		}
		resetRoute() {
			if (this.#enabled) this.#resetRouteState();
		}
		syncTargets(channelSlugs, activeChannelSlug) {
			if (!this.#enabled) return;
			this.#targetSlugs.clear();
			for (const slug of channelSlugs) this.#targetSlugs.add(slug);
			this.#activeChannelSlug = activeChannelSlug;
			const now = this.#timing.now();
			for (const slug of this.#queuedSlugs) if (!this.#targetSlugs.has(slug)) this.#queuedSlugs.delete(slug);
			for (const [slug, retryAfter] of this.#retryAfterBySlug) if (retryAfter <= now && !this.#targetSlugs.has(slug) && !this.#inFlightSlugs.has(slug)) this.#retryAfterBySlug.delete(slug);
			for (const slug of channelSlugs) if (needsChannelDetails(this.#store.get(slug, now), slug === activeChannelSlug)) this.#queue(slug);
			else this.#queuedSlugs.delete(slug);
			this.#pumpQueue();
		}
		#resetRouteState() {
			this.#generation += 1;
			this.#abortController.abort();
			this.#abortController = new AbortController();
			this.#activeChannelSlug = void 0;
			this.#queuedSlugs.clear();
			this.#targetSlugs.clear();
			this.#inFlightSlugs.clear();
		}
		#queue(slug) {
			const now = this.#timing.now();
			if (this.#queuedSlugs.has(slug) || this.#inFlightSlugs.has(slug)) return;
			const retryAfter = this.#retryAfterBySlug.get(slug);
			if (retryAfter !== void 0 && retryAfter > now) {
				this.#scheduleRetry(retryAfter - now);
				return;
			}
			this.#queuedSlugs.add(slug);
		}
		#pumpQueue() {
			while (this.#enabled && this.#activeFetches < CHANNEL_FETCH_CONCURRENCY && this.#queuedSlugs.size > 0) {
				const slug = this.#queuedSlugs.values().next().value;
				if (!slug) return;
				this.#queuedSlugs.delete(slug);
				const stream = this.#store.get(slug, this.#timing.now());
				if (!this.#targetSlugs.has(slug) || !needsChannelDetails(stream, slug === this.#activeChannelSlug)) continue;
				const generation = this.#generation;
				this.#activeFetches += 1;
				this.#inFlightSlugs.set(slug, generation);
				this.#fetch(slug, generation).finally(() => {
					this.#activeFetches -= 1;
					if (this.#inFlightSlugs.get(slug) === generation) this.#inFlightSlugs.delete(slug);
					this.#pumpQueue();
				});
			}
		}
		async #fetch(slug, generation) {
			const requestUrl = new URL(`/api/v2/channels/${encodeURIComponent(slug)}`, this.#getOrigin());
			try {
				const response = await this.#request(requestUrl, this.#abortController.signal);
				if (response.kind === "failed") throw new Error(response.summary);
				if (!this.#enabled || generation !== this.#generation) return;
				const capturedAt = this.#timing.now();
				const normalized = normalizeViewerCountPayload("CHANNEL_DETAILS", response.payload, capturedAt);
				recordViewerEndpointObservation("CHANNEL_DETAILS", normalized, capturedAt, "fallback");
				if (normalized.kind !== "streams" || normalized.streams.length === 0 || !normalized.streams.some((stream) => stream.isLive)) {
					this.#store.remove(slug);
					this.#setRetryCooldown(slug);
					this.#onData();
					return;
				}
				this.#retryAfterBySlug.delete(slug);
				this.#store.upsertStreams(normalized.streams);
				this.#onData();
				const stream = normalized.streams.find((entry) => entry.channelSlug === slug);
				if (slug === this.#activeChannelSlug) await this.#onActiveChannelResolved(slug);
				if (stream && !stream.showViewCount) log$5.info("Fallback resolved", {
					slug,
					viewerCount: stream.viewerCount
				});
				else log$5.debug("Channel fetched", { slug });
			} catch (error) {
				if (!isAbortError(error)) {
					this.#setRetryCooldown(slug);
					log$5.warn("Channel fetch failed", {
						error: formatError$1(error),
						slug
					});
				}
			}
		}
		#setRetryCooldown(slug) {
			this.#retryAfterBySlug.set(slug, this.#timing.now() + RETRY_COOLDOWN_MS);
			this.#scheduleRetry(RETRY_COOLDOWN_MS);
		}
		#scheduleRetry(delay) {
			if (this.#retryTimer !== void 0 || !this.#enabled) return;
			this.#retryTimer = this.#timing.scheduleTimeout(() => {
				this.#retryTimer = void 0;
				for (const slug of this.#targetSlugs) if (needsChannelDetails(this.#store.get(slug, this.#timing.now()), slug === this.#activeChannelSlug)) this.#queue(slug);
				else this.#queuedSlugs.delete(slug);
				this.#pumpQueue();
			}, Math.max(250, delay));
		}
	};
	function needsChannelDetails(stream, isActiveChannel) {
		return !stream || stream.startedAt === void 0 || isActiveChannel && stream.livestreamId === void 0 || stream.showViewCount && stream.source !== "channel-details" && stream.source !== "current-viewers";
	}
	function formatError$1(error) {
		return error instanceof Error ? error.message : String(error);
	}
	var CURRENT_VIEWERS_BATCH_SIZE = 10;
	var CHANNEL_POLL_INTERVAL_MS = 30 * 1e3;
	var LIST_POLL_INTERVAL_MS = 120 * 1e3;
	var WARNING_COOLDOWN_MS = 60 * 1e3;
	var log$4 = createLogger("viewer-counts:network");
	var CurrentViewersPoller = class {
		#getOrigin;
		#isHidden;
		#onData;
		#pendingSlugs = new Set();
		#pollingSlugs = new Set();
		#request;
		#store;
		#subscribeVisibility;
		#targetSlugs = new Set();
		#timing;
		#abortController = new AbortController();
		#activeChannelSlug;
		#activePollTimer;
		#enabled = false;
		#generation = 0;
		#lastWarningAt = 0;
		#listPollTimer;
		#polling = false;
		#stopWatchingVisibility;
		constructor({ getOrigin = () => window.location.origin, isHidden = () => document.hidden, onData, request = requestViewerJson, store, subscribeVisibility = subscribeDocumentVisibility, timing }) {
			this.#getOrigin = getOrigin;
			this.#isHidden = isHidden;
			this.#onData = onData;
			this.#request = request;
			this.#store = store;
			this.#subscribeVisibility = subscribeVisibility;
			this.#timing = timing;
		}
		start() {
			if (this.#enabled) return;
			this.#enabled = true;
			this.#stopWatchingVisibility = this.#subscribeVisibility(this.#handleVisibilityChange);
			this.#activePollTimer = this.#timing.scheduleInterval(() => {
				this.#pollActiveChannel();
			}, CHANNEL_POLL_INTERVAL_MS);
			this.#listPollTimer = this.#timing.scheduleInterval(() => {
				this.#pollVisibleTargets();
			}, LIST_POLL_INTERVAL_MS);
		}
		stop() {
			if (!this.#enabled) return;
			this.#enabled = false;
			this.#resetRouteState();
			this.#stopWatchingVisibility?.();
			this.#stopWatchingVisibility = void 0;
			if (this.#activePollTimer !== void 0) {
				this.#timing.cancelInterval(this.#activePollTimer);
				this.#activePollTimer = void 0;
			}
			if (this.#listPollTimer !== void 0) {
				this.#timing.cancelInterval(this.#listPollTimer);
				this.#listPollTimer = void 0;
			}
		}
		resetRoute() {
			if (this.#enabled) this.#resetRouteState();
		}
		syncTargets(channelSlugs, activeChannelSlug) {
			if (!this.#enabled) return;
			this.#targetSlugs.clear();
			for (const slug of channelSlugs) this.#targetSlugs.add(slug);
			this.#activeChannelSlug = activeChannelSlug;
			for (const slug of this.#pendingSlugs) if (!this.#targetSlugs.has(slug)) this.#pendingSlugs.delete(slug);
		}
		pollSlug(slug) {
			return this.#pollSlugs(new Set([slug]));
		}
		#resetRouteState() {
			this.#generation += 1;
			this.#abortController.abort();
			this.#abortController = new AbortController();
			this.#activeChannelSlug = void 0;
			this.#pendingSlugs.clear();
			this.#pollingSlugs.clear();
			this.#targetSlugs.clear();
		}
		async #pollActiveChannel() {
			const slug = this.#activeChannelSlug;
			if (slug) await this.#pollSlugs(new Set([slug]));
		}
		async #pollVisibleTargets() {
			await this.#pollSlugs(this.#targetSlugs);
		}
		async #pollSlugs(slugs) {
			if (!this.#enabled || this.#isHidden()) return;
			for (const slug of slugs) if (!this.#pollingSlugs.has(slug)) this.#pendingSlugs.add(slug);
			if (this.#polling || this.#pendingSlugs.size === 0) return;
			this.#polling = true;
			try {
				while (this.#enabled && !this.#isHidden() && this.#pendingSlugs.size > 0) {
					const pendingSlugs = new Set(this.#pendingSlugs);
					this.#pendingSlugs.clear();
					this.#pollingSlugs.clear();
					for (const slug of pendingSlugs) this.#pollingSlugs.add(slug);
					await this.#pollBatch(pendingSlugs);
					this.#pollingSlugs.clear();
				}
			} finally {
				this.#pollingSlugs.clear();
				this.#polling = false;
				if (this.#enabled && !this.#isHidden() && this.#pendingSlugs.size > 0) this.#pollSlugs(new Set());
			}
		}
		async #pollBatch(slugs) {
			const now = this.#timing.now();
			this.#store.prune(now);
			const livestreamIds = [...this.#store.getLivestreamIds(slugs, now)];
			if (livestreamIds.length === 0) {
				this.#onData();
				return;
			}
			const generation = this.#generation;
			let updated = 0;
			try {
				for (let index = 0; index < livestreamIds.length; index += CURRENT_VIEWERS_BATCH_SIZE) {
					if (!this.#enabled || generation !== this.#generation) return;
					const batch = livestreamIds.slice(index, index + CURRENT_VIEWERS_BATCH_SIZE);
					const requestUrl = new URL("/current-viewers", this.#getOrigin());
					for (const id of batch) requestUrl.searchParams.append("ids[]", String(id));
					const response = await this.#request(requestUrl, this.#abortController.signal);
					if (response.kind === "failed") throw new Error(response.summary);
					if (!this.#enabled || generation !== this.#generation) return;
					const capturedAt = this.#timing.now();
					const normalized = normalizeViewerCountPayload("CURRENT_VIEWERS", response.payload, capturedAt);
					recordViewerEndpointObservation("CURRENT_VIEWERS", normalized, capturedAt, "fallback");
					if (normalized.kind === "current-viewers") {
						const receivedIds = new Set(normalized.currentViewers.map(({ livestreamId }) => livestreamId));
						updated += this.#store.upsertCurrentViewers(normalized.currentViewers);
						updated += this.#store.removeLivestreamIds(batch.filter((id) => !receivedIds.has(id)));
					}
				}
				if (updated > 0) log$4.debug("Refresh complete", {
					livestreams: livestreamIds.length,
					updated
				});
			} catch (error) {
				const warningAt = this.#timing.now();
				if (!isAbortError(error) && warningAt - this.#lastWarningAt >= WARNING_COOLDOWN_MS) {
					this.#lastWarningAt = warningAt;
					log$4.warn("Refresh failed", { error: formatError(error) });
				}
			} finally {
				if (this.#enabled && generation === this.#generation) this.#onData();
			}
		}
		#handleVisibilityChange = () => {
			if (!this.#isHidden()) this.#pollVisibleTargets();
		};
	};
	function subscribeDocumentVisibility(listener) {
		document.addEventListener("visibilitychange", listener);
		return () => {
			document.removeEventListener("visibilitychange", listener);
		};
	}
	function formatError(error) {
		return error instanceof Error ? error.message : String(error);
	}
	var ViewerCountAcquisition = class {
		#channelDetails;
		#currentViewers;
		#enabled = false;
		constructor({ onData, store, timing = createBrowserAcquisitionTiming() }) {
			this.#currentViewers = new CurrentViewersPoller({
				onData,
				store,
				timing
			});
			this.#channelDetails = new ChannelDetailsScheduler({
				onActiveChannelResolved: (slug) => this.#currentViewers.pollSlug(slug),
				onData,
				store,
				timing
			});
		}
		start() {
			if (this.#enabled) return;
			this.#enabled = true;
			this.#channelDetails.start();
			this.#currentViewers.start();
		}
		stop() {
			if (!this.#enabled) return;
			this.#enabled = false;
			this.#channelDetails.stop();
			this.#currentViewers.stop();
		}
		beginRoute() {
			if (!this.#enabled) return;
			this.#channelDetails.resetRoute();
			this.#currentViewers.resetRoute();
		}
		syncTargets(channelSlugs, activeChannelSlug) {
			if (!this.#enabled) return;
			this.#currentViewers.syncTargets(channelSlugs, activeChannelSlug);
			this.#channelDetails.syncTargets(channelSlugs, activeChannelSlug);
		}
	};
	var KICK_ORIGINS = new Set(["https://kick.com", "https://www.kick.com"]);
	var ENDPOINTS = [
		{
			endpoint: "SIDEBAR_LIVESTREAMS",
			matches: exactWebEndpoint("/api/v1/recommendations/livestreams/sidebar")
		},
		{
			endpoint: "RECOMMENDED_LIVESTREAMS",
			matches: exactWebEndpoint("/api/v1/recommendations/livestreams")
		},
		{
			endpoint: "PAGINATED_RECOMMENDED_LIVESTREAMS",
			matches: exactWebEndpoint("/api/v1/recommendations/livestreams/list")
		},
		{
			endpoint: "FEATURED_LIVESTREAMS",
			matches: exactWebEndpoint("/api/v1/livestreams/featured")
		},
		{
			endpoint: "FOLLOWED_CHANNELS",
			matches: exactKickEndpoint("/api/v2/channels/followed")
		},
		{
			endpoint: "CHANNEL_DETAILS",
			matches: (url) => KICK_ORIGINS.has(url.origin) && /^\/api\/v2\/channels\/[^/]+$/.test(url.pathname)
		},
		{
			endpoint: "CURRENT_VIEWERS",
			matches: exactKickEndpoint("/current-viewers")
		},
		{
			endpoint: "USER_LIVESTREAMS",
			matches: exactKickEndpoint("/api/v1/user/livestreams")
		}
	];
	function exactKickEndpoint(pathname) {
		return (url) => KICK_ORIGINS.has(url.origin) && url.pathname === pathname;
	}
	function exactWebEndpoint(pathname) {
		return (url) => url.origin === "https://web.kick.com" && url.pathname === pathname;
	}
	function classifyViewerCountEndpoint(rawUrl, baseUrl = window.location.href) {
		try {
			const url = new URL(rawUrl, baseUrl);
			return ENDPOINTS.find(({ matches }) => matches(url))?.endpoint;
		} catch {
			return;
		}
	}
	var VIEWER_COUNT_MESSAGE_SOURCE = "kick-enhancer-viewer-counts";
	var VIEWER_COUNT_MESSAGE_TYPE = "KICK_ENHANCER_API_RESPONSE";
	function isViewerCountEndpoint(value) {
		return value === "CHANNEL_DETAILS" || value === "CURRENT_VIEWERS" || value === "FEATURED_LIVESTREAMS" || value === "FOLLOWED_CHANNELS" || value === "PAGINATED_RECOMMENDED_LIVESTREAMS" || value === "RECOMMENDED_LIVESTREAMS" || value === "SIDEBAR_LIVESTREAMS" || value === "USER_LIVESTREAMS";
	}
	function isCapturedViewerCountMessage(value) {
		if (!isRecord(value)) return false;
		return value.source === "kick-enhancer-viewer-counts" && value.type === "KICK_ENHANCER_API_RESPONSE" && isViewerCountEndpoint(value.endpoint) && typeof value.url === "string" && typeof value.timestamp === "number" && Number.isFinite(value.timestamp) && "payload" in value;
	}
	function isRecord(value) {
		return typeof value === "object" && value !== null;
	}
	var log$3 = createLogger("viewer-counts:capture");
	function installViewerCountCaptureBridge() {
		const pageWindow = _unsafeWindow;
		try {
			if (pageWindow.__kickEnhancerViewerCountHookInstalled) return true;
			const originalJson = pageWindow.Response.prototype.json;
			const originalDescriptor = Object.getOwnPropertyDescriptor(pageWindow.Response.prototype, "json");
			const hookedJson = new Proxy(originalJson, { apply(target, thisArgument, argumentsList) {
				const payloadPromise = Reflect.apply(target, thisArgument, argumentsList);
				const endpoint = classifyViewerCountEndpoint(thisArgument.url, pageWindow.location.href);
				if (endpoint) payloadPromise.then((payload) => {
					const message = {
						endpoint,
						payload,
						source: VIEWER_COUNT_MESSAGE_SOURCE,
						timestamp: Date.now(),
						type: VIEWER_COUNT_MESSAGE_TYPE,
						url: thisArgument.url
					};
					pageWindow.postMessage(message, pageWindow.location.origin);
				}).catch(() => {});
				return payloadPromise;
			} });
			Object.defineProperty(pageWindow.Response.prototype, "json", {
				...originalDescriptor,
				configurable: true,
				value: hookedJson,
				writable: true
			});
			pageWindow.__kickEnhancerViewerCountHookInstalled = true;
			log$3.info("Installed");
			return true;
		} catch (error) {
			log$3.warn("Unavailable; using fallback", error);
			return false;
		}
	}
	var VIEWER_COUNT_SELECTOR = "[data-ke-viewer-count]";
	var STREAM_UPTIME_SELECTOR = "[data-ke-stream-uptime]";
	var RENDER_ELEMENT_SELECTOR = [VIEWER_COUNT_SELECTOR, STREAM_UPTIME_SELECTOR].join(", ");
	var SIDEBAR_LINK_SELECTOR = ["#sidebar-wrapper a[data-testid^=\"sidebar-following-channel-\"]", "#sidebar-wrapper a[data-testid^=\"sidebar-recommended-channel-\"]"].join(", ");
	var CARD_SELECTOR = "[data-testid=\"livestream-results-card\"]";
	var CARD_THUMBNAIL_SELECTOR = "a[data-testid=\"media-card-thumbnail\"][href]";
	var COMPACT_COUNT_PATTERN = /^(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?\s*[km]?$/i;
	function findStatusLabel(scope) {
		let best;
		let bestScore = 0;
		for (const element of scope.querySelectorAll("span, p, div")) {
			if (element.closest("[data-ke-viewer-count], [data-ke-stream-uptime]") || element.querySelector("[data-ke-viewer-count], [data-ke-stream-uptime]")) continue;
			const text = element.textContent?.trim() ?? "";
			if (text.toLowerCase() !== "live" && !isCompactCount(text)) continue;
			let score = element.childElementCount === 0 ? 2 : 1;
			const parentText = element.parentElement?.textContent ?? "";
			if (element.parentElement?.querySelector(".bg-green-500")) score += 6;
			if (parentText.trim().length <= text.length + 8 || element.parentElement?.classList.contains("items-center")) score += 2;
			if (score > bestScore) {
				best = element;
				bestScore = score;
			}
		}
		return best;
	}
	function formatViewerCount(viewerCount) {
		if (viewerCount < 1e3) return String(viewerCount);
		const divisor = viewerCount < 1e6 ? 1e3 : 1e6;
		const suffix = viewerCount < 1e6 ? "K" : "M";
		const rounded = Math.round(viewerCount / divisor * 10) / 10;
		return `${Number.isInteger(rounded) ? rounded : rounded.toFixed(1)}${suffix}`;
	}
	function isCompactCount(value) {
		return COMPACT_COUNT_PATTERN.test(value?.trim() ?? "");
	}
	function renderCardSurfaces(store, ownership, options) {
		const targetSlugs = new Set();
		let uptimes = 0;
		let viewerCounts = 0;
		for (const card of document.querySelectorAll(CARD_SELECTOR)) {
			if (isCardHiddenByEnhancer(card, options)) {
				ownership.removeCount(card, "card");
				ownership.removeUptime(card, "card");
				continue;
			}
			const thumbnail = card.querySelector(CARD_THUMBNAIL_SELECTOR);
			const slug = getChannelSlugFromHref(thumbnail?.getAttribute("href"));
			const liveBadge = thumbnail ? findCardLiveBadge(thumbnail) : void 0;
			if (!thumbnail || !slug || !liveBadge) {
				ownership.removeCount(card, "card");
				ownership.removeUptime(card, "card");
				continue;
			}
			targetSlugs.add(slug);
			const stream = store.get(slug);
			if (options.showStreamUptime) uptimes += renderCardUptime(ownership, thumbnail, liveBadge, slug, stream?.startedAt);
			else ownership.removeUptime(thumbnail, "card");
			if (!options.showHiddenViewerCounts || hasNativeCardCount(thumbnail) || !stream || stream.showViewCount) {
				ownership.removeCount(card, "card");
				continue;
			}
			const element = ownership.findCount(thumbnail, "card") ?? document.createElement("div");
			if (ownership.updateCount(element, {
				className: "ke-viewer-count-card",
				count: stream.viewerCount,
				slug,
				target: "card"
			}) || !element.querySelector(":scope > span")) {
				const count = document.createElement("span");
				count.textContent = formatViewerCount(stream.viewerCount);
				element.replaceChildren(count, " watching");
			}
			if (element.parentElement !== thumbnail) thumbnail.append(element);
			viewerCounts += 1;
		}
		return {
			targetSlugs,
			uptimes,
			viewerCounts
		};
	}
	function renderCardUptime(ownership, thumbnail, liveBadge, slug, startedAt) {
		if (startedAt === void 0) {
			ownership.restoreNativeCardLiveBadge(liveBadge);
			ownership.removeUptime(thumbnail, "card");
			return 0;
		}
		const uptime = formatStreamUptime(startedAt);
		if (!uptime) {
			ownership.restoreNativeCardLiveBadge(liveBadge);
			ownership.removeUptime(thumbnail, "card");
			return 0;
		}
		const element = ownership.findUptime(thumbnail, "card") ?? document.createElement("div");
		ownership.updateUptime(element, {
			className: "ke-stream-uptime-card",
			label: `Live for ${uptime}`,
			slug,
			startedAt,
			target: "card",
			text: uptime
		});
		ownership.hideNativeCardLiveBadge(liveBadge, slug);
		if (element.parentElement !== thumbnail) thumbnail.append(element);
		return 1;
	}
	function hasNativeCardCount(thumbnail) {
		for (const element of thumbnail.querySelectorAll("[title]")) {
			if (element.closest("[data-ke-viewer-count]")) continue;
			const title = element.getAttribute("title");
			const parentText = element.parentElement?.textContent ?? "";
			if (isCompactCount(title) && /\bwatching\b/i.test(parentText)) return true;
		}
		return false;
	}
	function findCardLiveBadge(thumbnail) {
		for (const element of thumbnail.querySelectorAll("div, span")) if (!element.closest(RENDER_ELEMENT_SELECTOR) && element.childElementCount === 0 && element.textContent?.trim().toLowerCase() === "live") return element;
	}
	function isCardHiddenByEnhancer(card, options) {
		if (options.hideGamblingStreams && card.closest("[data-testid=\"followed-livestreams\"]") && card.querySelector("a[href=\"/category/slots\"]")) return true;
		return Boolean(options.hideFollowingRecommendations && card.closest("[data-testid=\"following\"]") && !card.closest("[data-testid=\"followed-livestreams\"]"));
	}
	function renderChannelSurface(store, ownership, enabled) {
		const targetSlugs = new Set();
		const existing = document.querySelector(`${VIEWER_COUNT_SELECTOR}[data-ke-target="channel"]`);
		if (!enabled) {
			existing?.remove();
			return {
				rendered: 0,
				targetSlugs
			};
		}
		const slug = getChannelSlugFromPath(window.location.pathname);
		const title = document.querySelector("[data-testid=\"livestream-title\"]");
		if (!slug || !title) {
			existing?.remove();
			return {
				rendered: 0,
				targetSlugs
			};
		}
		if (document.querySelector("[data-testid=\"viewer-count\"]:not([data-ke-viewer-count])")) {
			existing?.remove();
			return {
				rendered: 0,
				slug,
				targetSlugs
			};
		}
		targetSlugs.add(slug);
		const stream = store.get(slug);
		if (!stream || stream.showViewCount) {
			existing?.remove();
			return {
				rendered: 0,
				slug,
				targetSlugs
			};
		}
		const element = existing ?? document.createElement("div");
		ownership.updateCount(element, {
			className: "ke-viewer-count-channel",
			count: stream.viewerCount,
			slug,
			target: "channel"
		});
		let count = element.querySelector(".ke-viewer-count-channel__value");
		if (!count) {
			const content = document.createElement("span");
			content.className = "ke-viewer-count-channel__content";
			count = document.createElement("span");
			count.className = ["ke-animated-number", "ke-viewer-count-channel__value"].join(" ");
			count.setAttribute("aria-hidden", "true");
			content.append(count, " watching");
			element.replaceChildren(createCommunityIcon(), content);
		}
		renderAnimatedNumber(count, stream.viewerCount);
		const insertionTarget = findChannelCountInsertionTarget();
		if (insertionTarget && (element.parentElement !== insertionTarget || element !== insertionTarget.firstElementChild)) insertionTarget.prepend(element);
		else if (!insertionTarget && element.parentElement !== title.parentElement) title.insertAdjacentElement("afterend", element);
		return {
			rendered: 1,
			slug,
			targetSlugs
		};
	}
	function findChannelCountInsertionTarget() {
		const mainButtons = document.querySelector("[data-testid=\"sub-button\"], [data-testid=\"gift-sub-button\"]")?.parentElement;
		const secondaryButtons = (mainButtons?.parentElement)?.lastElementChild;
		return secondaryButtons instanceof HTMLElement && secondaryButtons !== mainButtons ? secondaryButtons : void 0;
	}
	function createCommunityIcon() {
		const namespace = "http://www.w3.org/2000/svg";
		const icon = document.createElementNS(namespace, "svg");
		icon.setAttribute("aria-hidden", "true");
		icon.setAttribute("viewBox", "0 0 32 32");
		for (const pathData of [
			"M4 19V28H7V22H16V28H28V19H4Z",
			"M10.75 17.5C14.4775 17.5 17.5 14.4775 17.5 10.75C17.5 7.0225 14.4775 4 10.75 4C7.0225 4 4 7.0225 4 10.75C4 14.4775 7.0225 17.5 10.75 17.5ZM10.75 7C12.82 7 14.5 8.68 14.5 10.75C14.5 12.82 12.82 14.5 10.75 14.5C8.68 14.5 7 12.82 7 10.75C7 8.68 8.68 7 10.75 7Z",
			"M23.5 17.5C25.9853 17.5 28 15.4853 28 13C28 10.5147 25.9853 8.5 23.5 8.5C21.0147 8.5 19 10.5147 19 13C19 15.4853 21.0147 17.5 23.5 17.5Z"
		]) {
			const path = document.createElementNS(namespace, "path");
			path.setAttribute("d", pathData);
			icon.append(path);
		}
		return icon;
	}
	function updateCountElementState(element, state) {
		const count = String(state.count);
		const contentChanged = element.dataset.keCount !== count || element.dataset.keSlug !== state.slug || element.dataset.keTarget !== state.target;
		setClassName(element, state.className);
		setDatasetValue$1(element, "keCount", count);
		setDatasetValue$1(element, "keSlug", state.slug);
		setDatasetValue$1(element, "keTarget", state.target);
		setDatasetValue$1(element, "keViewerCount", "");
		if (state.text !== void 0 && element.textContent !== state.text) element.textContent = state.text;
		const accessibleLabel = `${state.count.toLocaleString()} viewers`;
		if (element.getAttribute("aria-label") !== accessibleLabel) element.setAttribute("aria-label", accessibleLabel);
		return contentChanged;
	}
	function setClassName(element, value) {
		if (element.className !== value) element.className = value;
	}
	function setDatasetValue$1(element, key, value) {
		if (element.dataset[key] !== value) element.dataset[key] = value;
	}
	var SIDEBAR_UPTIME_CONTAINER_SELECTOR = "[data-ke-sidebar-uptime-container]";
	var TOOLTIP_UPTIME_CONTAINER_SELECTOR = "[data-ke-tooltip-uptime-container]";
	var NATIVE_CARD_LIVE_HIDDEN_SELECTOR = "[data-ke-native-card-live-hidden]";
	var ViewerCountDomOwnership = class {
		#renderedElements = new Set();
		finalize() {
			this.#removeOrphanedElements();
			restoreUnusedNativeCardLiveBadges();
			restoreUnusedNativeLabels();
			restoreUnusedUptimeContainers();
		}
		findCount(scope, target) {
			return scope.querySelector(`${VIEWER_COUNT_SELECTOR}[data-ke-target="${target}"]`);
		}
		findUptime(scope, target) {
			return scope.querySelector(`${STREAM_UPTIME_SELECTOR}[data-ke-target="${target}"]`);
		}
		hideNativeCardLiveBadge(element, slug) {
			element.dataset.keNativeCardLiveHidden = slug;
		}
		hideNativeLiveLabel(element, slug) {
			if (element.textContent?.trim().toLowerCase() === "live") element.dataset.keNativeLiveHidden = slug;
		}
		markUptimeContainer(element, target, slug) {
			if (target === "sidebar") {
				element.dataset.keSidebarUptimeContainer = slug;
				return;
			}
			element.dataset.keTooltipUptimeContainer = slug;
		}
		removeCount(scope, target) {
			this.findCount(scope, target)?.remove();
		}
		removeUptime(scope, target) {
			this.findUptime(scope, target)?.remove();
		}
		restoreNativeCardLiveBadge(element) {
			element?.removeAttribute("data-ke-native-card-live-hidden");
		}
		restoreNativeLiveLabel(element) {
			element?.removeAttribute("data-ke-native-live-hidden");
		}
		updateCount(element, state) {
			const contentChanged = updateCountElementState(element, state);
			this.#renderedElements.add(element);
			return contentChanged;
		}
		updateUptime(element, state) {
			if (element.className !== state.className) element.className = state.className;
			setDatasetValue(element, "keSlug", state.slug);
			setDatasetValue(element, "keStartedAt", String(state.startedAt));
			setDatasetValue(element, "keTarget", state.target);
			setDatasetValue(element, "keStreamUptime", "");
			if (element.textContent !== state.text) element.textContent = state.text;
			if (element.getAttribute("aria-label") !== state.label) element.setAttribute("aria-label", state.label);
			this.#renderedElements.add(element);
		}
		#removeOrphanedElements() {
			for (const element of document.querySelectorAll(RENDER_ELEMENT_SELECTOR)) if (!this.#renderedElements.has(element)) element.remove();
		}
	};
	function cleanupViewerCountDom() {
		for (const element of document.querySelectorAll(RENDER_ELEMENT_SELECTOR)) element.remove();
		for (const element of document.querySelectorAll("[data-ke-native-live-hidden]")) element.removeAttribute("data-ke-native-live-hidden");
		for (const element of document.querySelectorAll(NATIVE_CARD_LIVE_HIDDEN_SELECTOR)) element.removeAttribute("data-ke-native-card-live-hidden");
		for (const element of document.querySelectorAll([SIDEBAR_UPTIME_CONTAINER_SELECTOR, TOOLTIP_UPTIME_CONTAINER_SELECTOR].join(", "))) {
			element.removeAttribute("data-ke-sidebar-uptime-container");
			element.removeAttribute("data-ke-tooltip-uptime-container");
		}
	}
	function setDatasetValue(element, key, value) {
		if (element.dataset[key] !== value) element.dataset[key] = value;
	}
	function restoreUnusedNativeLabels() {
		for (const label of document.querySelectorAll("[data-ke-native-live-hidden]")) {
			const statusContainer = label.parentElement;
			const slug = label.dataset.keNativeLiveHidden;
			const count = statusContainer?.querySelector(VIEWER_COUNT_SELECTOR);
			if (!count || count.dataset.keSlug !== slug) label.removeAttribute("data-ke-native-live-hidden");
		}
	}
	function restoreUnusedNativeCardLiveBadges() {
		for (const badge of document.querySelectorAll(NATIVE_CARD_LIVE_HIDDEN_SELECTOR)) {
			const uptime = badge.closest(CARD_THUMBNAIL_SELECTOR)?.querySelector(`${STREAM_UPTIME_SELECTOR}[data-ke-target="card"]`);
			const slug = badge.dataset.keNativeCardLiveHidden;
			if (!uptime || uptime.dataset.keSlug !== slug) badge.removeAttribute("data-ke-native-card-live-hidden");
		}
	}
	function restoreUnusedUptimeContainers() {
		restoreUptimeContainers(SIDEBAR_UPTIME_CONTAINER_SELECTOR, "data-ke-sidebar-uptime-container", "sidebar");
		restoreUptimeContainers(TOOLTIP_UPTIME_CONTAINER_SELECTOR, "data-ke-tooltip-uptime-container", "tooltip");
	}
	function restoreUptimeContainers(selector, attribute, target) {
		for (const container of document.querySelectorAll(selector)) {
			const uptime = container.querySelector(`${STREAM_UPTIME_SELECTOR}[data-ke-target="${target}"]`);
			const slug = container.getAttribute(attribute);
			if (!uptime || uptime.dataset.keSlug !== slug) container.removeAttribute(attribute);
		}
	}
	function isSidebarLinkHiddenByEnhancer(link, options) {
		if (options.hideRecommendedChannels && link.matches("a[data-testid^=\"sidebar-recommended-channel-\"]")) return true;
		return Boolean(options.hideGamblingStreams && link.closest("[data-kick-enhancer-gambling-stream]"));
	}
	function findSidebarTooltip(target, sourceLink) {
		for (const id of getTooltipIds(sourceLink)) {
			const describedElement = document.getElementById(id);
			const tooltip = describedElement?.closest("[data-radix-popper-content-wrapper]") ?? describedElement?.closest("[role=\"tooltip\"]");
			if (tooltip && !tooltip.closest("#sidebar-wrapper")) return tooltip;
		}
		const candidates = new Set();
		for (const element of document.querySelectorAll("[role=\"tooltip\"], [data-radix-popper-content-wrapper]")) {
			const candidate = element.closest("[data-radix-popper-content-wrapper]") ?? element;
			if (!candidate.closest("#sidebar-wrapper")) candidates.add(candidate);
		}
		for (const candidate of candidates) if (containsExactText(candidate, target.displayName)) return candidate;
	}
	function findTooltipHeadingRow(tooltip, displayName) {
		for (const element of tooltip.querySelectorAll("span, p, div")) {
			if (element.childElementCount > 0) continue;
			if (element.textContent?.trim() !== displayName.trim()) continue;
			let row = element.parentElement;
			for (let depth = 0; row && depth < 3; depth += 1) {
				if (row.classList.contains("flex") || window.getComputedStyle(row).display === "flex") return row;
				row = row.parentElement;
			}
		}
	}
	function isSidebarExpanded() {
		if (document.querySelector("[data-sidebar][data-chat][data-theatre], [data-sidebar]")?.getAttribute("data-sidebar") === "false") return false;
		return document.querySelector("button[aria-controls=\"sidebar-wrapper\"], button[aria-label=\"Collapse sidebar\"], button[aria-label=\"Expand sidebar\"], button[data-testid=\"sidebar-collapse\"], button[data-testid=\"sidebar-expand\"]")?.getAttribute("aria-expanded") !== "false";
	}
	function getTooltipIds(sourceLink) {
		const ids = new Set();
		for (const attribute of ["aria-describedby", "aria-controls"]) for (const id of (sourceLink.getAttribute(attribute) ?? "").split(/\s+/)) if (id) ids.add(id);
		return ids;
	}
	function containsExactText(scope, expected) {
		const normalizedExpected = expected.trim().toLowerCase();
		for (const element of scope.querySelectorAll("span, p, div")) if (!element.closest(RENDER_ELEMENT_SELECTOR) && element.childElementCount === 0 && element.textContent?.trim().toLowerCase() === normalizedExpected) return true;
		return false;
	}
	function renderSidebarSurface(store, ownership, sidebarLinks, options) {
		const targetSlugs = new Set();
		const uptimeEnabled = options.showStreamUptime && isSidebarExpanded();
		let uptimes = 0;
		let viewerCounts = 0;
		for (const link of sidebarLinks) {
			const hidden = isSidebarLinkHiddenByEnhancer(link, options);
			const slug = getChannelSlugFromHref(link.getAttribute("href"));
			const statusLabel = findStatusLabel(link);
			const statusContainer = statusLabel?.parentElement;
			const canRender = Boolean(!hidden && slug && statusLabel && statusContainer);
			const nativeCountVisible = isCompactCount(statusLabel?.textContent);
			const countEligible = canRender && options.showHiddenViewerCounts && !nativeCountVisible;
			const uptimeEligible = canRender && uptimeEnabled;
			let stream;
			if ((countEligible || uptimeEligible) && slug) {
				targetSlugs.add(slug);
				stream = store.get(slug);
			}
			if (!countEligible || !slug || !statusLabel || !statusContainer || !stream) {
				ownership.removeCount(link, "sidebar");
				ownership.restoreNativeLiveLabel(statusLabel);
			} else {
				renderSidebarCount(ownership, link, statusLabel, statusContainer, slug, stream.viewerCount);
				viewerCounts += 1;
			}
			if (!uptimeEligible || !slug || !statusContainer || stream?.startedAt === void 0) ownership.removeUptime(link, "sidebar");
			else uptimes += renderSidebarUptime(ownership, link, statusContainer, slug, stream.startedAt);
		}
		return {
			targetSlugs,
			uptimes,
			viewerCounts
		};
	}
	function renderSidebarCount(ownership, link, statusLabel, statusContainer, slug, viewerCount) {
		ownership.hideNativeLiveLabel(statusLabel, slug);
		const element = ownership.findCount(link, "sidebar") ?? document.createElement("span");
		ownership.updateCount(element, {
			className: "ke-viewer-count-sidebar",
			count: viewerCount,
			slug,
			target: "sidebar",
			text: formatViewerCount(viewerCount)
		});
		if (element.parentElement !== statusContainer) statusContainer.append(element);
	}
	function renderSidebarUptime(ownership, link, statusContainer, slug, startedAt) {
		const uptime = formatStreamUptime(startedAt);
		if (!uptime) {
			ownership.removeUptime(link, "sidebar");
			return 0;
		}
		const element = ownership.findUptime(link, "sidebar") ?? document.createElement("span");
		ownership.updateUptime(element, {
			className: "ke-stream-uptime-sidebar",
			label: `Live for ${uptime}`,
			slug,
			startedAt,
			target: "sidebar",
			text: uptime
		});
		ownership.markUptimeContainer(statusContainer, "sidebar", slug);
		if (element.parentElement !== statusContainer) statusContainer.append(element);
		return 1;
	}
	function renderSidebarTooltipSurface(store, ownership, sidebarLinks, target, options) {
		const targetSlugs = new Set();
		let uptimes = 0;
		let viewerCounts = 0;
		if (!target || !options.showHiddenViewerCounts && !options.showStreamUptime) return {
			targetSlugs,
			uptimes,
			viewerCounts
		};
		let sourceLink;
		for (const link of sidebarLinks) if (getChannelSlugFromHref(link.getAttribute("href")) === target.slug) {
			sourceLink = link;
			break;
		}
		if (!sourceLink || isSidebarLinkHiddenByEnhancer(sourceLink, options)) return {
			targetSlugs,
			uptimes,
			viewerCounts
		};
		targetSlugs.add(target.slug);
		const stream = store.get(target.slug);
		if (!stream) return {
			targetSlugs,
			uptimes,
			viewerCounts
		};
		const countEligible = options.showHiddenViewerCounts && !stream.showViewCount;
		const startedAt = options.showStreamUptime ? stream.startedAt : void 0;
		const uptime = startedAt === void 0 ? void 0 : formatStreamUptime(startedAt);
		if (!countEligible && !uptime) return {
			targetSlugs,
			uptimes,
			viewerCounts
		};
		const tooltip = findSidebarTooltip(target, sourceLink);
		if (!tooltip) return {
			targetSlugs,
			uptimes,
			viewerCounts
		};
		const statusLabel = findStatusLabel(tooltip);
		const statusContainer = statusLabel?.parentElement ?? findTooltipHeadingRow(tooltip, target.displayName);
		if (!statusContainer) return {
			targetSlugs,
			uptimes,
			viewerCounts
		};
		if (countEligible && !(statusLabel && isCompactCount(statusLabel.textContent))) {
			if (statusLabel) ownership.hideNativeLiveLabel(statusLabel, target.slug);
			const countElement = ownership.findCount(tooltip, "tooltip") ?? document.createElement("span");
			ownership.updateCount(countElement, {
				className: ["ke-viewer-count-tooltip", statusLabel ? "" : "ke-viewer-count-tooltip--standalone"].filter(Boolean).join(" "),
				count: stream.viewerCount,
				slug: target.slug,
				target: "tooltip",
				text: formatViewerCount(stream.viewerCount)
			});
			if (countElement.parentElement !== statusContainer) statusContainer.append(countElement);
			viewerCounts = 1;
		}
		if (uptime && startedAt !== void 0) {
			const uptimeElement = ownership.findUptime(tooltip, "tooltip") ?? document.createElement("span");
			ownership.updateUptime(uptimeElement, {
				className: "ke-stream-uptime-tooltip",
				label: `Live for ${uptime}`,
				slug: target.slug,
				startedAt,
				target: "tooltip",
				text: uptime
			});
			ownership.markUptimeContainer(statusContainer, "tooltip", target.slug);
			if (uptimeElement.parentElement !== statusContainer) statusContainer.append(uptimeElement);
			uptimes = 1;
		}
		return {
			targetSlugs,
			uptimes,
			viewerCounts
		};
	}
	var log$2 = createLogger("viewer-counts:render");
	function renderViewerCounts(store, sidebarHoverTarget, options) {
		const ownership = new ViewerCountDomOwnership();
		const sidebarLinks = document.querySelectorAll(SIDEBAR_LINK_SELECTOR);
		try {
			const channel = renderSurface("channel", () => renderChannelSurface(store, ownership, options.showHiddenViewerCounts), emptyChannelResult);
			const cards = renderSurface("cards", () => renderCardSurfaces(store, ownership, options), emptySurfaceResult);
			const sidebar = renderSurface("sidebar", () => renderSidebarSurface(store, ownership, sidebarLinks, options), emptySurfaceResult);
			const tooltip = renderSurface("sidebar-tooltip", () => renderSidebarTooltipSurface(store, ownership, sidebarLinks, sidebarHoverTarget, options), emptySurfaceResult);
			return {
				...channel.slug ? { activeChannelSlug: channel.slug } : {},
				counts: {
					cardUptimes: cards.uptimes,
					cards: cards.viewerCounts,
					channel: channel.rendered,
					sidebar: sidebar.viewerCounts,
					sidebarUptimes: sidebar.uptimes,
					tooltipUptimes: tooltip.uptimes,
					tooltips: tooltip.viewerCounts
				},
				targetSlugs: collectTargetSlugs(channel, cards, sidebar, tooltip)
			};
		} finally {
			ownership.finalize();
		}
	}
	function renderSurface(name, render, fallback) {
		try {
			return render();
		} catch (error) {
			log$2.error("Surface render failed", {
				error: error instanceof Error ? error.message : String(error),
				surface: name
			});
			return fallback();
		}
	}
	function emptyChannelResult() {
		return {
			rendered: 0,
			targetSlugs: new Set()
		};
	}
	function emptySurfaceResult() {
		return {
			targetSlugs: new Set(),
			uptimes: 0,
			viewerCounts: 0
		};
	}
	function collectTargetSlugs(...results) {
		const targetSlugs = new Set();
		for (const result of results) for (const slug of result.targetSlugs) targetSlugs.add(slug);
		return targetSlugs;
	}
	var MAX_RECORD_AGE_MS = 300 * 1e3;
	var MAX_STORED_STREAMS = 500;
	var SOURCE_PRIORITY = {
		"channel-details": 6,
		"current-viewers": 7,
		featured: 2,
		"followed-channels": 4,
		recommendations: 2,
		"sidebar-recommendations": 3,
		"user-livestreams": 5
	};
	var ViewerCountStore = class {
		#currentViewersById = new Map();
		#slugByLivestreamId = new Map();
		#streamsBySlug = new Map();
		upsertStreams(streams) {
			let updated = 0;
			for (const incoming of streams) {
				const existing = this.#streamsBySlug.get(incoming.channelSlug);
				if (!existing || shouldReplace(existing, incoming)) {
					const replacement = existing ? mergeReplacement(existing, incoming) : incoming;
					if (existing?.livestreamId !== void 0 && existing.livestreamId !== replacement.livestreamId) {
						this.#slugByLivestreamId.delete(existing.livestreamId);
						this.#currentViewersById.delete(existing.livestreamId);
					}
					this.#streamsBySlug.set(replacement.channelSlug, replacement);
					updated += 1;
				}
				const stored = this.#streamsBySlug.get(incoming.channelSlug);
				if (stored?.livestreamId !== void 0) this.#slugByLivestreamId.set(stored.livestreamId, stored.channelSlug);
			}
			this.prune();
			return updated;
		}
		upsertCurrentViewers(entries) {
			let updated = 0;
			for (const entry of entries) {
				const existing = this.#currentViewersById.get(entry.livestreamId);
				if (!existing || entry.capturedAt >= existing.capturedAt) {
					this.#currentViewersById.set(entry.livestreamId, entry);
					updated += 1;
				}
			}
			this.prune();
			return updated;
		}
		get(channelSlug, now = Date.now()) {
			const stream = this.#streamsBySlug.get(channelSlug);
			if (!stream || !stream.isLive) return;
			if (stream.livestreamId === void 0) return now - stream.capturedAt <= MAX_RECORD_AGE_MS ? stream : void 0;
			const current = this.#currentViewersById.get(stream.livestreamId);
			if (!(current !== void 0 && now - current.capturedAt <= MAX_RECORD_AGE_MS) || current.capturedAt < stream.capturedAt) return now - stream.capturedAt <= MAX_RECORD_AGE_MS ? stream : void 0;
			return {
				...stream,
				capturedAt: current.capturedAt,
				showViewCount: current.showViewCount ?? stream.showViewCount,
				source: "current-viewers",
				viewerCount: current.viewerCount
			};
		}
		getLivestreamIds(channelSlugs, now = Date.now()) {
			const ids = new Set();
			for (const slug of channelSlugs) {
				const stream = this.get(slug, now);
				if (stream?.livestreamId !== void 0) ids.add(stream.livestreamId);
			}
			return ids;
		}
		remove(channelSlug) {
			const stream = this.#streamsBySlug.get(channelSlug);
			this.#streamsBySlug.delete(channelSlug);
			if (stream?.livestreamId !== void 0) {
				this.#slugByLivestreamId.delete(stream.livestreamId);
				this.#currentViewersById.delete(stream.livestreamId);
			}
		}
		removeLivestreamIds(livestreamIds) {
			let removed = 0;
			for (const id of livestreamIds) {
				const slug = this.#slugByLivestreamId.get(id);
				if (!slug) continue;
				this.remove(slug);
				removed += 1;
			}
			return removed;
		}
		prune(now = Date.now()) {
			for (const [slug, stream] of this.#streamsBySlug) {
				if (now - stream.capturedAt <= MAX_RECORD_AGE_MS || this.get(slug, now)) continue;
				this.remove(slug);
			}
			for (const [id, entry] of this.#currentViewersById) if (now - entry.capturedAt > MAX_RECORD_AGE_MS) this.#currentViewersById.delete(id);
			if (this.#streamsBySlug.size <= MAX_STORED_STREAMS) return;
			const oldest = [...this.#streamsBySlug.values()].sort((left, right) => left.capturedAt - right.capturedAt).slice(0, this.#streamsBySlug.size - MAX_STORED_STREAMS);
			for (const stream of oldest) this.remove(stream.channelSlug);
		}
		clear() {
			this.#currentViewersById.clear();
			this.#slugByLivestreamId.clear();
			this.#streamsBySlug.clear();
		}
	};
	function shouldReplace(existing, incoming) {
		if (incoming.capturedAt !== existing.capturedAt) return incoming.capturedAt > existing.capturedAt;
		return SOURCE_PRIORITY[incoming.source] >= SOURCE_PRIORITY[existing.source];
	}
	function mergeReplacement(existing, incoming) {
		const sameLivestream = existing.livestreamId === void 0 || incoming.livestreamId === void 0 || existing.livestreamId === incoming.livestreamId;
		const preserveHiddenState = sameLivestream && !existing.showViewCount && incoming.showViewCount && incoming.source === "channel-details";
		const startedAt = sameLivestream && incoming.startedAt === void 0 ? existing.startedAt : incoming.startedAt;
		return {
			...incoming,
			...startedAt === void 0 ? {} : { startedAt },
			...preserveHiddenState ? { showViewCount: false } : {}
		};
	}
	var viewerCounts_default = "[data-ke-viewer-count],\n[data-ke-stream-uptime] {\n  box-sizing: border-box;\n  font-family: inherit;\n  white-space: nowrap;\n}\n\n.ke-viewer-count-card,\n.ke-stream-uptime-card {\n  position: absolute;\n  z-index: 20;\n  padding: 0 0.25rem;\n  color: var(--neon-surface-onSurface, #fff);\n  font-variant-numeric: tabular-nums;\n  line-height: 1.5rem;\n  pointer-events: none;\n  border-radius: 0.25rem;\n}\n\n.ke-viewer-count-card {\n  bottom: 0.375rem;\n  left: 0.375rem;\n  font-size: 0.875rem;\n  font-weight: 600;\n  background: var(--neon-surface-lowest, #0e0f12);\n}\n\n.ke-stream-uptime-card {\n  top: 0.375rem;\n  left: 0.375rem;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  font-size: 0.75rem;\n  font-weight: 500;\n  background: #0b0b0c;\n}\n.ke-stream-uptime-card::before {\n  width: 0.5rem;\n  height: 0.5rem;\n  flex: 0 0 auto;\n  content: \"\";\n  background: var(--neon-primary-base, #53fc18);\n  border-radius: 9999px;\n}\n\n.ke-viewer-count-sidebar,\n.ke-viewer-count-tooltip {\n  display: inline-flex;\n  flex: 0 0 auto;\n  align-items: center;\n  color: inherit;\n  font-size: 0.875rem;\n  font-weight: 600;\n  line-height: 1.25rem;\n}\n\n.ke-stream-uptime-tooltip {\n  position: absolute;\n  top: 100%;\n  right: 0;\n  color: var(--neon-surface-onSurfaceSecondary, #9fa6ad);\n  font-size: 0.6875rem;\n  font-variant-numeric: tabular-nums;\n  font-weight: 500;\n  line-height: 1rem;\n  pointer-events: none;\n  white-space: nowrap;\n}\n\n[data-ke-tooltip-uptime-container],\n[data-ke-sidebar-uptime-container] {\n  position: relative;\n}\n\n.ke-stream-uptime-sidebar {\n  position: absolute;\n  top: 100%;\n  right: 0;\n  color: var(--neon-surface-onSurfaceSecondary, #9fa6ad);\n  font-size: 0.6875rem;\n  font-variant-numeric: tabular-nums;\n  font-weight: 500;\n  line-height: 1rem;\n  pointer-events: none;\n  white-space: nowrap;\n}\n\n.ke-viewer-count-tooltip--standalone {\n  gap: 0.25rem;\n  margin-left: auto;\n}\n.ke-viewer-count-tooltip--standalone::before {\n  width: 0.5rem;\n  height: 0.5rem;\n  content: \"\";\n  background: var(--neon-primary-base, #53fc18);\n  border-radius: 9999px;\n}\n\n.ke-viewer-count-channel {\n  display: inline-flex;\n  align-items: center;\n  min-height: 1.375rem;\n  gap: 0.25rem;\n  color: var(--neon-surface-onSurface, #fff);\n  font-size: 0.875rem;\n  font-weight: 700;\n  line-height: 1.25rem;\n}\n.ke-viewer-count-channel svg {\n  width: 1rem;\n  height: 1rem;\n  flex: 0 0 auto;\n  fill: currentcolor;\n}\n\n.ke-viewer-count-channel__content {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  color: var(--neon-surface-onSurfaceSecondary, #9fa6ad);\n}\n\n.ke-viewer-count-channel__value {\n  color: var(--neon-primary-base, #53fc18);\n}\n\n.ke-animated-number {\n  display: inline-flex;\n  align-items: center;\n  font-variant-numeric: tabular-nums;\n}\n\n.ke-animated-number__digit {\n  position: relative;\n  display: inline-block;\n  width: 1ch;\n  height: var(--ke-animated-number-height, 1.25rem);\n  overflow: hidden;\n}\n\n.ke-animated-number__reel {\n  position: absolute;\n  top: 0;\n  left: 0;\n  display: flex;\n  width: 100%;\n  flex-direction: column;\n  will-change: transform;\n}\n\n.ke-animated-number__cell {\n  display: flex;\n  width: 100%;\n  height: var(--ke-animated-number-height, 1.25rem);\n  flex: 0 0 var(--ke-animated-number-height, 1.25rem);\n  align-items: center;\n  justify-content: center;\n  line-height: var(--ke-animated-number-height, 1.25rem);\n}\n\n.ke-animated-number__separator {\n  display: inline-block;\n  height: var(--ke-animated-number-height, 1.25rem);\n  line-height: var(--ke-animated-number-height, 1.25rem);\n}\n\n[data-ke-native-live-hidden] {\n  display: none !important;\n}\n\n[data-ke-native-card-live-hidden] {\n  display: none !important;\n}";
	var STYLE_ID$1 = "kick-enhancer-viewer-count-styles";
	var RENDER_DELAY_MS = 150;
	var UPTIME_REFRESH_INTERVAL_MS = 60 * 1e3;
	var log$1 = createLogger("viewer-counts");
	var store = new ViewerCountStore();
	var acquisition = new ViewerCountAcquisition({
		onData: () => scheduleRender("network"),
		store
	});
	var captureInitialized = false;
	var domFeatureActive = false;
	var cancelDomReady;
	var featureEnabled = false;
	var historyPushState;
	var historyReplaceState;
	var historyPushStateWrapper;
	var historyReplaceStateWrapper;
	var lastLogCounts;
	var lastUrl = window.location.href;
	var observer;
	var renderDeadline = Number.POSITIVE_INFINITY;
	var renderReason = "";
	var renderTimer;
	var sidebarHoverTarget;
	var streamUptimeEnabled = false;
	var stopActiveFeature$1;
	var stopWatchingSettings;
	var uptimeRefreshTimer;
	function initializeViewerCountCapture() {
		if (captureInitialized) return;
		captureInitialized = true;
		window.addEventListener("message", handleCaptureMessage);
		installViewerCountCaptureBridge();
	}
	function startViewerEnhancements() {
		stopActiveFeature$1?.();
		const settings = getSettings();
		setFeaturesEnabled(settings.ui.showHiddenViewerCounts, settings.ui.showStreamUptime);
		stopWatchingSettings = subscribeSettings((settings) => {
			setFeaturesEnabled(settings.ui.showHiddenViewerCounts, settings.ui.showStreamUptime);
		});
		let stopped = false;
		const stop = () => {
			if (stopped) return;
			stopped = true;
			stopWatchingSettings?.();
			stopWatchingSettings = void 0;
			featureEnabled = false;
			streamUptimeEnabled = false;
			cancelFeatureActivation();
			deactivateFeatureDom();
			if (stopActiveFeature$1 === stop) stopActiveFeature$1 = void 0;
		};
		stopActiveFeature$1 = stop;
		return stop;
	}
	function setFeaturesEnabled(showHiddenViewerCounts, showStreamUptime) {
		const wasEnabled = featureEnabled;
		featureEnabled = showHiddenViewerCounts || showStreamUptime;
		streamUptimeEnabled = showStreamUptime;
		if (featureEnabled) {
			if (!wasEnabled) {
				requestFeatureActivation();
				return;
			}
			syncUptimeRefreshTimer();
			scheduleRender("settings", 0);
			return;
		}
		if (wasEnabled) {
			cancelFeatureActivation();
			deactivateFeatureDom();
			log$1.info("Disabled");
		}
	}
	function requestFeatureActivation() {
		if (document.documentElement) {
			activateFeatureDom();
			return;
		}
		if (cancelDomReady) return;
		cancelDomReady = onDocumentElementReady(() => {
			cancelDomReady = void 0;
			activateFeatureDom();
		});
	}
	function cancelFeatureActivation() {
		cancelDomReady?.();
		cancelDomReady = void 0;
	}
	function activateFeatureDom() {
		if (!featureEnabled || domFeatureActive || !document.documentElement) return;
		cancelFeatureActivation();
		domFeatureActive = true;
		lastUrl = window.location.href;
		applyStyleToggle(STYLE_ID$1, viewerCounts_default, true);
		acquisition.start();
		installDomObserver();
		installRouteObserver();
		document.addEventListener("pointerover", handleSidebarHover, true);
		document.addEventListener("pointerout", handleSidebarHoverEnd, true);
		document.addEventListener("focusin", handleSidebarHover, true);
		document.addEventListener("focusout", handleSidebarHoverEnd, true);
		syncUptimeRefreshTimer();
		scheduleRender("enabled", 0);
		log$1.info("Enabled");
	}
	function deactivateFeatureDom() {
		if (!domFeatureActive) {
			sidebarHoverTarget = void 0;
			cleanupViewerCountDom();
			applyStyleToggle(STYLE_ID$1, viewerCounts_default, false);
			return;
		}
		domFeatureActive = false;
		acquisition.stop();
		observer?.disconnect();
		observer = void 0;
		uninstallRouteObserver();
		document.removeEventListener("pointerover", handleSidebarHover, true);
		document.removeEventListener("pointerout", handleSidebarHoverEnd, true);
		document.removeEventListener("focusin", handleSidebarHover, true);
		document.removeEventListener("focusout", handleSidebarHoverEnd, true);
		if (renderTimer !== void 0) {
			window.clearTimeout(renderTimer);
			renderTimer = void 0;
			renderDeadline = Number.POSITIVE_INFINITY;
			renderReason = "";
		}
		clearUptimeRefreshTimer();
		sidebarHoverTarget = void 0;
		cleanupViewerCountDom();
		applyStyleToggle(STYLE_ID$1, viewerCounts_default, false);
	}
	function syncUptimeRefreshTimer() {
		if (!domFeatureActive || !streamUptimeEnabled) {
			clearUptimeRefreshTimer();
			return;
		}
		if (uptimeRefreshTimer !== void 0) return;
		uptimeRefreshTimer = window.setInterval(() => {
			if (!document.hidden) scheduleRender("uptime", 0);
		}, UPTIME_REFRESH_INTERVAL_MS);
	}
	function clearUptimeRefreshTimer() {
		if (uptimeRefreshTimer === void 0) return;
		window.clearInterval(uptimeRefreshTimer);
		uptimeRefreshTimer = void 0;
	}
	function handleCaptureMessage(event) {
		if (event.source !== window && event.source !== _unsafeWindow || event.origin !== window.location.origin || !isCapturedViewerCountMessage(event.data)) return;
		const message = event.data;
		if (classifyViewerCountEndpoint(message.url, window.location.href) !== message.endpoint || Math.abs(Date.now() - message.timestamp) > 60 * 1e3) return;
		const normalized = normalizeViewerCountPayload(message.endpoint, message.payload, message.timestamp);
		recordViewerEndpointObservation(message.endpoint, normalized, message.timestamp, "captured");
		const streamCount = normalized.kind === "streams" ? normalized.streams.length : 0;
		const hiddenStreamCount = normalized.kind === "streams" ? normalized.streams.filter((stream) => !stream.showViewCount).length : 0;
		const updated = normalized.kind === "streams" ? store.upsertStreams(normalized.streams) : store.upsertCurrentViewers(normalized.currentViewers);
		if (message.endpoint === "PAGINATED_RECOMMENDED_LIVESTREAMS" && featureEnabled && hiddenStreamCount > 0) log$1.info("Hidden data captured", {
			hiddenStreams: hiddenStreamCount,
			streams: streamCount,
			updated
		});
		if (updated === 0) return;
		if (message.endpoint !== "CURRENT_VIEWERS") log$1.debug("Data captured", {
			endpoint: message.endpoint,
			updated
		});
		if (featureEnabled) scheduleRender("capture");
	}
	function installDomObserver() {
		if (observer || !document.documentElement) return;
		observer = new MutationObserver((mutations) => {
			if (window.location.href !== lastUrl) handleRouteChange();
			if (mutations.some((mutation) => !isIgnoredMutation(mutation))) scheduleRender("mutation");
		});
		observer.observe(document.documentElement, {
			attributeFilter: [
				"data-sidebar",
				"data-testid",
				"href"
			],
			attributes: true,
			characterData: true,
			childList: true,
			subtree: true
		});
	}
	function scheduleRender(reason, delay = RENDER_DELAY_MS) {
		if (!featureEnabled || !domFeatureActive) return;
		const deadline = performance.now() + Math.max(0, delay);
		if (renderTimer !== void 0 && deadline >= renderDeadline) return;
		if (renderTimer !== void 0) window.clearTimeout(renderTimer);
		renderDeadline = deadline;
		renderReason = reason;
		renderTimer = window.setTimeout(() => {
			const scheduledReason = renderReason;
			renderTimer = void 0;
			renderDeadline = Number.POSITIVE_INFINITY;
			renderReason = "";
			runRender(scheduledReason);
		}, Math.max(0, deadline - performance.now()));
	}
	function runRender(reason) {
		if (!featureEnabled) return;
		const result = renderViewerCounts(store, sidebarHoverTarget, getSettings().ui);
		acquisition.syncTargets(result.targetSlugs, result.activeChannelSlug);
		if (!areRenderCountsEqual(result.counts, lastLogCounts)) {
			lastLogCounts = result.counts;
			const details = {
				reason,
				...result.counts,
				targets: result.targetSlugs.size
			};
			if (result.counts.cardUptimes + result.counts.cards + result.counts.channel + result.counts.sidebar + result.counts.sidebarUptimes + result.counts.tooltipUptimes + result.counts.tooltips > 0) log$1.info("Rendered", details);
			else log$1.debug("Surfaces updated", details);
		}
	}
	function areRenderCountsEqual(left, right) {
		return right !== void 0 && left.cardUptimes === right.cardUptimes && left.cards === right.cards && left.channel === right.channel && left.sidebar === right.sidebar && left.sidebarUptimes === right.sidebarUptimes && left.tooltipUptimes === right.tooltipUptimes && left.tooltips === right.tooltips;
	}
	function handleSidebarHover(event) {
		if (!(event.target instanceof Element)) return;
		const link = event.target.closest(SIDEBAR_LINK_SELECTOR);
		const slug = getChannelSlugFromHref(link?.getAttribute("href"));
		if (!link || !slug) return;
		const displayName = link.querySelector("img[alt]")?.alt.trim() || findSidebarDisplayName(link);
		if (!displayName) return;
		sidebarHoverTarget = {
			displayName,
			slug
		};
		scheduleRender("sidebar-hover", 0);
	}
	function handleSidebarHoverEnd(event) {
		if (!(event.target instanceof Element)) return;
		const link = event.target.closest(SIDEBAR_LINK_SELECTOR);
		const slug = getChannelSlugFromHref(link?.getAttribute("href"));
		if (!link || !slug || sidebarHoverTarget?.slug !== slug) return;
		const relatedTarget = event.relatedTarget;
		if (relatedTarget instanceof Node && link.contains(relatedTarget)) return;
		sidebarHoverTarget = void 0;
		scheduleRender("sidebar-hover-end", 0);
	}
	function findSidebarDisplayName(link) {
		for (const element of link.querySelectorAll("span")) {
			const text = element.textContent?.trim();
			if (text && text.toLowerCase() !== "live" && !/^\d+(?:\.\d+)?[km]?$/i.test(text)) return text;
		}
	}
	function installRouteObserver() {
		if (historyPushStateWrapper || historyReplaceStateWrapper) return;
		historyPushState = window.history.pushState;
		historyReplaceState = window.history.replaceState;
		historyPushStateWrapper = function(...argumentsList) {
			Reflect.apply(historyPushState, this, argumentsList);
			handleRouteChange();
		};
		historyReplaceStateWrapper = function(...argumentsList) {
			Reflect.apply(historyReplaceState, this, argumentsList);
			handleRouteChange();
		};
		window.history.pushState = historyPushStateWrapper;
		window.history.replaceState = historyReplaceStateWrapper;
		window.addEventListener("popstate", handleRouteChange);
	}
	function uninstallRouteObserver() {
		window.removeEventListener("popstate", handleRouteChange);
		if (historyPushState && window.history.pushState === historyPushStateWrapper) window.history.pushState = historyPushState;
		if (historyReplaceState && window.history.replaceState === historyReplaceStateWrapper) window.history.replaceState = historyReplaceState;
		historyPushState = void 0;
		historyReplaceState = void 0;
		historyPushStateWrapper = void 0;
		historyReplaceStateWrapper = void 0;
	}
	function handleRouteChange() {
		if (window.location.href === lastUrl) return;
		lastUrl = window.location.href;
		sidebarHoverTarget = void 0;
		acquisition.beginRoute();
		scheduleRender("route", 0);
		log$1.debug("Route changed", { pathname: window.location.pathname });
	}
	function isIgnoredMutation(mutation) {
		if ((mutation.target instanceof Element ? mutation.target : mutation.target.parentElement)?.closest("#chatroom-messages, #channel-chatroom, [data-ke-viewer-count], [data-ke-stream-uptime]")) return true;
		const changedNodes = [...mutation.addedNodes, ...mutation.removedNodes];
		return changedNodes.length > 0 && changedNodes.every((node) => node instanceof Element && (node.matches("[data-ke-viewer-count], [data-ke-stream-uptime]") || Boolean(node.closest("[data-ke-viewer-count], [data-ke-stream-uptime]"))));
	}
	function composeDisposers(...disposers) {
		let disposed = false;
		return () => {
			if (disposed) return;
			disposed = true;
			for (let index = disposers.length - 1; index >= 0; index -= 1) disposers[index]?.();
		};
	}
	function ConfirmationDialog({ cancelLabel = "Cancel", confirmLabel = "OK", confirmTone = "primary", description, onCancel, onConfirm, onDismiss, open, title }) {
		const dialogRef = A$1(null);
		const titleId = g$1();
		const descriptionId = g$1();
		h(() => {
			if (!open) return;
			const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
			dialogRef.current?.querySelector("button")?.focus();
			return () => {
				if (previousFocus?.isConnected) previousFocus.focus();
			};
		}, [open]);
		if (!open) return null;
		const dismiss = onDismiss ?? onCancel;
		const handleKeyDown = (event) => {
			if (event.key === "Escape") {
				if (dismiss) {
					event.preventDefault();
					event.stopPropagation();
					dismiss();
				}
				return;
			}
			if (event.key !== "Tab") return;
			const buttons = dialogRef.current?.querySelectorAll("button:not(:disabled)");
			const firstButton = buttons?.item(0);
			const lastButton = buttons?.item((buttons?.length ?? 1) - 1);
			if (!firstButton || !lastButton) return;
			if (event.shiftKey && document.activeElement === firstButton) {
				event.preventDefault();
				lastButton.focus();
			} else if (!event.shiftKey && document.activeElement === lastButton) {
				event.preventDefault();
				firstButton.focus();
			}
		};
		return u("div", {
			className: "ke-confirmation-layer",
			children: u("div", {
				"aria-describedby": descriptionId,
				"aria-labelledby": titleId,
				"aria-modal": "true",
				className: "ke-confirmation-dialog",
				onKeyDown: handleKeyDown,
				ref: dialogRef,
				role: "alertdialog",
				children: [u("div", {
					className: "ke-confirmation-dialog__copy",
					children: [u("h3", {
						className: "ke-confirmation-dialog__title",
						id: titleId,
						children: title
					}), u("p", {
						className: "ke-confirmation-dialog__description",
						id: descriptionId,
						children: description
					})]
				}), u("div", {
					className: "ke-confirmation-dialog__actions",
					children: [onCancel ? u(Button, {
						onClick: onCancel,
						children: cancelLabel
					}) : null, u(Button, {
						onClick: onConfirm,
						tone: confirmTone,
						children: confirmLabel
					})]
				})]
			})
		});
	}
	var package_default = {
		name: "kick-enhancer",
		version: "0.1.2",
		"private": true,
		description: "Enhances KICK with viewer counts, stream uptime, content controls, and direct clip downloads.",
		homepage: "https://github.com/sixem/kick-enhancer#readme",
		repository: {
			"type": "git",
			"url": "https://github.com/sixem/kick-enhancer.git"
		},
		bugs: { "url": "https://github.com/sixem/kick-enhancer/issues" },
		type: "module",
		packageManager: "pnpm@10.33.0",
		scripts: {
			"dev": "node scripts/dev.mjs",
			"build": "pnpm typecheck && vite build",
			"build:greasyfork": "pnpm typecheck && vite build --mode greasyfork",
			"check": "pnpm typecheck && pnpm lint && pnpm format:check && pnpm test",
			"format": "prettier --write .",
			"format:check": "prettier --check .",
			"lint": "eslint . --max-warnings 0",
			"lint:fix": "eslint . --fix",
			"preview": "vite preview",
			"test": "node --test --experimental-transform-types \"tests/**/*.test.mjs\"",
			"typecheck": "tsc --noEmit"
		},
		dependencies: {
			"mux.js": "6.3.0",
			"preact": "^10.29.7"
		},
		devDependencies: {
			"@eslint/js": "^10.0.1",
			"@preact/preset-vite": "^2.10.6",
			"eslint": "^10.8.0",
			"eslint-plugin-react-hooks": "^7.1.1",
			"globals": "^17.8.0",
			"happy-dom": "^20.11.1",
			"prettier": "^3.9.6",
			"sass-embedded": "^1.100.0",
			"typescript": "^6.0.2",
			"typescript-eslint": "^8.65.0",
			"vite": "^8.1.5",
			"vite-plugin-monkey": "^8.1.0"
		}
	};
	function AboutTab({ onImportError, onImportRequest }) {
		const fileInputRef = A$1(null);
		const rejectImport = () => onImportError();
		const handleImportSelection = async (event) => {
			const input = event.currentTarget;
			const file = input.files?.[0];
			input.value = "";
			if (!file) return;
			if (file.size > 64 * 1024) return rejectImport();
			let text;
			try {
				text = await file.text();
			} catch {
				return rejectImport();
			}
			const result = parseSettingsFile(text);
			if (!result.ok) return rejectImport();
			onImportRequest(result.settings, result.compatibilityWarning);
		};
		const exportSettings = () => {
			triggerDownload(new Blob([serializeSettings(getSettings())], { type: "application/json;charset=utf-8" }), `kick-enhancer-settings-v7.json`);
		};
		return u("section", {
			className: "ke-about",
			"aria-labelledby": "ke-about-title",
			children: [
				u("img", {
					alt: "",
					className: "ke-about__icon",
					draggable: false,
					src: icon_default
				}),
				u("div", {
					className: "ke-about__identity",
					children: [u("h3", {
						className: "ke-about__title",
						id: "ke-about-title",
						children: "KICK Enhancer"
					}), u("p", {
						className: "ke-about__version",
						children: ["Version ", package_default.version]
					})]
				}),
				u("p", {
					className: "ke-about__description",
					children: "A userscript that makes KICK cleaner and puts useful viewing information back in sight."
				}),
				u("div", {
					className: "ke-about__actions",
					children: [
						u(Button, {
							onClick: () => fileInputRef.current?.click(),
							children: "Import settings"
						}),
						u(Button, {
							onClick: exportSettings,
							children: "Export settings"
						}),
						u("input", {
							accept: ".json,application/json",
							hidden: true,
							onChange: (event) => void handleImportSelection(event),
							ref: fileInputRef,
							type: "file"
						})
					]
				})
			]
		});
	}
	function triggerDownload(blob, filename) {
		const url = URL.createObjectURL(blob);
		const anchor = document.createElement("a");
		anchor.download = filename;
		anchor.href = url;
		anchor.hidden = true;
		document.body.append(anchor);
		anchor.click();
		anchor.remove();
		window.setTimeout(() => URL.revokeObjectURL(url), 0);
	}
	var MAX_ARRAY_ITEMS = 20;
	var MAX_DEPTH = 3;
	var MAX_STRING_LENGTH = 500;
	var REDACTED_KEY_PATTERN = /authorization|cookie|credential|password|playback|secret|session|signature|token/i;
	var URL_PATTERN = /https?:\/\/[^\s"'<>]+/gi;
	function formatLogEntry(entry) {
		const time = new Date(entry.timestamp);
		const timestamp = Number.isNaN(time.getTime()) ? "Invalid time" : time.toISOString();
		const message = entry.arguments.map((value) => formatLogValue(value)).join(" ");
		return `${timestamp} [${entry.level.toUpperCase()}] [${entry.scope}] ${message}`;
	}
	function formatLogMessage(entry) {
		return entry.arguments.map(formatCompactLogValue).join("; ");
	}
	function formatLogValue(value) {
		if (typeof value === "string") return sanitizeText(value);
		if (value === null || typeof value === "number" || typeof value === "boolean" || typeof value === "undefined") return String(value);
		if (typeof value === "bigint") return `${value}n`;
		if (typeof value === "symbol") return value.description ? `Symbol(${value.description})` : "Symbol()";
		if (typeof value === "function") return `[Function ${value.name || "anonymous"}]`;
		try {
			return JSON.stringify(sanitizeValue(value, 0, new WeakSet()));
		} catch {
			return "[Unserializable value]";
		}
	}
	function formatCompactLogValue(value) {
		if (value instanceof Error) return `${value.name}: ${sanitizeText(value.message)}`;
		if (typeof value !== "object" || value === null || Array.isArray(value)) return formatLogValue(value);
		const prototype = Reflect.getPrototypeOf(value);
		if (prototype !== Object.prototype && prototype !== null) return formatLogValue(value);
		const sanitized = sanitizeValue(value, 0, new WeakSet());
		const entries = typeof sanitized === "object" && sanitized !== null ? Object.entries(sanitized) : [];
		return entries.length === 0 ? "{}" : entries.map(([key, entry]) => `${key}=${formatCompactDataValue(entry)}`).join("; ");
	}
	function formatCompactDataValue(value) {
		if (typeof value === "string") return value;
		if (value === null || typeof value === "number" || typeof value === "boolean" || typeof value === "undefined") return String(value);
		return JSON.stringify(value);
	}
	function sanitizeValue(value, depth, seen) {
		if (typeof value === "string") return sanitizeText(value);
		if (value === null || typeof value === "number" || typeof value === "boolean" || typeof value === "undefined") return value;
		if (typeof value === "bigint") return `${value}n`;
		if (typeof value === "symbol") return value.description ? `Symbol(${value.description})` : "Symbol()";
		if (typeof value === "function") return `[Function ${value.name || "anonymous"}]`;
		if (typeof value !== "object") return "[Unknown value]";
		if (value instanceof Error) return {
			message: sanitizeText(value.message),
			name: value.name
		};
		if (depth >= MAX_DEPTH) return "[Max depth]";
		if (seen.has(value)) return "[Circular]";
		seen.add(value);
		if (Array.isArray(value)) {
			const values = value.slice(0, MAX_ARRAY_ITEMS).map((entry) => sanitizeValue(entry, depth + 1, seen));
			if (value.length > MAX_ARRAY_ITEMS) values.push(`[${value.length - MAX_ARRAY_ITEMS} more items]`);
			return values;
		}
		const sanitized = {};
		for (const [key, entry] of Object.entries(value)) sanitized[key] = REDACTED_KEY_PATTERN.test(key) ? "[Redacted]" : sanitizeValue(entry, depth + 1, seen);
		return sanitized;
	}
	function sanitizeText(value) {
		const withoutCredentials = value.replace(/\bBearer\s+\S+/gi, "Bearer [Redacted]").replace(URL_PATTERN, sanitizeUrl);
		return withoutCredentials.length > MAX_STRING_LENGTH ? `${withoutCredentials.slice(0, MAX_STRING_LENGTH)}…` : withoutCredentials;
	}
	function sanitizeUrl(rawUrl) {
		try {
			const url = new URL(rawUrl);
			const suffix = url.search || url.hash ? "?[redacted]" : "";
			return `${url.origin}${url.pathname}${suffix}`;
		} catch {
			return "[Invalid URL]";
		}
	}
	var EMPTY_LOGS = [];
	var EMPTY_OBSERVATIONS = [];
	var LOG_LEVEL_OPTIONS = [
		{
			label: "All levels",
			value: "all"
		},
		{
			label: "Debug",
			value: "debug"
		},
		{
			label: "Info",
			value: "info"
		},
		{
			label: "Warnings",
			value: "warn"
		},
		{
			label: "Errors",
			value: "error"
		}
	];
	var TIME_FORMATTER = new Intl.DateTimeFormat(void 0, {
		hour: "2-digit",
		hourCycle: "h23",
		minute: "2-digit",
		second: "2-digit"
	});
	var CHECK_COLUMNS = [
		{
			header: "Endpoint",
			id: "endpoint",
			renderCell: (result) => VIEWER_COUNT_ENDPOINT_LABELS[result.endpoint],
			width: "7.5rem"
		},
		{
			align: "center",
			header: "Status",
			id: "status",
			renderCell: (result) => u(DiagnosticsPill, {
				label: result.status,
				tone: result.status
			}),
			width: "7.2rem"
		},
		{
			align: "center",
			header: "Response",
			id: "response",
			renderCell: formatCheckResponse,
			width: "6.6rem"
		},
		{
			cellClassName: "ke-diagnostics__details-cell",
			header: "Details",
			id: "details",
			renderCell: (result) => result.summary,
			width: "minmax(12rem, 1fr)"
		}
	];
	var PASSIVE_COLUMNS = [
		{
			header: "Endpoint",
			id: "endpoint",
			renderCell: (row) => VIEWER_COUNT_ENDPOINT_LABELS[row.endpoint],
			width: "9rem"
		},
		{
			align: "center",
			header: "State",
			id: "state",
			renderCell: (row) => u(DiagnosticsPill, {
				label: row.observation ? "observed" : "not seen",
				tone: row.observation ? "observed" : "not-seen"
			}),
			width: "7.2rem"
		},
		{
			align: "center",
			header: "Last seen",
			id: "last-seen",
			renderCell: (row) => row.observation ? formatTime(row.observation.observedAt) : "—",
			width: "6.2rem"
		},
		{
			cellClassName: "ke-diagnostics__details-cell",
			header: "Normalized result",
			id: "details",
			renderCell: (row) => formatObservation(row.observation),
			width: "minmax(12rem, 1fr)"
		}
	];
	var LOG_COLUMNS = [
		{
			align: "center",
			header: "Level",
			id: "level",
			renderCell: (entry) => u(DiagnosticsPill, {
				label: entry.level,
				tone: entry.level
			}),
			width: "6.25rem"
		},
		{
			align: "center",
			header: "Time",
			id: "time",
			renderCell: (entry) => formatTime(entry.timestamp),
			width: "5.3rem"
		},
		{
			align: "center",
			header: "Scope",
			id: "scope",
			renderCell: (entry) => u(DiagnosticsPill, {
				label: entry.scope,
				tone: getScopeTone(entry.scope)
			}),
			width: "10rem"
		},
		{
			cellClassName: "ke-diagnostics__log-message",
			header: "Message",
			id: "message",
			renderCell: formatLogMessage,
			width: "minmax(14rem, 1fr)"
		}
	];
	function DiagnosticsTab({ active, onShowMessage }) {
		const abortControllerRef = A$1(null);
		const [channelSlug, setChannelSlug] = d(() => getChannelSlugFromPath(window.location.pathname) ?? "");
		const [checks, setChecks] = d([]);
		const [checksRunning, setChecksRunning] = d(false);
		const [observations, setObservations] = d(() => active ? getViewerEndpointObservations() : EMPTY_OBSERVATIONS);
		const [logs, setLogs] = d(() => active ? getLogHistory() : EMPTY_LOGS);
		const [logLevel, setLogLevel] = d("all");
		const [logScope, setLogScope] = d("all");
		h(() => {
			if (!active) {
				setLogs(EMPTY_LOGS);
				setObservations(EMPTY_OBSERVATIONS);
				abortControllerRef.current?.abort();
				return;
			}
			setLogs(getLogHistory());
			setObservations(getViewerEndpointObservations());
			const unsubscribeLogs = subscribeLogHistory(setLogs);
			const unsubscribeObservations = subscribeViewerEndpointObservations(setObservations);
			return () => {
				unsubscribeLogs();
				unsubscribeObservations();
				abortControllerRef.current?.abort();
			};
		}, [active]);
		const passiveRows = T$1(() => {
			const byEndpoint = new Map(observations.map((observation) => [observation.endpoint, observation]));
			return VIEWER_COUNT_ENDPOINTS.map((endpoint) => ({
				endpoint,
				observation: byEndpoint.get(endpoint)
			}));
		}, [observations]);
		const scopeOptions = T$1(() => {
			return [{
				label: "All scopes",
				value: "all"
			}, ...[...new Set(logs.map((entry) => entry.scope))].sort().map((scope) => ({
				label: scope,
				value: scope
			}))];
		}, [logs]);
		const filteredLogs = T$1(() => {
			return logs.filter((entry) => (logLevel === "all" || entry.level === logLevel) && (logScope === "all" || entry.scope === logScope)).reverse();
		}, [
			logLevel,
			logScope,
			logs
		]);
		const runChecks = async () => {
			abortControllerRef.current?.abort();
			const controller = new AbortController();
			abortControllerRef.current = controller;
			setChecksRunning(true);
			try {
				setChecks(await runViewerEndpointChecks(channelSlug, controller.signal));
			} catch {
				if (!controller.signal.aborted) setChecks([{
					endpoint: "CHANNEL_DETAILS",
					status: "failed",
					summary: "The endpoint check stopped unexpectedly."
				}, {
					endpoint: "CURRENT_VIEWERS",
					status: "unavailable",
					summary: "The channel check did not complete."
				}]);
			} finally {
				if (abortControllerRef.current === controller) {
					abortControllerRef.current = null;
					setChecksRunning(false);
				}
			}
		};
		const copyLogs = async () => {
			if (filteredLogs.length === 0) {
				onShowMessage("No logs to copy", "No visible log entries match the current filters.");
				return;
			}
			const text = filteredLogs.map(formatLogEntry).reverse().join("\n");
			try {
				await navigator.clipboard.writeText(text);
				onShowMessage("Session log copied", `Copied ${filteredLogs.length} log ${filteredLogs.length === 1 ? "entry" : "entries"} to the clipboard.`);
			} catch {
				onShowMessage("Could not copy session log", "Could not access the clipboard. Check your browser permissions and try again.");
			}
		};
		return u("div", {
			className: "ke-diagnostics",
			children: [
				u("section", {
					"aria-labelledby": "ke-diagnostics-checks-title",
					className: "ke-diagnostics__section",
					children: [
						u("div", {
							className: "ke-diagnostics__section-heading",
							children: u("div", { children: [u("h3", {
								className: "ke-diagnostics__title",
								id: "ke-diagnostics-checks-title",
								children: "Endpoint health"
							}), u("p", {
								className: "ke-diagnostics__description",
								children: "Run the same channel and viewer requests used by stream enhancements. Checks only run when requested."
							})] })
						}),
						u("form", {
							className: "ke-diagnostics__check-controls",
							onSubmit: (event) => {
								event.preventDefault();
								if (!checksRunning) runChecks();
							},
							children: [u(TextField, {
								autoComplete: "off",
								label: "KICK channel",
								onValueChange: setChannelSlug,
								placeholder: "channel-name",
								spellcheck: false,
								value: channelSlug
							}), u(Button, {
								className: "ke-button--primary",
								disabled: checksRunning,
								type: "submit",
								children: checksRunning ? "Checking…" : "Run checks"
							})]
						}),
						u(ListView, {
							ariaLabel: "Endpoint check results",
							ariaLive: "polite",
							className: "ke-diagnostics__check-list",
							columns: CHECK_COLUMNS,
							emptyContent: checksRunning ? "Contacting KICK…" : "Run checks to test endpoints.",
							getItemKey: (result) => result.endpoint,
							heightMode: "content",
							items: checks
						})
					]
				}),
				u("section", {
					"aria-labelledby": "ke-diagnostics-observed-title",
					className: "ke-diagnostics__section",
					children: [u("div", {
						className: "ke-diagnostics__section-heading",
						children: u("div", { children: [u("h3", {
							className: "ke-diagnostics__title",
							id: "ke-diagnostics-observed-title",
							children: "Observed responses"
						}), u("p", {
							className: "ke-diagnostics__description",
							children: "Passive summaries from KICK responses already used by the page or Enhancer. No response bodies are retained."
						})] })
					}), u(ListView, {
						ariaLabel: "Observed viewer endpoint responses",
						className: "ke-diagnostics__observation-list",
						columns: PASSIVE_COLUMNS,
						getItemKey: (row) => row.endpoint,
						items: passiveRows
					})]
				}),
				u("section", {
					"aria-labelledby": "ke-diagnostics-logs-title",
					className: "ke-diagnostics__section",
					children: [
						u("div", {
							className: "ke-diagnostics__section-heading",
							children: u("div", { children: [u("h3", {
								className: "ke-diagnostics__title",
								id: "ke-diagnostics-logs-title",
								children: "Session log"
							}), u("p", {
								className: "ke-diagnostics__description",
								children: "Latest 250 entries from this page load. Sensitive fields and URL queries are redacted when displayed or copied."
							})] })
						}),
						u("div", {
							className: "ke-diagnostics__log-controls",
							children: [
								u(SelectBox, {
									label: "Level",
									onValueChange: setLogLevel,
									options: LOG_LEVEL_OPTIONS,
									value: logLevel
								}),
								u(SelectBox, {
									label: "Scope",
									onValueChange: setLogScope,
									options: scopeOptions,
									value: logScope
								}),
								u("div", {
									className: "ke-diagnostics__actions",
									children: [u(Button, {
										onClick: () => void copyLogs(),
										children: "Copy"
									}), u(Button, {
										onClick: () => {
											clearLogHistory();
											setLogScope("all");
										},
										tone: "danger",
										children: "Clear"
									})]
								})
							]
						}),
						u(ListView, {
							ariaLabel: "KICK Enhancer session logs",
							ariaLive: "polite",
							className: "ke-diagnostics__log-list",
							columns: LOG_COLUMNS,
							emptyContent: "No log entries match these filters.",
							getItemKey: (entry) => entry.id,
							items: filteredLogs,
							rowHeight: 36
						})
					]
				})
			]
		});
	}
	function DiagnosticsPill({ label, tone }) {
		return u("span", {
			className: "ke-diagnostics__pill",
			"data-tone": tone,
			children: u("span", {
				className: "ke-diagnostics__pill-label",
				children: label
			})
		});
	}
	var SCOPE_TONES = [
		"scope-blue",
		"scope-cyan",
		"scope-green",
		"scope-amber",
		"scope-violet",
		"scope-rose"
	];
	function getScopeTone(scope) {
		let hash = 0;
		for (const character of scope) hash = hash * 31 + character.charCodeAt(0) >>> 0;
		return SCOPE_TONES[hash % SCOPE_TONES.length] ?? SCOPE_TONES[0];
	}
	function formatCheckResponse(result) {
		const duration = result.durationMs === void 0 ? void 0 : `${Math.round(result.durationMs)}ms`;
		if (result.httpStatus !== void 0) return duration ? `${result.httpStatus} (${duration})` : String(result.httpStatus);
		return duration ?? "—";
	}
	function formatObservation(observation) {
		if (!observation) return "No matching response seen this session.";
		const source = observation.source === "captured" ? "page traffic" : "fallback request";
		return [
			`normalized=${observation.records}`,
			`hidden=${observation.hiddenViewerCounts}`,
			`startTimes=${observation.startTimes}`,
			`source=${source}`
		].join("; ");
	}
	function formatTime(timestamp) {
		const date = new Date(timestamp);
		if (Number.isNaN(date.getTime())) return "Unknown";
		return TIME_FORMATTER.format(date);
	}
	function setChatFontSize(value) {
		return updateChatSetting("fontSize", value === null ? null : normalizeChatValue(value, 10, 24));
	}
	function setChatFontFamily(value) {
		return updateChatSetting("fontFamily", normalizeChatFontFamily(value));
	}
	function setChatFontWeight(value) {
		return updateChatSetting("fontWeight", normalizeChatFontWeight(value));
	}
	function setChatMessageDividers(enabled) {
		return updateChatSetting("messageDividers", enabled);
	}
	function setChatMessageSpacing(value) {
		return updateChatSetting("messageSpacing", value === null ? null : normalizeChatValue(value, 0, 12));
	}
	function setShowChatStatistics(visible) {
		return updateChatSetting("showChatStatistics", visible);
	}
	function resetChatAppearance() {
		return updateSettings((settings) => {
			if (settings.chat.fontFamily === null && settings.chat.fontSize === null && settings.chat.fontWeight === null && !settings.chat.messageDividers && settings.chat.messageSpacing === null) return settings;
			return {
				...settings,
				chat: {
					...settings.chat,
					fontFamily: null,
					fontSize: null,
					fontWeight: null,
					messageDividers: false,
					messageSpacing: null
				}
			};
		});
	}
	function setShowClipDownloadButtons(visible) {
		return updateUiSetting("showClipDownloadButtons", visible);
	}
	function setShowHiddenViewerCounts(visible) {
		return updateUiSetting("showHiddenViewerCounts", visible);
	}
	function setShowStreamUptime(visible) {
		return updateUiSetting("showStreamUptime", visible);
	}
	function setHideChatLeaderboard(hidden) {
		return updateUiSetting("hideChatLeaderboard", hidden);
	}
	function setHideFollowingRecommendations(hidden) {
		return updateUiSetting("hideFollowingRecommendations", hidden);
	}
	function setHideGamblingStreams(hidden) {
		return updateUiSetting("hideGamblingStreams", hidden);
	}
	function setHideHomepageCarousel(hidden) {
		return updateUiSetting("hideHomepageCarousel", hidden);
	}
	function setHideRecommendedChannels(hidden) {
		return updateUiSetting("hideRecommendedChannels", hidden);
	}
	function updateChatSetting(key, value) {
		return updateSettings((settings) => ({
			...settings,
			chat: {
				...settings.chat,
				[key]: value
			}
		}));
	}
	function updateUiSetting(key, value) {
		return updateSettings((settings) => ({
			...settings,
			ui: {
				...settings.ui,
				[key]: value
			}
		}));
	}
	function StreamAndClipSettingsSection({ settings }) {
		return u("div", {
			className: "ke-settings",
			children: [
				u(Toggle, {
					checked: settings.showHiddenViewerCounts,
					description: "Restore KICK-reported viewer counts on live channels.",
					label: "Show hidden viewer counts",
					onCheckedChange: (visible) => {
						setShowHiddenViewerCounts(visible);
					}
				}),
				u(Toggle, {
					checked: settings.showStreamUptime,
					description: "Show how long live streams have been running on thumbnails and sidebar tooltips.",
					label: "Show stream uptime",
					onCheckedChange: (visible) => {
						setShowStreamUptime(visible);
					}
				}),
				u(Toggle, {
					checked: settings.showClipDownloadButtons,
					description: "Show KICK Enhancer download actions on clip cards and clip pages.",
					label: "Show clip download buttons",
					onCheckedChange: (visible) => {
						setShowClipDownloadButtons(visible);
					}
				})
			]
		});
	}
	function ChatSettingsSection({ open, settings }) {
		const kickDefaults = T$1(() => {
			return {
				fontSize: readKickChatValue("--chatroom-font-size", 14, 10, 24),
				messageSpacing: readKickChatValue("--chatroom-message-spacing", 4, 0, 12)
			};
		}, [open]);
		return u("div", {
			className: "ke-settings",
			children: [
				u(SelectBox, {
					description: "Change the typeface used throughout the chatroom.",
					label: "Chat font",
					onValueChange: (value) => {
						setChatFontFamily(value === "default" ? null : value);
					},
					options: CHAT_FONT_FAMILY_OPTIONS,
					value: settings.fontFamily ?? "default"
				}),
				u(TrackBar, {
					description: "Adjust message text without changing usernames, timestamps, or controls.",
					formatValue: (value) => settings.fontWeight === null ? `KICK default (${value})` : String(value),
					label: "Message font weight",
					max: 900,
					min: 100,
					onValueChange: (value) => {
						setChatFontWeight(value);
					},
					step: 100,
					value: settings.fontWeight ?? 400
				}),
				u(TrackBar, {
					description: "Adjust chat messages, timestamps, replies, and emotes together.",
					formatValue: (value) => settings.fontSize === null ? `KICK default (${value}px)` : `${value}px`,
					label: "Chat font size",
					max: 24,
					min: 10,
					onValueChange: (value) => {
						setChatFontSize(value);
					},
					step: 1,
					value: settings.fontSize ?? kickDefaults.fontSize
				}),
				u(TrackBar, {
					description: "Adjust the vertical space inside each chat message.",
					formatValue: (value) => settings.messageSpacing === null ? `KICK default (${value}px)` : `${value}px`,
					label: "Message spacing",
					max: 12,
					min: 0,
					onValueChange: (value) => {
						setChatMessageSpacing(value);
					},
					step: 1,
					value: settings.messageSpacing ?? kickDefaults.messageSpacing
				}),
				u(Toggle, {
					checked: settings.messageDividers,
					description: "Add a subtle divider between chat messages.",
					label: "Message dividers",
					onCheckedChange: (enabled) => {
						setChatMessageDividers(enabled);
					}
				}),
				u(Toggle, {
					checked: settings.showChatStatistics,
					description: "Show live message activity, active chatters, socket RTT, and session totals in chat.",
					label: "Show chat statistics",
					onCheckedChange: (visible) => {
						setShowChatStatistics(visible);
					}
				}),
				u("div", {
					className: "ke-settings__actions",
					children: u(Button, {
						density: "compact",
						disabled: settings.fontFamily === null && settings.fontSize === null && settings.fontWeight === null && !settings.messageDividers && settings.messageSpacing === null,
						onClick: () => {
							resetChatAppearance();
						},
						children: "Use KICK defaults"
					})
				})
			]
		});
	}
	function ContentSettingsSection({ settings }) {
		return u("div", {
			className: "ke-settings",
			children: [
				u(Toggle, {
					checked: settings.hideChatLeaderboard,
					description: "Remove the gift and KICKs leaderboard above chat.",
					label: "Hide chat leaderboard",
					onCheckedChange: (hidden) => {
						setHideChatLeaderboard(hidden);
					}
				}),
				u(Toggle, {
					checked: settings.hideHomepageCarousel,
					description: "Remove the featured autoplaying stream and chat from the homepage.",
					label: "Hide homepage carousel",
					onCheckedChange: (hidden) => {
						setHideHomepageCarousel(hidden);
					}
				}),
				u(Toggle, {
					checked: settings.hideGamblingStreams,
					description: "Hide live followed gambling streams.",
					label: "Hide followed gambling streams",
					onCheckedChange: (hidden) => {
						setHideGamblingStreams(hidden);
					}
				}),
				u(Toggle, {
					checked: settings.hideFollowingRecommendations,
					description: "Remove the \"Channels you might like\" section from the Following page.",
					label: "Hide \"Channels you might like\"",
					onCheckedChange: (hidden) => {
						setHideFollowingRecommendations(hidden);
					}
				})
			]
		});
	}
	function SidebarSettingsSection({ settings }) {
		return u("div", {
			className: "ke-settings",
			children: [u(Toggle, {
				checked: settings.hideRecommendedChannels,
				description: "Remove recommended channels and their controls from the sidebar.",
				label: "Hide recommended channels",
				onCheckedChange: (hidden) => {
					setHideRecommendedChannels(hidden);
				}
			}), u(Toggle, {
				checked: settings.rememberSidebarState,
				description: "Restore the sidebar to its last expanded or collapsed state on reloads.",
				label: "Remember sidebar state",
				onCheckedChange: (enabled) => {
					setRememberSidebarState(enabled);
				}
			})]
		});
	}
	var CHAT_FONT_FAMILY_OPTIONS = [
		{
			label: "KICK default",
			value: "default"
		},
		{
			label: "Arial",
			value: "arial"
		},
		{
			label: "Verdana",
			value: "verdana"
		},
		{
			label: "Tahoma",
			value: "tahoma"
		},
		{
			label: "Trebuchet MS",
			value: "trebuchet"
		},
		{
			label: "Georgia",
			value: "georgia"
		},
		{
			label: "Monospace",
			value: "monospace"
		}
	];
	function readKickChatValue(property, fallback, min, max) {
		return normalizeChatValue(Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue(property)), min, max) ?? fallback;
	}
	var PROJECT_URL = "https://github.com/sixem/kick-enhancer";
	function SettingsModal({ onRequestClose, open, settings }) {
		const [activeTab, setActiveTab] = d("about");
		const [dialog, setDialog] = d(null);
		const dialogOpen = dialog !== null;
		const closeDialog = () => setDialog(null);
		h(() => {
			if (!open) setDialog(null);
		}, [open]);
		const showMessage = (title, description) => {
			setDialog({
				description,
				onConfirm: closeDialog,
				onDismiss: closeDialog,
				title
			});
		};
		const showImportError = () => showMessage("Could not import settings", "Choose a valid KICK Enhancer settings JSON file and try again.");
		const showImportConfirmation = (importedSettings, compatibilityWarning) => {
			setDialog({
				confirmLabel: "Import settings",
				description: compatibilityWarning ? "Some values are missing, unknown, or invalid. Compatible settings will be imported and unsupported values will use current defaults." : "This will replace every current setting with the values from this file.",
				onCancel: closeDialog,
				onConfirm: () => {
					replaceSettings(importedSettings);
					closeDialog();
				},
				title: compatibilityWarning ? "Import settings with warnings?" : "Import settings?"
			});
		};
		const showResetConfirmation = () => {
			setDialog({
				confirmLabel: "Reset settings",
				confirmTone: "danger",
				description: "This restores every KICK Enhancer setting to its default value.",
				onCancel: closeDialog,
				onConfirm: () => {
					resetSettings();
					closeDialog();
				},
				title: "Reset all settings?"
			});
		};
		return u(Modal, {
			className: "ke-workspace-modal ke-settings-modal",
			description: "Customize how KICK behaves and looks.",
			dismissDisabled: dialogOpen,
			footer: u(S, { children: [
				u(Button, {
					"aria-label": "Open KICK Enhancer on GitHub",
					className: "ke-settings-modal__github",
					disabled: dialogOpen,
					onClick: () => {
						window.open(PROJECT_URL, "_blank", "noopener,noreferrer");
					},
					children: [u(GitHubIcon, { class: "ke-settings-modal__github-icon" }), "GitHub"]
				}),
				u(Button, {
					disabled: dialogOpen,
					onClick: showResetConfirmation,
					tone: "danger",
					children: "Reset to defaults"
				}),
				u(Button, {
					className: "ke-button--primary",
					disabled: dialogOpen,
					onClick: onRequestClose,
					children: "Done"
				})
			] }),
			icon: icon_default,
			onRequestClose,
			open,
			title: "KICK Enhancer",
			children: u("div", {
				className: "ke-confirmation-host",
				children: [u("div", {
					"aria-hidden": dialogOpen || void 0,
					className: "ke-settings-modal__tabs",
					inert: dialogOpen,
					children: u(Tabs, {
						ariaLabel: "KICK Enhancer settings",
						onChange: setActiveTab,
						tabs: [
							{
								content: u(AboutTab, {
									onImportError: showImportError,
									onImportRequest: showImportConfirmation
								}),
								contentClassName: "ke-tabs__panel-content--centered",
								id: "about",
								label: "About"
							},
							{
								content: u(StreamAndClipSettingsSection, { settings: settings.ui }),
								id: "streams",
								label: "Streams / Clips"
							},
							{
								content: u(ChatSettingsSection, {
									open,
									settings: settings.chat
								}),
								id: "chat",
								label: "Chat"
							},
							{
								content: u(ContentSettingsSection, { settings: settings.ui }),
								id: "content",
								label: "Visibility"
							},
							{
								content: u(SidebarSettingsSection, { settings: settings.ui }),
								id: "sidebar",
								label: "Sidebar"
							},
							{
								content: u(DiagnosticsTab, {
									active: activeTab === "diagnostics",
									onShowMessage: showMessage
								}),
								id: "diagnostics",
								label: "Diagnostics"
							}
						],
						value: activeTab
					})
				}), dialog ? u(ConfirmationDialog, {
					...dialog,
					open: true
				}) : null]
			})
		});
	}
	function useSettings() {
		const [settings, setSettings] = d(getSettings);
		h(() => subscribeSettings(setSettings), []);
		return settings;
	}
	var app_default = ".ke-about {\n  display: grid;\n  justify-items: center;\n  gap: 1rem;\n  text-align: center;\n}\n\n.ke-about__icon {\n  width: 4rem;\n  height: 4rem;\n  object-fit: contain;\n}\n\n.ke-about__identity {\n  display: grid;\n  gap: 0.2rem;\n}\n\n.ke-about__title {\n  margin: 0;\n  color: #f2f2f2;\n  font-size: 1.2rem;\n  font-weight: 750;\n  line-height: 1.25;\n}\n\n.ke-about__version {\n  margin: 0;\n  color: #8c8c8c;\n  font-size: 0.75rem;\n  font-variant-numeric: tabular-nums;\n}\n\n.ke-about__description {\n  margin: 0;\n  color: #747474;\n  font-size: 0.825rem;\n  font-weight: 500;\n  line-height: 1.5;\n}\n\n.ke-about__actions {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  gap: 0.65rem;\n}\n\n.ke-diagnostics {\n  display: grid;\n  gap: 1.5rem;\n}\n\n.ke-diagnostics__section {\n  min-width: 0;\n  display: grid;\n  gap: 0.8rem;\n}\n\n.ke-diagnostics__section-heading {\n  min-width: 0;\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n}\n\n.ke-diagnostics__title {\n  margin: 0;\n  color: #f2f2f2;\n  font-size: 0.9rem;\n  font-weight: 750;\n  line-height: 1.3;\n}\n\n.ke-diagnostics__description {\n  margin: 0.25rem 0 0;\n  color: #747474;\n  font-size: 0.76rem;\n  font-weight: 500;\n  line-height: 1.45;\n}\n\n.ke-diagnostics__check-controls {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto;\n  align-items: end;\n  gap: 0.65rem;\n}\n\n.ke-diagnostics__actions {\n  display: flex;\n  flex: none;\n  gap: 0.45rem;\n}\n\n.ke-diagnostics__check-list {\n  max-height: 8.5rem;\n}\n.ke-diagnostics__check-list .ke-list-view__empty {\n  min-height: 2.125rem;\n  padding: 0.42rem 0.6rem;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.ke-diagnostics__observation-list {\n  height: 13rem;\n}\n\n.ke-diagnostics__log-list {\n  height: 13.25rem;\n}\n\n.ke-diagnostics__pill {\n  max-width: 100%;\n  display: inline-flex;\n  box-sizing: border-box;\n  min-width: 4.8rem;\n  align-items: center;\n  justify-content: center;\n  padding: 0.12rem 0.42rem;\n  overflow: hidden;\n  border: 1px solid #303030;\n  border-radius: 0.3rem;\n  color: #8c8c8c;\n  font-size: 0.68rem;\n  font-weight: 750;\n  letter-spacing: 0.03em;\n  line-height: 1.35;\n  text-transform: capitalize;\n}\n.ke-diagnostics__pill[data-tone=passed], .ke-diagnostics__pill[data-tone=observed] {\n  border-color: rgba(83, 252, 24, 0.4);\n  color: #53fc18;\n}\n.ke-diagnostics__pill[data-tone=degraded], .ke-diagnostics__pill[data-tone=unavailable], .ke-diagnostics__pill[data-tone=warn] {\n  border-color: rgba(245, 196, 81, 0.4);\n  color: #f5c451;\n}\n.ke-diagnostics__pill[data-tone=failed], .ke-diagnostics__pill[data-tone=error] {\n  border-color: rgba(255, 107, 107, 0.45);\n  color: #ff6b6b;\n}\n.ke-diagnostics__pill[data-tone=debug], .ke-diagnostics__pill[data-tone=info], .ke-diagnostics__pill[data-tone=warn], .ke-diagnostics__pill[data-tone=error] {\n  text-transform: uppercase;\n}\n.ke-diagnostics__pill[data-tone=info], .ke-diagnostics__pill[data-tone=scope-blue] {\n  border-color: rgba(117, 178, 255, 0.42);\n  color: #a9cfff;\n}\n.ke-diagnostics__pill[data-tone^=scope-] {\n  text-transform: none;\n}\n.ke-diagnostics__pill[data-tone=scope-cyan] {\n  border-color: rgba(95, 214, 225, 0.42);\n  color: #8bdce4;\n}\n.ke-diagnostics__pill[data-tone=scope-green] {\n  border-color: rgba(83, 252, 24, 0.36);\n  color: #8eea70;\n}\n.ke-diagnostics__pill[data-tone=scope-amber] {\n  border-color: rgba(245, 196, 81, 0.4);\n  color: #f5c451;\n}\n.ke-diagnostics__pill[data-tone=scope-violet] {\n  border-color: rgba(179, 142, 255, 0.42);\n  color: #c6a9ff;\n}\n.ke-diagnostics__pill[data-tone=scope-rose] {\n  border-color: rgba(242, 128, 170, 0.42);\n  color: #f09bbb;\n}\n\n.ke-diagnostics__pill-label {\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.ke-diagnostics__details-cell {\n  align-items: flex-start;\n}\n\n.ke-diagnostics__details-cell .ke-list-view__cell-content {\n  overflow: visible;\n  line-height: 1.4;\n  text-overflow: clip;\n  white-space: normal;\n}\n\n.ke-diagnostics__log-controls {\n  display: grid;\n  grid-template-columns: 8rem minmax(0, 1fr) auto;\n  align-items: end;\n  gap: 0.65rem;\n}\n\n.ke-diagnostics__log-message .ke-list-view__cell-content {\n  line-height: 1.4;\n}\n\n@media (max-width: 36rem) {\n  .ke-diagnostics__section-heading {\n    display: grid;\n  }\n  .ke-diagnostics__actions {\n    justify-content: flex-start;\n  }\n  .ke-diagnostics__check-controls,\n  .ke-diagnostics__log-controls {\n    grid-template-columns: 1fr;\n  }\n}\n.kick-enhancer-host {\n  display: contents;\n}\n\n.kick-enhancer-button {\n  position: relative;\n  display: flex;\n  flex: 0 0 auto;\n  box-sizing: border-box;\n  align-items: center;\n  justify-content: center;\n  width: 2.25rem;\n  height: 2.25rem;\n  padding: 0;\n  overflow: hidden;\n  color: var(--neon-secondary-onSecondary, #fff);\n  cursor: pointer;\n  user-select: none;\n  background: var(--neon-secondary-base, #42474d);\n  border: 0;\n  border-radius: 0.25rem;\n  outline: 0;\n  transition: background-color 150ms ease, transform 100ms ease;\n}\n.kick-enhancer-button::after {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  content: \"\";\n  background: transparent;\n  border-radius: inherit;\n}\n.kick-enhancer-button:hover::after {\n  background: var(--neon-stateLayer-surfaceHover, rgba(240, 241, 242, 0.0392156863));\n}\n.kick-enhancer-button:focus-visible {\n  outline: 2px solid var(--neon-focusLight, #fff);\n  outline-offset: 2px;\n}\n.kick-enhancer-button:active {\n  transform: scale(0.95);\n}\n.kick-enhancer-button__icon {\n  display: block;\n  width: 1.25rem;\n  height: 1.25rem;\n  pointer-events: none;\n  object-fit: contain;\n}\n\n.kick-enhancer-download-button {\n  overflow: visible;\n}\n.kick-enhancer-download-button__icon {\n  width: 1.25rem;\n  height: 1.25rem;\n  pointer-events: none;\n}\n.kick-enhancer-download-button__badge {\n  position: absolute;\n  top: -0.3rem;\n  right: -0.3rem;\n  display: grid;\n  min-width: 1rem;\n  height: 1rem;\n  padding-inline: 0.2rem;\n  place-items: center;\n  border: 1px solid #050505;\n  border-radius: 0.3rem;\n  background: #53fc18;\n  color: #071402;\n  font-size: 0.625rem;\n  font-weight: 800;\n  line-height: 1;\n}\n.kick-enhancer-download-button.needs-attention {\n  box-shadow: inset 0 0 0 1px #53fc18;\n}\n.kick-enhancer-download-button.is-error {\n  box-shadow: inset 0 0 0 1px #ff6b6b;\n}\n\n#sidebar-wrapper .bg-outline-decorative.h-px {\n  display: none !important;\n}\n\n#main-container :where(a[href^=\"/category/\"].bg-secondary-base,\na[href^=\"/category/\"] .bg-secondary-base,\n:has(> a[href^=\"/category/\"]) > .bg-secondary-base,\nspan.bg-secondary-base.rounded-full) {\n  border-radius: 0.3rem;\n  background-color: #212931;\n}";
	var LOGGED_IN_ANCHOR_SELECTOR = "button[data-testid=\"kicks-top-nav\"]";
	var LOGGED_OUT_ANCHOR_SELECTOR = "nav button[data-testid=\"login\"]";
	function findTopNavActions(ownerDocument = document) {
		return (ownerDocument.querySelector(LOGGED_IN_ANCHOR_SELECTOR) ?? ownerDocument.querySelector(LOGGED_OUT_ANCHOR_SELECTOR))?.parentElement ?? null;
	}
	function App() {
		const [settingsOpen, setSettingsOpen] = d(false);
		const downloadActivity = useDownloadActivity();
		const settings = useSettings();
		const downloadCount = downloadActivity.activeCount + downloadActivity.queuedCount;
		return u(S, { children: [
			downloadActivity.visible ? u("button", {
				"aria-label": downloadActivity.attention ? "Open Download Manager; a download needs attention" : "Open Download Manager",
				class: `kick-enhancer-button kick-enhancer-download-button${downloadActivity.error ? " is-error" : ""}${downloadActivity.attention ? " needs-attention" : ""}`,
				"data-kick-enhancer": "download-activity",
				onClick: () => openDownloadCenter(),
				type: "button",
				children: [downloadActivity.activeCount > 0 ? u(LoadingSpinnerIcon, { class: "ke-icon kick-enhancer-download-button__icon ke-icon--spinner" }) : u(DownloadIcon, { class: "ke-icon kick-enhancer-download-button__icon" }), downloadCount > 0 ? u("span", {
					"aria-label": `${downloadCount} active or queued downloads`,
					className: "kick-enhancer-download-button__badge",
					children: downloadCount > 9 ? "9+" : downloadCount
				}) : null]
			}) : null,
			u("button", {
				"aria-label": "Open KICK Enhancer settings",
				class: "kick-enhancer-button",
				"data-kick-enhancer": "top-nav-button",
				onClick: () => setSettingsOpen(true),
				type: "button",
				children: u("img", {
					alt: "",
					class: "kick-enhancer-button__icon",
					draggable: false,
					src: icon_default
				})
			}),
			u(SettingsModal, {
				onRequestClose: () => setSettingsOpen(false),
				open: settingsOpen,
				settings
			})
		] });
	}
	var HOST_ID = "kick-enhancer-top-nav";
	var STYLE_ID = "kick-enhancer-styles";
	var mountedHost = null;
	var stopActiveFeature;
	function installStyles() {
		installSharedUiStyles();
		if (document.getElementById(STYLE_ID)) return;
		const style = document.createElement("style");
		style.id = STYLE_ID;
		style.textContent = app_default;
		document.documentElement.append(style);
	}
	function mountButton() {
		if (mountedHost && !mountedHost.isConnected) {
			R(null, mountedHost);
			mountedHost = null;
		}
		if (document.getElementById(HOST_ID)) return;
		const actions = findTopNavActions();
		if (!actions) return;
		const host = document.createElement("span");
		host.id = HOST_ID;
		host.className = "kick-enhancer-host";
		actions.prepend(host);
		mountedHost = host;
		R(u(App, {}), host);
	}
	function startTopNavButton() {
		stopActiveFeature?.();
		installStyles();
		mountButton();
		let mountScheduled = false;
		let stopped = false;
		const observer = new MutationObserver(() => {
			if (stopped || mountScheduled || document.getElementById(HOST_ID)) return;
			mountScheduled = true;
			queueMicrotask(() => {
				mountScheduled = false;
				if (!stopped) mountButton();
			});
		});
		observer.observe(document.documentElement, {
			childList: true,
			subtree: true
		});
		const stop = () => {
			if (stopped) return;
			stopped = true;
			observer.disconnect();
			const host = mountedHost ?? document.getElementById(HOST_ID);
			if (host) {
				R(null, host);
				host.remove();
			}
			mountedHost = null;
			document.getElementById(STYLE_ID)?.remove();
			if (stopActiveFeature === stop) stopActiveFeature = void 0;
		};
		stopActiveFeature = stop;
		return stop;
	}
	var log = createLogger("app");
	var stopFeatures;
	initializeViewerCountCapture();
	initializeChatStatisticsCapture();
	async function start() {
		await initializeSettings();
		stopFeatures?.();
		stopFeatures = composeDisposers(startChatAppearance(), startChatLeaderboardVisibility(), startChatStatistics(), startClipDownloadActions(), startViewerEnhancements(), startFollowingRecommendationsVisibility(), startGamblingStreamsVisibility(), startHomepageCarouselVisibility(), startRecommendedChannelsVisibility(), startSidebarStateMemory(), startTopNavButton());
		log.info("Ready");
	}
	start();
})();
