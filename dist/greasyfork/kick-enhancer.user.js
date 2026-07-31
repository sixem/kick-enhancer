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
// @match        https://kick.com/*
// @require      https://cdn.jsdelivr.net/npm/preact@10.29.7/dist/preact.umd.js
// @require      https://cdn.jsdelivr.net/npm/preact@10.29.7/hooks/dist/hooks.umd.js
// @require      https://cdn.jsdelivr.net/npm/preact@10.29.7/compat/dist/compat.umd.js
// @require      https://cdn.jsdelivr.net/npm/preact@10.29.7/jsx-runtime/dist/jsxRuntime.umd.js
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        unsafeWindow
// @run-at       document-start
// @noframes
// ==/UserScript==

/*!
 * Preact 10.29.7
 * Source: https://github.com/preactjs/preact
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015-present Jason Miller
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * ---
 *
 * mux.js 6.3.0
 * Source: https://github.com/videojs/mux.js
 *
 * Apache License
 *                            Version 2.0, January 2004
 *                         http://www.apache.org/licenses/
 *
 *    TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION
 *
 *    1. Definitions.
 *
 *       "License" shall mean the terms and conditions for use, reproduction,
 *       and distribution as defined by Sections 1 through 9 of this document.
 *
 *       "Licensor" shall mean the copyright owner or entity authorized by
 *       the copyright owner that is granting the License.
 *
 *       "Legal Entity" shall mean the union of the acting entity and all
 *       other entities that control, are controlled by, or are under common
 *       control with that entity. For the purposes of this definition,
 *       "control" means (i) the power, direct or indirect, to cause the
 *       direction or management of such entity, whether by contract or
 *       otherwise, or (ii) ownership of fifty percent (50%) or more of the
 *       outstanding shares, or (iii) beneficial ownership of such entity.
 *
 *       "You" (or "Your") shall mean an individual or Legal Entity
 *       exercising permissions granted by this License.
 *
 *       "Source" form shall mean the preferred form for making modifications,
 *       including but not limited to software source code, documentation
 *       source, and configuration files.
 *
 *       "Object" form shall mean any form resulting from mechanical
 *       transformation or translation of a Source form, including but
 *       not limited to compiled object code, generated documentation,
 *       and conversions to other media types.
 *
 *       "Work" shall mean the work of authorship, whether in Source or
 *       Object form, made available under the License, as indicated by a
 *       copyright notice that is included in or attached to the work
 *       (an example is provided in the Appendix below).
 *
 *       "Derivative Works" shall mean any work, whether in Source or Object
 *       form, that is based on (or derived from) the Work and for which the
 *       editorial revisions, annotations, elaborations, or other modifications
 *       represent, as a whole, an original work of authorship. For the purposes
 *       of this License, Derivative Works shall not include works that remain
 *       separable from, or merely link (or bind by name) to the interfaces of,
 *       the Work and Derivative Works thereof.
 *
 *       "Contribution" shall mean any work of authorship, including
 *       the original version of the Work and any modifications or additions
 *       to that Work or Derivative Works thereof, that is intentionally
 *       submitted to Licensor for inclusion in the Work by the copyright owner
 *       or by an individual or Legal Entity authorized to submit on behalf of
 *       the copyright owner. For the purposes of this definition, "submitted"
 *       means any form of electronic, verbal, or written communication sent
 *       to the Licensor or its representatives, including but not limited to
 *       communication on electronic mailing lists, source code control systems,
 *       and issue tracking systems that are managed by, or on behalf of, the
 *       Licensor for the purpose of discussing and improving the Work, but
 *       excluding communication that is conspicuously marked or otherwise
 *       designated in writing by the copyright owner as "Not a Contribution."
 *
 *       "Contributor" shall mean Licensor and any individual or Legal Entity
 *       on behalf of whom a Contribution has been received by Licensor and
 *       subsequently incorporated within the Work.
 *
 *    2. Grant of Copyright License. Subject to the terms and conditions of
 *       this License, each Contributor hereby grants to You a perpetual,
 *       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
 *       copyright license to reproduce, prepare Derivative Works of,
 *       publicly display, publicly perform, sublicense, and distribute the
 *       Work and such Derivative Works in Source or Object form.
 *
 *    3. Grant of Patent License. Subject to the terms and conditions of
 *       this License, each Contributor hereby grants to You a perpetual,
 *       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
 *       (except as stated in this section) patent license to make, have made,
 *       use, offer to sell, sell, import, and otherwise transfer the Work,
 *       where such license applies only to those patent claims licensable
 *       by such Contributor that are necessarily infringed by their
 *       Contribution(s) alone or by combination of their Contribution(s)
 *       with the Work to which such Contribution(s) was submitted. If You
 *       institute patent litigation against any entity (including a
 *       cross-claim or counterclaim in a lawsuit) alleging that the Work
 *       or a Contribution incorporated within the Work constitutes direct
 *       or contributory patent infringement, then any patent licenses
 *       granted to You under this License for that Work shall terminate
 *       as of the date such litigation is filed.
 *
 *    4. Redistribution. You may reproduce and distribute copies of the
 *       Work or Derivative Works thereof in any medium, with or without
 *       modifications, and in Source or Object form, provided that You
 *       meet the following conditions:
 *
 *       (a) You must give any other recipients of the Work or
 *           Derivative Works a copy of this License; and
 *
 *       (b) You must cause any modified files to carry prominent notices
 *           stating that You changed the files; and
 *
 *       (c) You must retain, in the Source form of any Derivative Works
 *           that You distribute, all copyright, patent, trademark, and
 *           attribution notices from the Source form of the Work,
 *           excluding those notices that do not pertain to any part of
 *           the Derivative Works; and
 *
 *       (d) If the Work includes a "NOTICE" text file as part of its
 *           distribution, then any Derivative Works that You distribute must
 *           include a readable copy of the attribution notices contained
 *           within such NOTICE file, excluding those notices that do not
 *           pertain to any part of the Derivative Works, in at least one
 *           of the following places: within a NOTICE text file distributed
 *           as part of the Derivative Works; within the Source form or
 *           documentation, if provided along with the Derivative Works; or,
 *           within a display generated by the Derivative Works, if and
 *           wherever such third-party notices normally appear. The contents
 *           of the NOTICE file are for informational purposes only and
 *           do not modify the License. You may add Your own attribution
 *           notices within Derivative Works that You distribute, alongside
 *           or as an addendum to the NOTICE text from the Work, provided
 *           that such additional attribution notices cannot be construed
 *           as modifying the License.
 *
 *       You may add Your own copyright statement to Your modifications and
 *       may provide additional or different license terms and conditions
 *       for use, reproduction, or distribution of Your modifications, or
 *       for any such Derivative Works as a whole, provided Your use,
 *       reproduction, and distribution of the Work otherwise complies with
 *       the conditions stated in this License.
 *
 *    5. Submission of Contributions. Unless You explicitly state otherwise,
 *       any Contribution intentionally submitted for inclusion in the Work
 *       by You to the Licensor shall be under the terms and conditions of
 *       this License, without any additional terms or conditions.
 *       Notwithstanding the above, nothing herein shall supersede or modify
 *       the terms of any separate license agreement you may have executed
 *       with Licensor regarding such Contributions.
 *
 *    6. Trademarks. This License does not grant permission to use the trade
 *       names, trademarks, service marks, or product names of the Licensor,
 *       except as required for reasonable and customary use in describing the
 *       origin of the Work and reproducing the content of the NOTICE file.
 *
 *    7. Disclaimer of Warranty. Unless required by applicable law or
 *       agreed to in writing, Licensor provides the Work (and each
 *       Contributor provides its Contributions) on an "AS IS" BASIS,
 *       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 *       implied, including, without limitation, any warranties or conditions
 *       of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
 *       PARTICULAR PURPOSE. You are solely responsible for determining the
 *       appropriateness of using or redistributing the Work and assume any
 *       risks associated with Your exercise of permissions under this License.
 *
 *    8. Limitation of Liability. In no event and under no legal theory,
 *       whether in tort (including negligence), contract, or otherwise,
 *       unless required by applicable law (such as deliberate and grossly
 *       negligent acts) or agreed to in writing, shall any Contributor be
 *       liable to You for damages, including any direct, indirect, special,
 *       incidental, or consequential damages of any character arising as a
 *       result of this License or out of the use or inability to use the
 *       Work (including but not limited to damages for loss of goodwill,
 *       work stoppage, computer failure or malfunction, or any and all
 *       other commercial damages or losses), even if such Contributor
 *       has been advised of the possibility of such damages.
 *
 *    9. Accepting Warranty or Additional Liability. While redistributing
 *       the Work or Derivative Works thereof, You may choose to offer,
 *       and charge a fee for, acceptance of support, warranty, indemnity,
 *       or other liability obligations and/or rights consistent with this
 *       License. However, in accepting such obligations, You may act only
 *       on Your own behalf and on Your sole responsibility, not on behalf
 *       of any other Contributor, and only if You agree to indemnify,
 *       defend, and hold each Contributor harmless for any liability
 *       incurred by, or claims asserted against, such Contributor by reason
 *       of your accepting any such warranty or additional liability.
 *
 *    END OF TERMS AND CONDITIONS
 *
 *    APPENDIX: How to apply the Apache License to your work.
 *
 *       To apply the Apache License to your work, attach the following
 *       boilerplate notice, with the fields enclosed by brackets "[]"
 *       replaced with your own identifying information. (Don't include
 *       the brackets!)  The text should be enclosed in the appropriate
 *       comment syntax for the file format. We also recommend that a
 *       file or class name and description of purpose be included on the
 *       same "printed page" as the copyright notice for easier
 *       identification within third-party archives.
 *
 *    Copyright Brightcove, Inc.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

(function(preact, preact_jsx_runtime, preact_hooks, preact_compat) {
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
	var history = [];
	var historyListeners = new Set();
	var historyNotifyTimer;
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
	function isScopeEnabled(scope) {
		const includedPatterns = config.filters.filter((pattern) => !pattern.startsWith("-"));
		const excludedPatterns = config.filters.filter((pattern) => pattern.startsWith("-")).map((pattern) => pattern.slice(1));
		return (includedPatterns.length === 0 || includedPatterns.some((pattern) => matchesPattern(scope, pattern))) && !excludedPatterns.some((pattern) => matchesPattern(scope, pattern));
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
			messageSpacing: null
		},
		ui: {
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
		version: 5
	};
	function parseSettings(value) {
		if (!isRecord$2(value)) return DEFAULT_SETTINGS;
		const chat = isRecord$2(value.chat) ? value.chat : {};
		const ui = isRecord$2(value.ui) ? value.ui : {};
		return {
			chat: {
				fontFamily: normalizeChatFontFamily(chat.fontFamily),
				fontSize: normalizeChatValue(chat.fontSize, 10, 24),
				fontWeight: normalizeChatFontWeight(chat.fontWeight),
				messageDividers: chat.messageDividers === true,
				messageSpacing: normalizeChatValue(chat.messageSpacing, 0, 12)
			},
			ui: {
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
			version: 5
		};
	}
	function parseSettingsFile(text) {
		let value;
		try {
			value = JSON.parse(text);
		} catch {
			return { ok: false };
		}
		if (!isRecord$2(value) || !hasRecognizedSetting(value)) return { ok: false };
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
		return isRecord$2(value) && Object.keys(expected).some((key) => Object.prototype.hasOwnProperty.call(value, key));
	}
	function matchesCanonicalValue(value, expected) {
		if (!isRecord$2(expected)) return Object.is(value, expected);
		if (!isRecord$2(value)) return false;
		const expectedKeys = Object.keys(expected);
		const valueKeys = Object.keys(value);
		return expectedKeys.length === valueKeys.length && expectedKeys.every((key) => Object.prototype.hasOwnProperty.call(value, key) && matchesCanonicalValue(value[key], expected[key]));
	}
	function isRecord$2(value) {
		return value !== null && typeof value === "object" && !Array.isArray(value);
	}
	var SETTINGS_KEY = "settings";
	var log$8 = createLogger("settings");
	var listeners$1 = new Set();
	var currentSettings = DEFAULT_SETTINGS;
	var pendingWrite = Promise.resolve();
	function notifyListeners() {
		for (const listener of listeners$1) listener(currentSettings);
	}
	async function initializeSettings() {
		try {
			const storedSettings = await _GM.getValue(SETTINGS_KEY, "");
			currentSettings = storedSettings ? parseSettings(JSON.parse(storedSettings)) : DEFAULT_SETTINGS;
		} catch (error) {
			log$8.warn("Load failed; using defaults", error);
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
		if (nextSettings === currentSettings) return pendingWrite;
		currentSettings = nextSettings;
		notifyListeners();
		const serializedSettings = JSON.stringify(currentSettings);
		pendingWrite = pendingWrite.catch(() => void 0).then(() => _GM.setValue(SETTINGS_KEY, serializedSettings)).catch((error) => {
			log$8.error("Save failed", error);
		});
		return pendingWrite;
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
	var STYLE_ID$8 = "kick-enhancer-chat-appearance";
	var stopActiveFeature$4;
	function startChatAppearance() {
		stopActiveFeature$4?.();
		let stopped = false;
		const stopObserving = observeSetting((settings) => settings.chat, applyChatAppearance);
		const stop = () => {
			if (stopped) return;
			stopped = true;
			stopObserving();
			document.getElementById(STYLE_ID$8)?.remove();
			if (stopActiveFeature$4 === stop) stopActiveFeature$4 = void 0;
		};
		stopActiveFeature$4 = stop;
		return stop;
	}
	function applyChatAppearance(settings) {
		const styles = createChatAppearanceStyles(settings);
		const existingStyle = document.getElementById(STYLE_ID$8);
		if (!styles) {
			existingStyle?.remove();
			return;
		}
		if (existingStyle) {
			if (existingStyle.textContent !== styles) existingStyle.textContent = styles;
			return;
		}
		const style = document.createElement("style");
		style.id = STYLE_ID$8;
		style.textContent = styles;
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
	var shared_ui_default = ".ke-confirmation-host {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  min-width: 0;\n  min-height: 0;\n  overflow: hidden;\n}\n\n.ke-confirmation-layer {\n  position: absolute;\n  z-index: 10;\n  inset: 0;\n  display: grid;\n  padding: 1rem;\n  place-items: center;\n  background: rgba(0, 0, 0, 0.32);\n  backdrop-filter: blur(3px);\n}\n\n.ke-confirmation-dialog {\n  width: min(24rem, 100%);\n  padding: 1.1rem;\n  border: 1px solid #303030;\n  border-radius: 0.45rem;\n  background: #080808;\n  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.55);\n}\n\n.ke-confirmation-dialog__copy {\n  display: grid;\n  gap: 0.45rem;\n}\n\n.ke-confirmation-dialog__title {\n  margin: 0;\n  color: #f2f2f2;\n  font-size: 1rem;\n  font-weight: 700;\n  line-height: 1.3;\n}\n\n.ke-confirmation-dialog__description {\n  margin: 0;\n  color: #747474;\n  font-size: 0.825rem;\n  font-weight: 500;\n  line-height: 1.5;\n}\n\n.ke-confirmation-dialog__actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.65rem;\n  margin-top: 1rem;\n}\n\n.ke-button,\n.ke-text-field,\n.ke-select-box__input,\n.ke-track-bar {\n  box-sizing: border-box;\n  font: inherit;\n}\n\n.ke-button {\n  min-height: 2.35rem;\n  padding: 0 0.85rem;\n  border: 1px solid #1b1b1b;\n  border-radius: 0.45rem;\n  background: #0a0a0a;\n  color: #f2f2f2;\n  font-size: 0.875rem;\n  font-weight: 650;\n  line-height: 1;\n  cursor: pointer;\n  transition: background 140ms ease, border-color 140ms ease, color 140ms ease;\n}\n.ke-button:hover:not(:disabled) {\n  border-color: #303030;\n  background: #101010;\n}\n.ke-button:focus-visible {\n  outline: 2px solid #53fc18;\n  outline-offset: 2px;\n}\n.ke-button:disabled {\n  cursor: not-allowed;\n  opacity: 0.45;\n}\n.ke-button--compact {\n  min-height: 2rem;\n  padding-inline: 0.65rem;\n}\n.ke-button--primary {\n  border-color: #53fc18;\n  background: #53fc18;\n  color: #071402;\n}\n.ke-button--primary:hover:not(:disabled) {\n  border-color: #7dff50;\n  background: #7dff50;\n}\n.ke-button--danger {\n  color: #ff6b6b;\n}\n\n.ke-form-field {\n  display: grid;\n  min-width: 0;\n  gap: 0.4rem;\n  color: #f2f2f2;\n}\n\n.ke-form-field__label {\n  display: block;\n  font-size: 0.875rem;\n  font-weight: 650;\n  line-height: 1.25;\n}\n\n.ke-form-field__description {\n  display: block;\n  color: #747474;\n  font-size: 0.78rem;\n  line-height: 1.4;\n  font-weight: 500;\n}\n\n.ke-text-field,\n.ke-select-box__input {\n  width: 100%;\n  min-height: 2.35rem;\n  border: 1px solid #1b1b1b;\n  border-radius: 0.45rem;\n  outline: none;\n  background: #0a0a0a;\n  color: #f2f2f2;\n  font-size: 0.875rem;\n  transition: background 140ms ease, border-color 140ms ease;\n}\n.ke-text-field:hover:not(:disabled),\n.ke-select-box__input:hover:not(:disabled) {\n  border-color: #303030;\n  background: #101010;\n}\n.ke-text-field:focus-visible,\n.ke-select-box__input:focus-visible {\n  border-color: #53fc18;\n  box-shadow: 0 0 0 1px #53fc18;\n}\n.ke-text-field:disabled,\n.ke-select-box__input:disabled {\n  cursor: not-allowed;\n  opacity: 0.45;\n}\n\n.ke-text-field {\n  padding: 0 0.72rem;\n  user-select: text;\n}\n.ke-text-field::placeholder {\n  color: #8c8c8c;\n}\n\n.ke-text-field-shell {\n  display: flex;\n  align-items: stretch;\n}\n\n.ke-text-field-shell .ke-text-field {\n  flex: 1 1 auto;\n  min-width: 0;\n  border-radius: 0.45rem 0 0 0.45rem;\n}\n\n.ke-text-field__suffix {\n  display: flex;\n  flex: 0 0 auto;\n  align-items: center;\n  padding-inline: 0.7rem;\n  border: 1px solid #1b1b1b;\n  border-left: 0;\n  border-radius: 0 0.45rem 0.45rem 0;\n  background: #080808;\n  color: #8c8c8c;\n  font-size: 0.875rem;\n}\n\n.ke-text-field-shell:focus-within .ke-text-field__suffix {\n  border-color: #53fc18;\n}\n\n.ke-select-box {\n  position: relative;\n  display: block;\n}\n\n.ke-select-box__input {\n  appearance: none;\n  padding: 0 2.2rem 0 0.72rem;\n  color-scheme: dark;\n  cursor: pointer;\n}\n\n.ke-select-box__chevron {\n  position: absolute;\n  top: 50%;\n  right: 0.85rem;\n  width: 0.45rem;\n  height: 0.45rem;\n  border-right: 1.5px solid #8c8c8c;\n  border-bottom: 1.5px solid #8c8c8c;\n  pointer-events: none;\n  transform: translateY(-70%) rotate(45deg);\n}\n\n.ke-toggle {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  color: #f2f2f2;\n  cursor: pointer;\n}\n\n.ke-toggle__copy {\n  display: grid;\n  min-width: 0;\n  gap: 0.4rem;\n}\n\n.ke-toggle__control {\n  position: relative;\n  flex: 0 0 auto;\n}\n\n.ke-toggle__input {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  opacity: 0;\n  pointer-events: none;\n}\n\n.ke-toggle__track {\n  position: relative;\n  display: block;\n  width: 2.4rem;\n  height: 1.35rem;\n  border: 1px solid #303030;\n  border-radius: 999px;\n  background: #0a0a0a;\n  transition: background 140ms ease, border-color 140ms ease;\n}\n\n.ke-toggle__thumb {\n  position: absolute;\n  top: 0.18rem;\n  left: 0.18rem;\n  width: 0.85rem;\n  height: 0.85rem;\n  border-radius: 50%;\n  background: #8c8c8c;\n  transition: background 140ms ease, transform 140ms ease;\n}\n\n.ke-toggle__input:checked + .ke-toggle__track {\n  border-color: #53fc18;\n  background: #53fc18;\n}\n\n.ke-toggle__input:checked + .ke-toggle__track .ke-toggle__thumb {\n  background: #071402;\n  transform: translateX(1.02rem);\n}\n\n.ke-toggle__input:focus-visible + .ke-toggle__track {\n  outline: 2px solid #53fc18;\n  outline-offset: 2px;\n}\n\n.ke-toggle__input:disabled + .ke-toggle__track {\n  opacity: 0.45;\n}\n\n.ke-track-bar__heading {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  gap: 1rem;\n}\n\n.ke-track-bar__value {\n  color: #8c8c8c;\n  font-size: 0.78rem;\n  font-variant-numeric: tabular-nums;\n}\n\n.ke-track-bar {\n  width: 100%;\n  height: 1.25rem;\n  margin: 0;\n  appearance: none;\n  outline: none;\n  background: transparent;\n  cursor: pointer;\n}\n.ke-track-bar::-webkit-slider-runnable-track {\n  height: 0.28rem;\n  border-radius: 999px;\n  background: linear-gradient(to right, #53fc18 0 var(--ke-track-progress), #1b1b1b var(--ke-track-progress) 100%);\n}\n.ke-track-bar::-moz-range-track {\n  height: 0.28rem;\n  border-radius: 999px;\n  background: #1b1b1b;\n}\n.ke-track-bar::-moz-range-progress {\n  height: 0.28rem;\n  border-radius: 999px;\n  background: #53fc18;\n}\n.ke-track-bar::-webkit-slider-thumb {\n  width: 1rem;\n  height: 1rem;\n  margin-top: -0.36rem;\n  appearance: none;\n  border: 2px solid #53fc18;\n  border-radius: 50%;\n  background: #050505;\n}\n.ke-track-bar::-moz-range-thumb {\n  width: 0.8rem;\n  height: 0.8rem;\n  border: 2px solid #53fc18;\n  border-radius: 50%;\n  background: #050505;\n}\n.ke-track-bar:focus-visible::-webkit-slider-thumb {\n  outline: 2px solid #53fc18;\n  outline-offset: 2px;\n}\n.ke-track-bar:focus-visible::-moz-range-thumb {\n  outline: 2px solid #53fc18;\n  outline-offset: 2px;\n}\n\n.ke-list-view {\n  --ke-list-view-scrollbar-gutter: 0.5rem;\n  min-width: 0;\n  min-height: 0;\n  display: grid;\n  grid-template-rows: 2rem minmax(0, 1fr);\n  overflow: hidden;\n  border: 1px solid #1b1b1b;\n  border-radius: 0.45rem;\n  background: #080808;\n  user-select: none;\n}\n\n.ke-list-view__header-group,\n.ke-list-view__scroll {\n  min-width: 0;\n  min-height: 0;\n  box-sizing: border-box;\n  padding-right: var(--ke-list-view-scrollbar-gutter);\n}\n\n.ke-list-view__scroll {\n  --ke-scroll-indicator-right: var(\n    --ke-list-view-scrollbar-gutter\n  );\n}\n\n.ke-list-view__header-group {\n  border-bottom: 1px solid #1b1b1b;\n  background: #0a0a0a;\n}\n\n.ke-list-view__header,\n.ke-list-view__row {\n  min-width: 0;\n  width: 100%;\n  display: grid;\n}\n\n.ke-list-view__header {\n  height: 100%;\n  color: #8c8c8c;\n  font-size: 0.72rem;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n}\n\n.ke-list-view__header-cell,\n.ke-list-view__cell {\n  min-width: 0;\n  display: flex;\n  align-items: center;\n  padding: 0.42rem 0.6rem;\n  overflow: hidden;\n}\n.ke-list-view__header-cell:not(:last-child),\n.ke-list-view__cell:not(:last-child) {\n  border-right: 1px solid #1b1b1b;\n}\n.ke-list-view__header-cell[data-align=center],\n.ke-list-view__cell[data-align=center] {\n  justify-content: center;\n  text-align: center;\n}\n.ke-list-view__header-cell[data-align=end],\n.ke-list-view__cell[data-align=end] {\n  justify-content: flex-end;\n  text-align: right;\n}\n\n.ke-list-view__header-label,\n.ke-list-view__cell-content {\n  min-width: 0;\n  max-width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.ke-list-view__body {\n  position: relative;\n  min-width: 0;\n  min-height: 100%;\n}\n.ke-list-view__body[data-virtualized=true] {\n  contain: layout paint style;\n}\n\n.ke-list-view__row {\n  min-height: 2.125rem;\n  box-sizing: border-box;\n  border-bottom: 1px solid #1b1b1b;\n  color: #f2f2f2;\n  font-size: 0.76rem;\n}\n.ke-list-view__row[data-last-row=true] {\n  border-bottom: 0;\n}\n.ke-list-view__row[data-virtualized=true] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  contain: layout paint style;\n}\n.ke-list-view__row:hover {\n  background: #101010;\n}\n.ke-list-view__row.is-interactive {\n  cursor: pointer;\n}\n.ke-list-view__row.is-interactive:focus-visible {\n  outline: 1px solid #53fc18;\n  outline-offset: -1px;\n}\n\n.ke-list-view__empty {\n  min-height: 4rem;\n  display: grid;\n  place-items: center;\n  padding: 1rem;\n  color: #8c8c8c;\n  font-size: 0.78rem;\n  text-align: center;\n}\n\n.ke-list-view__live-status {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0 0 0 0);\n  clip-path: inset(50%);\n  border: 0;\n  white-space: nowrap;\n}\n\n.ke-modal {\n  width: min(36rem, 100vw - 2rem);\n  max-width: none;\n  max-height: calc(100vh - 2rem);\n  margin: auto;\n  padding: 0;\n  overflow: visible;\n  border: 1px solid #1b1b1b;\n  border-radius: 0.65rem;\n  outline: none;\n  background: transparent;\n  color: #f2f2f2;\n  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif;\n  font-size: 16px;\n  line-height: 1.5;\n  box-shadow: 0 1.5rem 5rem rgba(0, 0, 0, 0.65);\n  user-select: none;\n}\n.ke-modal::backdrop {\n  background: rgba(0, 0, 0, 0.62);\n  backdrop-filter: blur(2px);\n}\n\n.ke-modal,\n.ke-modal * {\n  box-sizing: border-box;\n}\n\n.ke-modal ::selection {\n  background: #fff;\n  color: #000;\n}\n\n.ke-modal__surface {\n  display: grid;\n  max-height: calc(100vh - 2rem);\n  overflow: hidden;\n  border-radius: inherit;\n  background: #050505;\n  animation: ke-modal-enter 150ms ease-out;\n}\n\n.ke-modal__header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 1.25rem 1.25rem 1rem;\n  border-bottom: 1px solid #1b1b1b;\n}\n\n.ke-modal__heading {\n  min-width: 0;\n}\n\n.ke-modal__identity {\n  min-width: 0;\n  display: flex;\n  align-items: center;\n  gap: 0.85rem;\n}\n\n.ke-modal__icon {\n  width: 2.75rem;\n  height: 2.75rem;\n  flex: 0 0 auto;\n  object-fit: contain;\n}\n\n.ke-modal__title {\n  margin: 0;\n  color: #f2f2f2;\n  font-size: 1.1rem;\n  font-weight: 750;\n  line-height: 1.25;\n}\n\n.ke-modal__description {\n  margin: 0.35rem 0 0;\n  color: #8c8c8c;\n  font-size: 0.8rem;\n  font-weight: 500;\n  line-height: 1.45;\n}\n\n.ke-modal__close {\n  display: grid;\n  width: 2rem;\n  min-width: 2rem;\n  min-height: 2rem;\n  padding: 0;\n  place-items: center;\n  font-size: 1.3rem;\n  font-weight: 400;\n}\n\n.ke-modal__body {\n  min-height: 0;\n  padding: 1.25rem;\n  overflow-y: auto;\n  scrollbar-color: #303030 transparent;\n}\n\n.ke-modal__footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.65rem;\n  padding: 1rem 1.25rem;\n  border-top: 1px solid #1b1b1b;\n  background: #080808;\n}\n\n.ke-settings {\n  display: grid;\n  gap: 1.35rem;\n}\n\n.ke-settings__actions {\n  display: flex;\n  justify-content: flex-end;\n}\n\n.ke-workspace-modal {\n  --ke-workspace-modal-gutter: clamp(1rem, 4vw, 2rem);\n  --ke-workspace-modal-height: 52rem;\n  --ke-workspace-modal-width: 52rem;\n  width: min(var(--ke-workspace-modal-width), 100vw - var(--ke-workspace-modal-gutter));\n  max-height: calc(100dvh - var(--ke-workspace-modal-gutter));\n}\n\n.ke-workspace-modal .ke-modal__surface {\n  height: min(var(--ke-workspace-modal-height), 100dvh - var(--ke-workspace-modal-gutter));\n  grid-template-rows: auto minmax(0, 1fr) auto;\n}\n\n.ke-workspace-modal .ke-modal__body {\n  padding: 0;\n  overflow: hidden;\n}\n\n.ke-settings-modal {\n  --ke-workspace-modal-height: 46rem;\n}\n\n.ke-settings-modal__tabs {\n  width: 100%;\n  height: 100%;\n}\n\n.ke-settings-modal__github {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  margin-right: auto;\n}\n.ke-settings-modal__github:hover:not(:disabled) {\n  background: #0a0a0a;\n  color: #53fc18;\n}\n\n.ke-settings-modal__github-icon {\n  width: 1.05rem;\n  height: 1.05rem;\n  flex: 0 0 auto;\n}\n\n@keyframes ke-modal-enter {\n  from {\n    opacity: 0;\n    transform: translateY(0.35rem) scale(0.985);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .ke-modal__surface {\n    animation: none;\n  }\n}\n.ke-scroll-area {\n  position: relative;\n  min-width: 0;\n  min-height: 0;\n  height: 100%;\n  overflow: hidden;\n}\n.ke-scroll-area[data-height=content] {\n  height: auto;\n}\n.ke-scroll-area[data-height=content] .ke-scroll-area__viewport {\n  height: auto;\n  max-height: inherit;\n}\n.ke-scroll-area[data-height=content] .ke-scroll-area__content {\n  min-height: 0;\n}\n\n.ke-scroll-area__viewport {\n  min-width: 0;\n  min-height: 0;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  overscroll-behavior: contain;\n  scrollbar-width: none;\n}\n.ke-scroll-area__viewport::-webkit-scrollbar {\n  width: 0;\n  height: 0;\n}\n.ke-scroll-area__viewport:focus {\n  outline: none;\n}\n.ke-scroll-area__viewport:focus-visible {\n  outline: 1px solid #1b1b1b;\n  outline-offset: -1px;\n}\n\n.ke-scroll-area__content {\n  min-width: 100%;\n  min-height: 100%;\n}\n\n.ke-scroll-area[data-scroll-indicators=true]::before, .ke-scroll-area[data-scroll-indicators=true]::after {\n  position: absolute;\n  z-index: 1;\n  right: var(--ke-scroll-indicator-right, 0);\n  left: 0;\n  height: 0.75rem;\n  content: \"\";\n  pointer-events: none;\n}\n.ke-scroll-area[data-scroll-indicators=true][data-overflow-top]::before {\n  top: 0;\n  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), transparent);\n}\n.ke-scroll-area[data-scroll-indicators=true][data-overflow-bottom]::after {\n  bottom: 0;\n  background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);\n}\n\n.ke-scroll-area__thumb {\n  position: absolute;\n  z-index: 2;\n  top: 0;\n  right: 0.25rem;\n  width: 0.25rem;\n  border-radius: 0.125rem;\n  background: #fff;\n  cursor: default;\n  opacity: 0;\n  pointer-events: none;\n  touch-action: none;\n  transition: background 140ms ease, opacity 140ms ease;\n}\n.ke-scroll-area__thumb:not([data-visible=true]) {\n  display: none;\n}\n\n.ke-scroll-area:hover > .ke-scroll-area__thumb[data-visible=true],\n.ke-scroll-area:focus-within > .ke-scroll-area__thumb[data-visible=true],\n.ke-scroll-area.is-dragging > .ke-scroll-area__thumb[data-visible=true] {\n  background: #fff;\n  opacity: 1;\n  pointer-events: auto;\n}\n\n.ke-scroll-area[data-scrollbar=compact] > .ke-scroll-area__thumb {\n  right: 0.15rem;\n  width: 0.1875rem;\n}\n\n.ke-scroll-area[data-scrollbar=overlay] > .ke-scroll-area__thumb {\n  right: 0.3rem;\n  width: 0.25rem;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .ke-scroll-area__thumb {\n    transition: none;\n  }\n}\n.ke-tabs {\n  width: 100%;\n  height: 100%;\n  min-width: 0;\n  min-height: 0;\n  display: grid;\n  grid-template-rows: auto minmax(0, 1fr);\n  overflow: hidden;\n}\n\n.ke-tabs__list {\n  display: flex;\n  min-width: 0;\n  min-height: 2.5rem;\n  align-items: stretch;\n  overflow: hidden;\n  border-bottom: 1px solid #1b1b1b;\n  background: #050505;\n}\n\n.ke-tabs__tab {\n  min-width: 0;\n  flex: 0 1 auto;\n  padding: 0.5rem 0.75rem;\n  overflow: hidden;\n  border: 0;\n  border-bottom: 0.125rem solid transparent;\n  outline: none;\n  background: transparent;\n  color: #8c8c8c;\n  font: inherit;\n  font-size: 0.875rem;\n  font-weight: 550;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  cursor: pointer;\n  user-select: none;\n  transition: background 140ms ease, color 140ms ease;\n}\n.ke-tabs__tab:hover:not(:disabled) {\n  background: #101010;\n  color: #f2f2f2;\n}\n.ke-tabs__tab:focus-visible {\n  outline: 1px solid #53fc18;\n  outline-offset: -1px;\n}\n.ke-tabs__tab[aria-selected=true] {\n  border-bottom-color: #f2f2f2;\n  color: #f2f2f2;\n}\n.ke-tabs__tab:disabled {\n  color: #747474;\n  cursor: default;\n  opacity: 0.45;\n}\n\n.ke-tabs__panel {\n  min-width: 0;\n  min-height: 0;\n  overflow: hidden;\n}\n.ke-tabs__panel[hidden] {\n  display: none;\n}\n\n.ke-tabs__scroll {\n  height: 100%;\n}\n\n.ke-tabs__panel-content {\n  padding: 1rem 1.25rem 1.25rem;\n}\n\n.ke-tabs__panel-content--centered {\n  display: grid;\n  align-items: safe center;\n  justify-items: center;\n}";
	var STYLE_ID$7 = "kick-enhancer-shared-ui-styles";
	function installSharedUiStyles() {
		if (document.getElementById(STYLE_ID$7)) return;
		const style = document.createElement("style");
		style.id = STYLE_ID$7;
		style.textContent = shared_ui_default;
		document.documentElement.append(style);
	}
	function DownloadIcon({ class: className }) {
		return (0, preact_jsx_runtime.jsxs)("svg", {
			"aria-hidden": "true",
			class: className,
			fill: "none",
			viewBox: "0 0 24 24",
			children: [(0, preact_jsx_runtime.jsx)("path", {
				d: "M14 8a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h3.293a.707.707 0 0 1 .5 1.207l-6.939 6.939a1.207 1.207 0 0 1-1.708 0l-6.94-6.94a.707.707 0 0 1 .5-1.206H8a1 1 0 0 0 1-1V9a1 1 0 0 1 1-1z",
				stroke: "currentColor",
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-width": "2"
			}), (0, preact_jsx_runtime.jsx)("path", {
				d: "M9 4h6",
				stroke: "currentColor",
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-width": "2"
			})]
		});
	}
	function GitHubIcon({ class: className }) {
		return (0, preact_jsx_runtime.jsx)("svg", {
			"aria-hidden": "true",
			class: className,
			fill: "currentColor",
			viewBox: "0 0 24 24",
			children: (0, preact_jsx_runtime.jsx)("path", { d: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" })
		});
	}
	function LoadingSpinnerIcon({ class: className }) {
		return (0, preact_jsx_runtime.jsxs)("svg", {
			"aria-hidden": "true",
			class: className,
			fill: "none",
			viewBox: "0 0 24 24",
			children: [(0, preact_jsx_runtime.jsx)("circle", {
				cx: "12",
				cy: "12",
				opacity: "0.25",
				r: "9",
				stroke: "currentColor",
				"stroke-width": "2.5"
			}), (0, preact_jsx_runtime.jsx)("path", {
				d: "M12 3a9 9 0 0 1 9 9",
				stroke: "currentColor",
				"stroke-linecap": "round",
				"stroke-width": "2.5"
			})]
		});
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
		return (0, preact_jsx_runtime.jsx)("button", {
			"aria-label": "Download source clip",
			class: "ke-clip-download-action",
			"data-ke-clip-download": true,
			onClick: (event) => activateClipDownload(event, clipId, onSelectClip),
			onMouseDown: stopPointerPropagation,
			onPointerDown: stopPointerPropagation,
			type: "button",
			children: (0, preact_jsx_runtime.jsx)(DownloadIcon, { class: "ke-icon ke-clip-download-action__icon" })
		});
	}
	var icon_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAABACAYAAABC6cT1AAASRklEQVRo3r2be7AkdXXHP+d0z9y5j2VhEUUqWXwbjQTxSYhloCS+YsRoWaISrSSUUVcERVxXwBJBBUFBnqWQGCuAIsEnagIGKUtUBB8QICslhfISFFzcvXvvnTv9O9/80T09M3cee9Fdu/bO9kz3zK/P73ce3/M952evjqc+p0H+vBbTHgSJ5QgiMhruZBYIyj+BmUgyMkRgGIYjZEFSIgj8oXkWvwy0/8t/zmqPhYe30VozA6G9yfwwYBpJ5VUDwxAq/+9+Xl/rvVH1KsBkYOV5+WIytkj6Sj7DmkONeB8gAzJyZYDhGGYOEmbU387LwQb+VJ25B37LFK2rQe3VCt35+d1ka2YhYk/MPwwcUUtkfWLV4lUfCUZc7fvcqCerPJ83+KBC83mDKUsseVgRQkJmhoNBENV8WN/00p2j6ggJgQzHraAg1VqyuiPbdx+UtNYyPxV4czWPg4IwQkgbIfDo9wYsgk6T4nx3L/JUqqi6OtKdJPV9c0CZenpUrXV5WZT/gpCTZKsUOlKAtMbcPoTx5noAq9R2NROwUmgbODdgGfiE4CzIOp45uVBtBta15r4pt6Hf7F3rTU9pdNXzWvRMY7LQRYKIGdw/gPFWRLbCVkvXslLS1WpA+b5AnBvoowZLWeYAeN8DSvW5RhjUyl/sn5yuToggLDCLHQidOolIauH+foyjEPnoVRwzPPUqjZtjAwJxkdBJBgtZltUXyxUv3ZepEt4GPIo0OJKtsPH+Z3EzImA5JgsdAFOe2XEY7waatQ8dZavGuLkffa27BsbFQsdjbMs8G7jspYjW9fm1yOr6MFkpe18EGTYnWRVh5LgJN415olgusJRyc96JsxFolQ9pw2psI2xt8ir3PZaukOK9Ztqidhq6wa0cUd1lHOEou2KXyrFixN50OUIUVNFh5EoXSMppZG8DTkDMIGlgtlcKK8ZrgQ344O59hrhSxrFY9hubv4l8ujksePchDbPKQZURsBRS/b+q/jUeHE99GiZjcArVyCkkOgvulmX/iPEhjDXlY/avtAZXXDsIV91Bel7ZMa5FOtrgHi0W2G7PHqkSLqKUsu+HbIJpjXgEqQ6Appyp3C13p2dTsW0Bm1+w5ixvBH0YsXZgLTXCmLVC3Xd8OOg6SW83tzuXl4N8tjHpZrOuHhumKnwaVv0/FBJ7rn7ABZbPb0a2Deh0r6Slgm3fuhtrtV6Dczpue9W324pVsx0CkXHAxTF+IniHmW1WUdBqNSbPUp+w9IFa9S+DVX/9yt67v2ui5gXpzg7ptCfE7NYg6Cx28KmMNS973N/hdibiMUCsnMWJK7pjD+/ArYTeZvKfSh282dyxelgVkG1H45Tim9WGUb3KQO4ZU/dA47iX6aXfvtN/y9eKW8laOZH0YsM+ifEnVVxlAAFpFMYe6cgGr6kW+g6hd5D59ahDlk2t1i7MpJ7HkjSQ/PRjCKN2eOp5e3ki3RvwntPu+8HVP7Dv8sWFm/CGQ9IhZpwLPB6IUenGMEQYgpzjApYDdyPe6e7XRtHBG01We+Qr9WoAkw2AdPU8uepndcgeKEjvvdyu/2baZz8uKW4jmzaUdBDOecCTUd9K70i1bFUAxYEHEO/+7R1bv7H749eQPwKhu+GsTjHGPUMvKatjuapY8OvANhb2mysP135cvPQTvOFE4rkY5wNPQ7VNr+7Q2NDV72IeQmxU6lyxxxPmyBsZj/TwGmTXQ42CjeoHTAJ3I/ttguMftBu/lGuaS5ZvxFvTKOmZ5lwA7F8LPWmFJ6EwG0pKDNiGODEi/oMsV5bn/D6Hj9O3IT/SzTtLoPNwQh/Yyvx/rtEzuGz7bXizgUU83YzzMJ5d27SNQWNahUcfdHgGLCCdInSRuUV/0vGIBS8BDJhhVXDuBul+OFa9moHPB37KPFsunaEZV2z/PszkRIqn4HYBxkGl0Bqvuiu9tDH53tLptBFnSDrbROcPEbq34hrEEQzCsu4CGbAQ6KOLpH9vsXtcHD+C1iwKHm/u5yJeWMdpbLR670i1R3v+AnFeSB/DrO35HyY0QN5j7jQ88gCU9HYizlhk24U5jeILy7dgJThab865wKED3nsyxh7NmGik8Am4EPQhNxY8+8OFrgBMboZJ/WCityqK8nQ5wVltOL/BXOdzC7diDZDYB+Ms4GUT/bHRnw/sOMcezIYuUXCCZFt3ltBdYG+qiQWrE6TKe5uTFQkuWGD5LCPapz90DY3pQNLe5pyFcVgvRxlK6FfwlKsUvuYwdQVoozlbtrXvYWceeRCBVcRhjdiscmQqAruwIDt9mmzpM/M/oLW7E8Gj3Pk48Jo62g1mLGOyLRuGncYoAsKBKxHvAh7Agt1n1+9Uwd1wTF7TEKrpPZfILl5g8SPG8vbPb3oR03MZEOvcOQ14Xa2WI4WeEKc1KWbLgWuAY3C7t6027jk7+8gzcu+wXFFUXlVJRId0SdA8aYY185/z66HzY1Sk3SzzUzDeNMQzj1JfTYCeGmN64jrQBszvKOa3ML3bOnbF4UGhMseyLng1yL8U+Acz4uHP+fVEkZCYs8xPwjgSVTzTJPihCRowmmBwjB/JbIOZbV5sFzR3kdAAniiqionJME/w1UU6mwx76PN2I1EEEjOW+YkYb68TG1uRWe2IANTYc1UrfQvSBne7aWl7m9npBrvycMfIcAuCguJK8E3Tlv9644UHl0G56Eyb20aMdwKNgWrDJGxtE4CJrUgvxc8EG8z9+ugUTK+ZZlcf7jiG4/iiiM83Ke67XQ9wwPpDSzfXyJ8IHIHUGqANtEJAYzJROMqL9yjaq6MT30tFkDUb/DEOz2limIJiBuLYJYr992MvXviSt0AUSMu3gU4Ce6hWb43ImTUCktqKz0aFrhIDHJ41/B9EWCrSH0fwZdqWKDBcTRrPmqZ1zjyd/dazF4f4k7Dl5WDrA5eATgR+N5C3jsVqmgxVB7M1YTwK49TM/XCssJR2vfCeSN2ykUEWQewPcfp25p+8J9P85fQBsNujk4hPI05EbKto+AkUkfUJp9VQSYF4NNjHjfzvr/HL2dXCu2Fy87oSkkjJsQOnmTpzijVP3FdzHKMjMVlSpE+BPoyxMIKg0WgCoZ/G0qSiTwCPBTvzRfHal7s7KRW7TvCMHKvIVhECkZGlBs0XOPGJguX19/oPeSMHY2YdIp2FdCqwtMK/7zCmq7/W2NWEQb8QGOvBzpHiUPeMVHR22Yp7XRirK6VuQUTQ+WuHMwqKfZb8QfazA8CzZdAZwCcw2kOF1R0RierThNH3BcYTkJ0dioPccorY+cJ7lCtd0ete5Qeq6DKLBo0XzzF3+lza/bHP8BZf/NipYCxB+gjoHKAzdtFtAvlgE9FeAE8zcZ6I52TkRHth5wreG7LXIdNPfeQ0lJO9Qln7ox1t3fOyjZeUSUPYAimdDFyIqraXAX5Nq2NZRkJYlSuPPROzC6T0F+QtOrGwMwWvqqVmfRUSYbgZbqXD60Sic1iTxilGc93rtD9vefgo8Gwb0gmgz1SUk01IQAahrSZnK7XDE88Bu0Cmp+e0aBfLO8vGM+slWl3jM+vnWgPhZDRovL4Bp7S1uHbLumux/zkZ0MMQ78e4rN+NDcA3m0Q02ogU1vq/HpgdZNh5ivSkRtZA6uetf7/D3hQHbkosbcIUXUjabfcaLICXuVsiqSAuSmQnG2y79FUP0/jKXdBe3JtG6+yanJgEYUeVjXaE+YWBriIV/0Kj+csj0n4Urj2n8AMyskagTkDm5LZE2vw4m/3FTx9Y4Kq9fzKOXk41f2t9ddGV3seqrpCMzFs0j5whPyFYnnnjl9ewsPA7aLTuRzoG+FqtKuMSFa2CehouJgqzQ8nzvwZInpHTeqXwS8E+6+QXG/5Zxy9p0HjXeenHxl5LExkYs4FCwoiRreJk8O4bF+mfp2i8t8nM9JHTh8C2bZDZfaCjgau6yf1Irz2uimI7qKeVKDmTgnlrI2wuYCqhPFDT8GYiGh3as4/Ldjcm9F65eus9mgy0weUyM2TI8bxJc4NRHLvA1qnX7nYgsa0As18ibajoI5sIcWwsKaGhyallsMzMmdU0QYpu81LXTqMyxxaOT3CcPizteJesehqsop6jIdJRM8wc7cw23zB3ICwXAHcgbcD4XkUyDFPIk/m43lRICanASBXHrrLM2yBnqixzm6oenvIHc3K3oTaloYKCVW5YI9TchkoaNeQyA0kZ+VSOH5tIsYWtn3x1c//OF7bfQGNu9meKeDvYRRjP7V+zIcc3zNEF8H2MrwL39bqbJNANEoQVlfkFvc4t1dxGG1FMED1Xf5FopF5qjMexMvZLCopWkN49y9RCMPPpN8y+oPjC9htgNr+Z0AbgX4H9BkrGK/P03jAOfEmKowz/VUpBY2qQnNiUXokQXlrqQPtRGf9CGRnJDHEIkDC+M2TjdfqkscY4quJX9k6UUd8ipzEzw8zxLfinm7nL/nZmf+h0MLcbEBuA2ytMPNrTW1/tG51lnv1q+3WnDwld1qweQ5Doa0rUYHdJEbuxrLUSxrcHhL5a4moJOyKevylov89NApNWlg8r6Glmwwx4n9JWb7I2xY+3Uxxm2O++7reRltt4o4lCL8H4FLDvgNoPzq1j3CrFoVf7V+8/R8evncHf1MQf5ZTdt4lOZGQuVBiN54n4K6vqU90+vYLO5ib5txxXkMJpuEgEnZTRXOqQXZ7XyaJMA2zSCjl7mwVMffyT6PYCltKoTHXxrv5kzSlSUeBZ9t+KOAaz84B9hoTvaUJh5sVNfIcp8n0h3gO2DkxmZq5GNWRU1QeP6tG73VdqqPFnhj+j7KLPqt0NLqcpYcugu0rnZjYiqRi2+W7uIevVW2oLqX5DhII0EMeyPCeKDizMf5m5tXPAmYg9RzITZYsnjtGilQcdIIpea5wNtC6MBH3mqrJG64VhFGW1KIw8z6n028bQo/3+UgN5t61w0upWid1oDCXbnjeIVCDiUpPNgJ0GAx2OEOrDUDX7a1YWNtWD/r3gX9v5qKBc1UeEul2LGLmLLPOq69WsF6s1qOID1KGGMoq6/bf7SF4nPsN0Tw6dItRe/DfQRxALw4Rl2X7mQFBEUHQbDVSWuLyvIa2sAPWMlNLhlkVPkFVnvSbGRIogFXkZ+A1Z9Gphg01eK/qh1OcC+nxp1YTsZJTqOTqGZlMtIhUF0tkYs5htBKYQgfcm0JVhuJzMrQxxRsULVjDbhAIiSr7Q1Ofl3cmyLpGKeobneAhT3o0wdTYom5Aqj0d1PfWLsHqVxhF9OZGKNoqPYdkaxFFY3fWbIbL9/QX8r75/V1CcKmKtl32yXnppd8MiUTw/URys2q+WBl6Q/m+W1jdLIaX+rEvYYof4Xl7F4xXuzAhpbCl7aEeUdRsKRJC0mv1HnuVEkRZIOglnFrMjK8y2txlPPjhecf9BN121pbNu3fkxNc3ax26qv/ty/Tl7aJqADTkc0t+OZrgvU9xyrW4++am2t77tt49FblazPzJ6/evlFp0VGaYZVpl0V4WszuBUpvRu5KZVbMbxPCNS2oriBCybQ7weYx3GcUrpF81nnnN3M5bwvKyl6SsXwp13czSbuYfbyGkChbKuJQBBUlCwh2dmKjQBsqKeX4bBbXq1imgY1HSvVrNdrXNGbpBstfvOlr1Ns5h6kKTjcJvFeBXwcvPsMhFfw5sPpqIokyI3IV13Jtnm1/Os7qbAqraf1WyRMBJTFCvb+PoF7/oNyYa6G9UjgU19ttzd7Ti8qcARRRLLsdoezpbNEFvvgrk//RWKd4HNIv4GONCwA8tBraT8McnsrSZtziqhujoXfQlKRoYjGhME9yCqQgJ1PjvSnVnPl/eHtz58ryBUUChG/M5Eld9tPduXFzDZLwi9A/juUHnS67ZDYUZZ10/d2n5Fi1cbSkisrQxh7JhFuYm2t3tVRh85YaLkMaQyvlZBstqmV4VCsCCszJjyDHKHR9aataY1SyoSZHY7aANwI+BUcKtSM7MyxNNihhbTntGwPjXt+hafZpqc8b0zeZPWYqL962oTjZn1tkt2nVkv0NX9UagfNpQx1kSY6Dwolgtbdbty38O0GhTRwclvrlicT2Ksr91ORMhtu0kUtoyRP2DY/UZGVFprWCZ07zX8PF7KUybYeGSXu2ffidKZmWqCvH/bRR0qahZmENh0q60iiO3B4rzx+zXj5d4gLRV4ih9qKjscsz26Q6nMB+4W0LGCoPP1FlObwV1lTLJEok3c+2Y9m2/YrWPH+X9edoYQgIbGYAAAAABJRU5ErkJggg==";
	function DirectClipDownloadAction({ clipId, onSelectClip }) {
		const tooltipId = (0, preact_hooks.useId)();
		const label = "Download source clip (KICK Enhancer)";
		return (0, preact_jsx_runtime.jsxs)(preact_jsx_runtime.Fragment, { children: [(0, preact_jsx_runtime.jsxs)("button", {
			"aria-describedby": tooltipId,
			"aria-label": label,
			className: "ke-direct-clip-download-action",
			"data-ke-direct-clip-download": true,
			onClick: (event) => activateClipDownload(event, clipId, onSelectClip),
			type: "button",
			children: [(0, preact_jsx_runtime.jsx)("img", {
				alt: "",
				className: "ke-direct-clip-download-action__brand",
				draggable: false,
				src: icon_default
			}), (0, preact_jsx_runtime.jsx)(DownloadIcon, { class: "ke-icon ke-direct-clip-download-action__icon" })]
		}), (0, preact_jsx_runtime.jsx)("span", {
			className: "ke-direct-clip-download-tooltip",
			id: tooltipId,
			role: "tooltip",
			children: label
		})] });
	}
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
		const viewportRef = (0, preact_hooks.useRef)(null);
		const contentRef = (0, preact_hooks.useRef)(null);
		const rootRef = (0, preact_hooks.useRef)(null);
		const thumbRef = (0, preact_hooks.useRef)(null);
		const animationFrameRef = (0, preact_hooks.useRef)(null);
		const thumbSizeRef = (0, preact_hooks.useRef)(minimumThumbSize);
		const thumbVisibleRef = (0, preact_hooks.useRef)(false);
		const dragRef = (0, preact_hooks.useRef)(null);
		const updateThumb = (0, preact_hooks.useCallback)(() => {
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
		const scheduleThumbUpdate = (0, preact_hooks.useCallback)(() => {
			if (animationFrameRef.current !== null) return;
			animationFrameRef.current = window.requestAnimationFrame(() => {
				animationFrameRef.current = null;
				updateThumb();
			});
		}, [updateThumb]);
		const setViewport = (0, preact_hooks.useCallback)((viewport) => {
			viewportRef.current = viewport;
			onViewportChange?.(viewport);
		}, [onViewportChange]);
		const handleScroll = (0, preact_hooks.useCallback)((event) => {
			onViewportScroll?.(event.currentTarget);
			scheduleThumbUpdate();
		}, [onViewportScroll, scheduleThumbUpdate]);
		(0, preact_hooks.useEffect)(() => {
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
		const finishDrag = (0, preact_hooks.useCallback)((event) => {
			if (!dragRef.current || event.pointerId !== dragRef.current.pointerId) return;
			if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
			dragRef.current = null;
			rootRef.current?.classList.remove("is-dragging");
		}, []);
		const handleThumbPointerDown = (0, preact_hooks.useCallback)((event) => {
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
		const handleThumbPointerMove = (0, preact_hooks.useCallback)((event) => {
			const drag = dragRef.current;
			const viewport = viewportRef.current;
			if (!drag || drag.pointerId !== event.pointerId || !viewport) return;
			const maximumScrollTop = Math.max(0, viewport.scrollHeight - viewport.clientHeight);
			const maximumThumbOffset = Math.max(1, viewport.clientHeight - thumbSizeRef.current);
			const scrollDelta = (event.clientY - drag.startClientY) * maximumScrollTop / maximumThumbOffset;
			viewport.scrollTop = Math.min(maximumScrollTop, Math.max(0, drag.startScrollTop + scrollDelta));
		}, []);
		return (0, preact_jsx_runtime.jsxs)("div", {
			className: joinClassNames("ke-scroll-area", className),
			"data-height": heightMode,
			"data-scroll-indicators": scrollIndicators ? "true" : void 0,
			"data-scrollbar": scrollbarVariant,
			ref: rootRef,
			children: [(0, preact_jsx_runtime.jsx)("div", {
				"aria-label": viewportAriaLabel,
				className: joinClassNames("ke-scroll-area__viewport", viewportClassName),
				onScroll: handleScroll,
				ref: setViewport,
				tabIndex: viewportTabIndex,
				children: (0, preact_jsx_runtime.jsx)("div", {
					className: joinClassNames("ke-scroll-area__content", contentClassName),
					ref: contentRef,
					children
				})
			}), (0, preact_jsx_runtime.jsx)("div", {
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
		const viewportRef = (0, preact_hooks.useRef)(null);
		const animationFrameRef = (0, preact_hooks.useRef)(null);
		const updateRangeRef = (0, preact_hooks.useRef)(() => void 0);
		const [range, setRange] = (0, preact_hooks.useState)(() => virtualized ? calculateListViewRange(itemCount, rowHeight, overscan, 0, 0) : {
			end: itemCount,
			start: 0
		});
		const updateRange = (0, preact_hooks.useCallback)(() => {
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
		const scheduleRangeUpdate = (0, preact_hooks.useCallback)(() => {
			if (animationFrameRef.current !== null) return;
			animationFrameRef.current = window.requestAnimationFrame(() => {
				animationFrameRef.current = null;
				updateRangeRef.current();
			});
		}, []);
		const setViewport = (0, preact_hooks.useCallback)((viewport) => {
			viewportRef.current = viewport;
			if (viewport && virtualized) scheduleRangeUpdate();
		}, [scheduleRangeUpdate, virtualized]);
		(0, preact_hooks.useEffect)(() => {
			if (virtualized) scheduleRangeUpdate();
		}, [
			scheduleRangeUpdate,
			updateRange,
			virtualized
		]);
		(0, preact_hooks.useEffect)(() => {
			const viewport = viewportRef.current;
			if (!virtualized || !viewport || typeof ResizeObserver === "undefined") return;
			const resizeObserver = new ResizeObserver(scheduleRangeUpdate);
			resizeObserver.observe(viewport);
			return () => resizeObserver.disconnect();
		}, [scheduleRangeUpdate, virtualized]);
		(0, preact_hooks.useEffect)(() => () => {
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
		return (0, preact_jsx_runtime.jsx)("div", {
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
			children: columns.map((column) => (0, preact_jsx_runtime.jsx)("div", {
				className: joinClassNames("ke-list-view__cell", column.cellClassName),
				"data-align": column.align,
				"data-column-id": column.id,
				role: "cell",
				children: (0, preact_jsx_runtime.jsx)("div", {
					className: "ke-list-view__cell-content",
					children: column.renderCell(item)
				})
			}, column.id))
		});
	}
	var ListViewRow = (0, preact_compat.memo)(ListViewRowComponent);
	function ListView({ ariaLabel, ariaLive = "off", className, columns, emptyContent = "No items", getItemKey, getRowAriaLabel, getRowClassName, heightMode = "fill", items, onItemActivate, overscan = 8, rowHeight }) {
		if (rowHeight !== void 0 && (!Number.isFinite(rowHeight) || rowHeight <= 0)) throw new Error("ListView rowHeight must be a positive finite number.");
		const gridTemplateColumns = (0, preact_hooks.useMemo)(() => columns.map((column) => column.width).join(" "), [columns]);
		const rowStyle = { gridTemplateColumns };
		const { range, scheduleRangeUpdate, setViewport, virtualized } = useListViewRange(items.length, overscan, rowHeight);
		const rangeStart = Math.min(items.length, range.start);
		const rangeEnd = Math.min(items.length, Math.max(rangeStart, range.end));
		const visibleItems = virtualized ? items.slice(rangeStart, rangeEnd) : items;
		const bodyStyle = virtualized && rowHeight !== void 0 ? { height: `${items.length * rowHeight}px` } : void 0;
		return (0, preact_jsx_runtime.jsxs)("div", {
			"aria-colcount": columns.length,
			"aria-label": ariaLabel,
			"aria-rowcount": items.length + 1,
			className: joinClassNames("ke-list-view", className),
			"data-empty": items.length === 0 ? "true" : "false",
			role: "table",
			children: [(0, preact_jsx_runtime.jsx)("div", {
				className: "ke-list-view__header-group",
				role: "rowgroup",
				children: (0, preact_jsx_runtime.jsx)("div", {
					"aria-rowindex": 1,
					className: "ke-list-view__header",
					role: "row",
					style: rowStyle,
					children: columns.map((column) => (0, preact_jsx_runtime.jsx)("div", {
						className: "ke-list-view__header-cell",
						"data-align": column.align,
						"data-column-id": column.id,
						role: "columnheader",
						children: (0, preact_jsx_runtime.jsx)("span", {
							className: "ke-list-view__header-label",
							children: column.header
						})
					}, column.id))
				})
			}), (0, preact_jsx_runtime.jsxs)(ScrollArea, {
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
				children: [(0, preact_jsx_runtime.jsx)("div", {
					"aria-live": virtualized ? "off" : ariaLive,
					className: "ke-list-view__body",
					"data-virtualized": virtualized ? "true" : void 0,
					role: "rowgroup",
					style: bodyStyle,
					children: items.length === 0 ? (0, preact_jsx_runtime.jsx)("div", {
						className: "ke-list-view__empty",
						role: "status",
						children: emptyContent
					}) : visibleItems.map((item, visibleIndex) => {
						const index = virtualized ? rangeStart + visibleIndex : visibleIndex;
						return (0, preact_jsx_runtime.jsx)(ListViewRow, {
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
				}), virtualized && ariaLive !== "off" ? (0, preact_jsx_runtime.jsxs)("span", {
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
		return (0, preact_jsx_runtime.jsx)("button", {
			...props,
			className: joinClassNames("ke-button", `ke-button--${density}`, `ke-button--${tone}`, className),
			type,
			children
		});
	}
	function SelectBox({ className, description, id, label, onValueChange, options, ...props }) {
		const generatedId = (0, preact_hooks.useId)();
		const selectId = id ?? generatedId;
		const descriptionId = description ? `${selectId}-description` : void 0;
		return (0, preact_jsx_runtime.jsxs)("label", {
			className: "ke-form-field",
			htmlFor: selectId,
			children: [
				(0, preact_jsx_runtime.jsx)("span", {
					className: "ke-form-field__label",
					children: label
				}),
				description ? (0, preact_jsx_runtime.jsx)("span", {
					className: "ke-form-field__description",
					id: descriptionId,
					children: description
				}) : null,
				(0, preact_jsx_runtime.jsxs)("span", {
					className: "ke-select-box",
					children: [(0, preact_jsx_runtime.jsx)("select", {
						...props,
						"aria-describedby": descriptionId,
						className: joinClassNames("ke-select-box__input", className),
						id: selectId,
						onChange: (event) => onValueChange?.(event.currentTarget.value),
						children: options.map((option) => (0, preact_jsx_runtime.jsx)("option", {
							disabled: option.disabled,
							value: option.value,
							children: option.label
						}, option.value))
					}), (0, preact_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						className: "ke-select-box__chevron"
					})]
				})
			]
		});
	}
	function TextField({ className, description, id, label, onValueChange, suffix, ...props }) {
		const generatedId = (0, preact_hooks.useId)();
		const inputId = id ?? generatedId;
		const descriptionId = description ? `${inputId}-description` : void 0;
		const suffixId = suffix ? `${inputId}-suffix` : void 0;
		const describedBy = [descriptionId, suffixId].filter(Boolean).join(" ") || void 0;
		return (0, preact_jsx_runtime.jsxs)("label", {
			className: "ke-form-field",
			htmlFor: inputId,
			children: [
				(0, preact_jsx_runtime.jsx)("span", {
					className: "ke-form-field__label",
					children: label
				}),
				description ? (0, preact_jsx_runtime.jsx)("span", {
					className: "ke-form-field__description",
					id: descriptionId,
					children: description
				}) : null,
				(0, preact_jsx_runtime.jsxs)("span", {
					className: suffix ? "ke-text-field-shell" : void 0,
					children: [(0, preact_jsx_runtime.jsx)("input", {
						...props,
						"aria-describedby": describedBy,
						className: joinClassNames("ke-text-field", className),
						id: inputId,
						onInput: (event) => onValueChange?.(event.currentTarget.value)
					}), suffix ? (0, preact_jsx_runtime.jsx)("span", {
						className: "ke-text-field__suffix",
						id: suffixId,
						children: suffix
					}) : null]
				})
			]
		});
	}
	function Toggle({ className, description, id, label, onCheckedChange, ...props }) {
		const generatedId = (0, preact_hooks.useId)();
		const inputId = id ?? generatedId;
		const descriptionId = description ? `${inputId}-description` : void 0;
		return (0, preact_jsx_runtime.jsxs)("label", {
			className: joinClassNames("ke-toggle", className),
			htmlFor: inputId,
			children: [(0, preact_jsx_runtime.jsxs)("span", {
				className: "ke-toggle__copy",
				children: [(0, preact_jsx_runtime.jsx)("span", {
					className: "ke-form-field__label",
					children: label
				}), description ? (0, preact_jsx_runtime.jsx)("span", {
					className: "ke-form-field__description",
					id: descriptionId,
					children: description
				}) : null]
			}), (0, preact_jsx_runtime.jsxs)("span", {
				className: "ke-toggle__control",
				children: [(0, preact_jsx_runtime.jsx)("input", {
					...props,
					"aria-describedby": descriptionId,
					className: "ke-toggle__input",
					id: inputId,
					onChange: (event) => onCheckedChange?.(event.currentTarget.checked),
					role: "switch",
					type: "checkbox"
				}), (0, preact_jsx_runtime.jsx)("span", {
					"aria-hidden": "true",
					className: "ke-toggle__track",
					children: (0, preact_jsx_runtime.jsx)("span", { className: "ke-toggle__thumb" })
				})]
			})]
		});
	}
	function TrackBar({ defaultValue, description, formatValue = String, id, label, max, min, onValueChange, value, ...props }) {
		const generatedId = (0, preact_hooks.useId)();
		const inputId = id ?? generatedId;
		const descriptionId = description ? `${inputId}-description` : void 0;
		const [internalValue, setInternalValue] = (0, preact_hooks.useState)(defaultValue ?? min);
		const currentValue = value ?? internalValue;
		const range = max - min;
		const progress = range > 0 ? (currentValue - min) / range * 100 : 0;
		const handleInput = (event) => {
			const nextValue = event.currentTarget.valueAsNumber;
			if (value === void 0) setInternalValue(nextValue);
			onValueChange?.(nextValue);
		};
		return (0, preact_jsx_runtime.jsxs)("label", {
			className: "ke-form-field",
			htmlFor: inputId,
			children: [
				(0, preact_jsx_runtime.jsxs)("span", {
					className: "ke-track-bar__heading",
					children: [(0, preact_jsx_runtime.jsx)("span", {
						className: "ke-form-field__label",
						children: label
					}), (0, preact_jsx_runtime.jsx)("output", {
						className: "ke-track-bar__value",
						htmlFor: inputId,
						children: formatValue(currentValue)
					})]
				}),
				description ? (0, preact_jsx_runtime.jsx)("span", {
					className: "ke-form-field__description",
					id: descriptionId,
					children: description
				}) : null,
				(0, preact_jsx_runtime.jsx)("input", {
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
	function Modal({ children, className, closeLabel = "Close settings", description, dismissDisabled = false, footer, icon, initialFocusRef, onRequestClose, open, title }) {
		const dialogRef = (0, preact_hooks.useRef)(null);
		const previousFocusRef = (0, preact_hooks.useRef)(null);
		const titleId = (0, preact_hooks.useId)();
		const descriptionId = (0, preact_hooks.useId)();
		(0, preact_hooks.useEffect)(() => {
			const dialog = dialogRef.current;
			if (!dialog) return;
			if (open && !dialog.open) {
				previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
				dialog.showModal();
				initialFocusRef?.current?.focus();
			} else if (!open && dialog.open) dialog.close();
		}, [initialFocusRef, open]);
		(0, preact_hooks.useEffect)(() => {
			return () => {
				previousFocusRef.current?.focus();
			};
		}, []);
		const requestClose = () => {
			if (!dismissDisabled) {
				onRequestClose();
				previousFocusRef.current?.focus();
			}
		};
		const handleCancel = (event) => {
			event.preventDefault();
			requestClose();
		};
		const handleBackdropPointerDown = (event) => {
			if (event.target === event.currentTarget) requestClose();
		};
		if (!open) return null;
		return (0, preact_compat.createPortal)((0, preact_jsx_runtime.jsx)("dialog", {
			"aria-describedby": description ? descriptionId : void 0,
			"aria-labelledby": titleId,
			className: joinClassNames("ke-modal", className),
			onCancel: handleCancel,
			onPointerDown: handleBackdropPointerDown,
			ref: dialogRef,
			children: (0, preact_jsx_runtime.jsxs)("div", {
				className: "ke-modal__surface",
				children: [
					(0, preact_jsx_runtime.jsxs)("header", {
						className: "ke-modal__header",
						children: [(0, preact_jsx_runtime.jsxs)("div", {
							className: "ke-modal__identity",
							children: [icon ? (0, preact_jsx_runtime.jsx)("img", {
								alt: "",
								className: "ke-modal__icon",
								draggable: false,
								src: icon
							}) : null, (0, preact_jsx_runtime.jsxs)("div", {
								className: "ke-modal__heading",
								children: [(0, preact_jsx_runtime.jsx)("h2", {
									className: "ke-modal__title",
									id: titleId,
									children: title
								}), description ? (0, preact_jsx_runtime.jsx)("p", {
									className: "ke-modal__description",
									id: descriptionId,
									children: description
								}) : null]
							})]
						}), (0, preact_jsx_runtime.jsx)(Button, {
							"aria-label": closeLabel,
							className: "ke-modal__close",
							disabled: dismissDisabled,
							onClick: requestClose,
							children: (0, preact_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: "×"
							})
						})]
					}),
					(0, preact_jsx_runtime.jsx)("div", {
						className: "ke-modal__body",
						children
					}),
					footer ? (0, preact_jsx_runtime.jsx)("footer", {
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
		const instanceId = (0, preact_hooks.useId)();
		const tabButtonsRef = (0, preact_hooks.useRef)([]);
		const [uncontrolledValue, setUncontrolledValue] = (0, preact_hooks.useState)(defaultValue);
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
		return (0, preact_jsx_runtime.jsxs)("div", {
			className: joinClassNames("ke-tabs", className),
			children: [(0, preact_jsx_runtime.jsx)("div", {
				"aria-label": ariaLabel,
				"aria-orientation": "horizontal",
				className: "ke-tabs__list",
				role: "tablist",
				children: tabs.map((tab, index) => {
					const selected = index === selectedIndex;
					return (0, preact_jsx_runtime.jsx)("button", {
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
				return (0, preact_jsx_runtime.jsx)("div", {
					"aria-labelledby": `${instanceId}-tab-${index}`,
					className: joinClassNames("ke-tabs__panel", panelClassName),
					hidden: !selected,
					id: `${instanceId}-panel-${index}`,
					role: "tabpanel",
					children: (0, preact_jsx_runtime.jsx)(ScrollArea, {
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
	var jsContent = `(function() {
	//#region \\0rolldown/runtime.js
	var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
	//#endregion
	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/utils/stream.js
	/**
	* mux.js
	*
	* Copyright (c) Brightcove
	* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE
	*
	* A lightweight readable stream implemention that handles event dispatching.
	* Objects that inherit from streams should call init in their constructors.
	*/
	var require_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var Stream = function Stream() {
			this.init = function() {
				var listeners = {};
				/**
				* Add a listener for a specified event type.
				* @param type {string} the event name
				* @param listener {function} the callback to be invoked when an event of
				* the specified type occurs
				*/
				this.on = function(type, listener) {
					if (!listeners[type]) listeners[type] = [];
					listeners[type] = listeners[type].concat(listener);
				};
				/**
				* Remove a listener for a specified event type.
				* @param type {string} the event name
				* @param listener {function} a function previously registered for this
				* type of event through \`on\`
				*/
				this.off = function(type, listener) {
					var index;
					if (!listeners[type]) return false;
					index = listeners[type].indexOf(listener);
					listeners[type] = listeners[type].slice();
					listeners[type].splice(index, 1);
					return index > -1;
				};
				/**
				* Trigger an event of the specified type on this stream. Any additional
				* arguments to this function are passed as parameters to event listeners.
				* @param type {string} the event name
				*/
				this.trigger = function(type) {
					var callbacks = listeners[type], i, length, args;
					if (!callbacks) return;
					if (arguments.length === 2) {
						length = callbacks.length;
						for (i = 0; i < length; ++i) callbacks[i].call(this, arguments[1]);
					} else {
						args = [];
						i = arguments.length;
						for (i = 1; i < arguments.length; ++i) args.push(arguments[i]);
						length = callbacks.length;
						for (i = 0; i < length; ++i) callbacks[i].apply(this, args);
					}
				};
				/**
				* Destroys the stream and cleans up.
				*/
				this.dispose = function() {
					listeners = {};
				};
			};
		};
		/**
		* Forwards all \`data\` events on this stream to the destination stream. The
		* destination stream should provide a method \`push\` to receive the data
		* events as they arrive.
		* @param destination {stream} the stream that will receive all \`data\` events
		* @param autoFlush {boolean} if false, we will not call \`flush\` on the destination
		*                            when the current stream emits a 'done' event
		* @see http://nodejs.org/api/stream.html#stream_readable_pipe_destination_options
		*/
		Stream.prototype.pipe = function(destination) {
			this.on("data", function(data) {
				destination.push(data);
			});
			this.on("done", function(flushSource) {
				destination.flush(flushSource);
			});
			this.on("partialdone", function(flushSource) {
				destination.partialFlush(flushSource);
			});
			this.on("endedtimeline", function(flushSource) {
				destination.endTimeline(flushSource);
			});
			this.on("reset", function(flushSource) {
				destination.reset(flushSource);
			});
			return destination;
		};
		Stream.prototype.push = function(data) {
			this.trigger("data", data);
		};
		Stream.prototype.flush = function(flushSource) {
			this.trigger("done", flushSource);
		};
		Stream.prototype.partialFlush = function(flushSource) {
			this.trigger("partialdone", flushSource);
		};
		Stream.prototype.endTimeline = function(flushSource) {
			this.trigger("endedtimeline", flushSource);
		};
		Stream.prototype.reset = function(flushSource) {
			this.trigger("reset", flushSource);
		};
		module.exports = Stream;
	}));
	//#endregion
	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/utils/numbers.js
	var require_numbers = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var MAX_UINT32 = Math.pow(2, 32);
		module.exports = {
			getUint64: function getUint64(uint8) {
				var dv = new DataView(uint8.buffer, uint8.byteOffset, uint8.byteLength);
				var value;
				if (dv.getBigUint64) {
					value = dv.getBigUint64(0);
					if (value < Number.MAX_SAFE_INTEGER) return Number(value);
					return value;
				}
				return dv.getUint32(0) * MAX_UINT32 + dv.getUint32(4);
			},
			MAX_UINT32
		};
	}));
	//#endregion
	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/mp4/mp4-generator.js
	/**
	* mux.js
	*
	* Copyright (c) Brightcove
	* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE
	*
	* Functions that generate fragmented MP4s suitable for use with Media
	* Source Extensions.
	*/
	var require_mp4_generator = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var MAX_UINT32 = require_numbers().MAX_UINT32;
		var box;
		var dinf;
		var esds;
		var ftyp;
		var mdat;
		var mfhd;
		var minf;
		var moof;
		var moov;
		var mvex;
		var mvhd;
		var trak;
		var tkhd;
		var mdia;
		var mdhd;
		var hdlr;
		var sdtp;
		var stbl;
		var stsd;
		var traf;
		var trex;
		var trun;
		var types;
		var MAJOR_BRAND;
		var MINOR_VERSION;
		var AVC1_BRAND;
		var VIDEO_HDLR;
		var AUDIO_HDLR;
		var HDLR_TYPES;
		var VMHD;
		var SMHD;
		var DREF;
		var STCO;
		var STSC;
		var STSZ;
		var STTS;
		(function() {
			var i;
			types = {
				avc1: [],
				avcC: [],
				btrt: [],
				dinf: [],
				dref: [],
				esds: [],
				ftyp: [],
				hdlr: [],
				mdat: [],
				mdhd: [],
				mdia: [],
				mfhd: [],
				minf: [],
				moof: [],
				moov: [],
				mp4a: [],
				mvex: [],
				mvhd: [],
				pasp: [],
				sdtp: [],
				smhd: [],
				stbl: [],
				stco: [],
				stsc: [],
				stsd: [],
				stsz: [],
				stts: [],
				styp: [],
				tfdt: [],
				tfhd: [],
				traf: [],
				trak: [],
				trun: [],
				trex: [],
				tkhd: [],
				vmhd: []
			};
			if (typeof Uint8Array === "undefined") return;
			for (i in types) if (types.hasOwnProperty(i)) types[i] = [
				i.charCodeAt(0),
				i.charCodeAt(1),
				i.charCodeAt(2),
				i.charCodeAt(3)
			];
			MAJOR_BRAND = new Uint8Array([
				"i".charCodeAt(0),
				"s".charCodeAt(0),
				"o".charCodeAt(0),
				"m".charCodeAt(0)
			]);
			AVC1_BRAND = new Uint8Array([
				"a".charCodeAt(0),
				"v".charCodeAt(0),
				"c".charCodeAt(0),
				"1".charCodeAt(0)
			]);
			MINOR_VERSION = new Uint8Array([
				0,
				0,
				0,
				1
			]);
			VIDEO_HDLR = new Uint8Array([
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				118,
				105,
				100,
				101,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				86,
				105,
				100,
				101,
				111,
				72,
				97,
				110,
				100,
				108,
				101,
				114,
				0
			]);
			AUDIO_HDLR = new Uint8Array([
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				115,
				111,
				117,
				110,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				83,
				111,
				117,
				110,
				100,
				72,
				97,
				110,
				100,
				108,
				101,
				114,
				0
			]);
			HDLR_TYPES = {
				video: VIDEO_HDLR,
				audio: AUDIO_HDLR
			};
			DREF = new Uint8Array([
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				1,
				0,
				0,
				0,
				12,
				117,
				114,
				108,
				32,
				0,
				0,
				0,
				1
			]);
			SMHD = new Uint8Array([
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0
			]);
			STCO = new Uint8Array([
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0
			]);
			STSC = STCO;
			STSZ = new Uint8Array([
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0
			]);
			STTS = STCO;
			VMHD = new Uint8Array([
				0,
				0,
				0,
				1,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0
			]);
		})();
		box = function box(type) {
			var payload = [], size = 0, i, result, view;
			for (i = 1; i < arguments.length; i++) payload.push(arguments[i]);
			i = payload.length;
			while (i--) size += payload[i].byteLength;
			result = new Uint8Array(size + 8);
			view = new DataView(result.buffer, result.byteOffset, result.byteLength);
			view.setUint32(0, result.byteLength);
			result.set(type, 4);
			for (i = 0, size = 8; i < payload.length; i++) {
				result.set(payload[i], size);
				size += payload[i].byteLength;
			}
			return result;
		};
		dinf = function dinf() {
			return box(types.dinf, box(types.dref, DREF));
		};
		esds = function esds(track) {
			return box(types.esds, new Uint8Array([
				0,
				0,
				0,
				0,
				3,
				25,
				0,
				0,
				0,
				4,
				17,
				64,
				21,
				0,
				6,
				0,
				0,
				0,
				218,
				192,
				0,
				0,
				218,
				192,
				5,
				2,
				track.audioobjecttype << 3 | track.samplingfrequencyindex >>> 1,
				track.samplingfrequencyindex << 7 | track.channelcount << 3,
				6,
				1,
				2
			]));
		};
		ftyp = function ftyp() {
			return box(types.ftyp, MAJOR_BRAND, MINOR_VERSION, MAJOR_BRAND, AVC1_BRAND);
		};
		hdlr = function hdlr(type) {
			return box(types.hdlr, HDLR_TYPES[type]);
		};
		mdat = function mdat(data) {
			return box(types.mdat, data);
		};
		mdhd = function mdhd(track) {
			var result = new Uint8Array([
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				2,
				0,
				0,
				0,
				3,
				0,
				1,
				95,
				144,
				track.duration >>> 24 & 255,
				track.duration >>> 16 & 255,
				track.duration >>> 8 & 255,
				track.duration & 255,
				85,
				196,
				0,
				0
			]);
			if (track.samplerate) {
				result[12] = track.samplerate >>> 24 & 255;
				result[13] = track.samplerate >>> 16 & 255;
				result[14] = track.samplerate >>> 8 & 255;
				result[15] = track.samplerate & 255;
			}
			return box(types.mdhd, result);
		};
		mdia = function mdia(track) {
			return box(types.mdia, mdhd(track), hdlr(track.type), minf(track));
		};
		mfhd = function mfhd(sequenceNumber) {
			return box(types.mfhd, new Uint8Array([
				0,
				0,
				0,
				0,
				(sequenceNumber & 4278190080) >> 24,
				(sequenceNumber & 16711680) >> 16,
				(sequenceNumber & 65280) >> 8,
				sequenceNumber & 255
			]));
		};
		minf = function minf(track) {
			return box(types.minf, track.type === "video" ? box(types.vmhd, VMHD) : box(types.smhd, SMHD), dinf(), stbl(track));
		};
		moof = function moof(sequenceNumber, tracks) {
			var trackFragments = [], i = tracks.length;
			while (i--) trackFragments[i] = traf(tracks[i]);
			return box.apply(null, [types.moof, mfhd(sequenceNumber)].concat(trackFragments));
		};
		/**
		* Returns a movie box.
		* @param tracks {array} the tracks associated with this movie
		* @see ISO/IEC 14496-12:2012(E), section 8.2.1
		*/
		moov = function moov(tracks) {
			var i = tracks.length, boxes = [];
			while (i--) boxes[i] = trak(tracks[i]);
			return box.apply(null, [types.moov, mvhd(4294967295)].concat(boxes).concat(mvex(tracks)));
		};
		mvex = function mvex(tracks) {
			var i = tracks.length, boxes = [];
			while (i--) boxes[i] = trex(tracks[i]);
			return box.apply(null, [types.mvex].concat(boxes));
		};
		mvhd = function mvhd(duration) {
			var bytes = new Uint8Array([
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				1,
				0,
				0,
				0,
				2,
				0,
				1,
				95,
				144,
				(duration & 4278190080) >> 24,
				(duration & 16711680) >> 16,
				(duration & 65280) >> 8,
				duration & 255,
				0,
				1,
				0,
				0,
				1,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				1,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				1,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				64,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				255,
				255,
				255,
				255
			]);
			return box(types.mvhd, bytes);
		};
		sdtp = function sdtp(track) {
			var samples = track.samples || [], bytes = new Uint8Array(4 + samples.length), flags, i;
			for (i = 0; i < samples.length; i++) {
				flags = samples[i].flags;
				bytes[i + 4] = flags.dependsOn << 4 | flags.isDependedOn << 2 | flags.hasRedundancy;
			}
			return box(types.sdtp, bytes);
		};
		stbl = function stbl(track) {
			return box(types.stbl, stsd(track), box(types.stts, STTS), box(types.stsc, STSC), box(types.stsz, STSZ), box(types.stco, STCO));
		};
		(function() {
			var videoSample, audioSample;
			stsd = function stsd(track) {
				return box(types.stsd, new Uint8Array([
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1
				]), track.type === "video" ? videoSample(track) : audioSample(track));
			};
			videoSample = function videoSample(track) {
				var sps = track.sps || [], pps = track.pps || [], sequenceParameterSets = [], pictureParameterSets = [], i, avc1Box;
				for (i = 0; i < sps.length; i++) {
					sequenceParameterSets.push((sps[i].byteLength & 65280) >>> 8);
					sequenceParameterSets.push(sps[i].byteLength & 255);
					sequenceParameterSets = sequenceParameterSets.concat(Array.prototype.slice.call(sps[i]));
				}
				for (i = 0; i < pps.length; i++) {
					pictureParameterSets.push((pps[i].byteLength & 65280) >>> 8);
					pictureParameterSets.push(pps[i].byteLength & 255);
					pictureParameterSets = pictureParameterSets.concat(Array.prototype.slice.call(pps[i]));
				}
				avc1Box = [
					types.avc1,
					new Uint8Array([
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						1,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						(track.width & 65280) >> 8,
						track.width & 255,
						(track.height & 65280) >> 8,
						track.height & 255,
						0,
						72,
						0,
						0,
						0,
						72,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						1,
						19,
						118,
						105,
						100,
						101,
						111,
						106,
						115,
						45,
						99,
						111,
						110,
						116,
						114,
						105,
						98,
						45,
						104,
						108,
						115,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						24,
						17,
						17
					]),
					box(types.avcC, new Uint8Array([
						1,
						track.profileIdc,
						track.profileCompatibility,
						track.levelIdc,
						255
					].concat([sps.length], sequenceParameterSets, [pps.length], pictureParameterSets))),
					box(types.btrt, new Uint8Array([
						0,
						28,
						156,
						128,
						0,
						45,
						198,
						192,
						0,
						45,
						198,
						192
					]))
				];
				if (track.sarRatio) {
					var hSpacing = track.sarRatio[0], vSpacing = track.sarRatio[1];
					avc1Box.push(box(types.pasp, new Uint8Array([
						(hSpacing & 4278190080) >> 24,
						(hSpacing & 16711680) >> 16,
						(hSpacing & 65280) >> 8,
						hSpacing & 255,
						(vSpacing & 4278190080) >> 24,
						(vSpacing & 16711680) >> 16,
						(vSpacing & 65280) >> 8,
						vSpacing & 255
					])));
				}
				return box.apply(null, avc1Box);
			};
			audioSample = function audioSample(track) {
				return box(types.mp4a, new Uint8Array([
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					(track.channelcount & 65280) >> 8,
					track.channelcount & 255,
					(track.samplesize & 65280) >> 8,
					track.samplesize & 255,
					0,
					0,
					0,
					0,
					(track.samplerate & 65280) >> 8,
					track.samplerate & 255,
					0,
					0
				]), esds(track));
			};
		})();
		tkhd = function tkhd(track) {
			var result = new Uint8Array([
				0,
				0,
				0,
				7,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				(track.id & 4278190080) >> 24,
				(track.id & 16711680) >> 16,
				(track.id & 65280) >> 8,
				track.id & 255,
				0,
				0,
				0,
				0,
				(track.duration & 4278190080) >> 24,
				(track.duration & 16711680) >> 16,
				(track.duration & 65280) >> 8,
				track.duration & 255,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				1,
				0,
				0,
				0,
				0,
				1,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				1,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				64,
				0,
				0,
				0,
				(track.width & 65280) >> 8,
				track.width & 255,
				0,
				0,
				(track.height & 65280) >> 8,
				track.height & 255,
				0,
				0
			]);
			return box(types.tkhd, result);
		};
		/**
		* Generate a track fragment (traf) box. A traf box collects metadata
		* about tracks in a movie fragment (moof) box.
		*/
		traf = function traf(track) {
			var trackFragmentHeader = box(types.tfhd, new Uint8Array([
				0,
				0,
				0,
				58,
				(track.id & 4278190080) >> 24,
				(track.id & 16711680) >> 16,
				(track.id & 65280) >> 8,
				track.id & 255,
				0,
				0,
				0,
				1,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0
			])), trackFragmentDecodeTime, trackFragmentRun, sampleDependencyTable, dataOffset, upperWordBaseMediaDecodeTime = Math.floor(track.baseMediaDecodeTime / MAX_UINT32), lowerWordBaseMediaDecodeTime = Math.floor(track.baseMediaDecodeTime % MAX_UINT32);
			trackFragmentDecodeTime = box(types.tfdt, new Uint8Array([
				1,
				0,
				0,
				0,
				upperWordBaseMediaDecodeTime >>> 24 & 255,
				upperWordBaseMediaDecodeTime >>> 16 & 255,
				upperWordBaseMediaDecodeTime >>> 8 & 255,
				upperWordBaseMediaDecodeTime & 255,
				lowerWordBaseMediaDecodeTime >>> 24 & 255,
				lowerWordBaseMediaDecodeTime >>> 16 & 255,
				lowerWordBaseMediaDecodeTime >>> 8 & 255,
				lowerWordBaseMediaDecodeTime & 255
			]));
			dataOffset = 92;
			if (track.type === "audio") {
				trackFragmentRun = trun(track, dataOffset);
				return box(types.traf, trackFragmentHeader, trackFragmentDecodeTime, trackFragmentRun);
			}
			sampleDependencyTable = sdtp(track);
			trackFragmentRun = trun(track, sampleDependencyTable.length + dataOffset);
			return box(types.traf, trackFragmentHeader, trackFragmentDecodeTime, trackFragmentRun, sampleDependencyTable);
		};
		/**
		* Generate a track box.
		* @param track {object} a track definition
		* @return {Uint8Array} the track box
		*/
		trak = function trak(track) {
			track.duration = track.duration || 4294967295;
			return box(types.trak, tkhd(track), mdia(track));
		};
		trex = function trex(track) {
			var result = new Uint8Array([
				0,
				0,
				0,
				0,
				(track.id & 4278190080) >> 24,
				(track.id & 16711680) >> 16,
				(track.id & 65280) >> 8,
				track.id & 255,
				0,
				0,
				0,
				1,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				1,
				0,
				1
			]);
			if (track.type !== "video") result[result.length - 1] = 0;
			return box(types.trex, result);
		};
		(function() {
			var audioTrun, videoTrun, trunHeader = function trunHeader(samples, offset) {
				var durationPresent = 0, sizePresent = 0, flagsPresent = 0, compositionTimeOffset = 0;
				if (samples.length) {
					if (samples[0].duration !== void 0) durationPresent = 1;
					if (samples[0].size !== void 0) sizePresent = 2;
					if (samples[0].flags !== void 0) flagsPresent = 4;
					if (samples[0].compositionTimeOffset !== void 0) compositionTimeOffset = 8;
				}
				return [
					0,
					0,
					durationPresent | sizePresent | flagsPresent | compositionTimeOffset,
					1,
					(samples.length & 4278190080) >>> 24,
					(samples.length & 16711680) >>> 16,
					(samples.length & 65280) >>> 8,
					samples.length & 255,
					(offset & 4278190080) >>> 24,
					(offset & 16711680) >>> 16,
					(offset & 65280) >>> 8,
					offset & 255
				];
			};
			videoTrun = function videoTrun(track, offset) {
				var bytesOffest, bytes, header, samples = track.samples || [], sample, i;
				offset += 20 + 16 * samples.length;
				header = trunHeader(samples, offset);
				bytes = new Uint8Array(header.length + samples.length * 16);
				bytes.set(header);
				bytesOffest = header.length;
				for (i = 0; i < samples.length; i++) {
					sample = samples[i];
					bytes[bytesOffest++] = (sample.duration & 4278190080) >>> 24;
					bytes[bytesOffest++] = (sample.duration & 16711680) >>> 16;
					bytes[bytesOffest++] = (sample.duration & 65280) >>> 8;
					bytes[bytesOffest++] = sample.duration & 255;
					bytes[bytesOffest++] = (sample.size & 4278190080) >>> 24;
					bytes[bytesOffest++] = (sample.size & 16711680) >>> 16;
					bytes[bytesOffest++] = (sample.size & 65280) >>> 8;
					bytes[bytesOffest++] = sample.size & 255;
					bytes[bytesOffest++] = sample.flags.isLeading << 2 | sample.flags.dependsOn;
					bytes[bytesOffest++] = sample.flags.isDependedOn << 6 | sample.flags.hasRedundancy << 4 | sample.flags.paddingValue << 1 | sample.flags.isNonSyncSample;
					bytes[bytesOffest++] = sample.flags.degradationPriority & 61440;
					bytes[bytesOffest++] = sample.flags.degradationPriority & 15;
					bytes[bytesOffest++] = (sample.compositionTimeOffset & 4278190080) >>> 24;
					bytes[bytesOffest++] = (sample.compositionTimeOffset & 16711680) >>> 16;
					bytes[bytesOffest++] = (sample.compositionTimeOffset & 65280) >>> 8;
					bytes[bytesOffest++] = sample.compositionTimeOffset & 255;
				}
				return box(types.trun, bytes);
			};
			audioTrun = function audioTrun(track, offset) {
				var bytes, bytesOffest, header, samples = track.samples || [], sample, i;
				offset += 20 + 8 * samples.length;
				header = trunHeader(samples, offset);
				bytes = new Uint8Array(header.length + samples.length * 8);
				bytes.set(header);
				bytesOffest = header.length;
				for (i = 0; i < samples.length; i++) {
					sample = samples[i];
					bytes[bytesOffest++] = (sample.duration & 4278190080) >>> 24;
					bytes[bytesOffest++] = (sample.duration & 16711680) >>> 16;
					bytes[bytesOffest++] = (sample.duration & 65280) >>> 8;
					bytes[bytesOffest++] = sample.duration & 255;
					bytes[bytesOffest++] = (sample.size & 4278190080) >>> 24;
					bytes[bytesOffest++] = (sample.size & 16711680) >>> 16;
					bytes[bytesOffest++] = (sample.size & 65280) >>> 8;
					bytes[bytesOffest++] = sample.size & 255;
				}
				return box(types.trun, bytes);
			};
			trun = function trun(track, offset) {
				if (track.type === "audio") return audioTrun(track, offset);
				return videoTrun(track, offset);
			};
		})();
		module.exports = {
			ftyp,
			mdat,
			moof,
			moov,
			initSegment: function initSegment(tracks) {
				var fileType = ftyp(), movie = moov(tracks), result = new Uint8Array(fileType.byteLength + movie.byteLength);
				result.set(fileType);
				result.set(movie, fileType.byteLength);
				return result;
			}
		};
	}));
	//#endregion
	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/mp4/frame-utils.js
	var require_frame_utils = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		/**
		* mux.js
		*
		* Copyright (c) Brightcove
		* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE
		*/
		var groupNalsIntoFrames = function groupNalsIntoFrames(nalUnits) {
			var i, currentNal, currentFrame = [], frames = [];
			frames.byteLength = 0;
			frames.nalCount = 0;
			frames.duration = 0;
			currentFrame.byteLength = 0;
			for (i = 0; i < nalUnits.length; i++) {
				currentNal = nalUnits[i];
				if (currentNal.nalUnitType === "access_unit_delimiter_rbsp") {
					if (currentFrame.length) {
						currentFrame.duration = currentNal.dts - currentFrame.dts;
						frames.byteLength += currentFrame.byteLength;
						frames.nalCount += currentFrame.length;
						frames.duration += currentFrame.duration;
						frames.push(currentFrame);
					}
					currentFrame = [currentNal];
					currentFrame.byteLength = currentNal.data.byteLength;
					currentFrame.pts = currentNal.pts;
					currentFrame.dts = currentNal.dts;
				} else {
					if (currentNal.nalUnitType === "slice_layer_without_partitioning_rbsp_idr") currentFrame.keyFrame = true;
					currentFrame.duration = currentNal.dts - currentFrame.dts;
					currentFrame.byteLength += currentNal.data.byteLength;
					currentFrame.push(currentNal);
				}
			}
			if (frames.length && (!currentFrame.duration || currentFrame.duration <= 0)) currentFrame.duration = frames[frames.length - 1].duration;
			frames.byteLength += currentFrame.byteLength;
			frames.nalCount += currentFrame.length;
			frames.duration += currentFrame.duration;
			frames.push(currentFrame);
			return frames;
		};
		var groupFramesIntoGops = function groupFramesIntoGops(frames) {
			var i, currentFrame, currentGop = [], gops = [];
			currentGop.byteLength = 0;
			currentGop.nalCount = 0;
			currentGop.duration = 0;
			currentGop.pts = frames[0].pts;
			currentGop.dts = frames[0].dts;
			gops.byteLength = 0;
			gops.nalCount = 0;
			gops.duration = 0;
			gops.pts = frames[0].pts;
			gops.dts = frames[0].dts;
			for (i = 0; i < frames.length; i++) {
				currentFrame = frames[i];
				if (currentFrame.keyFrame) {
					if (currentGop.length) {
						gops.push(currentGop);
						gops.byteLength += currentGop.byteLength;
						gops.nalCount += currentGop.nalCount;
						gops.duration += currentGop.duration;
					}
					currentGop = [currentFrame];
					currentGop.nalCount = currentFrame.length;
					currentGop.byteLength = currentFrame.byteLength;
					currentGop.pts = currentFrame.pts;
					currentGop.dts = currentFrame.dts;
					currentGop.duration = currentFrame.duration;
				} else {
					currentGop.duration += currentFrame.duration;
					currentGop.nalCount += currentFrame.length;
					currentGop.byteLength += currentFrame.byteLength;
					currentGop.push(currentFrame);
				}
			}
			if (gops.length && currentGop.duration <= 0) currentGop.duration = gops[gops.length - 1].duration;
			gops.byteLength += currentGop.byteLength;
			gops.nalCount += currentGop.nalCount;
			gops.duration += currentGop.duration;
			gops.push(currentGop);
			return gops;
		};
		var extendFirstKeyFrame = function extendFirstKeyFrame(gops) {
			var currentGop;
			if (!gops[0][0].keyFrame && gops.length > 1) {
				currentGop = gops.shift();
				gops.byteLength -= currentGop.byteLength;
				gops.nalCount -= currentGop.nalCount;
				gops[0][0].dts = currentGop.dts;
				gops[0][0].pts = currentGop.pts;
				gops[0][0].duration += currentGop.duration;
			}
			return gops;
		};
		/**
		* Default sample object
		* see ISO/IEC 14496-12:2012, section 8.6.4.3
		*/
		var createDefaultSample = function createDefaultSample() {
			return {
				size: 0,
				flags: {
					isLeading: 0,
					dependsOn: 1,
					isDependedOn: 0,
					hasRedundancy: 0,
					degradationPriority: 0,
					isNonSyncSample: 1
				}
			};
		};
		var sampleForFrame = function sampleForFrame(frame, dataOffset) {
			var sample = createDefaultSample();
			sample.dataOffset = dataOffset;
			sample.compositionTimeOffset = frame.pts - frame.dts;
			sample.duration = frame.duration;
			sample.size = 4 * frame.length;
			sample.size += frame.byteLength;
			if (frame.keyFrame) {
				sample.flags.dependsOn = 2;
				sample.flags.isNonSyncSample = 0;
			}
			return sample;
		};
		module.exports = {
			groupNalsIntoFrames,
			groupFramesIntoGops,
			extendFirstKeyFrame,
			generateSampleTable: function generateSampleTable(gops, baseDataOffset) {
				var h, i, sample, currentGop, currentFrame, dataOffset = baseDataOffset || 0, samples = [];
				for (h = 0; h < gops.length; h++) {
					currentGop = gops[h];
					for (i = 0; i < currentGop.length; i++) {
						currentFrame = currentGop[i];
						sample = sampleForFrame(currentFrame, dataOffset);
						dataOffset += sample.size;
						samples.push(sample);
					}
				}
				return samples;
			},
			concatenateNalData: function concatenateNalData(gops) {
				var h, i, j, currentGop, currentFrame, currentNal, dataOffset = 0, totalByteLength = gops.byteLength + 4 * gops.nalCount, data = new Uint8Array(totalByteLength), view = new DataView(data.buffer);
				for (h = 0; h < gops.length; h++) {
					currentGop = gops[h];
					for (i = 0; i < currentGop.length; i++) {
						currentFrame = currentGop[i];
						for (j = 0; j < currentFrame.length; j++) {
							currentNal = currentFrame[j];
							view.setUint32(dataOffset, currentNal.data.byteLength);
							dataOffset += 4;
							data.set(currentNal.data, dataOffset);
							dataOffset += currentNal.data.byteLength;
						}
					}
				}
				return data;
			},
			generateSampleTableForFrame: function generateSampleTableForFrame(frame, baseDataOffset) {
				var sample, dataOffset = baseDataOffset || 0, samples = [];
				sample = sampleForFrame(frame, dataOffset);
				samples.push(sample);
				return samples;
			},
			concatenateNalDataForFrame: function concatenateNalDataForFrame(frame) {
				var i, currentNal, dataOffset = 0, totalByteLength = frame.byteLength + 4 * frame.length, data = new Uint8Array(totalByteLength), view = new DataView(data.buffer);
				for (i = 0; i < frame.length; i++) {
					currentNal = frame[i];
					view.setUint32(dataOffset, currentNal.data.byteLength);
					dataOffset += 4;
					data.set(currentNal.data, dataOffset);
					dataOffset += currentNal.data.byteLength;
				}
				return data;
			}
		};
	}));
	//#endregion
	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/data/silence.js
	var require_silence = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		/**
		* mux.js
		*
		* Copyright (c) Brightcove
		* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE
		*/
		var highPrefix = [
			33,
			16,
			5,
			32,
			164,
			27
		];
		var lowPrefix = [
			33,
			65,
			108,
			84,
			1,
			2,
			4,
			8,
			168,
			2,
			4,
			8,
			17,
			191,
			252
		];
		var zeroFill = function zeroFill(count) {
			var a = [];
			while (count--) a.push(0);
			return a;
		};
		var makeTable = function makeTable(metaTable) {
			return Object.keys(metaTable).reduce(function(obj, key) {
				obj[key] = new Uint8Array(metaTable[key].reduce(function(arr, part) {
					return arr.concat(part);
				}, []));
				return obj;
			}, {});
		};
		var silence;
		module.exports = function() {
			if (!silence) silence = makeTable({
				96e3: [
					highPrefix,
					[227, 64],
					zeroFill(154),
					[56]
				],
				88200: [
					highPrefix,
					[231],
					zeroFill(170),
					[56]
				],
				64e3: [
					highPrefix,
					[248, 192],
					zeroFill(240),
					[56]
				],
				48e3: [
					highPrefix,
					[255, 192],
					zeroFill(268),
					[
						55,
						148,
						128
					],
					zeroFill(54),
					[112]
				],
				44100: [
					highPrefix,
					[255, 192],
					zeroFill(268),
					[
						55,
						163,
						128
					],
					zeroFill(84),
					[112]
				],
				32e3: [
					highPrefix,
					[255, 192],
					zeroFill(268),
					[55, 234],
					zeroFill(226),
					[112]
				],
				24e3: [
					highPrefix,
					[255, 192],
					zeroFill(268),
					[
						55,
						255,
						128
					],
					zeroFill(268),
					[111, 112],
					zeroFill(126),
					[224]
				],
				16e3: [
					highPrefix,
					[255, 192],
					zeroFill(268),
					[
						55,
						255,
						128
					],
					zeroFill(268),
					[111, 255],
					zeroFill(269),
					[223, 108],
					zeroFill(195),
					[1, 192]
				],
				12e3: [
					lowPrefix,
					zeroFill(268),
					[
						3,
						127,
						248
					],
					zeroFill(268),
					[
						6,
						255,
						240
					],
					zeroFill(268),
					[
						13,
						255,
						224
					],
					zeroFill(268),
					[
						27,
						253,
						128
					],
					zeroFill(259),
					[56]
				],
				11025: [
					lowPrefix,
					zeroFill(268),
					[
						3,
						127,
						248
					],
					zeroFill(268),
					[
						6,
						255,
						240
					],
					zeroFill(268),
					[
						13,
						255,
						224
					],
					zeroFill(268),
					[
						27,
						255,
						192
					],
					zeroFill(268),
					[
						55,
						175,
						128
					],
					zeroFill(108),
					[112]
				],
				8e3: [
					lowPrefix,
					zeroFill(268),
					[
						3,
						121,
						16
					],
					zeroFill(47),
					[7]
				]
			});
			return silence;
		};
	}));
	//#endregion
	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/utils/clock.js
	var require_clock = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		/**
		* mux.js
		*
		* Copyright (c) Brightcove
		* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE
		*/
		var ONE_SECOND_IN_TS = 9e4;
		var secondsToVideoTs = function secondsToVideoTs(seconds) {
			return seconds * ONE_SECOND_IN_TS;
		};
		var secondsToAudioTs = function secondsToAudioTs(seconds, sampleRate) {
			return seconds * sampleRate;
		};
		var videoTsToSeconds = function videoTsToSeconds(timestamp) {
			return timestamp / ONE_SECOND_IN_TS;
		};
		var audioTsToSeconds = function audioTsToSeconds(timestamp, sampleRate) {
			return timestamp / sampleRate;
		};
		module.exports = {
			ONE_SECOND_IN_TS,
			secondsToVideoTs,
			secondsToAudioTs,
			videoTsToSeconds,
			audioTsToSeconds,
			audioTsToVideoTs: function audioTsToVideoTs(timestamp, sampleRate) {
				return secondsToVideoTs(audioTsToSeconds(timestamp, sampleRate));
			},
			videoTsToAudioTs: function videoTsToAudioTs(timestamp, sampleRate) {
				return secondsToAudioTs(videoTsToSeconds(timestamp), sampleRate);
			},
			metadataTsToSeconds: function metadataTsToSeconds(timestamp, timelineStartPts, keepOriginalTimestamps) {
				return videoTsToSeconds(keepOriginalTimestamps ? timestamp : timestamp - timelineStartPts);
			}
		};
	}));
	//#endregion
	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/mp4/audio-frame-utils.js
	var require_audio_frame_utils = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		/**
		* mux.js
		*
		* Copyright (c) Brightcove
		* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE
		*/
		var coneOfSilence = require_silence();
		var clock = require_clock();
		/**
		* Sum the \`byteLength\` properties of the data in each AAC frame
		*/
		var sumFrameByteLengths = function sumFrameByteLengths(array) {
			var i, currentObj, sum = 0;
			for (i = 0; i < array.length; i++) {
				currentObj = array[i];
				sum += currentObj.data.byteLength;
			}
			return sum;
		};
		module.exports = {
			prefixWithSilence: function prefixWithSilence(track, frames, audioAppendStartTs, videoBaseMediaDecodeTime) {
				var baseMediaDecodeTimeTs, frameDuration = 0, audioGapDuration = 0, audioFillFrameCount = 0, audioFillDuration = 0, silentFrame, i, firstFrame;
				if (!frames.length) return;
				baseMediaDecodeTimeTs = clock.audioTsToVideoTs(track.baseMediaDecodeTime, track.samplerate);
				frameDuration = Math.ceil(clock.ONE_SECOND_IN_TS / (track.samplerate / 1024));
				if (audioAppendStartTs && videoBaseMediaDecodeTime) {
					audioGapDuration = baseMediaDecodeTimeTs - Math.max(audioAppendStartTs, videoBaseMediaDecodeTime);
					audioFillFrameCount = Math.floor(audioGapDuration / frameDuration);
					audioFillDuration = audioFillFrameCount * frameDuration;
				}
				if (audioFillFrameCount < 1 || audioFillDuration > clock.ONE_SECOND_IN_TS / 2) return;
				silentFrame = coneOfSilence()[track.samplerate];
				if (!silentFrame) silentFrame = frames[0].data;
				for (i = 0; i < audioFillFrameCount; i++) {
					firstFrame = frames[0];
					frames.splice(0, 0, {
						data: silentFrame,
						dts: firstFrame.dts - frameDuration,
						pts: firstFrame.pts - frameDuration
					});
				}
				track.baseMediaDecodeTime -= Math.floor(clock.videoTsToAudioTs(audioFillDuration, track.samplerate));
				return audioFillDuration;
			},
			trimAdtsFramesByEarliestDts: function trimAdtsFramesByEarliestDts(adtsFrames, track, earliestAllowedDts) {
				if (track.minSegmentDts >= earliestAllowedDts) return adtsFrames;
				track.minSegmentDts = Infinity;
				return adtsFrames.filter(function(currentFrame) {
					if (currentFrame.dts >= earliestAllowedDts) {
						track.minSegmentDts = Math.min(track.minSegmentDts, currentFrame.dts);
						track.minSegmentPts = track.minSegmentDts;
						return true;
					}
					return false;
				});
			},
			generateSampleTable: function generateSampleTable(frames) {
				var i, currentFrame, samples = [];
				for (i = 0; i < frames.length; i++) {
					currentFrame = frames[i];
					samples.push({
						size: currentFrame.data.byteLength,
						duration: 1024
					});
				}
				return samples;
			},
			concatenateFrameData: function concatenateFrameData(frames) {
				var i, currentFrame, dataOffset = 0, data = new Uint8Array(sumFrameByteLengths(frames));
				for (i = 0; i < frames.length; i++) {
					currentFrame = frames[i];
					data.set(currentFrame.data, dataOffset);
					dataOffset += currentFrame.data.byteLength;
				}
				return data;
			}
		};
	}));
	//#endregion
	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/mp4/track-decode-info.js
	var require_track_decode_info = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		/**
		* mux.js
		*
		* Copyright (c) Brightcove
		* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE
		*/
		var ONE_SECOND_IN_TS = require_clock().ONE_SECOND_IN_TS;
		module.exports = {
			clearDtsInfo: function clearDtsInfo(track) {
				delete track.minSegmentDts;
				delete track.maxSegmentDts;
				delete track.minSegmentPts;
				delete track.maxSegmentPts;
			},
			calculateTrackBaseMediaDecodeTime: function calculateTrackBaseMediaDecodeTime(track, keepOriginalTimestamps) {
				var baseMediaDecodeTime, scale, minSegmentDts = track.minSegmentDts;
				if (!keepOriginalTimestamps) minSegmentDts -= track.timelineStartInfo.dts;
				baseMediaDecodeTime = track.timelineStartInfo.baseMediaDecodeTime;
				baseMediaDecodeTime += minSegmentDts;
				baseMediaDecodeTime = Math.max(0, baseMediaDecodeTime);
				if (track.type === "audio") {
					scale = track.samplerate / ONE_SECOND_IN_TS;
					baseMediaDecodeTime *= scale;
					baseMediaDecodeTime = Math.floor(baseMediaDecodeTime);
				}
				return baseMediaDecodeTime;
			},
			collectDtsInfo: function collectDtsInfo(track, data) {
				if (typeof data.pts === "number") {
					if (track.timelineStartInfo.pts === void 0) track.timelineStartInfo.pts = data.pts;
					if (track.minSegmentPts === void 0) track.minSegmentPts = data.pts;
					else track.minSegmentPts = Math.min(track.minSegmentPts, data.pts);
					if (track.maxSegmentPts === void 0) track.maxSegmentPts = data.pts;
					else track.maxSegmentPts = Math.max(track.maxSegmentPts, data.pts);
				}
				if (typeof data.dts === "number") {
					if (track.timelineStartInfo.dts === void 0) track.timelineStartInfo.dts = data.dts;
					if (track.minSegmentDts === void 0) track.minSegmentDts = data.dts;
					else track.minSegmentDts = Math.min(track.minSegmentDts, data.dts);
					if (track.maxSegmentDts === void 0) track.maxSegmentDts = data.dts;
					else track.maxSegmentDts = Math.max(track.maxSegmentDts, data.dts);
				}
			}
		};
	}));
	//#endregion
	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/tools/caption-packet-parser.js
	/**
	* mux.js
	*
	* Copyright (c) Brightcove
	* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE
	*
	* Reads in-band caption information from a video elementary
	* stream. Captions must follow the CEA-708 standard for injection
	* into an MPEG-2 transport streams.
	* @see https://en.wikipedia.org/wiki/CEA-708
	* @see https://www.gpo.gov/fdsys/pkg/CFR-2007-title47-vol1/pdf/CFR-2007-title47-vol1-sec15-119.pdf
	*/
	var require_caption_packet_parser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var USER_DATA_REGISTERED_ITU_T_T35 = 4;
		var RBSP_TRAILING_BITS = 128;
		module.exports = {
			parseSei: function parseSei(bytes) {
				var i = 0, result = {
					payloadType: -1,
					payloadSize: 0
				}, payloadType = 0, payloadSize = 0;
				while (i < bytes.byteLength) {
					if (bytes[i] === RBSP_TRAILING_BITS) break;
					while (bytes[i] === 255) {
						payloadType += 255;
						i++;
					}
					payloadType += bytes[i++];
					while (bytes[i] === 255) {
						payloadSize += 255;
						i++;
					}
					payloadSize += bytes[i++];
					if (!result.payload && payloadType === USER_DATA_REGISTERED_ITU_T_T35) if (String.fromCharCode(bytes[i + 3], bytes[i + 4], bytes[i + 5], bytes[i + 6]) === "GA94") {
						result.payloadType = payloadType;
						result.payloadSize = payloadSize;
						result.payload = bytes.subarray(i, i + payloadSize);
						break;
					} else result.payload = void 0;
					i += payloadSize;
					payloadType = 0;
					payloadSize = 0;
				}
				return result;
			},
			parseUserData: function parseUserData(sei) {
				if (sei.payload[0] !== 181) return null;
				if ((sei.payload[1] << 8 | sei.payload[2]) !== 49) return null;
				if (String.fromCharCode(sei.payload[3], sei.payload[4], sei.payload[5], sei.payload[6]) !== "GA94") return null;
				if (sei.payload[7] !== 3) return null;
				return sei.payload.subarray(8, sei.payload.length - 1);
			},
			parseCaptionPackets: function parseCaptionPackets(pts, userData) {
				var results = [], i, count, offset, data;
				if (!(userData[0] & 64)) return results;
				count = userData[0] & 31;
				for (i = 0; i < count; i++) {
					offset = i * 3;
					data = {
						type: userData[offset + 2] & 3,
						pts
					};
					if (userData[offset + 2] & 4) {
						data.ccData = userData[offset + 3] << 8 | userData[offset + 4];
						results.push(data);
					}
				}
				return results;
			},
			discardEmulationPreventionBytes: function discardEmulationPreventionBytes(data) {
				var length = data.byteLength, emulationPreventionBytesPositions = [], i = 1, newLength, newData;
				while (i < length - 2) if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 3) {
					emulationPreventionBytesPositions.push(i + 2);
					i += 2;
				} else i++;
				if (emulationPreventionBytesPositions.length === 0) return data;
				newLength = length - emulationPreventionBytesPositions.length;
				newData = new Uint8Array(newLength);
				var sourceIndex = 0;
				for (i = 0; i < newLength; sourceIndex++, i++) {
					if (sourceIndex === emulationPreventionBytesPositions[0]) {
						sourceIndex++;
						emulationPreventionBytesPositions.shift();
					}
					newData[i] = data[sourceIndex];
				}
				return newData;
			},
			USER_DATA_REGISTERED_ITU_T_T35
		};
	}));
	//#endregion
	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/m2ts/caption-stream.js
	/**
	* mux.js
	*
	* Copyright (c) Brightcove
	* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE
	*
	* Reads in-band caption information from a video elementary
	* stream. Captions must follow the CEA-708 standard for injection
	* into an MPEG-2 transport streams.
	* @see https://en.wikipedia.org/wiki/CEA-708
	* @see https://www.gpo.gov/fdsys/pkg/CFR-2007-title47-vol1/pdf/CFR-2007-title47-vol1-sec15-119.pdf
	*/
	var require_caption_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var Stream = require_stream();
		var cea708Parser = require_caption_packet_parser();
		var CaptionStream = function CaptionStream(options) {
			options = options || {};
			CaptionStream.prototype.init.call(this);
			this.parse708captions_ = typeof options.parse708captions === "boolean" ? options.parse708captions : true;
			this.captionPackets_ = [];
			this.ccStreams_ = [
				new Cea608Stream(0, 0),
				new Cea608Stream(0, 1),
				new Cea608Stream(1, 0),
				new Cea608Stream(1, 1)
			];
			if (this.parse708captions_) this.cc708Stream_ = new Cea708Stream({ captionServices: options.captionServices });
			this.reset();
			this.ccStreams_.forEach(function(cc) {
				cc.on("data", this.trigger.bind(this, "data"));
				cc.on("partialdone", this.trigger.bind(this, "partialdone"));
				cc.on("done", this.trigger.bind(this, "done"));
			}, this);
			if (this.parse708captions_) {
				this.cc708Stream_.on("data", this.trigger.bind(this, "data"));
				this.cc708Stream_.on("partialdone", this.trigger.bind(this, "partialdone"));
				this.cc708Stream_.on("done", this.trigger.bind(this, "done"));
			}
		};
		CaptionStream.prototype = new Stream();
		CaptionStream.prototype.push = function(event) {
			var sei, userData, newCaptionPackets;
			if (event.nalUnitType !== "sei_rbsp") return;
			sei = cea708Parser.parseSei(event.escapedRBSP);
			if (!sei.payload) return;
			if (sei.payloadType !== cea708Parser.USER_DATA_REGISTERED_ITU_T_T35) return;
			userData = cea708Parser.parseUserData(sei);
			if (!userData) return;
			if (event.dts < this.latestDts_) {
				this.ignoreNextEqualDts_ = true;
				return;
			} else if (event.dts === this.latestDts_ && this.ignoreNextEqualDts_) {
				this.numSameDts_--;
				if (!this.numSameDts_) this.ignoreNextEqualDts_ = false;
				return;
			}
			newCaptionPackets = cea708Parser.parseCaptionPackets(event.pts, userData);
			this.captionPackets_ = this.captionPackets_.concat(newCaptionPackets);
			if (this.latestDts_ !== event.dts) this.numSameDts_ = 0;
			this.numSameDts_++;
			this.latestDts_ = event.dts;
		};
		CaptionStream.prototype.flushCCStreams = function(flushType) {
			this.ccStreams_.forEach(function(cc) {
				return flushType === "flush" ? cc.flush() : cc.partialFlush();
			}, this);
		};
		CaptionStream.prototype.flushStream = function(flushType) {
			if (!this.captionPackets_.length) {
				this.flushCCStreams(flushType);
				return;
			}
			this.captionPackets_.forEach(function(elem, idx) {
				elem.presortIndex = idx;
			});
			this.captionPackets_.sort(function(a, b) {
				if (a.pts === b.pts) return a.presortIndex - b.presortIndex;
				return a.pts - b.pts;
			});
			this.captionPackets_.forEach(function(packet) {
				if (packet.type < 2) this.dispatchCea608Packet(packet);
				else this.dispatchCea708Packet(packet);
			}, this);
			this.captionPackets_.length = 0;
			this.flushCCStreams(flushType);
		};
		CaptionStream.prototype.flush = function() {
			return this.flushStream("flush");
		};
		CaptionStream.prototype.partialFlush = function() {
			return this.flushStream("partialFlush");
		};
		CaptionStream.prototype.reset = function() {
			this.latestDts_ = null;
			this.ignoreNextEqualDts_ = false;
			this.numSameDts_ = 0;
			this.activeCea608Channel_ = [null, null];
			this.ccStreams_.forEach(function(ccStream) {
				ccStream.reset();
			});
		};
		CaptionStream.prototype.dispatchCea608Packet = function(packet) {
			if (this.setsTextOrXDSActive(packet)) this.activeCea608Channel_[packet.type] = null;
			else if (this.setsChannel1Active(packet)) this.activeCea608Channel_[packet.type] = 0;
			else if (this.setsChannel2Active(packet)) this.activeCea608Channel_[packet.type] = 1;
			if (this.activeCea608Channel_[packet.type] === null) return;
			this.ccStreams_[(packet.type << 1) + this.activeCea608Channel_[packet.type]].push(packet);
		};
		CaptionStream.prototype.setsChannel1Active = function(packet) {
			return (packet.ccData & 30720) === 4096;
		};
		CaptionStream.prototype.setsChannel2Active = function(packet) {
			return (packet.ccData & 30720) === 6144;
		};
		CaptionStream.prototype.setsTextOrXDSActive = function(packet) {
			return (packet.ccData & 28928) === 256 || (packet.ccData & 30974) === 4138 || (packet.ccData & 30974) === 6186;
		};
		CaptionStream.prototype.dispatchCea708Packet = function(packet) {
			if (this.parse708captions_) this.cc708Stream_.push(packet);
		};
		var CHARACTER_TRANSLATION_708 = {
			127: 9834,
			4128: 32,
			4129: 160,
			4133: 8230,
			4138: 352,
			4140: 338,
			4144: 9608,
			4145: 8216,
			4146: 8217,
			4147: 8220,
			4148: 8221,
			4149: 8226,
			4153: 8482,
			4154: 353,
			4156: 339,
			4157: 8480,
			4159: 376,
			4214: 8539,
			4215: 8540,
			4216: 8541,
			4217: 8542,
			4218: 9168,
			4219: 9124,
			4220: 9123,
			4221: 9135,
			4222: 9126,
			4223: 9121,
			4256: 12600
		};
		var get708CharFromCode = function get708CharFromCode(code) {
			var newCode = CHARACTER_TRANSLATION_708[code] || code;
			if (code & 4096 && code === newCode) return "";
			return String.fromCharCode(newCode);
		};
		var within708TextBlock = function within708TextBlock(b) {
			return 32 <= b && b <= 127 || 160 <= b && b <= 255;
		};
		var Cea708Window = function Cea708Window(windowNum) {
			this.windowNum = windowNum;
			this.reset();
		};
		Cea708Window.prototype.reset = function() {
			this.clearText();
			this.pendingNewLine = false;
			this.winAttr = {};
			this.penAttr = {};
			this.penLoc = {};
			this.penColor = {};
			this.visible = 0;
			this.rowLock = 0;
			this.columnLock = 0;
			this.priority = 0;
			this.relativePositioning = 0;
			this.anchorVertical = 0;
			this.anchorHorizontal = 0;
			this.anchorPoint = 0;
			this.rowCount = 1;
			this.virtualRowCount = this.rowCount + 1;
			this.columnCount = 41;
			this.windowStyle = 0;
			this.penStyle = 0;
		};
		Cea708Window.prototype.getText = function() {
			return this.rows.join("\\n");
		};
		Cea708Window.prototype.clearText = function() {
			this.rows = [""];
			this.rowIdx = 0;
		};
		Cea708Window.prototype.newLine = function(pts) {
			if (this.rows.length >= this.virtualRowCount && typeof this.beforeRowOverflow === "function") this.beforeRowOverflow(pts);
			if (this.rows.length > 0) {
				this.rows.push("");
				this.rowIdx++;
			}
			while (this.rows.length > this.virtualRowCount) {
				this.rows.shift();
				this.rowIdx--;
			}
		};
		Cea708Window.prototype.isEmpty = function() {
			if (this.rows.length === 0) return true;
			else if (this.rows.length === 1) return this.rows[0] === "";
			return false;
		};
		Cea708Window.prototype.addText = function(text) {
			this.rows[this.rowIdx] += text;
		};
		Cea708Window.prototype.backspace = function() {
			if (!this.isEmpty()) {
				var row = this.rows[this.rowIdx];
				this.rows[this.rowIdx] = row.substr(0, row.length - 1);
			}
		};
		var Cea708Service = function Cea708Service(serviceNum, encoding, stream) {
			this.serviceNum = serviceNum;
			this.text = "";
			this.currentWindow = new Cea708Window(-1);
			this.windows = [];
			this.stream = stream;
			if (typeof encoding === "string") this.createTextDecoder(encoding);
		};
		/**
		* Initialize service windows
		* Must be run before service use
		*
		* @param  {Integer}  pts               PTS value
		* @param  {Function} beforeRowOverflow Function to execute before row overflow of a window
		*/
		Cea708Service.prototype.init = function(pts, beforeRowOverflow) {
			this.startPts = pts;
			for (var win = 0; win < 8; win++) {
				this.windows[win] = new Cea708Window(win);
				if (typeof beforeRowOverflow === "function") this.windows[win].beforeRowOverflow = beforeRowOverflow;
			}
		};
		/**
		* Set current window of service to be affected by commands
		*
		* @param  {Integer} windowNum Window number
		*/
		Cea708Service.prototype.setCurrentWindow = function(windowNum) {
			this.currentWindow = this.windows[windowNum];
		};
		/**
		* Try to create a TextDecoder if it is natively supported
		*/
		Cea708Service.prototype.createTextDecoder = function(encoding) {
			if (typeof TextDecoder === "undefined") this.stream.trigger("log", {
				level: "warn",
				message: "The \`encoding\` option is unsupported without TextDecoder support"
			});
			else try {
				this.textDecoder_ = new TextDecoder(encoding);
			} catch (error) {
				this.stream.trigger("log", {
					level: "warn",
					message: "TextDecoder could not be created with " + encoding + " encoding. " + error
				});
			}
		};
		var Cea708Stream = function Cea708Stream(options) {
			options = options || {};
			Cea708Stream.prototype.init.call(this);
			var self = this;
			var captionServices = options.captionServices || {};
			var captionServiceEncodings = {};
			var serviceProps;
			Object.keys(captionServices).forEach(function(serviceName) {
				serviceProps = captionServices[serviceName];
				if (/^SERVICE/.test(serviceName)) captionServiceEncodings[serviceName] = serviceProps.encoding;
			});
			this.serviceEncodings = captionServiceEncodings;
			this.current708Packet = null;
			this.services = {};
			this.push = function(packet) {
				if (packet.type === 3) {
					self.new708Packet();
					self.add708Bytes(packet);
				} else {
					if (self.current708Packet === null) self.new708Packet();
					self.add708Bytes(packet);
				}
			};
		};
		Cea708Stream.prototype = new Stream();
		/**
		* Push current 708 packet, create new 708 packet.
		*/
		Cea708Stream.prototype.new708Packet = function() {
			if (this.current708Packet !== null) this.push708Packet();
			this.current708Packet = {
				data: [],
				ptsVals: []
			};
		};
		/**
		* Add pts and both bytes from packet into current 708 packet.
		*/
		Cea708Stream.prototype.add708Bytes = function(packet) {
			var data = packet.ccData;
			var byte0 = data >>> 8;
			var byte1 = data & 255;
			this.current708Packet.ptsVals.push(packet.pts);
			this.current708Packet.data.push(byte0);
			this.current708Packet.data.push(byte1);
		};
		/**
		* Parse completed 708 packet into service blocks and push each service block.
		*/
		Cea708Stream.prototype.push708Packet = function() {
			var packet708 = this.current708Packet;
			var packetData = packet708.data;
			var serviceNum = null;
			var blockSize = null;
			var i = 0;
			var b = packetData[i++];
			packet708.seq = b >> 6;
			packet708.sizeCode = b & 63;
			for (; i < packetData.length; i++) {
				b = packetData[i++];
				serviceNum = b >> 5;
				blockSize = b & 31;
				if (serviceNum === 7 && blockSize > 0) {
					b = packetData[i++];
					serviceNum = b;
				}
				this.pushServiceBlock(serviceNum, i, blockSize);
				if (blockSize > 0) i += blockSize - 1;
			}
		};
		/**
		* Parse service block, execute commands, read text.
		*
		* Note: While many of these commands serve important purposes,
		* many others just parse out the parameters or attributes, but
		* nothing is done with them because this is not a full and complete
		* implementation of the entire 708 spec.
		*
		* @param  {Integer} serviceNum Service number
		* @param  {Integer} start      Start index of the 708 packet data
		* @param  {Integer} size       Block size
		*/
		Cea708Stream.prototype.pushServiceBlock = function(serviceNum, start, size) {
			var b;
			var i = start;
			var packetData = this.current708Packet.data;
			var service = this.services[serviceNum];
			if (!service) service = this.initService(serviceNum, i);
			for (; i < start + size && i < packetData.length; i++) {
				b = packetData[i];
				if (within708TextBlock(b)) i = this.handleText(i, service);
				else if (b === 24) i = this.multiByteCharacter(i, service);
				else if (b === 16) i = this.extendedCommands(i, service);
				else if (128 <= b && b <= 135) i = this.setCurrentWindow(i, service);
				else if (152 <= b && b <= 159) i = this.defineWindow(i, service);
				else if (b === 136) i = this.clearWindows(i, service);
				else if (b === 140) i = this.deleteWindows(i, service);
				else if (b === 137) i = this.displayWindows(i, service);
				else if (b === 138) i = this.hideWindows(i, service);
				else if (b === 139) i = this.toggleWindows(i, service);
				else if (b === 151) i = this.setWindowAttributes(i, service);
				else if (b === 144) i = this.setPenAttributes(i, service);
				else if (b === 145) i = this.setPenColor(i, service);
				else if (b === 146) i = this.setPenLocation(i, service);
				else if (b === 143) service = this.reset(i, service);
				else if (b === 8) service.currentWindow.backspace();
				else if (b === 12) service.currentWindow.clearText();
				else if (b === 13) service.currentWindow.pendingNewLine = true;
				else if (b === 14) service.currentWindow.clearText();
				else if (b === 141) i++;
				else if (b === 142) {} else if (b === 3) {} else if (b === 0) {}
			}
		};
		/**
		* Execute an extended command
		*
		* @param  {Integer} i        Current index in the 708 packet
		* @param  {Service} service  The service object to be affected
		* @return {Integer}          New index after parsing
		*/
		Cea708Stream.prototype.extendedCommands = function(i, service) {
			var b = this.current708Packet.data[++i];
			if (within708TextBlock(b)) i = this.handleText(i, service, { isExtended: true });
			return i;
		};
		/**
		* Get PTS value of a given byte index
		*
		* @param  {Integer} byteIndex  Index of the byte
		* @return {Integer}            PTS
		*/
		Cea708Stream.prototype.getPts = function(byteIndex) {
			return this.current708Packet.ptsVals[Math.floor(byteIndex / 2)];
		};
		/**
		* Initializes a service
		*
		* @param  {Integer} serviceNum Service number
		* @return {Service}            Initialized service object
		*/
		Cea708Stream.prototype.initService = function(serviceNum, i) {
			var serviceName = "SERVICE" + serviceNum;
			var self = this;
			var serviceName;
			var encoding;
			if (serviceName in this.serviceEncodings) encoding = this.serviceEncodings[serviceName];
			this.services[serviceNum] = new Cea708Service(serviceNum, encoding, self);
			this.services[serviceNum].init(this.getPts(i), function(pts) {
				self.flushDisplayed(pts, self.services[serviceNum]);
			});
			return this.services[serviceNum];
		};
		/**
		* Execute text writing to current window
		*
		* @param  {Integer} i        Current index in the 708 packet
		* @param  {Service} service  The service object to be affected
		* @return {Integer}          New index after parsing
		*/
		Cea708Stream.prototype.handleText = function(i, service, options) {
			var isExtended = options && options.isExtended;
			var isMultiByte = options && options.isMultiByte;
			var packetData = this.current708Packet.data;
			var extended = isExtended ? 4096 : 0;
			var currentByte = packetData[i];
			var nextByte = packetData[i + 1];
			var win = service.currentWindow;
			var char;
			var charCodeArray;
			if (service.textDecoder_ && !isExtended) {
				if (isMultiByte) {
					charCodeArray = [currentByte, nextByte];
					i++;
				} else charCodeArray = [currentByte];
				char = service.textDecoder_.decode(new Uint8Array(charCodeArray));
			} else char = get708CharFromCode(extended | currentByte);
			if (win.pendingNewLine && !win.isEmpty()) win.newLine(this.getPts(i));
			win.pendingNewLine = false;
			win.addText(char);
			return i;
		};
		/**
		* Handle decoding of multibyte character
		*
		* @param  {Integer} i        Current index in the 708 packet
		* @param  {Service} service  The service object to be affected
		* @return {Integer}          New index after parsing
		*/
		Cea708Stream.prototype.multiByteCharacter = function(i, service) {
			var packetData = this.current708Packet.data;
			var firstByte = packetData[i + 1];
			var secondByte = packetData[i + 2];
			if (within708TextBlock(firstByte) && within708TextBlock(secondByte)) i = this.handleText(++i, service, { isMultiByte: true });
			return i;
		};
		/**
		* Parse and execute the CW# command.
		*
		* Set the current window.
		*
		* @param  {Integer} i        Current index in the 708 packet
		* @param  {Service} service  The service object to be affected
		* @return {Integer}          New index after parsing
		*/
		Cea708Stream.prototype.setCurrentWindow = function(i, service) {
			var windowNum = this.current708Packet.data[i] & 7;
			service.setCurrentWindow(windowNum);
			return i;
		};
		/**
		* Parse and execute the DF# command.
		*
		* Define a window and set it as the current window.
		*
		* @param  {Integer} i        Current index in the 708 packet
		* @param  {Service} service  The service object to be affected
		* @return {Integer}          New index after parsing
		*/
		Cea708Stream.prototype.defineWindow = function(i, service) {
			var packetData = this.current708Packet.data;
			var b = packetData[i];
			var windowNum = b & 7;
			service.setCurrentWindow(windowNum);
			var win = service.currentWindow;
			b = packetData[++i];
			win.visible = (b & 32) >> 5;
			win.rowLock = (b & 16) >> 4;
			win.columnLock = (b & 8) >> 3;
			win.priority = b & 7;
			b = packetData[++i];
			win.relativePositioning = (b & 128) >> 7;
			win.anchorVertical = b & 127;
			b = packetData[++i];
			win.anchorHorizontal = b;
			b = packetData[++i];
			win.anchorPoint = (b & 240) >> 4;
			win.rowCount = b & 15;
			b = packetData[++i];
			win.columnCount = b & 63;
			b = packetData[++i];
			win.windowStyle = (b & 56) >> 3;
			win.penStyle = b & 7;
			win.virtualRowCount = win.rowCount + 1;
			return i;
		};
		/**
		* Parse and execute the SWA command.
		*
		* Set attributes of the current window.
		*
		* @param  {Integer} i        Current index in the 708 packet
		* @param  {Service} service  The service object to be affected
		* @return {Integer}          New index after parsing
		*/
		Cea708Stream.prototype.setWindowAttributes = function(i, service) {
			var packetData = this.current708Packet.data;
			var b = packetData[i];
			var winAttr = service.currentWindow.winAttr;
			b = packetData[++i];
			winAttr.fillOpacity = (b & 192) >> 6;
			winAttr.fillRed = (b & 48) >> 4;
			winAttr.fillGreen = (b & 12) >> 2;
			winAttr.fillBlue = b & 3;
			b = packetData[++i];
			winAttr.borderType = (b & 192) >> 6;
			winAttr.borderRed = (b & 48) >> 4;
			winAttr.borderGreen = (b & 12) >> 2;
			winAttr.borderBlue = b & 3;
			b = packetData[++i];
			winAttr.borderType += (b & 128) >> 5;
			winAttr.wordWrap = (b & 64) >> 6;
			winAttr.printDirection = (b & 48) >> 4;
			winAttr.scrollDirection = (b & 12) >> 2;
			winAttr.justify = b & 3;
			b = packetData[++i];
			winAttr.effectSpeed = (b & 240) >> 4;
			winAttr.effectDirection = (b & 12) >> 2;
			winAttr.displayEffect = b & 3;
			return i;
		};
		/**
		* Gather text from all displayed windows and push a caption to output.
		*
		* @param  {Integer} i        Current index in the 708 packet
		* @param  {Service} service  The service object to be affected
		*/
		Cea708Stream.prototype.flushDisplayed = function(pts, service) {
			var displayedText = [];
			for (var winId = 0; winId < 8; winId++) if (service.windows[winId].visible && !service.windows[winId].isEmpty()) displayedText.push(service.windows[winId].getText());
			service.endPts = pts;
			service.text = displayedText.join("\\n\\n");
			this.pushCaption(service);
			service.startPts = pts;
		};
		/**
		* Push a caption to output if the caption contains text.
		*
		* @param  {Service} service  The service object to be affected
		*/
		Cea708Stream.prototype.pushCaption = function(service) {
			if (service.text !== "") {
				this.trigger("data", {
					startPts: service.startPts,
					endPts: service.endPts,
					text: service.text,
					stream: "cc708_" + service.serviceNum
				});
				service.text = "";
				service.startPts = service.endPts;
			}
		};
		/**
		* Parse and execute the DSW command.
		*
		* Set visible property of windows based on the parsed bitmask.
		*
		* @param  {Integer} i        Current index in the 708 packet
		* @param  {Service} service  The service object to be affected
		* @return {Integer}          New index after parsing
		*/
		Cea708Stream.prototype.displayWindows = function(i, service) {
			var b = this.current708Packet.data[++i];
			var pts = this.getPts(i);
			this.flushDisplayed(pts, service);
			for (var winId = 0; winId < 8; winId++) if (b & 1 << winId) service.windows[winId].visible = 1;
			return i;
		};
		/**
		* Parse and execute the HDW command.
		*
		* Set visible property of windows based on the parsed bitmask.
		*
		* @param  {Integer} i        Current index in the 708 packet
		* @param  {Service} service  The service object to be affected
		* @return {Integer}          New index after parsing
		*/
		Cea708Stream.prototype.hideWindows = function(i, service) {
			var b = this.current708Packet.data[++i];
			var pts = this.getPts(i);
			this.flushDisplayed(pts, service);
			for (var winId = 0; winId < 8; winId++) if (b & 1 << winId) service.windows[winId].visible = 0;
			return i;
		};
		/**
		* Parse and execute the TGW command.
		*
		* Set visible property of windows based on the parsed bitmask.
		*
		* @param  {Integer} i        Current index in the 708 packet
		* @param  {Service} service  The service object to be affected
		* @return {Integer}          New index after parsing
		*/
		Cea708Stream.prototype.toggleWindows = function(i, service) {
			var b = this.current708Packet.data[++i];
			var pts = this.getPts(i);
			this.flushDisplayed(pts, service);
			for (var winId = 0; winId < 8; winId++) if (b & 1 << winId) service.windows[winId].visible ^= 1;
			return i;
		};
		/**
		* Parse and execute the CLW command.
		*
		* Clear text of windows based on the parsed bitmask.
		*
		* @param  {Integer} i        Current index in the 708 packet
		* @param  {Service} service  The service object to be affected
		* @return {Integer}          New index after parsing
		*/
		Cea708Stream.prototype.clearWindows = function(i, service) {
			var b = this.current708Packet.data[++i];
			var pts = this.getPts(i);
			this.flushDisplayed(pts, service);
			for (var winId = 0; winId < 8; winId++) if (b & 1 << winId) service.windows[winId].clearText();
			return i;
		};
		/**
		* Parse and execute the DLW command.
		*
		* Re-initialize windows based on the parsed bitmask.
		*
		* @param  {Integer} i        Current index in the 708 packet
		* @param  {Service} service  The service object to be affected
		* @return {Integer}          New index after parsing
		*/
		Cea708Stream.prototype.deleteWindows = function(i, service) {
			var b = this.current708Packet.data[++i];
			var pts = this.getPts(i);
			this.flushDisplayed(pts, service);
			for (var winId = 0; winId < 8; winId++) if (b & 1 << winId) service.windows[winId].reset();
			return i;
		};
		/**
		* Parse and execute the SPA command.
		*
		* Set pen attributes of the current window.
		*
		* @param  {Integer} i        Current index in the 708 packet
		* @param  {Service} service  The service object to be affected
		* @return {Integer}          New index after parsing
		*/
		Cea708Stream.prototype.setPenAttributes = function(i, service) {
			var packetData = this.current708Packet.data;
			var b = packetData[i];
			var penAttr = service.currentWindow.penAttr;
			b = packetData[++i];
			penAttr.textTag = (b & 240) >> 4;
			penAttr.offset = (b & 12) >> 2;
			penAttr.penSize = b & 3;
			b = packetData[++i];
			penAttr.italics = (b & 128) >> 7;
			penAttr.underline = (b & 64) >> 6;
			penAttr.edgeType = (b & 56) >> 3;
			penAttr.fontStyle = b & 7;
			return i;
		};
		/**
		* Parse and execute the SPC command.
		*
		* Set pen color of the current window.
		*
		* @param  {Integer} i        Current index in the 708 packet
		* @param  {Service} service  The service object to be affected
		* @return {Integer}          New index after parsing
		*/
		Cea708Stream.prototype.setPenColor = function(i, service) {
			var packetData = this.current708Packet.data;
			var b = packetData[i];
			var penColor = service.currentWindow.penColor;
			b = packetData[++i];
			penColor.fgOpacity = (b & 192) >> 6;
			penColor.fgRed = (b & 48) >> 4;
			penColor.fgGreen = (b & 12) >> 2;
			penColor.fgBlue = b & 3;
			b = packetData[++i];
			penColor.bgOpacity = (b & 192) >> 6;
			penColor.bgRed = (b & 48) >> 4;
			penColor.bgGreen = (b & 12) >> 2;
			penColor.bgBlue = b & 3;
			b = packetData[++i];
			penColor.edgeRed = (b & 48) >> 4;
			penColor.edgeGreen = (b & 12) >> 2;
			penColor.edgeBlue = b & 3;
			return i;
		};
		/**
		* Parse and execute the SPL command.
		*
		* Set pen location of the current window.
		*
		* @param  {Integer} i        Current index in the 708 packet
		* @param  {Service} service  The service object to be affected
		* @return {Integer}          New index after parsing
		*/
		Cea708Stream.prototype.setPenLocation = function(i, service) {
			var packetData = this.current708Packet.data;
			var b = packetData[i];
			var penLoc = service.currentWindow.penLoc;
			service.currentWindow.pendingNewLine = true;
			b = packetData[++i];
			penLoc.row = b & 15;
			b = packetData[++i];
			penLoc.column = b & 63;
			return i;
		};
		/**
		* Execute the RST command.
		*
		* Reset service to a clean slate. Re-initialize.
		*
		* @param  {Integer} i        Current index in the 708 packet
		* @param  {Service} service  The service object to be affected
		* @return {Service}          Re-initialized service
		*/
		Cea708Stream.prototype.reset = function(i, service) {
			var pts = this.getPts(i);
			this.flushDisplayed(pts, service);
			return this.initService(service.serviceNum, i);
		};
		var CHARACTER_TRANSLATION = {
			42: 225,
			92: 233,
			94: 237,
			95: 243,
			96: 250,
			123: 231,
			124: 247,
			125: 209,
			126: 241,
			127: 9608,
			304: 174,
			305: 176,
			306: 189,
			307: 191,
			308: 8482,
			309: 162,
			310: 163,
			311: 9834,
			312: 224,
			313: 160,
			314: 232,
			315: 226,
			316: 234,
			317: 238,
			318: 244,
			319: 251,
			544: 193,
			545: 201,
			546: 211,
			547: 218,
			548: 220,
			549: 252,
			550: 8216,
			551: 161,
			552: 42,
			553: 39,
			554: 8212,
			555: 169,
			556: 8480,
			557: 8226,
			558: 8220,
			559: 8221,
			560: 192,
			561: 194,
			562: 199,
			563: 200,
			564: 202,
			565: 203,
			566: 235,
			567: 206,
			568: 207,
			569: 239,
			570: 212,
			571: 217,
			572: 249,
			573: 219,
			574: 171,
			575: 187,
			800: 195,
			801: 227,
			802: 205,
			803: 204,
			804: 236,
			805: 210,
			806: 242,
			807: 213,
			808: 245,
			809: 123,
			810: 125,
			811: 92,
			812: 94,
			813: 95,
			814: 124,
			815: 126,
			816: 196,
			817: 228,
			818: 214,
			819: 246,
			820: 223,
			821: 165,
			822: 164,
			823: 9474,
			824: 197,
			825: 229,
			826: 216,
			827: 248,
			828: 9484,
			829: 9488,
			830: 9492,
			831: 9496
		};
		var getCharFromCode = function getCharFromCode(code) {
			if (code === null) return "";
			code = CHARACTER_TRANSLATION[code] || code;
			return String.fromCharCode(code);
		};
		var BOTTOM_ROW = 14;
		var ROWS = [
			4352,
			4384,
			4608,
			4640,
			5376,
			5408,
			5632,
			5664,
			5888,
			5920,
			4096,
			4864,
			4896,
			5120,
			5152
		];
		var createDisplayBuffer = function createDisplayBuffer() {
			var result = [], i = BOTTOM_ROW + 1;
			while (i--) result.push("");
			return result;
		};
		var Cea608Stream = function Cea608Stream(field, dataChannel) {
			Cea608Stream.prototype.init.call(this);
			this.field_ = field || 0;
			this.dataChannel_ = dataChannel || 0;
			this.name_ = "CC" + ((this.field_ << 1 | this.dataChannel_) + 1);
			this.setConstants();
			this.reset();
			this.push = function(packet) {
				var data = packet.ccData & 32639, swap, char0, char1, text;
				if (data === this.lastControlCode_) {
					this.lastControlCode_ = null;
					return;
				}
				if ((data & 61440) === 4096) this.lastControlCode_ = data;
				else if (data !== this.PADDING_) this.lastControlCode_ = null;
				char0 = data >>> 8;
				char1 = data & 255;
				if (data === this.PADDING_) return;
				else if (data === this.RESUME_CAPTION_LOADING_) this.mode_ = "popOn";
				else if (data === this.END_OF_CAPTION_) {
					this.mode_ = "popOn";
					this.clearFormatting(packet.pts);
					this.flushDisplayed(packet.pts);
					swap = this.displayed_;
					this.displayed_ = this.nonDisplayed_;
					this.nonDisplayed_ = swap;
					this.startPts_ = packet.pts;
				} else if (data === this.ROLL_UP_2_ROWS_) {
					this.rollUpRows_ = 2;
					this.setRollUp(packet.pts);
				} else if (data === this.ROLL_UP_3_ROWS_) {
					this.rollUpRows_ = 3;
					this.setRollUp(packet.pts);
				} else if (data === this.ROLL_UP_4_ROWS_) {
					this.rollUpRows_ = 4;
					this.setRollUp(packet.pts);
				} else if (data === this.CARRIAGE_RETURN_) {
					this.clearFormatting(packet.pts);
					this.flushDisplayed(packet.pts);
					this.shiftRowsUp_();
					this.startPts_ = packet.pts;
				} else if (data === this.BACKSPACE_) if (this.mode_ === "popOn") this.nonDisplayed_[this.row_] = this.nonDisplayed_[this.row_].slice(0, -1);
				else this.displayed_[this.row_] = this.displayed_[this.row_].slice(0, -1);
				else if (data === this.ERASE_DISPLAYED_MEMORY_) {
					this.flushDisplayed(packet.pts);
					this.displayed_ = createDisplayBuffer();
				} else if (data === this.ERASE_NON_DISPLAYED_MEMORY_) this.nonDisplayed_ = createDisplayBuffer();
				else if (data === this.RESUME_DIRECT_CAPTIONING_) {
					if (this.mode_ !== "paintOn") {
						this.flushDisplayed(packet.pts);
						this.displayed_ = createDisplayBuffer();
					}
					this.mode_ = "paintOn";
					this.startPts_ = packet.pts;
				} else if (this.isSpecialCharacter(char0, char1)) {
					char0 = (char0 & 3) << 8;
					text = getCharFromCode(char0 | char1);
					this[this.mode_](packet.pts, text);
					this.column_++;
				} else if (this.isExtCharacter(char0, char1)) {
					if (this.mode_ === "popOn") this.nonDisplayed_[this.row_] = this.nonDisplayed_[this.row_].slice(0, -1);
					else this.displayed_[this.row_] = this.displayed_[this.row_].slice(0, -1);
					char0 = (char0 & 3) << 8;
					text = getCharFromCode(char0 | char1);
					this[this.mode_](packet.pts, text);
					this.column_++;
				} else if (this.isMidRowCode(char0, char1)) {
					this.clearFormatting(packet.pts);
					this[this.mode_](packet.pts, " ");
					this.column_++;
					if ((char1 & 14) === 14) this.addFormatting(packet.pts, ["i"]);
					if ((char1 & 1) === 1) this.addFormatting(packet.pts, ["u"]);
				} else if (this.isOffsetControlCode(char0, char1)) this.column_ += char1 & 3;
				else if (this.isPAC(char0, char1)) {
					var row = ROWS.indexOf(data & 7968);
					if (this.mode_ === "rollUp") {
						if (row - this.rollUpRows_ + 1 < 0) row = this.rollUpRows_ - 1;
						this.setRollUp(packet.pts, row);
					}
					if (row !== this.row_) {
						this.clearFormatting(packet.pts);
						this.row_ = row;
					}
					if (char1 & 1 && this.formatting_.indexOf("u") === -1) this.addFormatting(packet.pts, ["u"]);
					if ((data & 16) === 16) this.column_ = ((data & 14) >> 1) * 4;
					if (this.isColorPAC(char1)) {
						if ((char1 & 14) === 14) this.addFormatting(packet.pts, ["i"]);
					}
				} else if (this.isNormalChar(char0)) {
					if (char1 === 0) char1 = null;
					text = getCharFromCode(char0);
					text += getCharFromCode(char1);
					this[this.mode_](packet.pts, text);
					this.column_ += text.length;
				}
			};
		};
		Cea608Stream.prototype = new Stream();
		Cea608Stream.prototype.flushDisplayed = function(pts) {
			var content = this.displayed_.map(function(row, index) {
				try {
					return row.trim();
				} catch (e) {
					this.trigger("log", {
						level: "warn",
						message: "Skipping a malformed 608 caption at index " + index + "."
					});
					return "";
				}
			}, this).join("\\n").replace(/^\\n+|\\n+$/g, "");
			if (content.length) this.trigger("data", {
				startPts: this.startPts_,
				endPts: pts,
				text: content,
				stream: this.name_
			});
		};
		/**
		* Zero out the data, used for startup and on seek
		*/
		Cea608Stream.prototype.reset = function() {
			this.mode_ = "popOn";
			this.topRow_ = 0;
			this.startPts_ = 0;
			this.displayed_ = createDisplayBuffer();
			this.nonDisplayed_ = createDisplayBuffer();
			this.lastControlCode_ = null;
			this.column_ = 0;
			this.row_ = BOTTOM_ROW;
			this.rollUpRows_ = 2;
			this.formatting_ = [];
		};
		/**
		* Sets up control code and related constants for this instance
		*/
		Cea608Stream.prototype.setConstants = function() {
			if (this.dataChannel_ === 0) {
				this.BASE_ = 16;
				this.EXT_ = 17;
				this.CONTROL_ = (20 | this.field_) << 8;
				this.OFFSET_ = 23;
			} else if (this.dataChannel_ === 1) {
				this.BASE_ = 24;
				this.EXT_ = 25;
				this.CONTROL_ = (28 | this.field_) << 8;
				this.OFFSET_ = 31;
			}
			this.PADDING_ = 0;
			this.RESUME_CAPTION_LOADING_ = this.CONTROL_ | 32;
			this.END_OF_CAPTION_ = this.CONTROL_ | 47;
			this.ROLL_UP_2_ROWS_ = this.CONTROL_ | 37;
			this.ROLL_UP_3_ROWS_ = this.CONTROL_ | 38;
			this.ROLL_UP_4_ROWS_ = this.CONTROL_ | 39;
			this.CARRIAGE_RETURN_ = this.CONTROL_ | 45;
			this.RESUME_DIRECT_CAPTIONING_ = this.CONTROL_ | 41;
			this.BACKSPACE_ = this.CONTROL_ | 33;
			this.ERASE_DISPLAYED_MEMORY_ = this.CONTROL_ | 44;
			this.ERASE_NON_DISPLAYED_MEMORY_ = this.CONTROL_ | 46;
		};
		/**
		* Detects if the 2-byte packet data is a special character
		*
		* Special characters have a second byte in the range 0x30 to 0x3f,
		* with the first byte being 0x11 (for data channel 1) or 0x19 (for
		* data channel 2).
		*
		* @param  {Integer} char0 The first byte
		* @param  {Integer} char1 The second byte
		* @return {Boolean}       Whether the 2 bytes are an special character
		*/
		Cea608Stream.prototype.isSpecialCharacter = function(char0, char1) {
			return char0 === this.EXT_ && char1 >= 48 && char1 <= 63;
		};
		/**
		* Detects if the 2-byte packet data is an extended character
		*
		* Extended characters have a second byte in the range 0x20 to 0x3f,
		* with the first byte being 0x12 or 0x13 (for data channel 1) or
		* 0x1a or 0x1b (for data channel 2).
		*
		* @param  {Integer} char0 The first byte
		* @param  {Integer} char1 The second byte
		* @return {Boolean}       Whether the 2 bytes are an extended character
		*/
		Cea608Stream.prototype.isExtCharacter = function(char0, char1) {
			return (char0 === this.EXT_ + 1 || char0 === this.EXT_ + 2) && char1 >= 32 && char1 <= 63;
		};
		/**
		* Detects if the 2-byte packet is a mid-row code
		*
		* Mid-row codes have a second byte in the range 0x20 to 0x2f, with
		* the first byte being 0x11 (for data channel 1) or 0x19 (for data
		* channel 2).
		*
		* @param  {Integer} char0 The first byte
		* @param  {Integer} char1 The second byte
		* @return {Boolean}       Whether the 2 bytes are a mid-row code
		*/
		Cea608Stream.prototype.isMidRowCode = function(char0, char1) {
			return char0 === this.EXT_ && char1 >= 32 && char1 <= 47;
		};
		/**
		* Detects if the 2-byte packet is an offset control code
		*
		* Offset control codes have a second byte in the range 0x21 to 0x23,
		* with the first byte being 0x17 (for data channel 1) or 0x1f (for
		* data channel 2).
		*
		* @param  {Integer} char0 The first byte
		* @param  {Integer} char1 The second byte
		* @return {Boolean}       Whether the 2 bytes are an offset control code
		*/
		Cea608Stream.prototype.isOffsetControlCode = function(char0, char1) {
			return char0 === this.OFFSET_ && char1 >= 33 && char1 <= 35;
		};
		/**
		* Detects if the 2-byte packet is a Preamble Address Code
		*
		* PACs have a first byte in the range 0x10 to 0x17 (for data channel 1)
		* or 0x18 to 0x1f (for data channel 2), with the second byte in the
		* range 0x40 to 0x7f.
		*
		* @param  {Integer} char0 The first byte
		* @param  {Integer} char1 The second byte
		* @return {Boolean}       Whether the 2 bytes are a PAC
		*/
		Cea608Stream.prototype.isPAC = function(char0, char1) {
			return char0 >= this.BASE_ && char0 < this.BASE_ + 8 && char1 >= 64 && char1 <= 127;
		};
		/**
		* Detects if a packet's second byte is in the range of a PAC color code
		*
		* PAC color codes have the second byte be in the range 0x40 to 0x4f, or
		* 0x60 to 0x6f.
		*
		* @param  {Integer} char1 The second byte
		* @return {Boolean}       Whether the byte is a color PAC
		*/
		Cea608Stream.prototype.isColorPAC = function(char1) {
			return char1 >= 64 && char1 <= 79 || char1 >= 96 && char1 <= 127;
		};
		/**
		* Detects if a single byte is in the range of a normal character
		*
		* Normal text bytes are in the range 0x20 to 0x7f.
		*
		* @param  {Integer} char  The byte
		* @return {Boolean}       Whether the byte is a normal character
		*/
		Cea608Stream.prototype.isNormalChar = function(char) {
			return char >= 32 && char <= 127;
		};
		/**
		* Configures roll-up
		*
		* @param  {Integer} pts         Current PTS
		* @param  {Integer} newBaseRow  Used by PACs to slide the current window to
		*                               a new position
		*/
		Cea608Stream.prototype.setRollUp = function(pts, newBaseRow) {
			if (this.mode_ !== "rollUp") {
				this.row_ = BOTTOM_ROW;
				this.mode_ = "rollUp";
				this.flushDisplayed(pts);
				this.nonDisplayed_ = createDisplayBuffer();
				this.displayed_ = createDisplayBuffer();
			}
			if (newBaseRow !== void 0 && newBaseRow !== this.row_) for (var i = 0; i < this.rollUpRows_; i++) {
				this.displayed_[newBaseRow - i] = this.displayed_[this.row_ - i];
				this.displayed_[this.row_ - i] = "";
			}
			if (newBaseRow === void 0) newBaseRow = this.row_;
			this.topRow_ = newBaseRow - this.rollUpRows_ + 1;
		};
		Cea608Stream.prototype.addFormatting = function(pts, format) {
			this.formatting_ = this.formatting_.concat(format);
			var text = format.reduce(function(text, format) {
				return text + "<" + format + ">";
			}, "");
			this[this.mode_](pts, text);
		};
		Cea608Stream.prototype.clearFormatting = function(pts) {
			if (!this.formatting_.length) return;
			var text = this.formatting_.reverse().reduce(function(text, format) {
				return text + "</" + format + ">";
			}, "");
			this.formatting_ = [];
			this[this.mode_](pts, text);
		};
		Cea608Stream.prototype.popOn = function(pts, text) {
			var baseRow = this.nonDisplayed_[this.row_];
			baseRow += text;
			this.nonDisplayed_[this.row_] = baseRow;
		};
		Cea608Stream.prototype.rollUp = function(pts, text) {
			var baseRow = this.displayed_[this.row_];
			baseRow += text;
			this.displayed_[this.row_] = baseRow;
		};
		Cea608Stream.prototype.shiftRowsUp_ = function() {
			var i;
			for (i = 0; i < this.topRow_; i++) this.displayed_[i] = "";
			for (i = this.row_ + 1; i < BOTTOM_ROW + 1; i++) this.displayed_[i] = "";
			for (i = this.topRow_; i < this.row_; i++) this.displayed_[i] = this.displayed_[i + 1];
			this.displayed_[this.row_] = "";
		};
		Cea608Stream.prototype.paintOn = function(pts, text) {
			var baseRow = this.displayed_[this.row_];
			baseRow += text;
			this.displayed_[this.row_] = baseRow;
		};
		module.exports = {
			CaptionStream,
			Cea608Stream,
			Cea708Stream
		};
	}));
	//#endregion
	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/m2ts/stream-types.js
	/**
	* mux.js
	*
	* Copyright (c) Brightcove
	* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE
	*/
	var require_stream_types = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = {
			H264_STREAM_TYPE: 27,
			ADTS_STREAM_TYPE: 15,
			METADATA_STREAM_TYPE: 21
		};
	}));
	//#endregion
	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/m2ts/timestamp-rollover-stream.js
	/**
	* mux.js
	*
	* Copyright (c) Brightcove
	* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE
	*
	* Accepts program elementary stream (PES) data events and corrects
	* decode and presentation time stamps to account for a rollover
	* of the 33 bit value.
	*/
	var require_timestamp_rollover_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var Stream = require_stream();
		var MAX_TS = 8589934592;
		var RO_THRESH = 4294967296;
		var TYPE_SHARED = "shared";
		var handleRollover = function handleRollover(value, reference) {
			var direction = 1;
			if (value > reference) direction = -1;
			while (Math.abs(reference - value) > RO_THRESH) value += direction * MAX_TS;
			return value;
		};
		var TimestampRolloverStream = function TimestampRolloverStream(type) {
			var lastDTS, referenceDTS;
			TimestampRolloverStream.prototype.init.call(this);
			this.type_ = type || TYPE_SHARED;
			this.push = function(data) {
				if (this.type_ !== TYPE_SHARED && data.type !== this.type_) return;
				if (referenceDTS === void 0) referenceDTS = data.dts;
				data.dts = handleRollover(data.dts, referenceDTS);
				data.pts = handleRollover(data.pts, referenceDTS);
				lastDTS = data.dts;
				this.trigger("data", data);
			};
			this.flush = function() {
				referenceDTS = lastDTS;
				this.trigger("done");
			};
			this.endTimeline = function() {
				this.flush();
				this.trigger("endedtimeline");
			};
			this.discontinuity = function() {
				referenceDTS = void 0;
				lastDTS = void 0;
			};
			this.reset = function() {
				this.discontinuity();
				this.trigger("reset");
			};
		};
		TimestampRolloverStream.prototype = new Stream();
		module.exports = {
			TimestampRolloverStream,
			handleRollover
		};
	}));
	//#endregion
	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/utils/typed-array.js
	var require_typed_array = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = { typedArrayIndexOf: function typedArrayIndexOf(typedArray, element, fromIndex) {
			if (!typedArray) return -1;
			var currentIndex = fromIndex;
			for (; currentIndex < typedArray.length; currentIndex++) if (typedArray[currentIndex] === element) return currentIndex;
			return -1;
		} };
	}));
	//#endregion
	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/tools/parse-id3.js
	/**
	* mux.js
	*
	* Copyright (c) Brightcove
	* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE
	*
	* Tools for parsing ID3 frame data
	* @see http://id3.org/id3v2.3.0
	*/
	var require_parse_id3 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var typedArrayIndexOf = require_typed_array().typedArrayIndexOf;
		var textEncodingDescriptionByte = {
			Iso88591: 0,
			Utf16: 1,
			Utf16be: 2,
			Utf8: 3
		};
		var percentEncode = function percentEncode(bytes, start, end) {
			var i, result = "";
			for (i = start; i < end; i++) result += "%" + ("00" + bytes[i].toString(16)).slice(-2);
			return result;
		};
		var parseUtf8 = function parseUtf8(bytes, start, end) {
			return decodeURIComponent(percentEncode(bytes, start, end));
		};
		var parseIso88591 = function parseIso88591(bytes, start, end) {
			return unescape(percentEncode(bytes, start, end));
		};
		var parseSyncSafeInteger = function parseSyncSafeInteger(data) {
			return data[0] << 21 | data[1] << 14 | data[2] << 7 | data[3];
		};
		var frameParsers = {
			"APIC": function APIC(frame) {
				var i = 1, mimeTypeEndIndex, descriptionEndIndex, LINK_MIME_TYPE = "-->";
				if (frame.data[0] !== textEncodingDescriptionByte.Utf8) return;
				mimeTypeEndIndex = typedArrayIndexOf(frame.data, 0, i);
				if (mimeTypeEndIndex < 0) return;
				frame.mimeType = parseIso88591(frame.data, i, mimeTypeEndIndex);
				i = mimeTypeEndIndex + 1;
				frame.pictureType = frame.data[i];
				i++;
				descriptionEndIndex = typedArrayIndexOf(frame.data, 0, i);
				if (descriptionEndIndex < 0) return;
				frame.description = parseUtf8(frame.data, i, descriptionEndIndex);
				i = descriptionEndIndex + 1;
				if (frame.mimeType === LINK_MIME_TYPE) frame.url = parseIso88591(frame.data, i, frame.data.length);
				else frame.pictureData = frame.data.subarray(i, frame.data.length);
			},
			"T*": function T(frame) {
				if (frame.data[0] !== textEncodingDescriptionByte.Utf8) return;
				frame.value = parseUtf8(frame.data, 1, frame.data.length).replace(/\\0*$/, "");
				frame.values = frame.value.split("\\0");
			},
			"TXXX": function TXXX(frame) {
				var descriptionEndIndex;
				if (frame.data[0] !== textEncodingDescriptionByte.Utf8) return;
				descriptionEndIndex = typedArrayIndexOf(frame.data, 0, 1);
				if (descriptionEndIndex === -1) return;
				frame.description = parseUtf8(frame.data, 1, descriptionEndIndex);
				frame.value = parseUtf8(frame.data, descriptionEndIndex + 1, frame.data.length).replace(/\\0*$/, "");
				frame.data = frame.value;
			},
			"W*": function W(frame) {
				frame.url = parseIso88591(frame.data, 0, frame.data.length).replace(/\\0.*$/, "");
			},
			"WXXX": function WXXX(frame) {
				var descriptionEndIndex;
				if (frame.data[0] !== textEncodingDescriptionByte.Utf8) return;
				descriptionEndIndex = typedArrayIndexOf(frame.data, 0, 1);
				if (descriptionEndIndex === -1) return;
				frame.description = parseUtf8(frame.data, 1, descriptionEndIndex);
				frame.url = parseIso88591(frame.data, descriptionEndIndex + 1, frame.data.length).replace(/\\0.*$/, "");
			},
			"PRIV": function PRIV(frame) {
				var i;
				for (i = 0; i < frame.data.length; i++) if (frame.data[i] === 0) {
					frame.owner = parseIso88591(frame.data, 0, i);
					break;
				}
				frame.privateData = frame.data.subarray(i + 1);
				frame.data = frame.privateData;
			}
		};
		module.exports = {
			parseId3Frames: function parseId3Frames(data) {
				var frameSize, frameHeader, frameStart = 10, tagSize = 0, frames = [];
				if (data.length < 10 || data[0] !== "I".charCodeAt(0) || data[1] !== "D".charCodeAt(0) || data[2] !== "3".charCodeAt(0)) return;
				tagSize = parseSyncSafeInteger(data.subarray(6, 10));
				tagSize += 10;
				if (data[5] & 64) {
					frameStart += 4;
					frameStart += parseSyncSafeInteger(data.subarray(10, 14));
					tagSize -= parseSyncSafeInteger(data.subarray(16, 20));
				}
				do {
					frameSize = parseSyncSafeInteger(data.subarray(frameStart + 4, frameStart + 8));
					if (frameSize < 1) break;
					frameHeader = String.fromCharCode(data[frameStart], data[frameStart + 1], data[frameStart + 2], data[frameStart + 3]);
					var frame = {
						id: frameHeader,
						data: data.subarray(frameStart + 10, frameStart + frameSize + 10)
					};
					frame.key = frame.id;
					if (frameParsers[frame.id]) frameParsers[frame.id](frame);
					else if (frame.id[0] === "T") frameParsers["T*"](frame);
					else if (frame.id[0] === "W") frameParsers["W*"](frame);
					frames.push(frame);
					frameStart += 10;
					frameStart += frameSize;
				} while (frameStart < tagSize);
				return frames;
			},
			parseSyncSafeInteger,
			frameParsers
		};
	}));
	//#endregion
	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/m2ts/metadata-stream.js
	/**
	* mux.js
	*
	* Copyright (c) Brightcove
	* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE
	*
	* Accepts program elementary stream (PES) data events and parses out
	* ID3 metadata from them, if present.
	* @see http://id3.org/id3v2.3.0
	*/
	var require_metadata_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var Stream = require_stream();
		var StreamTypes = require_stream_types();
		var id3 = require_parse_id3();
		var _MetadataStream = function MetadataStream(options) {
			var settings = { descriptor: options && options.descriptor }, tagSize = 0, buffer = [], bufferSize = 0, i;
			_MetadataStream.prototype.init.call(this);
			this.dispatchType = StreamTypes.METADATA_STREAM_TYPE.toString(16);
			if (settings.descriptor) for (i = 0; i < settings.descriptor.length; i++) this.dispatchType += ("00" + settings.descriptor[i].toString(16)).slice(-2);
			this.push = function(chunk) {
				var tag, frameStart, frameSize, frame, i, frameHeader;
				if (chunk.type !== "timed-metadata") return;
				if (chunk.dataAlignmentIndicator) {
					bufferSize = 0;
					buffer.length = 0;
				}
				if (buffer.length === 0 && (chunk.data.length < 10 || chunk.data[0] !== "I".charCodeAt(0) || chunk.data[1] !== "D".charCodeAt(0) || chunk.data[2] !== "3".charCodeAt(0))) {
					this.trigger("log", {
						level: "warn",
						message: "Skipping unrecognized metadata packet"
					});
					return;
				}
				buffer.push(chunk);
				bufferSize += chunk.data.byteLength;
				if (buffer.length === 1) {
					tagSize = id3.parseSyncSafeInteger(chunk.data.subarray(6, 10));
					tagSize += 10;
				}
				if (bufferSize < tagSize) return;
				tag = {
					data: new Uint8Array(tagSize),
					frames: [],
					pts: buffer[0].pts,
					dts: buffer[0].dts
				};
				for (i = 0; i < tagSize;) {
					tag.data.set(buffer[0].data.subarray(0, tagSize - i), i);
					i += buffer[0].data.byteLength;
					bufferSize -= buffer[0].data.byteLength;
					buffer.shift();
				}
				frameStart = 10;
				if (tag.data[5] & 64) {
					frameStart += 4;
					frameStart += id3.parseSyncSafeInteger(tag.data.subarray(10, 14));
					tagSize -= id3.parseSyncSafeInteger(tag.data.subarray(16, 20));
				}
				do {
					frameSize = id3.parseSyncSafeInteger(tag.data.subarray(frameStart + 4, frameStart + 8));
					if (frameSize < 1) {
						this.trigger("log", {
							level: "warn",
							message: "Malformed ID3 frame encountered. Skipping remaining metadata parsing."
						});
						break;
					}
					frameHeader = String.fromCharCode(tag.data[frameStart], tag.data[frameStart + 1], tag.data[frameStart + 2], tag.data[frameStart + 3]);
					frame = {
						id: frameHeader,
						data: tag.data.subarray(frameStart + 10, frameStart + frameSize + 10)
					};
					frame.key = frame.id;
					if (id3.frameParsers[frame.id]) id3.frameParsers[frame.id](frame);
					else if (frame.id[0] === "T") id3.frameParsers["T*"](frame);
					else if (frame.id[0] === "W") id3.frameParsers["W*"](frame);
					if (frame.owner === "com.apple.streaming.transportStreamTimestamp") {
						var d = frame.data, size = (d[3] & 1) << 30 | d[4] << 22 | d[5] << 14 | d[6] << 6 | d[7] >>> 2;
						size *= 4;
						size += d[7] & 3;
						frame.timeStamp = size;
						if (tag.pts === void 0 && tag.dts === void 0) {
							tag.pts = frame.timeStamp;
							tag.dts = frame.timeStamp;
						}
						this.trigger("timestamp", frame);
					}
					tag.frames.push(frame);
					frameStart += 10;
					frameStart += frameSize;
				} while (frameStart < tagSize);
				this.trigger("data", tag);
			};
		};
		_MetadataStream.prototype = new Stream();
		module.exports = _MetadataStream;
	}));
	//#endregion
	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/m2ts/m2ts.js
	/**
	* mux.js
	*
	* Copyright (c) Brightcove
	* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE
	*
	* A stream-based mp2t to mp4 converter. This utility can be used to
	* deliver mp4s to a SourceBuffer on platforms that support native
	* Media Source Extensions.
	*/
	var require_m2ts = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var Stream = require_stream();
		var CaptionStream = require_caption_stream();
		var StreamTypes = require_stream_types();
		var TimestampRolloverStream = require_timestamp_rollover_stream().TimestampRolloverStream;
		var _TransportPacketStream;
		var _TransportParseStream;
		var _ElementaryStream;
		var MP2T_PACKET_LENGTH = 188;
		var SYNC_BYTE = 71;
		/**
		* Splits an incoming stream of binary data into MPEG-2 Transport
		* Stream packets.
		*/
		_TransportPacketStream = function TransportPacketStream() {
			var buffer = new Uint8Array(MP2T_PACKET_LENGTH), bytesInBuffer = 0;
			_TransportPacketStream.prototype.init.call(this);
			/**
			* Split a stream of data into M2TS packets
			**/
			this.push = function(bytes) {
				var startIndex = 0, endIndex = MP2T_PACKET_LENGTH, everything;
				if (bytesInBuffer) {
					everything = new Uint8Array(bytes.byteLength + bytesInBuffer);
					everything.set(buffer.subarray(0, bytesInBuffer));
					everything.set(bytes, bytesInBuffer);
					bytesInBuffer = 0;
				} else everything = bytes;
				while (endIndex < everything.byteLength) {
					if (everything[startIndex] === SYNC_BYTE && everything[endIndex] === SYNC_BYTE) {
						this.trigger("data", everything.subarray(startIndex, endIndex));
						startIndex += MP2T_PACKET_LENGTH;
						endIndex += MP2T_PACKET_LENGTH;
						continue;
					}
					startIndex++;
					endIndex++;
				}
				if (startIndex < everything.byteLength) {
					buffer.set(everything.subarray(startIndex), 0);
					bytesInBuffer = everything.byteLength - startIndex;
				}
			};
			/**
			* Passes identified M2TS packets to the TransportParseStream to be parsed
			**/
			this.flush = function() {
				if (bytesInBuffer === MP2T_PACKET_LENGTH && buffer[0] === SYNC_BYTE) {
					this.trigger("data", buffer);
					bytesInBuffer = 0;
				}
				this.trigger("done");
			};
			this.endTimeline = function() {
				this.flush();
				this.trigger("endedtimeline");
			};
			this.reset = function() {
				bytesInBuffer = 0;
				this.trigger("reset");
			};
		};
		_TransportPacketStream.prototype = new Stream();
		/**
		* Accepts an MP2T TransportPacketStream and emits data events with parsed
		* forms of the individual transport stream packets.
		*/
		_TransportParseStream = function TransportParseStream() {
			var parsePsi, parsePat, parsePmt, self;
			_TransportParseStream.prototype.init.call(this);
			self = this;
			this.packetsWaitingForPmt = [];
			this.programMapTable = void 0;
			parsePsi = function parsePsi(payload, psi) {
				var offset = 0;
				if (psi.payloadUnitStartIndicator) offset += payload[offset] + 1;
				if (psi.type === "pat") parsePat(payload.subarray(offset), psi);
				else parsePmt(payload.subarray(offset), psi);
			};
			parsePat = function parsePat(payload, pat) {
				pat.section_number = payload[7];
				pat.last_section_number = payload[8];
				self.pmtPid = (payload[10] & 31) << 8 | payload[11];
				pat.pmtPid = self.pmtPid;
			};
			/**
			* Parse out the relevant fields of a Program Map Table (PMT).
			* @param payload {Uint8Array} the PMT-specific portion of an MP2T
			* packet. The first byte in this array should be the table_id
			* field.
			* @param pmt {object} the object that should be decorated with
			* fields parsed from the PMT.
			*/
			parsePmt = function parsePmt(payload, pmt) {
				var sectionLength, tableEnd, programInfoLength, offset;
				if (!(payload[5] & 1)) return;
				self.programMapTable = {
					video: null,
					audio: null,
					"timed-metadata": {}
				};
				sectionLength = (payload[1] & 15) << 8 | payload[2];
				tableEnd = 3 + sectionLength - 4;
				programInfoLength = (payload[10] & 15) << 8 | payload[11];
				offset = 12 + programInfoLength;
				while (offset < tableEnd) {
					var streamType = payload[offset];
					var pid = (payload[offset + 1] & 31) << 8 | payload[offset + 2];
					if (streamType === StreamTypes.H264_STREAM_TYPE && self.programMapTable.video === null) self.programMapTable.video = pid;
					else if (streamType === StreamTypes.ADTS_STREAM_TYPE && self.programMapTable.audio === null) self.programMapTable.audio = pid;
					else if (streamType === StreamTypes.METADATA_STREAM_TYPE) self.programMapTable["timed-metadata"][pid] = streamType;
					offset += ((payload[offset + 3] & 15) << 8 | payload[offset + 4]) + 5;
				}
				pmt.programMapTable = self.programMapTable;
			};
			/**
			* Deliver a new MP2T packet to the next stream in the pipeline.
			*/
			this.push = function(packet) {
				var result = {}, offset = 4;
				result.payloadUnitStartIndicator = !!(packet[1] & 64);
				result.pid = packet[1] & 31;
				result.pid <<= 8;
				result.pid |= packet[2];
				if ((packet[3] & 48) >>> 4 > 1) offset += packet[offset] + 1;
				if (result.pid === 0) {
					result.type = "pat";
					parsePsi(packet.subarray(offset), result);
					this.trigger("data", result);
				} else if (result.pid === this.pmtPid) {
					result.type = "pmt";
					parsePsi(packet.subarray(offset), result);
					this.trigger("data", result);
					while (this.packetsWaitingForPmt.length) this.processPes_.apply(this, this.packetsWaitingForPmt.shift());
				} else if (this.programMapTable === void 0) this.packetsWaitingForPmt.push([
					packet,
					offset,
					result
				]);
				else this.processPes_(packet, offset, result);
			};
			this.processPes_ = function(packet, offset, result) {
				if (result.pid === this.programMapTable.video) result.streamType = StreamTypes.H264_STREAM_TYPE;
				else if (result.pid === this.programMapTable.audio) result.streamType = StreamTypes.ADTS_STREAM_TYPE;
				else result.streamType = this.programMapTable["timed-metadata"][result.pid];
				result.type = "pes";
				result.data = packet.subarray(offset);
				this.trigger("data", result);
			};
		};
		_TransportParseStream.prototype = new Stream();
		_TransportParseStream.STREAM_TYPES = {
			h264: 27,
			adts: 15
		};
		/**
		* Reconsistutes program elementary stream (PES) packets from parsed
		* transport stream packets. That is, if you pipe an
		* mp2t.TransportParseStream into a mp2t.ElementaryStream, the output
		* events will be events which capture the bytes for individual PES
		* packets plus relevant metadata that has been extracted from the
		* container.
		*/
		_ElementaryStream = function ElementaryStream() {
			var self = this, segmentHadPmt = false, video = {
				data: [],
				size: 0
			}, audio = {
				data: [],
				size: 0
			}, timedMetadata = {
				data: [],
				size: 0
			}, programMapTable, parsePes = function parsePes(payload, pes) {
				var ptsDtsFlags;
				var startPrefix = payload[0] << 16 | payload[1] << 8 | payload[2];
				pes.data = /* @__PURE__ */ new Uint8Array();
				if (startPrefix !== 1) return;
				pes.packetLength = 6 + (payload[4] << 8 | payload[5]);
				pes.dataAlignmentIndicator = (payload[6] & 4) !== 0;
				ptsDtsFlags = payload[7];
				if (ptsDtsFlags & 192) {
					pes.pts = (payload[9] & 14) << 27 | (payload[10] & 255) << 20 | (payload[11] & 254) << 12 | (payload[12] & 255) << 5 | (payload[13] & 254) >>> 3;
					pes.pts *= 4;
					pes.pts += (payload[13] & 6) >>> 1;
					pes.dts = pes.pts;
					if (ptsDtsFlags & 64) {
						pes.dts = (payload[14] & 14) << 27 | (payload[15] & 255) << 20 | (payload[16] & 254) << 12 | (payload[17] & 255) << 5 | (payload[18] & 254) >>> 3;
						pes.dts *= 4;
						pes.dts += (payload[18] & 6) >>> 1;
					}
				}
				pes.data = payload.subarray(9 + payload[8]);
			}, flushStream = function flushStream(stream, type, forceFlush) {
				var packetData = new Uint8Array(stream.size), event = { type }, i = 0, offset = 0, packetFlushable = false, fragment;
				if (!stream.data.length || stream.size < 9) return;
				event.trackId = stream.data[0].pid;
				for (i = 0; i < stream.data.length; i++) {
					fragment = stream.data[i];
					packetData.set(fragment.data, offset);
					offset += fragment.data.byteLength;
				}
				parsePes(packetData, event);
				packetFlushable = type === "video" || event.packetLength <= stream.size;
				if (forceFlush || packetFlushable) {
					stream.size = 0;
					stream.data.length = 0;
				}
				if (packetFlushable) self.trigger("data", event);
			};
			_ElementaryStream.prototype.init.call(this);
			/**
			* Identifies M2TS packet types and parses PES packets using metadata
			* parsed from the PMT
			**/
			this.push = function(data) {
				({
					pat: function pat() {},
					pes: function pes() {
						var stream, streamType;
						switch (data.streamType) {
							case StreamTypes.H264_STREAM_TYPE:
								stream = video;
								streamType = "video";
								break;
							case StreamTypes.ADTS_STREAM_TYPE:
								stream = audio;
								streamType = "audio";
								break;
							case StreamTypes.METADATA_STREAM_TYPE:
								stream = timedMetadata;
								streamType = "timed-metadata";
								break;
							default: return;
						}
						if (data.payloadUnitStartIndicator) flushStream(stream, streamType, true);
						stream.data.push(data);
						stream.size += data.data.byteLength;
					},
					pmt: function pmt() {
						var event = {
							type: "metadata",
							tracks: []
						};
						programMapTable = data.programMapTable;
						if (programMapTable.video !== null) event.tracks.push({
							timelineStartInfo: { baseMediaDecodeTime: 0 },
							id: +programMapTable.video,
							codec: "avc",
							type: "video"
						});
						if (programMapTable.audio !== null) event.tracks.push({
							timelineStartInfo: { baseMediaDecodeTime: 0 },
							id: +programMapTable.audio,
							codec: "adts",
							type: "audio"
						});
						segmentHadPmt = true;
						self.trigger("data", event);
					}
				})[data.type]();
			};
			this.reset = function() {
				video.size = 0;
				video.data.length = 0;
				audio.size = 0;
				audio.data.length = 0;
				this.trigger("reset");
			};
			/**
			* Flush any remaining input. Video PES packets may be of variable
			* length. Normally, the start of a new video packet can trigger the
			* finalization of the previous packet. That is not possible if no
			* more video is forthcoming, however. In that case, some other
			* mechanism (like the end of the file) has to be employed. When it is
			* clear that no additional data is forthcoming, calling this method
			* will flush the buffered packets.
			*/
			this.flushStreams_ = function() {
				flushStream(video, "video");
				flushStream(audio, "audio");
				flushStream(timedMetadata, "timed-metadata");
			};
			this.flush = function() {
				if (!segmentHadPmt && programMapTable) {
					var pmt = {
						type: "metadata",
						tracks: []
					};
					if (programMapTable.video !== null) pmt.tracks.push({
						timelineStartInfo: { baseMediaDecodeTime: 0 },
						id: +programMapTable.video,
						codec: "avc",
						type: "video"
					});
					if (programMapTable.audio !== null) pmt.tracks.push({
						timelineStartInfo: { baseMediaDecodeTime: 0 },
						id: +programMapTable.audio,
						codec: "adts",
						type: "audio"
					});
					self.trigger("data", pmt);
				}
				segmentHadPmt = false;
				this.flushStreams_();
				this.trigger("done");
			};
		};
		_ElementaryStream.prototype = new Stream();
		var m2ts = {
			PAT_PID: 0,
			MP2T_PACKET_LENGTH,
			TransportPacketStream: _TransportPacketStream,
			TransportParseStream: _TransportParseStream,
			ElementaryStream: _ElementaryStream,
			TimestampRolloverStream,
			CaptionStream: CaptionStream.CaptionStream,
			Cea608Stream: CaptionStream.Cea608Stream,
			Cea708Stream: CaptionStream.Cea708Stream,
			MetadataStream: require_metadata_stream()
		};
		for (var type in StreamTypes) if (StreamTypes.hasOwnProperty(type)) m2ts[type] = StreamTypes[type];
		module.exports = m2ts;
	}));
	//#endregion
	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/codecs/adts.js
	/**
	* mux.js
	*
	* Copyright (c) Brightcove
	* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE
	*/
	var require_adts = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var Stream = require_stream();
		var ONE_SECOND_IN_TS = require_clock().ONE_SECOND_IN_TS;
		var _AdtsStream;
		var ADTS_SAMPLING_FREQUENCIES = [
			96e3,
			88200,
			64e3,
			48e3,
			44100,
			32e3,
			24e3,
			22050,
			16e3,
			12e3,
			11025,
			8e3,
			7350
		];
		_AdtsStream = function AdtsStream(handlePartialSegments) {
			var buffer, frameNum = 0;
			_AdtsStream.prototype.init.call(this);
			this.skipWarn_ = function(start, end) {
				this.trigger("log", {
					level: "warn",
					message: "adts skiping bytes " + start + " to " + end + " in frame " + frameNum + " outside syncword"
				});
			};
			this.push = function(packet) {
				var i = 0, frameLength, protectionSkipBytes, oldBuffer, sampleCount, adtsFrameDuration;
				if (!handlePartialSegments) frameNum = 0;
				if (packet.type !== "audio") return;
				if (buffer && buffer.length) {
					oldBuffer = buffer;
					buffer = new Uint8Array(oldBuffer.byteLength + packet.data.byteLength);
					buffer.set(oldBuffer);
					buffer.set(packet.data, oldBuffer.byteLength);
				} else buffer = packet.data;
				var skip;
				while (i + 7 < buffer.length) {
					if (buffer[i] !== 255 || (buffer[i + 1] & 246) !== 240) {
						if (typeof skip !== "number") skip = i;
						i++;
						continue;
					}
					if (typeof skip === "number") {
						this.skipWarn_(skip, i);
						skip = null;
					}
					protectionSkipBytes = (~buffer[i + 1] & 1) * 2;
					frameLength = (buffer[i + 3] & 3) << 11 | buffer[i + 4] << 3 | (buffer[i + 5] & 224) >> 5;
					sampleCount = ((buffer[i + 6] & 3) + 1) * 1024;
					adtsFrameDuration = sampleCount * ONE_SECOND_IN_TS / ADTS_SAMPLING_FREQUENCIES[(buffer[i + 2] & 60) >>> 2];
					if (buffer.byteLength - i < frameLength) break;
					this.trigger("data", {
						pts: packet.pts + frameNum * adtsFrameDuration,
						dts: packet.dts + frameNum * adtsFrameDuration,
						sampleCount,
						audioobjecttype: (buffer[i + 2] >>> 6 & 3) + 1,
						channelcount: (buffer[i + 2] & 1) << 2 | (buffer[i + 3] & 192) >>> 6,
						samplerate: ADTS_SAMPLING_FREQUENCIES[(buffer[i + 2] & 60) >>> 2],
						samplingfrequencyindex: (buffer[i + 2] & 60) >>> 2,
						samplesize: 16,
						data: buffer.subarray(i + 7 + protectionSkipBytes, i + frameLength)
					});
					frameNum++;
					i += frameLength;
				}
				if (typeof skip === "number") {
					this.skipWarn_(skip, i);
					skip = null;
				}
				buffer = buffer.subarray(i);
			};
			this.flush = function() {
				frameNum = 0;
				this.trigger("done");
			};
			this.reset = function() {
				buffer = void 0;
				this.trigger("reset");
			};
			this.endTimeline = function() {
				buffer = void 0;
				this.trigger("endedtimeline");
			};
		};
		_AdtsStream.prototype = new Stream();
		module.exports = _AdtsStream;
	}));
	//#endregion
	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/utils/exp-golomb.js
	/**
	* mux.js
	*
	* Copyright (c) Brightcove
	* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE
	*/
	var require_exp_golomb = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = function ExpGolomb(workingData) {
			var workingBytesAvailable = workingData.byteLength, workingWord = 0, workingBitsAvailable = 0;
			this.length = function() {
				return 8 * workingBytesAvailable;
			};
			this.bitsAvailable = function() {
				return 8 * workingBytesAvailable + workingBitsAvailable;
			};
			this.loadWord = function() {
				var position = workingData.byteLength - workingBytesAvailable, workingBytes = /* @__PURE__ */ new Uint8Array(4), availableBytes = Math.min(4, workingBytesAvailable);
				if (availableBytes === 0) throw new Error("no bytes available");
				workingBytes.set(workingData.subarray(position, position + availableBytes));
				workingWord = new DataView(workingBytes.buffer).getUint32(0);
				workingBitsAvailable = availableBytes * 8;
				workingBytesAvailable -= availableBytes;
			};
			this.skipBits = function(count) {
				var skipBytes;
				if (workingBitsAvailable > count) {
					workingWord <<= count;
					workingBitsAvailable -= count;
				} else {
					count -= workingBitsAvailable;
					skipBytes = Math.floor(count / 8);
					count -= skipBytes * 8;
					workingBytesAvailable -= skipBytes;
					this.loadWord();
					workingWord <<= count;
					workingBitsAvailable -= count;
				}
			};
			this.readBits = function(size) {
				var bits = Math.min(workingBitsAvailable, size), valu = workingWord >>> 32 - bits;
				workingBitsAvailable -= bits;
				if (workingBitsAvailable > 0) workingWord <<= bits;
				else if (workingBytesAvailable > 0) this.loadWord();
				bits = size - bits;
				if (bits > 0) return valu << bits | this.readBits(bits);
				return valu;
			};
			this.skipLeadingZeros = function() {
				var leadingZeroCount;
				for (leadingZeroCount = 0; leadingZeroCount < workingBitsAvailable; ++leadingZeroCount) if ((workingWord & 2147483648 >>> leadingZeroCount) !== 0) {
					workingWord <<= leadingZeroCount;
					workingBitsAvailable -= leadingZeroCount;
					return leadingZeroCount;
				}
				this.loadWord();
				return leadingZeroCount + this.skipLeadingZeros();
			};
			this.skipUnsignedExpGolomb = function() {
				this.skipBits(1 + this.skipLeadingZeros());
			};
			this.skipExpGolomb = function() {
				this.skipBits(1 + this.skipLeadingZeros());
			};
			this.readUnsignedExpGolomb = function() {
				var clz = this.skipLeadingZeros();
				return this.readBits(clz + 1) - 1;
			};
			this.readExpGolomb = function() {
				var valu = this.readUnsignedExpGolomb();
				if (1 & valu) return 1 + valu >>> 1;
				return -1 * (valu >>> 1);
			};
			this.readBoolean = function() {
				return this.readBits(1) === 1;
			};
			this.readUnsignedByte = function() {
				return this.readBits(8);
			};
			this.loadWord();
		};
	}));
	//#endregion
	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/codecs/h264.js
	/**
	* mux.js
	*
	* Copyright (c) Brightcove
	* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE
	*/
	var require_h264 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var Stream = require_stream();
		var ExpGolomb = require_exp_golomb();
		var _H264Stream;
		var _NalByteStream;
		var PROFILES_WITH_OPTIONAL_SPS_DATA;
		/**
		* Accepts a NAL unit byte stream and unpacks the embedded NAL units.
		*/
		_NalByteStream = function NalByteStream() {
			var syncPoint = 0, i, buffer;
			_NalByteStream.prototype.init.call(this);
			this.push = function(data) {
				var swapBuffer;
				if (!buffer) buffer = data.data;
				else {
					swapBuffer = new Uint8Array(buffer.byteLength + data.data.byteLength);
					swapBuffer.set(buffer);
					swapBuffer.set(data.data, buffer.byteLength);
					buffer = swapBuffer;
				}
				var len = buffer.byteLength;
				for (; syncPoint < len - 3; syncPoint++) if (buffer[syncPoint + 2] === 1) {
					i = syncPoint + 5;
					break;
				}
				while (i < len) switch (buffer[i]) {
					case 0:
						if (buffer[i - 1] !== 0) {
							i += 2;
							break;
						} else if (buffer[i - 2] !== 0) {
							i++;
							break;
						}
						if (syncPoint + 3 !== i - 2) this.trigger("data", buffer.subarray(syncPoint + 3, i - 2));
						do
							i++;
						while (buffer[i] !== 1 && i < len);
						syncPoint = i - 2;
						i += 3;
						break;
					case 1:
						if (buffer[i - 1] !== 0 || buffer[i - 2] !== 0) {
							i += 3;
							break;
						}
						this.trigger("data", buffer.subarray(syncPoint + 3, i - 2));
						syncPoint = i - 2;
						i += 3;
						break;
					default:
						i += 3;
						break;
				}
				buffer = buffer.subarray(syncPoint);
				i -= syncPoint;
				syncPoint = 0;
			};
			this.reset = function() {
				buffer = null;
				syncPoint = 0;
				this.trigger("reset");
			};
			this.flush = function() {
				if (buffer && buffer.byteLength > 3) this.trigger("data", buffer.subarray(syncPoint + 3));
				buffer = null;
				syncPoint = 0;
				this.trigger("done");
			};
			this.endTimeline = function() {
				this.flush();
				this.trigger("endedtimeline");
			};
		};
		_NalByteStream.prototype = new Stream();
		PROFILES_WITH_OPTIONAL_SPS_DATA = {
			100: true,
			110: true,
			122: true,
			244: true,
			44: true,
			83: true,
			86: true,
			118: true,
			128: true,
			138: true,
			139: true,
			134: true
		};
		/**
		* Accepts input from a ElementaryStream and produces H.264 NAL unit data
		* events.
		*/
		_H264Stream = function H264Stream() {
			var nalByteStream = new _NalByteStream(), self, trackId, currentPts, currentDts, discardEmulationPreventionBytes, readSequenceParameterSet, skipScalingList;
			_H264Stream.prototype.init.call(this);
			self = this;
			this.push = function(packet) {
				if (packet.type !== "video") return;
				trackId = packet.trackId;
				currentPts = packet.pts;
				currentDts = packet.dts;
				nalByteStream.push(packet);
			};
			nalByteStream.on("data", function(data) {
				var event = {
					trackId,
					pts: currentPts,
					dts: currentDts,
					data,
					nalUnitTypeCode: data[0] & 31
				};
				switch (event.nalUnitTypeCode) {
					case 5:
						event.nalUnitType = "slice_layer_without_partitioning_rbsp_idr";
						break;
					case 6:
						event.nalUnitType = "sei_rbsp";
						event.escapedRBSP = discardEmulationPreventionBytes(data.subarray(1));
						break;
					case 7:
						event.nalUnitType = "seq_parameter_set_rbsp";
						event.escapedRBSP = discardEmulationPreventionBytes(data.subarray(1));
						event.config = readSequenceParameterSet(event.escapedRBSP);
						break;
					case 8:
						event.nalUnitType = "pic_parameter_set_rbsp";
						break;
					case 9:
						event.nalUnitType = "access_unit_delimiter_rbsp";
						break;
					default: break;
				}
				self.trigger("data", event);
			});
			nalByteStream.on("done", function() {
				self.trigger("done");
			});
			nalByteStream.on("partialdone", function() {
				self.trigger("partialdone");
			});
			nalByteStream.on("reset", function() {
				self.trigger("reset");
			});
			nalByteStream.on("endedtimeline", function() {
				self.trigger("endedtimeline");
			});
			this.flush = function() {
				nalByteStream.flush();
			};
			this.partialFlush = function() {
				nalByteStream.partialFlush();
			};
			this.reset = function() {
				nalByteStream.reset();
			};
			this.endTimeline = function() {
				nalByteStream.endTimeline();
			};
			/**
			* Advance the ExpGolomb decoder past a scaling list. The scaling
			* list is optionally transmitted as part of a sequence parameter
			* set and is not relevant to transmuxing.
			* @param count {number} the number of entries in this scaling list
			* @param expGolombDecoder {object} an ExpGolomb pointed to the
			* start of a scaling list
			* @see Recommendation ITU-T H.264, Section 7.3.2.1.1.1
			*/
			skipScalingList = function skipScalingList(count, expGolombDecoder) {
				var lastScale = 8, nextScale = 8, j, deltaScale;
				for (j = 0; j < count; j++) {
					if (nextScale !== 0) {
						deltaScale = expGolombDecoder.readExpGolomb();
						nextScale = (lastScale + deltaScale + 256) % 256;
					}
					lastScale = nextScale === 0 ? lastScale : nextScale;
				}
			};
			/**
			* Expunge any "Emulation Prevention" bytes from a "Raw Byte
			* Sequence Payload"
			* @param data {Uint8Array} the bytes of a RBSP from a NAL
			* unit
			* @return {Uint8Array} the RBSP without any Emulation
			* Prevention Bytes
			*/
			discardEmulationPreventionBytes = function discardEmulationPreventionBytes(data) {
				var length = data.byteLength, emulationPreventionBytesPositions = [], i = 1, newLength, newData;
				while (i < length - 2) if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 3) {
					emulationPreventionBytesPositions.push(i + 2);
					i += 2;
				} else i++;
				if (emulationPreventionBytesPositions.length === 0) return data;
				newLength = length - emulationPreventionBytesPositions.length;
				newData = new Uint8Array(newLength);
				var sourceIndex = 0;
				for (i = 0; i < newLength; sourceIndex++, i++) {
					if (sourceIndex === emulationPreventionBytesPositions[0]) {
						sourceIndex++;
						emulationPreventionBytesPositions.shift();
					}
					newData[i] = data[sourceIndex];
				}
				return newData;
			};
			/**
			* Read a sequence parameter set and return some interesting video
			* properties. A sequence parameter set is the H264 metadata that
			* describes the properties of upcoming video frames.
			* @param data {Uint8Array} the bytes of a sequence parameter set
			* @return {object} an object with configuration parsed from the
			* sequence parameter set, including the dimensions of the
			* associated video frames.
			*/
			readSequenceParameterSet = function readSequenceParameterSet(data) {
				var frameCropLeftOffset = 0, frameCropRightOffset = 0, frameCropTopOffset = 0, frameCropBottomOffset = 0, expGolombDecoder, profileIdc, levelIdc, profileCompatibility, chromaFormatIdc, picOrderCntType, numRefFramesInPicOrderCntCycle, picWidthInMbsMinus1, picHeightInMapUnitsMinus1, frameMbsOnlyFlag, scalingListCount, sarRatio = [1, 1], aspectRatioIdc, i;
				expGolombDecoder = new ExpGolomb(data);
				profileIdc = expGolombDecoder.readUnsignedByte();
				profileCompatibility = expGolombDecoder.readUnsignedByte();
				levelIdc = expGolombDecoder.readUnsignedByte();
				expGolombDecoder.skipUnsignedExpGolomb();
				if (PROFILES_WITH_OPTIONAL_SPS_DATA[profileIdc]) {
					chromaFormatIdc = expGolombDecoder.readUnsignedExpGolomb();
					if (chromaFormatIdc === 3) expGolombDecoder.skipBits(1);
					expGolombDecoder.skipUnsignedExpGolomb();
					expGolombDecoder.skipUnsignedExpGolomb();
					expGolombDecoder.skipBits(1);
					if (expGolombDecoder.readBoolean()) {
						scalingListCount = chromaFormatIdc !== 3 ? 8 : 12;
						for (i = 0; i < scalingListCount; i++) if (expGolombDecoder.readBoolean()) if (i < 6) skipScalingList(16, expGolombDecoder);
						else skipScalingList(64, expGolombDecoder);
					}
				}
				expGolombDecoder.skipUnsignedExpGolomb();
				picOrderCntType = expGolombDecoder.readUnsignedExpGolomb();
				if (picOrderCntType === 0) expGolombDecoder.readUnsignedExpGolomb();
				else if (picOrderCntType === 1) {
					expGolombDecoder.skipBits(1);
					expGolombDecoder.skipExpGolomb();
					expGolombDecoder.skipExpGolomb();
					numRefFramesInPicOrderCntCycle = expGolombDecoder.readUnsignedExpGolomb();
					for (i = 0; i < numRefFramesInPicOrderCntCycle; i++) expGolombDecoder.skipExpGolomb();
				}
				expGolombDecoder.skipUnsignedExpGolomb();
				expGolombDecoder.skipBits(1);
				picWidthInMbsMinus1 = expGolombDecoder.readUnsignedExpGolomb();
				picHeightInMapUnitsMinus1 = expGolombDecoder.readUnsignedExpGolomb();
				frameMbsOnlyFlag = expGolombDecoder.readBits(1);
				if (frameMbsOnlyFlag === 0) expGolombDecoder.skipBits(1);
				expGolombDecoder.skipBits(1);
				if (expGolombDecoder.readBoolean()) {
					frameCropLeftOffset = expGolombDecoder.readUnsignedExpGolomb();
					frameCropRightOffset = expGolombDecoder.readUnsignedExpGolomb();
					frameCropTopOffset = expGolombDecoder.readUnsignedExpGolomb();
					frameCropBottomOffset = expGolombDecoder.readUnsignedExpGolomb();
				}
				if (expGolombDecoder.readBoolean()) {
					if (expGolombDecoder.readBoolean()) {
						aspectRatioIdc = expGolombDecoder.readUnsignedByte();
						switch (aspectRatioIdc) {
							case 1:
								sarRatio = [1, 1];
								break;
							case 2:
								sarRatio = [12, 11];
								break;
							case 3:
								sarRatio = [10, 11];
								break;
							case 4:
								sarRatio = [16, 11];
								break;
							case 5:
								sarRatio = [40, 33];
								break;
							case 6:
								sarRatio = [24, 11];
								break;
							case 7:
								sarRatio = [20, 11];
								break;
							case 8:
								sarRatio = [32, 11];
								break;
							case 9:
								sarRatio = [80, 33];
								break;
							case 10:
								sarRatio = [18, 11];
								break;
							case 11:
								sarRatio = [15, 11];
								break;
							case 12:
								sarRatio = [64, 33];
								break;
							case 13:
								sarRatio = [160, 99];
								break;
							case 14:
								sarRatio = [4, 3];
								break;
							case 15:
								sarRatio = [3, 2];
								break;
							case 16:
								sarRatio = [2, 1];
								break;
							case 255:
								sarRatio = [expGolombDecoder.readUnsignedByte() << 8 | expGolombDecoder.readUnsignedByte(), expGolombDecoder.readUnsignedByte() << 8 | expGolombDecoder.readUnsignedByte()];
								break;
						}
						if (sarRatio) sarRatio[0] / sarRatio[1];
					}
				}
				return {
					profileIdc,
					levelIdc,
					profileCompatibility,
					width: (picWidthInMbsMinus1 + 1) * 16 - frameCropLeftOffset * 2 - frameCropRightOffset * 2,
					height: (2 - frameMbsOnlyFlag) * (picHeightInMapUnitsMinus1 + 1) * 16 - frameCropTopOffset * 2 - frameCropBottomOffset * 2,
					sarRatio
				};
			};
		};
		_H264Stream.prototype = new Stream();
		module.exports = {
			H264Stream: _H264Stream,
			NalByteStream: _NalByteStream
		};
	}));
	//#endregion
	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/aac/utils.js
	/**
	* mux.js
	*
	* Copyright (c) Brightcove
	* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE
	*
	* Utilities to detect basic properties and metadata about Aac data.
	*/
	var require_utils = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var ADTS_SAMPLING_FREQUENCIES = [
			96e3,
			88200,
			64e3,
			48e3,
			44100,
			32e3,
			24e3,
			22050,
			16e3,
			12e3,
			11025,
			8e3,
			7350
		];
		var parseId3TagSize = function parseId3TagSize(header, byteIndex) {
			var returnSize = header[byteIndex + 6] << 21 | header[byteIndex + 7] << 14 | header[byteIndex + 8] << 7 | header[byteIndex + 9], footerPresent = (header[byteIndex + 5] & 16) >> 4;
			returnSize = returnSize >= 0 ? returnSize : 0;
			if (footerPresent) return returnSize + 20;
			return returnSize + 10;
		};
		var getId3Offset = function getId3Offset(data, offset) {
			if (data.length - offset < 10 || data[offset] !== "I".charCodeAt(0) || data[offset + 1] !== "D".charCodeAt(0) || data[offset + 2] !== "3".charCodeAt(0)) return offset;
			offset += parseId3TagSize(data, offset);
			return getId3Offset(data, offset);
		};
		var isLikelyAacData = function isLikelyAacData(data) {
			var offset = getId3Offset(data, 0);
			return data.length >= offset + 2 && (data[offset] & 255) === 255 && (data[offset + 1] & 240) === 240 && (data[offset + 1] & 22) === 16;
		};
		var parseSyncSafeInteger = function parseSyncSafeInteger(data) {
			return data[0] << 21 | data[1] << 14 | data[2] << 7 | data[3];
		};
		var percentEncode = function percentEncode(bytes, start, end) {
			var i, result = "";
			for (i = start; i < end; i++) result += "%" + ("00" + bytes[i].toString(16)).slice(-2);
			return result;
		};
		var parseIso88591 = function parseIso88591(bytes, start, end) {
			return unescape(percentEncode(bytes, start, end));
		};
		module.exports = {
			isLikelyAacData,
			parseId3TagSize,
			parseAdtsSize: function parseAdtsSize(header, byteIndex) {
				var lowThree = (header[byteIndex + 5] & 224) >> 5, middle = header[byteIndex + 4] << 3;
				return header[byteIndex + 3] & 6144 | middle | lowThree;
			},
			parseType: function parseType(header, byteIndex) {
				if (header[byteIndex] === "I".charCodeAt(0) && header[byteIndex + 1] === "D".charCodeAt(0) && header[byteIndex + 2] === "3".charCodeAt(0)) return "timed-metadata";
				else if (header[byteIndex] & true && (header[byteIndex + 1] & 240) === 240) return "audio";
				return null;
			},
			parseSampleRate: function parseSampleRate(packet) {
				var i = 0;
				while (i + 5 < packet.length) {
					if (packet[i] !== 255 || (packet[i + 1] & 246) !== 240) {
						i++;
						continue;
					}
					return ADTS_SAMPLING_FREQUENCIES[(packet[i + 2] & 60) >>> 2];
				}
				return null;
			},
			parseAacTimestamp: function parseAacTimestamp(packet) {
				var frameStart = 10, frameSize, frame, frameHeader;
				if (packet[5] & 64) {
					frameStart += 4;
					frameStart += parseSyncSafeInteger(packet.subarray(10, 14));
				}
				do {
					frameSize = parseSyncSafeInteger(packet.subarray(frameStart + 4, frameStart + 8));
					if (frameSize < 1) return null;
					frameHeader = String.fromCharCode(packet[frameStart], packet[frameStart + 1], packet[frameStart + 2], packet[frameStart + 3]);
					if (frameHeader === "PRIV") {
						frame = packet.subarray(frameStart + 10, frameStart + frameSize + 10);
						for (var i = 0; i < frame.byteLength; i++) if (frame[i] === 0) {
							if (parseIso88591(frame, 0, i) === "com.apple.streaming.transportStreamTimestamp") {
								var d = frame.subarray(i + 1);
								var size = (d[3] & 1) << 30 | d[4] << 22 | d[5] << 14 | d[6] << 6 | d[7] >>> 2;
								size *= 4;
								size += d[7] & 3;
								return size;
							}
							break;
						}
					}
					frameStart += 10;
					frameStart += frameSize;
				} while (frameStart < packet.byteLength);
				return null;
			}
		};
	}));
	//#endregion
	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/aac/index.js
	/**
	* mux.js
	*
	* Copyright (c) Brightcove
	* Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE
	*
	* A stream-based aac to mp4 converter. This utility can be used to
	* deliver mp4s to a SourceBuffer on platforms that support native
	* Media Source Extensions.
	*/
	var require_aac = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var Stream = require_stream();
		var aacUtils = require_utils();
		var _AacStream = function AacStream() {
			var everything = /* @__PURE__ */ new Uint8Array(), timeStamp = 0;
			_AacStream.prototype.init.call(this);
			this.setTimestamp = function(timestamp) {
				timeStamp = timestamp;
			};
			this.push = function(bytes) {
				var frameSize = 0, byteIndex = 0, bytesLeft, chunk, packet, tempLength;
				if (everything.length) {
					tempLength = everything.length;
					everything = new Uint8Array(bytes.byteLength + tempLength);
					everything.set(everything.subarray(0, tempLength));
					everything.set(bytes, tempLength);
				} else everything = bytes;
				while (everything.length - byteIndex >= 3) {
					if (everything[byteIndex] === "I".charCodeAt(0) && everything[byteIndex + 1] === "D".charCodeAt(0) && everything[byteIndex + 2] === "3".charCodeAt(0)) {
						if (everything.length - byteIndex < 10) break;
						frameSize = aacUtils.parseId3TagSize(everything, byteIndex);
						if (byteIndex + frameSize > everything.length) break;
						chunk = {
							type: "timed-metadata",
							data: everything.subarray(byteIndex, byteIndex + frameSize)
						};
						this.trigger("data", chunk);
						byteIndex += frameSize;
						continue;
					} else if ((everything[byteIndex] & 255) === 255 && (everything[byteIndex + 1] & 240) === 240) {
						if (everything.length - byteIndex < 7) break;
						frameSize = aacUtils.parseAdtsSize(everything, byteIndex);
						if (byteIndex + frameSize > everything.length) break;
						packet = {
							type: "audio",
							data: everything.subarray(byteIndex, byteIndex + frameSize),
							pts: timeStamp,
							dts: timeStamp
						};
						this.trigger("data", packet);
						byteIndex += frameSize;
						continue;
					}
					byteIndex++;
				}
				bytesLeft = everything.length - byteIndex;
				if (bytesLeft > 0) everything = everything.subarray(byteIndex);
				else everything = /* @__PURE__ */ new Uint8Array();
			};
			this.reset = function() {
				everything = /* @__PURE__ */ new Uint8Array();
				this.trigger("reset");
			};
			this.endTimeline = function() {
				everything = /* @__PURE__ */ new Uint8Array();
				this.trigger("endedtimeline");
			};
		};
		_AacStream.prototype = new Stream();
		module.exports = _AacStream;
	}));
	//#endregion
	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/constants/audio-properties.js
	var require_audio_properties = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = [
			"audioobjecttype",
			"channelcount",
			"samplerate",
			"samplingfrequencyindex",
			"samplesize"
		];
	}));
	//#endregion
	//#region node_modules/.pnpm/mux.js@6.3.0/node_modules/mux.js/cjs/constants/video-properties.js
	var require_video_properties = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = [
			"width",
			"height",
			"profileIdc",
			"levelIdc",
			"profileCompatibility",
			"sarRatio"
		];
	}));
	//#endregion
	//#region src/features/clipDownloads/mediaTypes.ts
	var import_transmuxer = (/* @__PURE__ */ __commonJSMin(((exports, module) => {
		var Stream = require_stream();
		var mp4 = require_mp4_generator();
		var frameUtils = require_frame_utils();
		var audioFrameUtils = require_audio_frame_utils();
		var trackDecodeInfo = require_track_decode_info();
		var m2ts = require_m2ts();
		var clock = require_clock();
		var AdtsStream = require_adts();
		var H264Stream = require_h264().H264Stream;
		var AacStream = require_aac();
		var isLikelyAacData = require_utils().isLikelyAacData;
		var ONE_SECOND_IN_TS = require_clock().ONE_SECOND_IN_TS;
		var AUDIO_PROPERTIES = require_audio_properties();
		var VIDEO_PROPERTIES = require_video_properties();
		var _VideoSegmentStream;
		var _AudioSegmentStream;
		var _Transmuxer;
		var _CoalesceStream;
		var retriggerForStream = function retriggerForStream(key, event) {
			event.stream = key;
			this.trigger("log", event);
		};
		var addPipelineLogRetriggers = function addPipelineLogRetriggers(transmuxer, pipeline) {
			var keys = Object.keys(pipeline);
			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				if (key === "headOfPipeline" || !pipeline[key].on) continue;
				pipeline[key].on("log", retriggerForStream.bind(transmuxer, key));
			}
		};
		/**
		* Compare two arrays (even typed) for same-ness
		*/
		var arrayEquals = function arrayEquals(a, b) {
			var i;
			if (a.length !== b.length) return false;
			for (i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
			return true;
		};
		var generateSegmentTimingInfo = function generateSegmentTimingInfo(baseMediaDecodeTime, startDts, startPts, endDts, endPts, prependedContentDuration) {
			var ptsOffsetFromDts = startPts - startDts, decodeDuration = endDts - startDts, presentationDuration = endPts - startPts;
			return {
				start: {
					dts: baseMediaDecodeTime,
					pts: baseMediaDecodeTime + ptsOffsetFromDts
				},
				end: {
					dts: baseMediaDecodeTime + decodeDuration,
					pts: baseMediaDecodeTime + presentationDuration
				},
				prependedContentDuration,
				baseMediaDecodeTime
			};
		};
		/**
		* Constructs a single-track, ISO BMFF media segment from AAC data
		* events. The output of this stream can be fed to a SourceBuffer
		* configured with a suitable initialization segment.
		* @param track {object} track metadata configuration
		* @param options {object} transmuxer options object
		* @param options.keepOriginalTimestamps {boolean} If true, keep the timestamps
		*        in the source; false to adjust the first segment to start at 0.
		*/
		_AudioSegmentStream = function AudioSegmentStream(track, options) {
			var adtsFrames = [], sequenceNumber, earliestAllowedDts = 0, audioAppendStartTs = 0, videoBaseMediaDecodeTime = Infinity;
			options = options || {};
			sequenceNumber = options.firstSequenceNumber || 0;
			_AudioSegmentStream.prototype.init.call(this);
			this.push = function(data) {
				trackDecodeInfo.collectDtsInfo(track, data);
				if (track) AUDIO_PROPERTIES.forEach(function(prop) {
					track[prop] = data[prop];
				});
				adtsFrames.push(data);
			};
			this.setEarliestDts = function(earliestDts) {
				earliestAllowedDts = earliestDts;
			};
			this.setVideoBaseMediaDecodeTime = function(baseMediaDecodeTime) {
				videoBaseMediaDecodeTime = baseMediaDecodeTime;
			};
			this.setAudioAppendStart = function(timestamp) {
				audioAppendStartTs = timestamp;
			};
			this.flush = function() {
				var frames, moof, mdat, boxes, frameDuration, segmentDuration, videoClockCyclesOfSilencePrefixed;
				if (adtsFrames.length === 0) {
					this.trigger("done", "AudioSegmentStream");
					return;
				}
				frames = audioFrameUtils.trimAdtsFramesByEarliestDts(adtsFrames, track, earliestAllowedDts);
				track.baseMediaDecodeTime = trackDecodeInfo.calculateTrackBaseMediaDecodeTime(track, options.keepOriginalTimestamps);
				videoClockCyclesOfSilencePrefixed = audioFrameUtils.prefixWithSilence(track, frames, audioAppendStartTs, videoBaseMediaDecodeTime);
				track.samples = audioFrameUtils.generateSampleTable(frames);
				mdat = mp4.mdat(audioFrameUtils.concatenateFrameData(frames));
				adtsFrames = [];
				moof = mp4.moof(sequenceNumber, [track]);
				boxes = new Uint8Array(moof.byteLength + mdat.byteLength);
				sequenceNumber++;
				boxes.set(moof);
				boxes.set(mdat, moof.byteLength);
				trackDecodeInfo.clearDtsInfo(track);
				frameDuration = Math.ceil(ONE_SECOND_IN_TS * 1024 / track.samplerate);
				if (frames.length) {
					segmentDuration = frames.length * frameDuration;
					this.trigger("segmentTimingInfo", generateSegmentTimingInfo(clock.audioTsToVideoTs(track.baseMediaDecodeTime, track.samplerate), frames[0].dts, frames[0].pts, frames[0].dts + segmentDuration, frames[0].pts + segmentDuration, videoClockCyclesOfSilencePrefixed || 0));
					this.trigger("timingInfo", {
						start: frames[0].pts,
						end: frames[0].pts + segmentDuration
					});
				}
				this.trigger("data", {
					track,
					boxes
				});
				this.trigger("done", "AudioSegmentStream");
			};
			this.reset = function() {
				trackDecodeInfo.clearDtsInfo(track);
				adtsFrames = [];
				this.trigger("reset");
			};
		};
		_AudioSegmentStream.prototype = new Stream();
		/**
		* Constructs a single-track, ISO BMFF media segment from H264 data
		* events. The output of this stream can be fed to a SourceBuffer
		* configured with a suitable initialization segment.
		* @param track {object} track metadata configuration
		* @param options {object} transmuxer options object
		* @param options.alignGopsAtEnd {boolean} If true, start from the end of the
		*        gopsToAlignWith list when attempting to align gop pts
		* @param options.keepOriginalTimestamps {boolean} If true, keep the timestamps
		*        in the source; false to adjust the first segment to start at 0.
		*/
		_VideoSegmentStream = function VideoSegmentStream(track, options) {
			var sequenceNumber, nalUnits = [], gopsToAlignWith = [], config, pps;
			options = options || {};
			sequenceNumber = options.firstSequenceNumber || 0;
			_VideoSegmentStream.prototype.init.call(this);
			delete track.minPTS;
			this.gopCache_ = [];
			/**
			* Constructs a ISO BMFF segment given H264 nalUnits
			* @param {Object} nalUnit A data event representing a nalUnit
			* @param {String} nalUnit.nalUnitType
			* @param {Object} nalUnit.config Properties for a mp4 track
			* @param {Uint8Array} nalUnit.data The nalUnit bytes
			* @see lib/codecs/h264.js
			**/
			this.push = function(nalUnit) {
				trackDecodeInfo.collectDtsInfo(track, nalUnit);
				if (nalUnit.nalUnitType === "seq_parameter_set_rbsp" && !config) {
					config = nalUnit.config;
					track.sps = [nalUnit.data];
					VIDEO_PROPERTIES.forEach(function(prop) {
						track[prop] = config[prop];
					}, this);
				}
				if (nalUnit.nalUnitType === "pic_parameter_set_rbsp" && !pps) {
					pps = nalUnit.data;
					track.pps = [nalUnit.data];
				}
				nalUnits.push(nalUnit);
			};
			/**
			* Pass constructed ISO BMFF track and boxes on to the
			* next stream in the pipeline
			**/
			this.flush = function() {
				var frames, gopForFusion, gops, moof, mdat, boxes, prependedContentDuration = 0, firstGop, lastGop;
				while (nalUnits.length) {
					if (nalUnits[0].nalUnitType === "access_unit_delimiter_rbsp") break;
					nalUnits.shift();
				}
				if (nalUnits.length === 0) {
					this.resetStream_();
					this.trigger("done", "VideoSegmentStream");
					return;
				}
				frames = frameUtils.groupNalsIntoFrames(nalUnits);
				gops = frameUtils.groupFramesIntoGops(frames);
				if (!gops[0][0].keyFrame) {
					gopForFusion = this.getGopForFusion_(nalUnits[0], track);
					if (gopForFusion) {
						prependedContentDuration = gopForFusion.duration;
						gops.unshift(gopForFusion);
						gops.byteLength += gopForFusion.byteLength;
						gops.nalCount += gopForFusion.nalCount;
						gops.pts = gopForFusion.pts;
						gops.dts = gopForFusion.dts;
						gops.duration += gopForFusion.duration;
					} else gops = frameUtils.extendFirstKeyFrame(gops);
				}
				if (gopsToAlignWith.length) {
					var alignedGops;
					if (options.alignGopsAtEnd) alignedGops = this.alignGopsAtEnd_(gops);
					else alignedGops = this.alignGopsAtStart_(gops);
					if (!alignedGops) {
						this.gopCache_.unshift({
							gop: gops.pop(),
							pps: track.pps,
							sps: track.sps
						});
						this.gopCache_.length = Math.min(6, this.gopCache_.length);
						nalUnits = [];
						this.resetStream_();
						this.trigger("done", "VideoSegmentStream");
						return;
					}
					trackDecodeInfo.clearDtsInfo(track);
					gops = alignedGops;
				}
				trackDecodeInfo.collectDtsInfo(track, gops);
				track.samples = frameUtils.generateSampleTable(gops);
				mdat = mp4.mdat(frameUtils.concatenateNalData(gops));
				track.baseMediaDecodeTime = trackDecodeInfo.calculateTrackBaseMediaDecodeTime(track, options.keepOriginalTimestamps);
				this.trigger("processedGopsInfo", gops.map(function(gop) {
					return {
						pts: gop.pts,
						dts: gop.dts,
						byteLength: gop.byteLength
					};
				}));
				firstGop = gops[0];
				lastGop = gops[gops.length - 1];
				this.trigger("segmentTimingInfo", generateSegmentTimingInfo(track.baseMediaDecodeTime, firstGop.dts, firstGop.pts, lastGop.dts + lastGop.duration, lastGop.pts + lastGop.duration, prependedContentDuration));
				this.trigger("timingInfo", {
					start: gops[0].pts,
					end: gops[gops.length - 1].pts + gops[gops.length - 1].duration
				});
				this.gopCache_.unshift({
					gop: gops.pop(),
					pps: track.pps,
					sps: track.sps
				});
				this.gopCache_.length = Math.min(6, this.gopCache_.length);
				nalUnits = [];
				this.trigger("baseMediaDecodeTime", track.baseMediaDecodeTime);
				this.trigger("timelineStartInfo", track.timelineStartInfo);
				moof = mp4.moof(sequenceNumber, [track]);
				boxes = new Uint8Array(moof.byteLength + mdat.byteLength);
				sequenceNumber++;
				boxes.set(moof);
				boxes.set(mdat, moof.byteLength);
				this.trigger("data", {
					track,
					boxes
				});
				this.resetStream_();
				this.trigger("done", "VideoSegmentStream");
			};
			this.reset = function() {
				this.resetStream_();
				nalUnits = [];
				this.gopCache_.length = 0;
				gopsToAlignWith.length = 0;
				this.trigger("reset");
			};
			this.resetStream_ = function() {
				trackDecodeInfo.clearDtsInfo(track);
				config = void 0;
				pps = void 0;
			};
			this.getGopForFusion_ = function(nalUnit) {
				var halfSecond = 45e3, allowableOverlap = 1e4, nearestDistance = Infinity, dtsDistance, nearestGopObj, currentGop, currentGopObj, i;
				for (i = 0; i < this.gopCache_.length; i++) {
					currentGopObj = this.gopCache_[i];
					currentGop = currentGopObj.gop;
					if (!(track.pps && arrayEquals(track.pps[0], currentGopObj.pps[0])) || !(track.sps && arrayEquals(track.sps[0], currentGopObj.sps[0]))) continue;
					if (currentGop.dts < track.timelineStartInfo.dts) continue;
					dtsDistance = nalUnit.dts - currentGop.dts - currentGop.duration;
					if (dtsDistance >= -allowableOverlap && dtsDistance <= halfSecond) {
						if (!nearestGopObj || nearestDistance > dtsDistance) {
							nearestGopObj = currentGopObj;
							nearestDistance = dtsDistance;
						}
					}
				}
				if (nearestGopObj) return nearestGopObj.gop;
				return null;
			};
			this.alignGopsAtStart_ = function(gops) {
				var alignIndex, gopIndex, align, gop, byteLength = gops.byteLength, nalCount = gops.nalCount, duration = gops.duration, alignedGops;
				alignIndex = gopIndex = 0;
				while (alignIndex < gopsToAlignWith.length && gopIndex < gops.length) {
					align = gopsToAlignWith[alignIndex];
					gop = gops[gopIndex];
					if (align.pts === gop.pts) break;
					if (gop.pts > align.pts) {
						alignIndex++;
						continue;
					}
					gopIndex++;
					byteLength -= gop.byteLength;
					nalCount -= gop.nalCount;
					duration -= gop.duration;
				}
				if (gopIndex === 0) return gops;
				if (gopIndex === gops.length) return null;
				alignedGops = gops.slice(gopIndex);
				alignedGops.byteLength = byteLength;
				alignedGops.duration = duration;
				alignedGops.nalCount = nalCount;
				alignedGops.pts = alignedGops[0].pts;
				alignedGops.dts = alignedGops[0].dts;
				return alignedGops;
			};
			this.alignGopsAtEnd_ = function(gops) {
				var alignIndex = gopsToAlignWith.length - 1, gopIndex = gops.length - 1, align, gop, alignEndIndex = null, matchFound = false;
				while (alignIndex >= 0 && gopIndex >= 0) {
					align = gopsToAlignWith[alignIndex];
					gop = gops[gopIndex];
					if (align.pts === gop.pts) {
						matchFound = true;
						break;
					}
					if (align.pts > gop.pts) {
						alignIndex--;
						continue;
					}
					if (alignIndex === gopsToAlignWith.length - 1) alignEndIndex = gopIndex;
					gopIndex--;
				}
				if (!matchFound && alignEndIndex === null) return null;
				var trimIndex;
				if (matchFound) trimIndex = gopIndex;
				else trimIndex = alignEndIndex;
				if (trimIndex === 0) return gops;
				var alignedGops = gops.slice(trimIndex);
				var metadata = alignedGops.reduce(function(total, gop) {
					total.byteLength += gop.byteLength;
					total.duration += gop.duration;
					total.nalCount += gop.nalCount;
					return total;
				}, {
					byteLength: 0,
					duration: 0,
					nalCount: 0
				});
				alignedGops.byteLength = metadata.byteLength;
				alignedGops.duration = metadata.duration;
				alignedGops.nalCount = metadata.nalCount;
				alignedGops.pts = alignedGops[0].pts;
				alignedGops.dts = alignedGops[0].dts;
				return alignedGops;
			};
			this.alignGopsWith = function(newGopsToAlignWith) {
				gopsToAlignWith = newGopsToAlignWith;
			};
		};
		_VideoSegmentStream.prototype = new Stream();
		/**
		* A Stream that can combine multiple streams (ie. audio & video)
		* into a single output segment for MSE. Also supports audio-only
		* and video-only streams.
		* @param options {object} transmuxer options object
		* @param options.keepOriginalTimestamps {boolean} If true, keep the timestamps
		*        in the source; false to adjust the first segment to start at media timeline start.
		*/
		_CoalesceStream = function CoalesceStream(options, metadataStream) {
			this.numberOfTracks = 0;
			this.metadataStream = metadataStream;
			options = options || {};
			if (typeof options.remux !== "undefined") this.remuxTracks = !!options.remux;
			else this.remuxTracks = true;
			if (typeof options.keepOriginalTimestamps === "boolean") this.keepOriginalTimestamps = options.keepOriginalTimestamps;
			else this.keepOriginalTimestamps = false;
			this.pendingTracks = [];
			this.videoTrack = null;
			this.pendingBoxes = [];
			this.pendingCaptions = [];
			this.pendingMetadata = [];
			this.pendingBytes = 0;
			this.emittedTracks = 0;
			_CoalesceStream.prototype.init.call(this);
			this.push = function(output) {
				if (output.text) return this.pendingCaptions.push(output);
				if (output.frames) return this.pendingMetadata.push(output);
				this.pendingTracks.push(output.track);
				this.pendingBytes += output.boxes.byteLength;
				if (output.track.type === "video") {
					this.videoTrack = output.track;
					this.pendingBoxes.push(output.boxes);
				}
				if (output.track.type === "audio") {
					this.audioTrack = output.track;
					this.pendingBoxes.unshift(output.boxes);
				}
			};
		};
		_CoalesceStream.prototype = new Stream();
		_CoalesceStream.prototype.flush = function(flushSource) {
			var offset = 0, event = {
				captions: [],
				captionStreams: {},
				metadata: [],
				info: {}
			}, caption, id3, initSegment, timelineStartPts = 0, i;
			if (this.pendingTracks.length < this.numberOfTracks) {
				if (flushSource !== "VideoSegmentStream" && flushSource !== "AudioSegmentStream") return;
				else if (this.remuxTracks) return;
				else if (this.pendingTracks.length === 0) {
					this.emittedTracks++;
					if (this.emittedTracks >= this.numberOfTracks) {
						this.trigger("done");
						this.emittedTracks = 0;
					}
					return;
				}
			}
			if (this.videoTrack) {
				timelineStartPts = this.videoTrack.timelineStartInfo.pts;
				VIDEO_PROPERTIES.forEach(function(prop) {
					event.info[prop] = this.videoTrack[prop];
				}, this);
			} else if (this.audioTrack) {
				timelineStartPts = this.audioTrack.timelineStartInfo.pts;
				AUDIO_PROPERTIES.forEach(function(prop) {
					event.info[prop] = this.audioTrack[prop];
				}, this);
			}
			if (this.videoTrack || this.audioTrack) {
				if (this.pendingTracks.length === 1) event.type = this.pendingTracks[0].type;
				else event.type = "combined";
				this.emittedTracks += this.pendingTracks.length;
				initSegment = mp4.initSegment(this.pendingTracks);
				event.initSegment = new Uint8Array(initSegment.byteLength);
				event.initSegment.set(initSegment);
				event.data = new Uint8Array(this.pendingBytes);
				for (i = 0; i < this.pendingBoxes.length; i++) {
					event.data.set(this.pendingBoxes[i], offset);
					offset += this.pendingBoxes[i].byteLength;
				}
				for (i = 0; i < this.pendingCaptions.length; i++) {
					caption = this.pendingCaptions[i];
					caption.startTime = clock.metadataTsToSeconds(caption.startPts, timelineStartPts, this.keepOriginalTimestamps);
					caption.endTime = clock.metadataTsToSeconds(caption.endPts, timelineStartPts, this.keepOriginalTimestamps);
					event.captionStreams[caption.stream] = true;
					event.captions.push(caption);
				}
				for (i = 0; i < this.pendingMetadata.length; i++) {
					id3 = this.pendingMetadata[i];
					id3.cueTime = clock.metadataTsToSeconds(id3.pts, timelineStartPts, this.keepOriginalTimestamps);
					event.metadata.push(id3);
				}
				event.metadata.dispatchType = this.metadataStream.dispatchType;
				this.pendingTracks.length = 0;
				this.videoTrack = null;
				this.pendingBoxes.length = 0;
				this.pendingCaptions.length = 0;
				this.pendingBytes = 0;
				this.pendingMetadata.length = 0;
				this.trigger("data", event);
				for (i = 0; i < event.captions.length; i++) {
					caption = event.captions[i];
					this.trigger("caption", caption);
				}
				for (i = 0; i < event.metadata.length; i++) {
					id3 = event.metadata[i];
					this.trigger("id3Frame", id3);
				}
			}
			if (this.emittedTracks >= this.numberOfTracks) {
				this.trigger("done");
				this.emittedTracks = 0;
			}
		};
		_CoalesceStream.prototype.setRemux = function(val) {
			this.remuxTracks = val;
		};
		/**
		* A Stream that expects MP2T binary data as input and produces
		* corresponding media segments, suitable for use with Media Source
		* Extension (MSE) implementations that support the ISO BMFF byte
		* stream format, like Chrome.
		*/
		_Transmuxer = function Transmuxer(options) {
			var self = this, hasFlushed = true, videoTrack, audioTrack;
			_Transmuxer.prototype.init.call(this);
			options = options || {};
			this.baseMediaDecodeTime = options.baseMediaDecodeTime || 0;
			this.transmuxPipeline_ = {};
			this.setupAacPipeline = function() {
				var pipeline = {};
				this.transmuxPipeline_ = pipeline;
				pipeline.type = "aac";
				pipeline.metadataStream = new m2ts.MetadataStream();
				pipeline.aacStream = new AacStream();
				pipeline.audioTimestampRolloverStream = new m2ts.TimestampRolloverStream("audio");
				pipeline.timedMetadataTimestampRolloverStream = new m2ts.TimestampRolloverStream("timed-metadata");
				pipeline.adtsStream = new AdtsStream();
				pipeline.coalesceStream = new _CoalesceStream(options, pipeline.metadataStream);
				pipeline.headOfPipeline = pipeline.aacStream;
				pipeline.aacStream.pipe(pipeline.audioTimestampRolloverStream).pipe(pipeline.adtsStream);
				pipeline.aacStream.pipe(pipeline.timedMetadataTimestampRolloverStream).pipe(pipeline.metadataStream).pipe(pipeline.coalesceStream);
				pipeline.metadataStream.on("timestamp", function(frame) {
					pipeline.aacStream.setTimestamp(frame.timeStamp);
				});
				pipeline.aacStream.on("data", function(data) {
					if (data.type !== "timed-metadata" && data.type !== "audio" || pipeline.audioSegmentStream) return;
					audioTrack = audioTrack || {
						timelineStartInfo: { baseMediaDecodeTime: self.baseMediaDecodeTime },
						codec: "adts",
						type: "audio"
					};
					pipeline.coalesceStream.numberOfTracks++;
					pipeline.audioSegmentStream = new _AudioSegmentStream(audioTrack, options);
					pipeline.audioSegmentStream.on("log", self.getLogTrigger_("audioSegmentStream"));
					pipeline.audioSegmentStream.on("timingInfo", self.trigger.bind(self, "audioTimingInfo"));
					pipeline.adtsStream.pipe(pipeline.audioSegmentStream).pipe(pipeline.coalesceStream);
					self.trigger("trackinfo", {
						hasAudio: !!audioTrack,
						hasVideo: !!videoTrack
					});
				});
				pipeline.coalesceStream.on("data", this.trigger.bind(this, "data"));
				pipeline.coalesceStream.on("done", this.trigger.bind(this, "done"));
				addPipelineLogRetriggers(this, pipeline);
			};
			this.setupTsPipeline = function() {
				var pipeline = {};
				this.transmuxPipeline_ = pipeline;
				pipeline.type = "ts";
				pipeline.metadataStream = new m2ts.MetadataStream();
				pipeline.packetStream = new m2ts.TransportPacketStream();
				pipeline.parseStream = new m2ts.TransportParseStream();
				pipeline.elementaryStream = new m2ts.ElementaryStream();
				pipeline.timestampRolloverStream = new m2ts.TimestampRolloverStream();
				pipeline.adtsStream = new AdtsStream();
				pipeline.h264Stream = new H264Stream();
				pipeline.captionStream = new m2ts.CaptionStream(options);
				pipeline.coalesceStream = new _CoalesceStream(options, pipeline.metadataStream);
				pipeline.headOfPipeline = pipeline.packetStream;
				pipeline.packetStream.pipe(pipeline.parseStream).pipe(pipeline.elementaryStream).pipe(pipeline.timestampRolloverStream);
				pipeline.timestampRolloverStream.pipe(pipeline.h264Stream);
				pipeline.timestampRolloverStream.pipe(pipeline.adtsStream);
				pipeline.timestampRolloverStream.pipe(pipeline.metadataStream).pipe(pipeline.coalesceStream);
				pipeline.h264Stream.pipe(pipeline.captionStream).pipe(pipeline.coalesceStream);
				pipeline.elementaryStream.on("data", function(data) {
					var i;
					if (data.type === "metadata") {
						i = data.tracks.length;
						while (i--) if (!videoTrack && data.tracks[i].type === "video") {
							videoTrack = data.tracks[i];
							videoTrack.timelineStartInfo.baseMediaDecodeTime = self.baseMediaDecodeTime;
						} else if (!audioTrack && data.tracks[i].type === "audio") {
							audioTrack = data.tracks[i];
							audioTrack.timelineStartInfo.baseMediaDecodeTime = self.baseMediaDecodeTime;
						}
						if (videoTrack && !pipeline.videoSegmentStream) {
							pipeline.coalesceStream.numberOfTracks++;
							pipeline.videoSegmentStream = new _VideoSegmentStream(videoTrack, options);
							pipeline.videoSegmentStream.on("log", self.getLogTrigger_("videoSegmentStream"));
							pipeline.videoSegmentStream.on("timelineStartInfo", function(timelineStartInfo) {
								if (audioTrack && !options.keepOriginalTimestamps) {
									audioTrack.timelineStartInfo = timelineStartInfo;
									pipeline.audioSegmentStream.setEarliestDts(timelineStartInfo.dts - self.baseMediaDecodeTime);
								}
							});
							pipeline.videoSegmentStream.on("processedGopsInfo", self.trigger.bind(self, "gopInfo"));
							pipeline.videoSegmentStream.on("segmentTimingInfo", self.trigger.bind(self, "videoSegmentTimingInfo"));
							pipeline.videoSegmentStream.on("baseMediaDecodeTime", function(baseMediaDecodeTime) {
								if (audioTrack) pipeline.audioSegmentStream.setVideoBaseMediaDecodeTime(baseMediaDecodeTime);
							});
							pipeline.videoSegmentStream.on("timingInfo", self.trigger.bind(self, "videoTimingInfo"));
							pipeline.h264Stream.pipe(pipeline.videoSegmentStream).pipe(pipeline.coalesceStream);
						}
						if (audioTrack && !pipeline.audioSegmentStream) {
							pipeline.coalesceStream.numberOfTracks++;
							pipeline.audioSegmentStream = new _AudioSegmentStream(audioTrack, options);
							pipeline.audioSegmentStream.on("log", self.getLogTrigger_("audioSegmentStream"));
							pipeline.audioSegmentStream.on("timingInfo", self.trigger.bind(self, "audioTimingInfo"));
							pipeline.audioSegmentStream.on("segmentTimingInfo", self.trigger.bind(self, "audioSegmentTimingInfo"));
							pipeline.adtsStream.pipe(pipeline.audioSegmentStream).pipe(pipeline.coalesceStream);
						}
						self.trigger("trackinfo", {
							hasAudio: !!audioTrack,
							hasVideo: !!videoTrack
						});
					}
				});
				pipeline.coalesceStream.on("data", this.trigger.bind(this, "data"));
				pipeline.coalesceStream.on("id3Frame", function(id3Frame) {
					id3Frame.dispatchType = pipeline.metadataStream.dispatchType;
					self.trigger("id3Frame", id3Frame);
				});
				pipeline.coalesceStream.on("caption", this.trigger.bind(this, "caption"));
				pipeline.coalesceStream.on("done", this.trigger.bind(this, "done"));
				addPipelineLogRetriggers(this, pipeline);
			};
			this.setBaseMediaDecodeTime = function(baseMediaDecodeTime) {
				var pipeline = this.transmuxPipeline_;
				if (!options.keepOriginalTimestamps) this.baseMediaDecodeTime = baseMediaDecodeTime;
				if (audioTrack) {
					audioTrack.timelineStartInfo.dts = void 0;
					audioTrack.timelineStartInfo.pts = void 0;
					trackDecodeInfo.clearDtsInfo(audioTrack);
					if (pipeline.audioTimestampRolloverStream) pipeline.audioTimestampRolloverStream.discontinuity();
				}
				if (videoTrack) {
					if (pipeline.videoSegmentStream) pipeline.videoSegmentStream.gopCache_ = [];
					videoTrack.timelineStartInfo.dts = void 0;
					videoTrack.timelineStartInfo.pts = void 0;
					trackDecodeInfo.clearDtsInfo(videoTrack);
					pipeline.captionStream.reset();
				}
				if (pipeline.timestampRolloverStream) pipeline.timestampRolloverStream.discontinuity();
			};
			this.setAudioAppendStart = function(timestamp) {
				if (audioTrack) this.transmuxPipeline_.audioSegmentStream.setAudioAppendStart(timestamp);
			};
			this.setRemux = function(val) {
				var pipeline = this.transmuxPipeline_;
				options.remux = val;
				if (pipeline && pipeline.coalesceStream) pipeline.coalesceStream.setRemux(val);
			};
			this.alignGopsWith = function(gopsToAlignWith) {
				if (videoTrack && this.transmuxPipeline_.videoSegmentStream) this.transmuxPipeline_.videoSegmentStream.alignGopsWith(gopsToAlignWith);
			};
			this.getLogTrigger_ = function(key) {
				var self = this;
				return function(event) {
					event.stream = key;
					self.trigger("log", event);
				};
			};
			this.push = function(data) {
				if (hasFlushed) {
					var isAac = isLikelyAacData(data);
					if (isAac && this.transmuxPipeline_.type !== "aac") this.setupAacPipeline();
					else if (!isAac && this.transmuxPipeline_.type !== "ts") this.setupTsPipeline();
					hasFlushed = false;
				}
				this.transmuxPipeline_.headOfPipeline.push(data);
			};
			this.flush = function() {
				hasFlushed = true;
				this.transmuxPipeline_.headOfPipeline.flush();
			};
			this.endTimeline = function() {
				this.transmuxPipeline_.headOfPipeline.endTimeline();
			};
			this.reset = function() {
				if (this.transmuxPipeline_.headOfPipeline) this.transmuxPipeline_.headOfPipeline.reset();
			};
			this.resetCaptions = function() {
				if (this.transmuxPipeline_.captionStream) this.transmuxPipeline_.captionStream.reset();
			};
		};
		_Transmuxer.prototype = new Stream();
		module.exports = {
			Transmuxer: _Transmuxer,
			VideoSegmentStream: _VideoSegmentStream,
			AudioSegmentStream: _AudioSegmentStream,
			AUDIO_PROPERTIES,
			VIDEO_PROPERTIES,
			generateSegmentTimingInfo
		};
	})))();
	//#endregion
	//#region src/features/clipDownloads/transmuxerSession.ts
	const ISOLATED_TRACK_TYPES = /* @__PURE__ */ new Set(["audio", "video"]);
	function createTransmuxerSession(transmuxer) {
		let firstInitSegment;
		let pendingSegments = [];
		transmuxer.on("data", (segment) => {
			pendingSegments.push(segment);
		});
		function push(bytes) {
			transmuxer.push(bytes);
		}
		function flush() {
			pendingSegments = [];
			transmuxer.flush();
			const isolatedTrackRecovered = pendingSegments.length === 0 && firstInitSegment !== void 0;
			if (isolatedTrackRecovered) try {
				transmuxer.setRemux(false);
				transmuxer.flush();
			} finally {
				transmuxer.setRemux(true);
			}
			if (pendingSegments.length !== 1) throw new Error("The segment produced an unexpected output layout.");
			const [segment] = pendingSegments;
			pendingSegments = [];
			if (segment.type !== "combined" && !(isolatedTrackRecovered && ISOLATED_TRACK_TYPES.has(segment.type))) throw new Error("The clip did not produce supported audio and video tracks.");
			if (segment.data.byteLength > 8388608) throw new Error("The MP4 fragment exceeds the safe output limit.");
			let initSegment;
			if (segment.type === "combined") {
				if (!firstInitSegment) {
					firstInitSegment = segment.initSegment.slice();
					initSegment = firstInitSegment.slice();
				} else if (!equalBytes(firstInitSegment, segment.initSegment)) throw new Error("The clip track metadata changes during playback.");
			}
			return {
				data: segment.data,
				...initSegment ? { initSegment } : {}
			};
		}
		return {
			flush,
			push
		};
	}
	function equalBytes(left, right) {
		if (left.byteLength !== right.byteLength) return false;
		for (let index = 0; index < left.byteLength; index += 1) if (left[index] !== right[index]) return false;
		return true;
	}
	//#endregion
	//#region src/features/clipDownloads/download.worker.ts
	const worker = self;
	const session = createTransmuxerSession(new import_transmuxer.Transmuxer({ remux: true }));
	worker.onmessage = (event) => {
		const message = event.data;
		try {
			if (message.type === "cancel") {
				worker.close();
				return;
			}
			if (message.type === "push") {
				session.push(new Uint8Array(message.bytes));
				respond({
					requestId: message.requestId,
					type: "pushed"
				});
				return;
			}
			const fragment = session.flush();
			const data = toTransferBuffer(fragment.data);
			const initSegment = fragment.initSegment ? toTransferBuffer(fragment.initSegment) : void 0;
			respond({
				data,
				...initSegment ? { initSegment } : {},
				requestId: message.requestId,
				type: "fragment"
			}, initSegment ? [initSegment, data] : [data]);
		} catch {
			respond({
				message: "The clip could not be converted to MP4.",
				requestId: message.type === "cancel" ? void 0 : message.requestId,
				type: "error"
			});
		}
	};
	function respond(message, transfer = []) {
		worker.postMessage(message, transfer);
	}
	function toTransferBuffer(bytes) {
		if (bytes.byteOffset === 0 && bytes.byteLength === bytes.buffer.byteLength && bytes.buffer instanceof ArrayBuffer) return bytes.buffer;
		return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
	}
	//#endregion
})();
`;
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
			const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
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
					await writable.write(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
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
				parts.push(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
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
	var nextJobNumber = 1;
	function createDownloadManager(dependencies) {
		const jobs = new Map();
		const runtimes = new Map();
		const listeners = new Set();
		const inspectionQueue = [];
		const mediaQueue = [];
		let activeInspections = 0;
		let reservedMediaJobId;
		function publish() {
			for (const listener of listeners) listener();
		}
		function getSnapshot() {
			return { jobs: [...jobs.values()].map((job) => ({
				...job,
				queuePosition: job.status === "queued" ? mediaQueue.indexOf(job.id) + 1 : void 0
			})) };
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
			const visibleJobs = [...jobs.values()];
			const activeCount = visibleJobs.filter((job) => ACTIVE_STATUSES.has(job.status)).length;
			const queuedCount = visibleJobs.filter((job) => job.status === "queued" || job.status === "awaiting-destination").length;
			const attention = visibleJobs.some((job) => TERMINAL_STATUSES.has(job.status) && !job.acknowledged) || visibleJobs.some((job) => ATTENTION_STATUSES.has(job.status));
			return {
				activeCount,
				attention,
				error: visibleJobs.some((job) => job.status === "failed" && !job.acknowledged),
				queuedCount,
				visible: activeCount > 0 || queuedCount > 0 || attention
			};
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
	function useDownloads() {
		const [snapshot, setSnapshot] = (0, preact_hooks.useState)(downloadManager.getSnapshot);
		(0, preact_hooks.useEffect)(() => downloadManager.subscribe(() => {
			setSnapshot(downloadManager.getSnapshot());
		}), []);
		return snapshot;
	}
	function useDownloadActivity() {
		const [summary, setSummary] = (0, preact_hooks.useState)(downloadManager.getActivitySummary);
		(0, preact_hooks.useEffect)(() => downloadManager.subscribe(() => {
			const next = downloadManager.getActivitySummary();
			setSummary((current) => activityEquals(current, next) ? current : next);
		}), []);
		return summary;
	}
	function useDownloadCenter() {
		const [snapshot, setSnapshot] = (0, preact_hooks.useState)(getDownloadCenterSnapshot);
		(0, preact_hooks.useEffect)(() => subscribeDownloadCenter(() => {
			setSnapshot(getDownloadCenterSnapshot());
		}), []);
		return snapshot;
	}
	function activityEquals(left, right) {
		return left.activeCount === right.activeCount && left.attention === right.attention && left.error === right.error && left.queuedCount === right.queuedCount && left.visible === right.visible;
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
			renderCell: (job) => (0, preact_jsx_runtime.jsxs)("div", {
				className: "ke-download-queue__clip",
				children: [job.thumbnailUrl ? (0, preact_jsx_runtime.jsx)("img", {
					alt: "",
					className: "ke-download-queue__thumbnail",
					referrerPolicy: "no-referrer",
					src: job.thumbnailUrl
				}) : null, (0, preact_jsx_runtime.jsx)("span", {
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
			renderCell: (job) => (0, preact_jsx_runtime.jsx)("span", {
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
		const [activeTab, setActiveTab] = (0, preact_hooks.useState)("selected");
		const listedJobs = jobs.filter((job) => job.media !== void 0);
		const focusedJob = jobs.find(({ id }) => id === center.focusedJobId) ?? jobs.at(-1);
		(0, preact_hooks.useEffect)(() => {
			if (center.open && !focusedJob) minimizeDownloadCenter();
		}, [center.open, focusedJob]);
		(0, preact_hooks.useEffect)(() => {
			if (center.open && focusedJob && focusedJob.id !== center.focusedJobId) focusDownloadJob(focusedJob.id);
		}, [
			center.focusedJobId,
			center.open,
			focusedJob
		]);
		(0, preact_hooks.useEffect)(() => {
			if (center.open && center.focusedJobId) setActiveTab("selected");
		}, [center.focusedJobId, center.open]);
		return (0, preact_jsx_runtime.jsx)(Modal, {
			className: "ke-workspace-modal ke-download-center",
			closeLabel: "Close Download Manager",
			description: "Manage clip downloads.",
			footer: (0, preact_jsx_runtime.jsxs)(preact_jsx_runtime.Fragment, { children: [(0, preact_jsx_runtime.jsx)(Button, {
				disabled: !jobs.some((job) => [
					"cancelled",
					"completed",
					"failed",
					"ready"
				].includes(job.status)),
				onClick: clearInactiveDownloads,
				children: "Clear inactive"
			}), (0, preact_jsx_runtime.jsx)(Button, {
				className: "ke-button--primary",
				onClick: minimizeDownloadCenter,
				children: "Hide"
			})] }),
			icon: icon_default,
			onRequestClose: minimizeDownloadCenter,
			open: center.open,
			title: "Download Manager",
			children: (0, preact_jsx_runtime.jsx)(Tabs, {
				ariaLabel: "Download Manager views",
				className: "ke-download-center__tabs",
				onChange: setActiveTab,
				tabs: [{
					content: focusedJob ? (0, preact_jsx_runtime.jsx)(DownloadJobDetail, { job: focusedJob }) : (0, preact_jsx_runtime.jsx)("div", {
						className: "ke-download-center__placeholder",
						children: "No clip selected."
					}),
					contentClassName: "ke-download-center__selected-panel",
					disabled: !focusedJob,
					id: "selected",
					label: "Selected",
					panelAriaLabel: "Selected clip download details"
				}, {
					content: (0, preact_jsx_runtime.jsx)(DownloadQueue, {
						focusedJobId: focusedJob?.id,
						jobs: listedJobs,
						onSelect: (jobId) => {
							focusDownloadJob(jobId);
							setActiveTab("selected");
						}
					}),
					contentClassName: "ke-download-center__downloads-panel",
					id: "downloads",
					label: (0, preact_jsx_runtime.jsxs)("span", {
						className: "ke-download-center__tab-label",
						children: ["Downloads", activeCount > 0 ? (0, preact_jsx_runtime.jsx)(LoadingSpinnerIcon, { class: "ke-icon ke-download-center__activity-indicator ke-icon--spinner" }) : null]
					}),
					panelAriaLabel: "Clip download queue and history"
				}],
				value: activeTab
			})
		});
	}
	function DownloadQueue({ focusedJobId, jobs, onSelect }) {
		return (0, preact_jsx_runtime.jsx)(ListView, {
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
		if (job.status === "inspecting") return (0, preact_jsx_runtime.jsxs)("section", {
			"aria-live": "polite",
			className: "ke-download-detail-loading",
			role: "status",
			children: [(0, preact_jsx_runtime.jsx)(LoadingSpinnerIcon, { class: "ke-icon ke-download-detail-loading__icon ke-icon--spinner" }), (0, preact_jsx_runtime.jsx)("p", { children: "Loading clip…" })]
		});
		return (0, preact_jsx_runtime.jsxs)("article", {
			className: "ke-download-detail",
			children: [
				(0, preact_jsx_runtime.jsxs)("section", {
					className: `ke-download-detail__summary${job.thumbnailUrl ? "" : " has-no-thumbnail"}`,
					children: [job.thumbnailUrl ? (0, preact_jsx_runtime.jsx)("div", {
						className: "ke-download-detail__thumbnail-frame",
						children: (0, preact_jsx_runtime.jsx)("img", {
							alt: "",
							className: "ke-download-detail__thumbnail",
							referrerPolicy: "no-referrer",
							src: job.thumbnailUrl
						})
					}) : null, (0, preact_jsx_runtime.jsxs)("div", {
						className: "ke-download-detail__overview",
						children: [(0, preact_jsx_runtime.jsx)("header", {
							className: "ke-download-detail__header",
							children: (0, preact_jsx_runtime.jsxs)("div", {
								className: "ke-download-detail__identity",
								children: [
									job.category || job.publishedAt ? (0, preact_jsx_runtime.jsxs)("div", {
										className: "ke-download-detail__context",
										children: [job.category ? (0, preact_jsx_runtime.jsx)("span", {
											className: "ke-download-detail__category",
											children: job.category
										}) : null, job.publishedAt ? (0, preact_jsx_runtime.jsx)("time", {
											dateTime: new Date(job.publishedAt).toISOString(),
											children: CLIP_DATE_FORMATTER.format(job.publishedAt)
										}) : null]
									}) : null,
									(0, preact_jsx_runtime.jsx)("h3", {
										className: "ke-download-detail__title",
										children: job.channel ? (0, preact_jsx_runtime.jsx)("a", {
											className: "ke-download-detail__title-link",
											href: `https://kick.com/${encodeURIComponent(job.channel)}/clips/${encodeURIComponent(job.clipId)}`,
											rel: "noreferrer",
											target: "_blank",
											children: job.title ?? "KICK clip"
										}) : job.title ?? "KICK clip"
									}),
									(0, preact_jsx_runtime.jsxs)("p", {
										className: "ke-download-detail__metadata",
										children: [job.channel ? (0, preact_jsx_runtime.jsx)("a", {
											className: "ke-download-detail__channel",
											href: `https://kick.com/${encodeURIComponent(job.channel)}`,
											rel: "noreferrer",
											target: "_blank",
											children: job.channel
										}) : "Unknown channel", job.creator ? (0, preact_jsx_runtime.jsxs)(preact_jsx_runtime.Fragment, { children: [(0, preact_jsx_runtime.jsx)("span", {
											"aria-hidden": "true",
											className: "ke-download-detail__separator",
											children: "–"
										}), (0, preact_jsx_runtime.jsxs)("span", { children: [
											"Clipped by",
											" ",
											(0, preact_jsx_runtime.jsx)("a", {
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
						}), job.media ? (0, preact_jsx_runtime.jsx)(MediaFacts, { job }) : null]
					})]
				}),
				job.status === "ready" ? (0, preact_jsx_runtime.jsx)(ReadyView, { job }) : null,
				job.status === "queued" ? (0, preact_jsx_runtime.jsx)(StatusPanel, {
					message: `Waiting in queue${job.queuePosition ? ` (position ${job.queuePosition})` : ""}.`,
					children: (0, preact_jsx_runtime.jsx)(Button, {
						onClick: () => downloadManager.cancel(job.id),
						children: "Cancel"
					})
				}) : null,
				job.status === "awaiting-destination" ? (0, preact_jsx_runtime.jsxs)(StatusPanel, {
					message: "This download is next. Choose its destination to start.",
					children: [(0, preact_jsx_runtime.jsx)(Button, {
						className: "ke-button--primary",
						onClick: () => {
							downloadManager.chooseDestination(job.id);
						},
						children: "Choose file and start"
					}), (0, preact_jsx_runtime.jsx)(Button, {
						onClick: () => downloadManager.cancel(job.id),
						children: "Cancel"
					})]
				}) : null,
				job.status === "choosing-destination" ? (0, preact_jsx_runtime.jsx)(StatusPanel, {
					icon: true,
					message: "Waiting for a file destination…"
				}) : null,
				job.status === "active" ? (0, preact_jsx_runtime.jsx)(ActiveView, { job }) : null,
				job.status === "completed" ? (0, preact_jsx_runtime.jsx)(TerminalView, {
					job,
					message: `Saved ${job.filename}`,
					primaryLabel: "Download again"
				}) : null,
				job.status === "failed" ? (0, preact_jsx_runtime.jsx)(TerminalView, {
					job,
					message: job.error?.message ?? "The clip download failed.",
					primaryLabel: "Retry"
				}) : null,
				job.status === "cancelled" ? (0, preact_jsx_runtime.jsx)(TerminalView, {
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
		return (0, preact_jsx_runtime.jsxs)("form", {
			className: "ke-download-ready",
			onSubmit: (event) => {
				event.preventDefault();
				downloadManager.requestDownload(job.id, hasFilePicker ? "file-system" : "memory");
			},
			children: [
				(0, preact_jsx_runtime.jsx)(TextField, {
					label: "Output filename",
					maxLength: 180,
					onValueChange: (value) => downloadManager.updateBasename(job.id, value),
					suffix: ".mp4",
					value: job.basename
				}),
				job.error ? (0, preact_jsx_runtime.jsx)("p", {
					className: "ke-download-message is-error",
					role: "alert",
					children: job.error.message
				}) : null,
				!hasFilePicker && isLargeFallback ? (0, preact_jsx_runtime.jsx)("p", {
					className: "ke-download-message is-warning",
					children: "This browser must keep the final MP4 in memory. The clip is unusually large, so close memory-heavy tabs before continuing."
				}) : null,
				hasFilePicker ? (0, preact_jsx_runtime.jsx)("p", {
					className: "ke-download-message",
					children: "If you select an existing file, the browser may clear it before processing finishes."
				}) : null,
				(0, preact_jsx_runtime.jsxs)("div", {
					className: "ke-download-actions",
					children: [
						(0, preact_jsx_runtime.jsx)(Button, {
							className: "ke-button--primary",
							type: "submit",
							children: "Download"
						}),
						hasFilePicker ? (0, preact_jsx_runtime.jsx)(Button, {
							onClick: () => downloadManager.requestDownload(job.id, "memory"),
							children: "Use memory download"
						}) : null,
						(0, preact_jsx_runtime.jsx)(Button, {
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
		return (0, preact_jsx_runtime.jsxs)("section", {
			className: "ke-download-active",
			children: [(0, preact_jsx_runtime.jsxs)("div", {
				className: "ke-download-progress",
				children: [(0, preact_jsx_runtime.jsxs)("div", {
					className: "ke-download-progress__heading",
					children: [(0, preact_jsx_runtime.jsx)("span", { children: job.phase === "fetching" ? formatFetchingStatus(job, Date.now()) : formatPhase(job.phase) }), (0, preact_jsx_runtime.jsxs)("span", { children: [formatBytes(job.writtenBytes), total ? ` of ${formatBytes(total)} - ${percentage?.toFixed(1)}%` : ` - ${job.completedSegments}/${job.media?.logicalSegmentCount ?? "?"} segments`] })]
				}), (0, preact_jsx_runtime.jsx)("progress", {
					"aria-label": "Download progress",
					className: "ke-download-progress__bar",
					max: total ?? void 0,
					value: total ? job.writtenBytes : void 0
				})]
			}), (0, preact_jsx_runtime.jsx)("div", {
				className: "ke-download-actions",
				children: (0, preact_jsx_runtime.jsx)(Button, {
					tone: "danger",
					onClick: () => downloadManager.cancel(job.id),
					children: "Cancel"
				})
			})]
		});
	}
	function TerminalView({ job, message, primaryLabel }) {
		return (0, preact_jsx_runtime.jsxs)(StatusPanel, {
			error: job.status === "failed",
			message,
			children: [(0, preact_jsx_runtime.jsx)(Button, {
				className: "ke-button--primary",
				onClick: () => downloadManager.retry(job.id),
				children: primaryLabel
			}), (0, preact_jsx_runtime.jsx)(Button, {
				onClick: () => removeDownload(job.id),
				children: "Remove"
			})]
		});
	}
	function MediaFacts({ job }) {
		const media = job.media;
		if (!media) return null;
		return (0, preact_jsx_runtime.jsxs)("dl", {
			className: "ke-download-facts",
			children: [
				(0, preact_jsx_runtime.jsxs)("div", { children: [(0, preact_jsx_runtime.jsx)("dt", { children: "Duration" }), (0, preact_jsx_runtime.jsx)("dd", { children: formatDuration(media.duration) })] }),
				(0, preact_jsx_runtime.jsxs)("div", { children: [(0, preact_jsx_runtime.jsx)("dt", { children: "Download size" }), (0, preact_jsx_runtime.jsxs)("dd", { children: [media.sourceBytes ? formatBytes(media.sourceBytes) : "Unknown", (0, preact_jsx_runtime.jsxs)("span", {
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
				job.viewCount !== void 0 ? (0, preact_jsx_runtime.jsxs)("div", { children: [(0, preact_jsx_runtime.jsx)("dt", { children: "Views" }), (0, preact_jsx_runtime.jsx)("dd", { children: COUNT_FORMATTER.format(job.viewCount) })] }) : null,
				job.likeCount !== void 0 ? (0, preact_jsx_runtime.jsxs)("div", { children: [(0, preact_jsx_runtime.jsx)("dt", { children: "Likes" }), (0, preact_jsx_runtime.jsx)("dd", { children: COUNT_FORMATTER.format(job.likeCount) })] }) : null
			]
		});
	}
	function StatusPanel({ children, error = false, icon = false, message }) {
		return (0, preact_jsx_runtime.jsxs)("section", {
			className: "ke-download-status",
			children: [(0, preact_jsx_runtime.jsxs)("p", {
				className: `ke-download-message${error ? " is-error" : ""}`,
				role: error ? "alert" : "status",
				children: [icon ? (0, preact_jsx_runtime.jsx)(LoadingSpinnerIcon, { class: "ke-icon ke-icon--spinner" }) : null, (0, preact_jsx_runtime.jsx)("span", { children: message })]
			}), children ? (0, preact_jsx_runtime.jsx)("div", {
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
	var log$7 = createLogger("clip-downloads");
	var stopActiveIntegration;
	function defaultSelectClip(clipId) {
		log$7.info("Manager opened", { clipId });
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
		(0, preact.render)((0, preact_jsx_runtime.jsx)(DownloadCenter, {}), host);
	}
	function startClipDownloadActions(onSelectClip = defaultSelectClip) {
		stopActiveIntegration?.();
		let observer;
		let actionsVisible = getSettings().ui.showClipDownloadButtons;
		let directActionClipId;
		let directActionHost;
		let stopWatchingSettings;
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
				(0, preact.render)((0, preact_jsx_runtime.jsx)(ClipDownloadAction, {
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
				(0, preact.render)(null, host);
				host.remove();
			},
			update: (host, { clipId }) => {
				(0, preact.render)((0, preact_jsx_runtime.jsx)(ClipDownloadAction, {
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
			(0, preact.render)(null, directActionHost);
			directActionHost.remove();
			directActionClipId = void 0;
			directActionHost = void 0;
		}
		function reconcileDirectClipAction() {
			if (directActionHost && !directActionHost.isConnected) {
				(0, preact.render)(null, directActionHost);
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
					(0, preact.render)((0, preact_jsx_runtime.jsx)(DirectClipDownloadAction, {
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
			(0, preact.render)((0, preact_jsx_runtime.jsx)(DirectClipDownloadAction, {
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
			mountDownloadCenter();
			reconcileDirectClipAction();
			let shouldCleanDisconnectedActions = false;
			for (const record of records) {
				if (record.type === "attributes") {
					enqueueClosestCard(record.target);
					continue;
				}
				if (record.removedNodes.length > 0) shouldCleanDisconnectedActions = true;
				enqueueClosestCard(record.target);
				for (const node of record.addedNodes) enqueueCardsFromSubtree(node);
			}
			if (shouldCleanDisconnectedActions) scheduler.enqueue(void 0);
		}
		function beginObserving() {
			if (stopped) return;
			installStyles$1();
			mountDownloadCenter();
			reconcileDirectClipAction();
			if (actionsVisible) for (const card of document.querySelectorAll(CLIP_CARD_SELECTOR)) scheduler.enqueue(card);
			observer = new MutationObserver(handleMutations);
			observer.observe(document.documentElement, {
				attributeFilter: ["href"],
				attributes: true,
				childList: true,
				subtree: true
			});
		}
		const stopWaitingForDocument = onDocumentElementReady(beginObserving);
		stopWatchingSettings = observeSetting((settings) => settings.ui.showClipDownloadButtons, (visible) => {
			if (actionsVisible === visible) return;
			actionsVisible = visible;
			if (!visible) {
				reconciler.teardown();
				removeDirectClipAction();
				return;
			}
			reconcileDirectClipAction();
			for (const card of document.querySelectorAll(CLIP_CARD_SELECTOR)) scheduler.enqueue(card);
		});
		const stop = () => {
			if (stopped) return;
			stopped = true;
			stopWaitingForDocument();
			observer?.disconnect();
			stopWatchingSettings?.();
			scheduler.cancel();
			reconciler.teardown();
			removeDirectClipAction();
			const centerHost = document.getElementById(CENTER_HOST_ID);
			if (centerHost) {
				(0, preact.render)(null, centerHost);
				centerHost.remove();
			}
			document.getElementById(STYLE_ID$6)?.remove();
			if (stopActiveIntegration === stop) stopActiveIntegration = void 0;
		};
		stopActiveIntegration = stop;
		return stop;
	}
	var followingRecommendations_default = "[data-testid=following] [data-testid=followed-livestreams] + section {\n  display: none !important;\n}";
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
	var startFollowingRecommendationsVisibility = createStyleSettingFeature({
		id: "kick-enhancer-hide-following-recommendations",
		selectEnabled: (settings) => settings.ui.hideFollowingRecommendations,
		styles: followingRecommendations_default
	});
	var gamblingStreams_default = "[data-testid=followed-livestreams] [data-testid=livestream-results-card]:has(a[href=\"/category/slots\"]),\n#sidebar-wrapper [data-kick-enhancer-gambling-stream] {\n  display: none !important;\n}";
	var STYLE_ID$4 = "kick-enhancer-hide-gambling-streams";
	var SIDEBAR_GAMBLING_ATTRIBUTE = "data-kick-enhancer-gambling-stream";
	var SIDEBAR_FOLLOWING_SELECTOR = "a[data-testid^=\"sidebar-following-channel-\"]";
	var GAMBLING_SURFACE_SELECTOR = ["[data-testid=\"followed-livestreams\"]", "#sidebar-wrapper"].join(", ");
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
		return [...link.querySelectorAll("span")].some((span) => span.textContent?.trim() === "Slots & Casino");
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
		return records.some((record) => {
			if ((record.target instanceof Element ? record.target : record.target.parentElement)?.closest(GAMBLING_SURFACE_SELECTOR)) return true;
			return [...record.addedNodes, ...record.removedNodes].some((node) => node instanceof Element && (node.matches(GAMBLING_SURFACE_SELECTOR) || Boolean(node.querySelector(GAMBLING_SURFACE_SELECTOR))));
		});
	}
	function startGamblingStreamsVisibility() {
		stopActiveFeature$3?.();
		featureActive$1 = true;
		const observer = new MutationObserver((records) => {
			if (gamblingStreamsHidden && mutationsTouchGamblingSurfaces(records)) scheduleSidebarScan();
		});
		observer.observe(document.documentElement, {
			characterData: true,
			childList: true,
			subtree: true
		});
		const stopObserving = observeSetting((settings) => settings.ui.hideGamblingStreams, (hidden) => {
			gamblingStreamsHidden = hidden;
			applyGamblingStreamsVisibility(gamblingStreamsHidden);
			scheduleSidebarScan();
		});
		let stopped = false;
		const stop = () => {
			if (stopped) return;
			stopped = true;
			featureActive$1 = false;
			observer.disconnect();
			stopObserving();
			if (sidebarScanFrame !== void 0) {
				window.cancelAnimationFrame(sidebarScanFrame);
				sidebarScanFrame = void 0;
			}
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
	var log$6 = createLogger("sidebar");
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
		log$6.info("Restoring state", { collapsed: rememberedCollapsed });
		button.click();
	}
	function requestRestore() {
		if (!featureActive) return;
		restoreRequested = true;
		restoreTarget = void 0;
		queueMicrotask(attemptRestore);
	}
	function rememberCollapsedState(collapsed) {
		if (getSettings().ui.sidebarCollapsed === collapsed) return;
		log$6.info("State saved", { collapsed });
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
		log$6.info(enabled ? "Memory enabled" : "Memory disabled");
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
		activeLayout = getSidebarLayout();
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
		observer.observe(document.documentElement, {
			attributeFilter: ["data-sidebar"],
			attributes: true,
			childList: true,
			subtree: true
		});
		const stopObserving = subscribeSettings((settings) => {
			if (settings.ui.rememberSidebarState === rememberSidebarState) return;
			rememberSidebarState = settings.ui.rememberSidebarState;
			if (rememberSidebarState) requestRestore();
			else {
				restoreRequested = false;
				restoreTarget = void 0;
			}
		});
		if (rememberSidebarState) requestRestore();
		let stopped = false;
		const stop = () => {
			if (stopped) return;
			stopped = true;
			featureActive = false;
			observer.disconnect();
			stopObserving();
			activeLayout = null;
			rememberSidebarState = false;
			restoreRequested = false;
			restoreTarget = void 0;
			if (stopActiveFeature$2 === stop) stopActiveFeature$2 = void 0;
		};
		stopActiveFeature$2 = stop;
		return stop;
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
		let values = [];
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
	var log$5 = createLogger("diagnostics");
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
		log$5.info("Checks started", { slug });
		const channelResponse = await requestViewerJson(new URL(`/api/v2/channels/${encodeURIComponent(slug)}`, window.location.origin), signal);
		if (channelResponse.kind === "failed") {
			const results = [{
				durationMs: channelResponse.durationMs,
				endpoint: "CHANNEL_DETAILS",
				...channelResponse.httpStatus === void 0 ? {} : { httpStatus: channelResponse.httpStatus },
				status: "failed",
				summary: channelResponse.summary
			}, unavailableCurrentViewers("No livestream ID was available for this check.")];
			log$5.warn("Checks failed", {
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
			log$5.info("Checks complete", {
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
			log$5.warn("Checks failed", {
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
		log$5.info("Checks complete", {
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
	var CURRENT_VIEWERS_BATCH_SIZE = 10;
	var CHANNEL_POLL_INTERVAL_MS = 30 * 1e3;
	var LIST_POLL_INTERVAL_MS = 120 * 1e3;
	var RETRY_COOLDOWN_MS = 60 * 1e3;
	var log$4 = createLogger("viewer-counts:network");
	var ViewerCountAcquisition = class {
		options;
		#inFlightSlugs = new Map();
		#pendingPollSlugs = new Set();
		#pollingSlugs = new Set();
		#queuedSlugs = new Set();
		#retryAfterBySlug = new Map();
		#targetSlugs = new Set();
		#abortController = new AbortController();
		#activeChannelSlug;
		#activeFetches = 0;
		#channelPollTimer;
		#enabled = false;
		#generation = 0;
		#lastPollWarningAt = 0;
		#listPollTimer;
		#polling = false;
		#retryTimer;
		constructor(options) {
			this.options = options;
		}
		start() {
			if (this.#enabled) return;
			this.#enabled = true;
			document.addEventListener("visibilitychange", this.#handleVisibilityChange);
			this.#channelPollTimer = window.setInterval(() => {
				this.#pollActiveChannel();
			}, CHANNEL_POLL_INTERVAL_MS);
			this.#listPollTimer = window.setInterval(() => {
				this.#pollVisibleTargets();
			}, LIST_POLL_INTERVAL_MS);
		}
		stop() {
			if (!this.#enabled) return;
			this.#enabled = false;
			this.#generation += 1;
			this.#abortController.abort();
			this.#abortController = new AbortController();
			this.#activeChannelSlug = void 0;
			this.#queuedSlugs.clear();
			this.#pendingPollSlugs.clear();
			this.#pollingSlugs.clear();
			this.#targetSlugs.clear();
			this.#inFlightSlugs.clear();
			this.#retryAfterBySlug.clear();
			document.removeEventListener("visibilitychange", this.#handleVisibilityChange);
			if (this.#channelPollTimer !== void 0) {
				window.clearInterval(this.#channelPollTimer);
				this.#channelPollTimer = void 0;
			}
			if (this.#listPollTimer !== void 0) {
				window.clearInterval(this.#listPollTimer);
				this.#listPollTimer = void 0;
			}
			if (this.#retryTimer !== void 0) {
				window.clearTimeout(this.#retryTimer);
				this.#retryTimer = void 0;
			}
		}
		beginRoute() {
			if (!this.#enabled) return;
			this.#generation += 1;
			this.#abortController.abort();
			this.#abortController = new AbortController();
			this.#activeChannelSlug = void 0;
			this.#queuedSlugs.clear();
			this.#pendingPollSlugs.clear();
			this.#pollingSlugs.clear();
			this.#targetSlugs.clear();
			this.#inFlightSlugs.clear();
		}
		syncTargets(channelSlugs, activeChannelSlug) {
			if (!this.#enabled) return;
			this.#targetSlugs.clear();
			for (const slug of channelSlugs) this.#targetSlugs.add(slug);
			this.#activeChannelSlug = activeChannelSlug;
			const now = Date.now();
			for (const slug of this.#queuedSlugs) if (!this.#targetSlugs.has(slug)) this.#queuedSlugs.delete(slug);
			for (const slug of this.#pendingPollSlugs) if (!this.#targetSlugs.has(slug)) this.#pendingPollSlugs.delete(slug);
			for (const [slug, retryAfter] of this.#retryAfterBySlug) if (retryAfter <= now && !this.#targetSlugs.has(slug) && !this.#inFlightSlugs.has(slug)) this.#retryAfterBySlug.delete(slug);
			for (const slug of channelSlugs) if (needsChannelDetails(this.options.store.get(slug), slug === activeChannelSlug)) this.#queueChannelDetails(slug);
			else this.#queuedSlugs.delete(slug);
			this.#pumpChannelQueue();
		}
		#queueChannelDetails(slug) {
			const now = Date.now();
			if (this.#queuedSlugs.has(slug) || this.#inFlightSlugs.has(slug)) return;
			const retryAfter = this.#retryAfterBySlug.get(slug);
			if (retryAfter !== void 0 && retryAfter > now) {
				this.#scheduleRetry(retryAfter - now);
				return;
			}
			this.#queuedSlugs.add(slug);
		}
		#pumpChannelQueue() {
			while (this.#enabled && this.#activeFetches < CHANNEL_FETCH_CONCURRENCY && this.#queuedSlugs.size > 0) {
				const slug = this.#queuedSlugs.values().next().value;
				if (!slug) return;
				this.#queuedSlugs.delete(slug);
				const stream = this.options.store.get(slug);
				if (!this.#targetSlugs.has(slug) || !needsChannelDetails(stream, slug === this.#activeChannelSlug)) continue;
				const generation = this.#generation;
				this.#activeFetches += 1;
				this.#inFlightSlugs.set(slug, generation);
				this.#fetchChannelDetails(slug, generation).finally(() => {
					this.#activeFetches -= 1;
					if (this.#inFlightSlugs.get(slug) === generation) this.#inFlightSlugs.delete(slug);
					this.#pumpChannelQueue();
				});
			}
		}
		async #fetchChannelDetails(slug, generation) {
			const requestUrl = new URL(`/api/v2/channels/${encodeURIComponent(slug)}`, window.location.origin);
			try {
				const response = await requestViewerJson(requestUrl, this.#abortController.signal);
				if (response.kind === "failed") throw new Error(response.summary);
				if (!this.#enabled || generation !== this.#generation) return;
				const capturedAt = Date.now();
				const normalized = normalizeViewerCountPayload("CHANNEL_DETAILS", response.payload, capturedAt);
				recordViewerEndpointObservation("CHANNEL_DETAILS", normalized, capturedAt, "fallback");
				if (normalized.kind !== "streams" || normalized.streams.length === 0 || !normalized.streams.some((stream) => stream.isLive)) {
					this.options.store.remove(slug);
					this.#setRetryCooldown(slug);
					this.options.onData();
					return;
				}
				this.#retryAfterBySlug.delete(slug);
				this.options.store.upsertStreams(normalized.streams);
				this.options.onData();
				const stream = normalized.streams.find((entry) => entry.channelSlug === slug);
				if (slug === this.#activeChannelSlug) await this.#pollSlugs(new Set([slug]));
				if (stream && !stream.showViewCount) log$4.info("Fallback resolved", {
					slug,
					viewerCount: stream.viewerCount
				});
				else log$4.debug("Channel fetched", { slug });
			} catch (error) {
				if (!isAbortError(error)) {
					this.#setRetryCooldown(slug);
					log$4.warn("Channel fetch failed", {
						error: formatError(error),
						slug
					});
				}
			}
		}
		#setRetryCooldown(slug) {
			this.#retryAfterBySlug.set(slug, Date.now() + RETRY_COOLDOWN_MS);
			this.#scheduleRetry(RETRY_COOLDOWN_MS);
		}
		#scheduleRetry(delay) {
			if (this.#retryTimer !== void 0 || !this.#enabled) return;
			this.#retryTimer = window.setTimeout(() => {
				this.#retryTimer = void 0;
				for (const slug of this.#targetSlugs) if (needsChannelDetails(this.options.store.get(slug), slug === this.#activeChannelSlug)) this.#queueChannelDetails(slug);
				else this.#queuedSlugs.delete(slug);
				this.#pumpChannelQueue();
			}, Math.max(250, delay));
		}
		async #pollActiveChannel() {
			const slug = this.#activeChannelSlug;
			if (!slug) return;
			await this.#pollSlugs(new Set([slug]));
		}
		async #pollVisibleTargets() {
			await this.#pollSlugs(this.#targetSlugs);
		}
		async #pollSlugs(slugs) {
			if (!this.#enabled || document.hidden) return;
			for (const slug of slugs) if (!this.#pollingSlugs.has(slug)) this.#pendingPollSlugs.add(slug);
			if (this.#polling || this.#pendingPollSlugs.size === 0) return;
			this.#polling = true;
			try {
				while (this.#enabled && !document.hidden && this.#pendingPollSlugs.size > 0) {
					const pendingSlugs = new Set(this.#pendingPollSlugs);
					this.#pendingPollSlugs.clear();
					this.#pollingSlugs.clear();
					for (const slug of pendingSlugs) this.#pollingSlugs.add(slug);
					await this.#pollSlugBatch(pendingSlugs);
					this.#pollingSlugs.clear();
				}
			} finally {
				this.#pollingSlugs.clear();
				this.#polling = false;
				if (this.#enabled && !document.hidden && this.#pendingPollSlugs.size > 0) this.#pollSlugs(new Set());
			}
		}
		async #pollSlugBatch(slugs) {
			this.options.store.prune();
			const livestreamIds = [...this.options.store.getLivestreamIds(slugs)];
			if (livestreamIds.length === 0) {
				this.options.onData();
				return;
			}
			const generation = this.#generation;
			let updated = 0;
			try {
				for (let index = 0; index < livestreamIds.length; index += CURRENT_VIEWERS_BATCH_SIZE) {
					if (!this.#enabled || generation !== this.#generation) return;
					const batch = livestreamIds.slice(index, index + CURRENT_VIEWERS_BATCH_SIZE);
					const requestUrl = new URL("/current-viewers", window.location.origin);
					for (const id of batch) requestUrl.searchParams.append("ids[]", String(id));
					const response = await requestViewerJson(requestUrl, this.#abortController.signal);
					if (response.kind === "failed") throw new Error(response.summary);
					if (!this.#enabled || generation !== this.#generation) return;
					const capturedAt = Date.now();
					const normalized = normalizeViewerCountPayload("CURRENT_VIEWERS", response.payload, capturedAt);
					recordViewerEndpointObservation("CURRENT_VIEWERS", normalized, capturedAt, "fallback");
					if (normalized.kind === "current-viewers") {
						const receivedIds = new Set(normalized.currentViewers.map(({ livestreamId }) => livestreamId));
						updated += this.options.store.upsertCurrentViewers(normalized.currentViewers);
						updated += this.options.store.removeLivestreamIds(batch.filter((id) => !receivedIds.has(id)));
					}
				}
				if (updated > 0) log$4.debug("Refresh complete", {
					livestreams: livestreamIds.length,
					updated
				});
			} catch (error) {
				if (!isAbortError(error) && Date.now() - this.#lastPollWarningAt >= RETRY_COOLDOWN_MS) {
					this.#lastPollWarningAt = Date.now();
					log$4.warn("Refresh failed", { error: formatError(error) });
				}
			} finally {
				if (this.#enabled && generation === this.#generation) this.options.onData();
			}
		}
		#handleVisibilityChange = () => {
			if (!document.hidden) this.#pollVisibleTargets();
		};
	};
	function needsChannelDetails(stream, isActiveChannel) {
		return !stream || stream.startedAt === void 0 || isActiveChannel && stream.livestreamId === void 0 || stream.showViewCount && stream.source !== "channel-details" && stream.source !== "current-viewers";
	}
	function formatError(error) {
		return error instanceof Error ? error.message : String(error);
	}
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
		return [...thumbnail.querySelectorAll("[title]")].some((element) => {
			if (element.closest("[data-ke-viewer-count]")) return false;
			const title = element.getAttribute("title");
			const parentText = element.parentElement?.textContent ?? "";
			return isCompactCount(title) && /\bwatching\b/i.test(parentText);
		});
	}
	function findCardLiveBadge(thumbnail) {
		return [...thumbnail.querySelectorAll("div, span")].find((element) => !element.closest(RENDER_ELEMENT_SELECTOR) && element.childElementCount === 0 && element.textContent?.trim().toLowerCase() === "live");
	}
	function isCardHiddenByEnhancer(card, options) {
		if (options.hideGamblingStreams && card.closest("[data-testid=\"followed-livestreams\"]") && card.querySelector("a[href=\"/category/slots\"]")) return true;
		return Boolean(options.hideFollowingRecommendations && card.closest("[data-testid=\"following\"]") && !card.closest("[data-testid=\"followed-livestreams\"]"));
	}
	var DIGITS = Array.from({ length: 30 }, (_, index) => index % 10);
	var states = new WeakMap();
	function renderAnimatedNumber(container, value) {
		const formatted = Math.abs(value).toLocaleString();
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
	function cancelState(state) {
		if (!state) return;
		if (state.frame !== void 0) window.cancelAnimationFrame(state.frame);
		for (const animation of state.animations) animation.cancel();
	}
	function prefersReducedMotion() {
		return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
		return [...candidates].find((candidate) => containsExactText(candidate, target.displayName));
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
		return [...scope.querySelectorAll("span, p, div")].some((element) => !element.closest(RENDER_ELEMENT_SELECTOR) && element.childElementCount === 0 && element.textContent?.trim().toLowerCase() === normalizedExpected);
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
			if (!countEligible || !slug || !statusLabel || !statusContainer || !stream || stream.showViewCount) {
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
		const sourceLink = sidebarLinks.find((link) => getChannelSlugFromHref(link.getAttribute("href")) === target.slug);
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
		const sidebarLinks = [...document.querySelectorAll(SIDEBAR_LINK_SELECTOR)];
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
		getLivestreamIds(channelSlugs) {
			const ids = new Set();
			for (const slug of channelSlugs) {
				const stream = this.get(slug);
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
	var viewerCounts_default = "[data-ke-viewer-count],\n[data-ke-stream-uptime] {\n  box-sizing: border-box;\n  font-family: inherit;\n  white-space: nowrap;\n}\n\n.ke-viewer-count-card,\n.ke-stream-uptime-card {\n  position: absolute;\n  z-index: 20;\n  padding: 0 0.25rem;\n  color: var(--neon-surface-onSurface, #fff);\n  font-variant-numeric: tabular-nums;\n  line-height: 1.5rem;\n  pointer-events: none;\n  border-radius: 0.25rem;\n}\n\n.ke-viewer-count-card {\n  bottom: 0.375rem;\n  left: 0.375rem;\n  font-size: 0.875rem;\n  font-weight: 600;\n  background: var(--neon-surface-lowest, #0e0f12);\n}\n\n.ke-stream-uptime-card {\n  top: 0.375rem;\n  left: 0.375rem;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  font-size: 0.75rem;\n  font-weight: 500;\n  background: #0b0b0c;\n}\n.ke-stream-uptime-card::before {\n  width: 0.5rem;\n  height: 0.5rem;\n  flex: 0 0 auto;\n  content: \"\";\n  background: var(--neon-primary-base, #53fc18);\n  border-radius: 9999px;\n}\n\n.ke-viewer-count-sidebar,\n.ke-viewer-count-tooltip {\n  display: inline-flex;\n  flex: 0 0 auto;\n  align-items: center;\n  color: inherit;\n  font-size: 0.875rem;\n  font-weight: 600;\n  line-height: 1.25rem;\n}\n\n.ke-stream-uptime-tooltip {\n  position: absolute;\n  top: 100%;\n  right: 0;\n  color: var(--neon-surface-onSurfaceSecondary, #9fa6ad);\n  font-size: 0.6875rem;\n  font-variant-numeric: tabular-nums;\n  font-weight: 500;\n  line-height: 1rem;\n  pointer-events: none;\n  white-space: nowrap;\n}\n\n[data-ke-tooltip-uptime-container],\n[data-ke-sidebar-uptime-container] {\n  position: relative;\n}\n\n.ke-stream-uptime-sidebar {\n  position: absolute;\n  top: 100%;\n  right: 0;\n  color: var(--neon-surface-onSurfaceSecondary, #9fa6ad);\n  font-size: 0.6875rem;\n  font-variant-numeric: tabular-nums;\n  font-weight: 500;\n  line-height: 1rem;\n  pointer-events: none;\n  white-space: nowrap;\n}\n\n.ke-viewer-count-tooltip--standalone {\n  gap: 0.25rem;\n  margin-left: auto;\n}\n.ke-viewer-count-tooltip--standalone::before {\n  width: 0.5rem;\n  height: 0.5rem;\n  content: \"\";\n  background: var(--neon-primary-base, #53fc18);\n  border-radius: 9999px;\n}\n\n.ke-viewer-count-channel {\n  display: inline-flex;\n  align-items: center;\n  min-height: 1.375rem;\n  gap: 0.25rem;\n  color: var(--neon-surface-onSurface, #fff);\n  font-size: 0.875rem;\n  font-weight: 700;\n  line-height: 1.25rem;\n}\n.ke-viewer-count-channel svg {\n  width: 1rem;\n  height: 1rem;\n  flex: 0 0 auto;\n  fill: currentcolor;\n}\n\n.ke-viewer-count-channel__content {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  color: var(--neon-surface-onSurfaceSecondary, #9fa6ad);\n}\n\n.ke-viewer-count-channel__value {\n  color: var(--neon-primary-base, #53fc18);\n}\n\n.ke-animated-number {\n  display: inline-flex;\n  align-items: center;\n  font-variant-numeric: tabular-nums;\n}\n\n.ke-animated-number__digit {\n  position: relative;\n  display: inline-block;\n  width: 1ch;\n  height: 1.25rem;\n  overflow: hidden;\n}\n\n.ke-animated-number__reel {\n  position: absolute;\n  top: 0;\n  left: 0;\n  display: flex;\n  width: 100%;\n  flex-direction: column;\n  will-change: transform;\n}\n\n.ke-animated-number__cell {\n  display: flex;\n  width: 100%;\n  height: 1.25rem;\n  flex: 0 0 1.25rem;\n  align-items: center;\n  justify-content: center;\n  line-height: 1.25rem;\n}\n\n.ke-animated-number__separator {\n  display: inline-block;\n  height: 1.25rem;\n  line-height: 1.25rem;\n}\n\n[data-ke-native-live-hidden] {\n  display: none !important;\n}\n\n[data-ke-native-card-live-hidden] {\n  display: none !important;\n}";
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
	var lastLogSummary = "";
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
		const summary = JSON.stringify(result.counts);
		if (summary !== lastLogSummary) {
			lastLogSummary = summary;
			const details = {
				reason,
				...result.counts,
				targets: result.targetSlugs.size
			};
			if (result.counts.cardUptimes + result.counts.cards + result.counts.channel + result.counts.sidebar + result.counts.sidebarUptimes + result.counts.tooltipUptimes + result.counts.tooltips > 0) log$1.info("Rendered", details);
			else log$1.debug("Surfaces updated", details);
		}
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
		const dialogRef = (0, preact_hooks.useRef)(null);
		const titleId = (0, preact_hooks.useId)();
		const descriptionId = (0, preact_hooks.useId)();
		(0, preact_hooks.useEffect)(() => {
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
		return (0, preact_jsx_runtime.jsx)("div", {
			className: "ke-confirmation-layer",
			children: (0, preact_jsx_runtime.jsxs)("div", {
				"aria-describedby": descriptionId,
				"aria-labelledby": titleId,
				"aria-modal": "true",
				className: "ke-confirmation-dialog",
				onKeyDown: handleKeyDown,
				ref: dialogRef,
				role: "alertdialog",
				children: [(0, preact_jsx_runtime.jsxs)("div", {
					className: "ke-confirmation-dialog__copy",
					children: [(0, preact_jsx_runtime.jsx)("h3", {
						className: "ke-confirmation-dialog__title",
						id: titleId,
						children: title
					}), (0, preact_jsx_runtime.jsx)("p", {
						className: "ke-confirmation-dialog__description",
						id: descriptionId,
						children: description
					})]
				}), (0, preact_jsx_runtime.jsxs)("div", {
					className: "ke-confirmation-dialog__actions",
					children: [onCancel ? (0, preact_jsx_runtime.jsx)(Button, {
						onClick: onCancel,
						children: cancelLabel
					}) : null, (0, preact_jsx_runtime.jsx)(Button, {
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
			"preview": "vite preview",
			"test": "node --test --experimental-transform-types tests/*.test.mjs",
			"typecheck": "tsc --noEmit"
		},
		dependencies: {
			"mux.js": "6.3.0",
			"preact": "^10.29.7"
		},
		devDependencies: {
			"@preact/preset-vite": "^2.10.6",
			"happy-dom": "^20.11.1",
			"sass-embedded": "^1.100.0",
			"typescript": "^6.0.2",
			"vite": "^8.1.5",
			"vite-plugin-monkey": "^8.1.0"
		}
	};
	function AboutTab({ onImportError, onImportRequest }) {
		const fileInputRef = (0, preact_hooks.useRef)(null);
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
			triggerDownload(new Blob([serializeSettings(getSettings())], { type: "application/json;charset=utf-8" }), `kick-enhancer-settings-v5.json`);
		};
		return (0, preact_jsx_runtime.jsxs)("section", {
			className: "ke-about",
			"aria-labelledby": "ke-about-title",
			children: [
				(0, preact_jsx_runtime.jsx)("img", {
					alt: "",
					className: "ke-about__icon",
					draggable: false,
					src: icon_default
				}),
				(0, preact_jsx_runtime.jsxs)("div", {
					className: "ke-about__identity",
					children: [(0, preact_jsx_runtime.jsx)("h3", {
						className: "ke-about__title",
						id: "ke-about-title",
						children: "KICK Enhancer"
					}), (0, preact_jsx_runtime.jsxs)("p", {
						className: "ke-about__version",
						children: ["Version ", package_default.version]
					})]
				}),
				(0, preact_jsx_runtime.jsx)("p", {
					className: "ke-about__description",
					children: "A userscript that makes KICK cleaner and puts useful viewing information back in sight."
				}),
				(0, preact_jsx_runtime.jsxs)("div", {
					className: "ke-about__actions",
					children: [
						(0, preact_jsx_runtime.jsx)(Button, {
							onClick: () => fileInputRef.current?.click(),
							children: "Import settings"
						}),
						(0, preact_jsx_runtime.jsx)(Button, {
							onClick: exportSettings,
							children: "Export settings"
						}),
						(0, preact_jsx_runtime.jsx)("input", {
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
		const prototype = Object.getPrototypeOf(value);
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
		if (typeof value !== "object") return String(value);
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
			renderCell: (result) => (0, preact_jsx_runtime.jsx)(DiagnosticsPill, {
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
			renderCell: (row) => (0, preact_jsx_runtime.jsx)(DiagnosticsPill, {
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
			renderCell: (entry) => (0, preact_jsx_runtime.jsx)(DiagnosticsPill, {
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
			renderCell: (entry) => (0, preact_jsx_runtime.jsx)(DiagnosticsPill, {
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
		const abortControllerRef = (0, preact_hooks.useRef)(null);
		const [channelSlug, setChannelSlug] = (0, preact_hooks.useState)(() => getChannelSlugFromPath(window.location.pathname) ?? "");
		const [checks, setChecks] = (0, preact_hooks.useState)([]);
		const [checksRunning, setChecksRunning] = (0, preact_hooks.useState)(false);
		const [observations, setObservations] = (0, preact_hooks.useState)(() => active ? getViewerEndpointObservations() : EMPTY_OBSERVATIONS);
		const [logs, setLogs] = (0, preact_hooks.useState)(() => active ? getLogHistory() : EMPTY_LOGS);
		const [logLevel, setLogLevel] = (0, preact_hooks.useState)("all");
		const [logScope, setLogScope] = (0, preact_hooks.useState)("all");
		(0, preact_hooks.useEffect)(() => {
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
		const passiveRows = (0, preact_hooks.useMemo)(() => {
			const byEndpoint = new Map(observations.map((observation) => [observation.endpoint, observation]));
			return VIEWER_COUNT_ENDPOINTS.map((endpoint) => ({
				endpoint,
				observation: byEndpoint.get(endpoint)
			}));
		}, [observations]);
		const scopeOptions = (0, preact_hooks.useMemo)(() => {
			return [{
				label: "All scopes",
				value: "all"
			}, ...[...new Set(logs.map((entry) => entry.scope))].sort().map((scope) => ({
				label: scope,
				value: scope
			}))];
		}, [logs]);
		const filteredLogs = (0, preact_hooks.useMemo)(() => {
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
		return (0, preact_jsx_runtime.jsxs)("div", {
			className: "ke-diagnostics",
			children: [
				(0, preact_jsx_runtime.jsxs)("section", {
					"aria-labelledby": "ke-diagnostics-checks-title",
					className: "ke-diagnostics__section",
					children: [
						(0, preact_jsx_runtime.jsx)("div", {
							className: "ke-diagnostics__section-heading",
							children: (0, preact_jsx_runtime.jsxs)("div", { children: [(0, preact_jsx_runtime.jsx)("h3", {
								className: "ke-diagnostics__title",
								id: "ke-diagnostics-checks-title",
								children: "Endpoint health"
							}), (0, preact_jsx_runtime.jsx)("p", {
								className: "ke-diagnostics__description",
								children: "Run the same channel and viewer requests used by stream enhancements. Checks only run when requested."
							})] })
						}),
						(0, preact_jsx_runtime.jsxs)("form", {
							className: "ke-diagnostics__check-controls",
							onSubmit: (event) => {
								event.preventDefault();
								if (!checksRunning) runChecks();
							},
							children: [(0, preact_jsx_runtime.jsx)(TextField, {
								autoComplete: "off",
								label: "KICK channel",
								onValueChange: setChannelSlug,
								placeholder: "channel-name",
								spellcheck: false,
								value: channelSlug
							}), (0, preact_jsx_runtime.jsx)(Button, {
								className: "ke-button--primary",
								disabled: checksRunning,
								type: "submit",
								children: checksRunning ? "Checking…" : "Run checks"
							})]
						}),
						(0, preact_jsx_runtime.jsx)(ListView, {
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
				(0, preact_jsx_runtime.jsxs)("section", {
					"aria-labelledby": "ke-diagnostics-observed-title",
					className: "ke-diagnostics__section",
					children: [(0, preact_jsx_runtime.jsx)("div", {
						className: "ke-diagnostics__section-heading",
						children: (0, preact_jsx_runtime.jsxs)("div", { children: [(0, preact_jsx_runtime.jsx)("h3", {
							className: "ke-diagnostics__title",
							id: "ke-diagnostics-observed-title",
							children: "Observed responses"
						}), (0, preact_jsx_runtime.jsx)("p", {
							className: "ke-diagnostics__description",
							children: "Passive summaries from KICK responses already used by the page or Enhancer. No response bodies are retained."
						})] })
					}), (0, preact_jsx_runtime.jsx)(ListView, {
						ariaLabel: "Observed viewer endpoint responses",
						className: "ke-diagnostics__observation-list",
						columns: PASSIVE_COLUMNS,
						getItemKey: (row) => row.endpoint,
						items: passiveRows
					})]
				}),
				(0, preact_jsx_runtime.jsxs)("section", {
					"aria-labelledby": "ke-diagnostics-logs-title",
					className: "ke-diagnostics__section",
					children: [
						(0, preact_jsx_runtime.jsx)("div", {
							className: "ke-diagnostics__section-heading",
							children: (0, preact_jsx_runtime.jsxs)("div", { children: [(0, preact_jsx_runtime.jsx)("h3", {
								className: "ke-diagnostics__title",
								id: "ke-diagnostics-logs-title",
								children: "Session log"
							}), (0, preact_jsx_runtime.jsx)("p", {
								className: "ke-diagnostics__description",
								children: "Latest 250 entries from this page load. Sensitive fields and URL queries are redacted when displayed or copied."
							})] })
						}),
						(0, preact_jsx_runtime.jsxs)("div", {
							className: "ke-diagnostics__log-controls",
							children: [
								(0, preact_jsx_runtime.jsx)(SelectBox, {
									label: "Level",
									onValueChange: setLogLevel,
									options: LOG_LEVEL_OPTIONS,
									value: logLevel
								}),
								(0, preact_jsx_runtime.jsx)(SelectBox, {
									label: "Scope",
									onValueChange: setLogScope,
									options: scopeOptions,
									value: logScope
								}),
								(0, preact_jsx_runtime.jsxs)("div", {
									className: "ke-diagnostics__actions",
									children: [(0, preact_jsx_runtime.jsx)(Button, {
										onClick: () => void copyLogs(),
										children: "Copy"
									}), (0, preact_jsx_runtime.jsx)(Button, {
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
						(0, preact_jsx_runtime.jsx)(ListView, {
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
		return (0, preact_jsx_runtime.jsx)("span", {
			className: "ke-diagnostics__pill",
			"data-tone": tone,
			children: (0, preact_jsx_runtime.jsx)("span", {
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
	function resetChatAppearance() {
		return updateSettings((settings) => {
			if (settings.chat.fontFamily === null && settings.chat.fontSize === null && settings.chat.fontWeight === null && !settings.chat.messageDividers && settings.chat.messageSpacing === null) return settings;
			return {
				...settings,
				chat: {
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
		return (0, preact_jsx_runtime.jsxs)("div", {
			className: "ke-settings",
			children: [
				(0, preact_jsx_runtime.jsx)(Toggle, {
					checked: settings.showHiddenViewerCounts,
					description: "Restore KICK-reported viewer counts on live channels.",
					label: "Show hidden viewer counts",
					onCheckedChange: (visible) => {
						setShowHiddenViewerCounts(visible);
					}
				}),
				(0, preact_jsx_runtime.jsx)(Toggle, {
					checked: settings.showStreamUptime,
					description: "Show how long live streams have been running on thumbnails and sidebar tooltips.",
					label: "Show stream uptime",
					onCheckedChange: (visible) => {
						setShowStreamUptime(visible);
					}
				}),
				(0, preact_jsx_runtime.jsx)(Toggle, {
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
		const kickDefaults = (0, preact_hooks.useMemo)(() => ({
			fontSize: readKickChatValue("--chatroom-font-size", 14, 10, 24),
			messageSpacing: readKickChatValue("--chatroom-message-spacing", 4, 0, 12)
		}), [open]);
		return (0, preact_jsx_runtime.jsxs)("div", {
			className: "ke-settings",
			children: [
				(0, preact_jsx_runtime.jsx)(SelectBox, {
					description: "Change the typeface used throughout the chatroom.",
					label: "Chat font",
					onValueChange: (value) => {
						setChatFontFamily(value === "default" ? null : value);
					},
					options: CHAT_FONT_FAMILY_OPTIONS,
					value: settings.fontFamily ?? "default"
				}),
				(0, preact_jsx_runtime.jsx)(TrackBar, {
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
				(0, preact_jsx_runtime.jsx)(TrackBar, {
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
				(0, preact_jsx_runtime.jsx)(TrackBar, {
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
				(0, preact_jsx_runtime.jsx)(Toggle, {
					checked: settings.messageDividers,
					description: "Add a subtle divider between chat messages.",
					label: "Message dividers",
					onCheckedChange: (enabled) => {
						setChatMessageDividers(enabled);
					}
				}),
				(0, preact_jsx_runtime.jsx)("div", {
					className: "ke-settings__actions",
					children: (0, preact_jsx_runtime.jsx)(Button, {
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
		return (0, preact_jsx_runtime.jsxs)("div", {
			className: "ke-settings",
			children: [
				(0, preact_jsx_runtime.jsx)(Toggle, {
					checked: settings.hideHomepageCarousel,
					description: "Remove the featured autoplaying stream and chat from the homepage.",
					label: "Hide homepage carousel",
					onCheckedChange: (hidden) => {
						setHideHomepageCarousel(hidden);
					}
				}),
				(0, preact_jsx_runtime.jsx)(Toggle, {
					checked: settings.hideGamblingStreams,
					description: "Hide live followed gambling streams.",
					label: "Hide followed gambling streams",
					onCheckedChange: (hidden) => {
						setHideGamblingStreams(hidden);
					}
				}),
				(0, preact_jsx_runtime.jsx)(Toggle, {
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
		return (0, preact_jsx_runtime.jsxs)("div", {
			className: "ke-settings",
			children: [(0, preact_jsx_runtime.jsx)(Toggle, {
				checked: settings.hideRecommendedChannels,
				description: "Remove recommended channels and their controls from the sidebar.",
				label: "Hide recommended channels",
				onCheckedChange: (hidden) => {
					setHideRecommendedChannels(hidden);
				}
			}), (0, preact_jsx_runtime.jsx)(Toggle, {
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
		const [activeTab, setActiveTab] = (0, preact_hooks.useState)("about");
		const [dialog, setDialog] = (0, preact_hooks.useState)(null);
		const dialogOpen = dialog !== null;
		const closeDialog = () => setDialog(null);
		(0, preact_hooks.useEffect)(() => {
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
		return (0, preact_jsx_runtime.jsx)(Modal, {
			className: "ke-workspace-modal ke-settings-modal",
			description: "Customize how KICK behaves and looks.",
			dismissDisabled: dialogOpen,
			footer: (0, preact_jsx_runtime.jsxs)(preact_jsx_runtime.Fragment, { children: [
				(0, preact_jsx_runtime.jsxs)(Button, {
					"aria-label": "Open KICK Enhancer on GitHub",
					className: "ke-settings-modal__github",
					disabled: dialogOpen,
					onClick: () => {
						window.open(PROJECT_URL, "_blank", "noopener,noreferrer");
					},
					children: [(0, preact_jsx_runtime.jsx)(GitHubIcon, { class: "ke-settings-modal__github-icon" }), "GitHub"]
				}),
				(0, preact_jsx_runtime.jsx)(Button, {
					disabled: dialogOpen,
					onClick: showResetConfirmation,
					tone: "danger",
					children: "Reset to defaults"
				}),
				(0, preact_jsx_runtime.jsx)(Button, {
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
			children: (0, preact_jsx_runtime.jsxs)("div", {
				className: "ke-confirmation-host",
				children: [(0, preact_jsx_runtime.jsx)("div", {
					"aria-hidden": dialogOpen || void 0,
					className: "ke-settings-modal__tabs",
					inert: dialogOpen,
					children: (0, preact_jsx_runtime.jsx)(Tabs, {
						ariaLabel: "KICK Enhancer settings",
						onChange: setActiveTab,
						tabs: [
							{
								content: (0, preact_jsx_runtime.jsx)(AboutTab, {
									onImportError: showImportError,
									onImportRequest: showImportConfirmation
								}),
								contentClassName: "ke-tabs__panel-content--centered",
								id: "about",
								label: "About"
							},
							{
								content: (0, preact_jsx_runtime.jsx)(StreamAndClipSettingsSection, { settings: settings.ui }),
								id: "streams",
								label: "Streams / Clips"
							},
							{
								content: (0, preact_jsx_runtime.jsx)(ChatSettingsSection, {
									open,
									settings: settings.chat
								}),
								id: "chat",
								label: "Chat"
							},
							{
								content: (0, preact_jsx_runtime.jsx)(ContentSettingsSection, { settings: settings.ui }),
								id: "content",
								label: "Content"
							},
							{
								content: (0, preact_jsx_runtime.jsx)(SidebarSettingsSection, { settings: settings.ui }),
								id: "sidebar",
								label: "Sidebar"
							},
							{
								content: (0, preact_jsx_runtime.jsx)(DiagnosticsTab, {
									active: activeTab === "diagnostics",
									onShowMessage: showMessage
								}),
								id: "diagnostics",
								label: "Diagnostics"
							}
						],
						value: activeTab
					})
				}), dialog ? (0, preact_jsx_runtime.jsx)(ConfirmationDialog, {
					...dialog,
					open: true
				}) : null]
			})
		});
	}
	function useSettings() {
		const [settings, setSettings] = (0, preact_hooks.useState)(getSettings);
		(0, preact_hooks.useEffect)(() => subscribeSettings(setSettings), []);
		return settings;
	}
	var app_default = ".ke-about {\n  display: grid;\n  justify-items: center;\n  gap: 1rem;\n  text-align: center;\n}\n\n.ke-about__icon {\n  width: 4rem;\n  height: 4rem;\n  object-fit: contain;\n}\n\n.ke-about__identity {\n  display: grid;\n  gap: 0.2rem;\n}\n\n.ke-about__title {\n  margin: 0;\n  color: #f2f2f2;\n  font-size: 1.2rem;\n  font-weight: 750;\n  line-height: 1.25;\n}\n\n.ke-about__version {\n  margin: 0;\n  color: #8c8c8c;\n  font-size: 0.75rem;\n  font-variant-numeric: tabular-nums;\n}\n\n.ke-about__description {\n  margin: 0;\n  color: #747474;\n  font-size: 0.825rem;\n  font-weight: 500;\n  line-height: 1.5;\n}\n\n.ke-about__actions {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  gap: 0.65rem;\n}\n\n.ke-diagnostics {\n  display: grid;\n  gap: 1.5rem;\n}\n\n.ke-diagnostics__section {\n  min-width: 0;\n  display: grid;\n  gap: 0.8rem;\n}\n\n.ke-diagnostics__section-heading {\n  min-width: 0;\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n}\n\n.ke-diagnostics__title {\n  margin: 0;\n  color: #f2f2f2;\n  font-size: 0.9rem;\n  font-weight: 750;\n  line-height: 1.3;\n}\n\n.ke-diagnostics__description {\n  margin: 0.25rem 0 0;\n  color: #747474;\n  font-size: 0.76rem;\n  font-weight: 500;\n  line-height: 1.45;\n}\n\n.ke-diagnostics__check-controls {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto;\n  align-items: end;\n  gap: 0.65rem;\n}\n\n.ke-diagnostics__actions {\n  display: flex;\n  flex: none;\n  gap: 0.45rem;\n}\n\n.ke-diagnostics__check-list {\n  max-height: 8.5rem;\n}\n.ke-diagnostics__check-list .ke-list-view__empty {\n  min-height: 2.125rem;\n  padding: 0.42rem 0.6rem;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.ke-diagnostics__observation-list {\n  height: 13rem;\n}\n\n.ke-diagnostics__log-list {\n  height: 13.25rem;\n}\n\n.ke-diagnostics__pill {\n  max-width: 100%;\n  display: inline-flex;\n  box-sizing: border-box;\n  min-width: 4.8rem;\n  align-items: center;\n  justify-content: center;\n  padding: 0.12rem 0.42rem;\n  overflow: hidden;\n  border: 1px solid #303030;\n  border-radius: 0.3rem;\n  color: #8c8c8c;\n  font-size: 0.68rem;\n  font-weight: 750;\n  letter-spacing: 0.03em;\n  line-height: 1.35;\n  text-transform: capitalize;\n}\n.ke-diagnostics__pill[data-tone=passed], .ke-diagnostics__pill[data-tone=observed] {\n  border-color: rgba(83, 252, 24, 0.4);\n  color: #53fc18;\n}\n.ke-diagnostics__pill[data-tone=degraded], .ke-diagnostics__pill[data-tone=unavailable], .ke-diagnostics__pill[data-tone=warn] {\n  border-color: rgba(245, 196, 81, 0.4);\n  color: #f5c451;\n}\n.ke-diagnostics__pill[data-tone=failed], .ke-diagnostics__pill[data-tone=error] {\n  border-color: rgba(255, 107, 107, 0.45);\n  color: #ff6b6b;\n}\n.ke-diagnostics__pill[data-tone=debug], .ke-diagnostics__pill[data-tone=info], .ke-diagnostics__pill[data-tone=warn], .ke-diagnostics__pill[data-tone=error] {\n  text-transform: uppercase;\n}\n.ke-diagnostics__pill[data-tone=info], .ke-diagnostics__pill[data-tone=scope-blue] {\n  border-color: rgba(117, 178, 255, 0.42);\n  color: #a9cfff;\n}\n.ke-diagnostics__pill[data-tone^=scope-] {\n  text-transform: none;\n}\n.ke-diagnostics__pill[data-tone=scope-cyan] {\n  border-color: rgba(95, 214, 225, 0.42);\n  color: #8bdce4;\n}\n.ke-diagnostics__pill[data-tone=scope-green] {\n  border-color: rgba(83, 252, 24, 0.36);\n  color: #8eea70;\n}\n.ke-diagnostics__pill[data-tone=scope-amber] {\n  border-color: rgba(245, 196, 81, 0.4);\n  color: #f5c451;\n}\n.ke-diagnostics__pill[data-tone=scope-violet] {\n  border-color: rgba(179, 142, 255, 0.42);\n  color: #c6a9ff;\n}\n.ke-diagnostics__pill[data-tone=scope-rose] {\n  border-color: rgba(242, 128, 170, 0.42);\n  color: #f09bbb;\n}\n\n.ke-diagnostics__pill-label {\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.ke-diagnostics__details-cell {\n  align-items: flex-start;\n}\n\n.ke-diagnostics__details-cell .ke-list-view__cell-content {\n  overflow: visible;\n  line-height: 1.4;\n  text-overflow: clip;\n  white-space: normal;\n}\n\n.ke-diagnostics__log-controls {\n  display: grid;\n  grid-template-columns: 8rem minmax(0, 1fr) auto;\n  align-items: end;\n  gap: 0.65rem;\n}\n\n.ke-diagnostics__log-message .ke-list-view__cell-content {\n  line-height: 1.4;\n}\n\n@media (max-width: 36rem) {\n  .ke-diagnostics__section-heading {\n    display: grid;\n  }\n  .ke-diagnostics__actions {\n    justify-content: flex-start;\n  }\n  .ke-diagnostics__check-controls,\n  .ke-diagnostics__log-controls {\n    grid-template-columns: 1fr;\n  }\n}\n.kick-enhancer-host {\n  display: contents;\n}\n\n.kick-enhancer-button {\n  position: relative;\n  display: flex;\n  flex: 0 0 auto;\n  box-sizing: border-box;\n  align-items: center;\n  justify-content: center;\n  width: 2.25rem;\n  height: 2.25rem;\n  padding: 0;\n  overflow: hidden;\n  color: var(--neon-secondary-onSecondary, #fff);\n  cursor: pointer;\n  user-select: none;\n  background: var(--neon-secondary-base, #42474d);\n  border: 0;\n  border-radius: 0.25rem;\n  outline: 0;\n  transition: background-color 150ms ease, transform 100ms ease;\n}\n.kick-enhancer-button::after {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  content: \"\";\n  background: transparent;\n  border-radius: inherit;\n}\n.kick-enhancer-button:hover::after {\n  background: var(--neon-stateLayer-surfaceHover, rgba(240, 241, 242, 0.0392156863));\n}\n.kick-enhancer-button:focus-visible {\n  outline: 2px solid var(--neon-focusLight, #fff);\n  outline-offset: 2px;\n}\n.kick-enhancer-button:active {\n  transform: scale(0.95);\n}\n.kick-enhancer-button__icon {\n  display: block;\n  width: 1.25rem;\n  height: 1.25rem;\n  pointer-events: none;\n  object-fit: contain;\n}\n\n.kick-enhancer-download-button {\n  overflow: visible;\n}\n.kick-enhancer-download-button__icon {\n  width: 1.25rem;\n  height: 1.25rem;\n  pointer-events: none;\n}\n.kick-enhancer-download-button__badge {\n  position: absolute;\n  top: -0.3rem;\n  right: -0.3rem;\n  display: grid;\n  min-width: 1rem;\n  height: 1rem;\n  padding-inline: 0.2rem;\n  place-items: center;\n  border: 1px solid #050505;\n  border-radius: 0.3rem;\n  background: #53fc18;\n  color: #071402;\n  font-size: 0.625rem;\n  font-weight: 800;\n  line-height: 1;\n}\n.kick-enhancer-download-button.needs-attention {\n  box-shadow: inset 0 0 0 1px #53fc18;\n}\n.kick-enhancer-download-button.is-error {\n  box-shadow: inset 0 0 0 1px #ff6b6b;\n}\n\n#sidebar-wrapper .bg-outline-decorative.h-px {\n  display: none !important;\n}\n\n#main-container :where(a[href^=\"/category/\"].bg-secondary-base,\na[href^=\"/category/\"] .bg-secondary-base,\n:has(> a[href^=\"/category/\"]) > .bg-secondary-base,\nspan.bg-secondary-base.rounded-full) {\n  border-radius: 0.3rem;\n  background-color: #212931;\n}";
	var LOGGED_IN_ANCHOR_SELECTOR = "button[data-testid=\"kicks-top-nav\"]";
	var LOGGED_OUT_ANCHOR_SELECTOR = "nav button[data-testid=\"login\"]";
	function findTopNavActions(ownerDocument = document) {
		return (ownerDocument.querySelector(LOGGED_IN_ANCHOR_SELECTOR) ?? ownerDocument.querySelector(LOGGED_OUT_ANCHOR_SELECTOR))?.parentElement ?? null;
	}
	function App() {
		const [settingsOpen, setSettingsOpen] = (0, preact_hooks.useState)(false);
		const downloadActivity = useDownloadActivity();
		const settings = useSettings();
		const downloadCount = downloadActivity.activeCount + downloadActivity.queuedCount;
		return (0, preact_jsx_runtime.jsxs)(preact_jsx_runtime.Fragment, { children: [
			downloadActivity.visible ? (0, preact_jsx_runtime.jsxs)("button", {
				"aria-label": downloadActivity.attention ? "Open Download Manager; a download needs attention" : "Open Download Manager",
				class: `kick-enhancer-button kick-enhancer-download-button${downloadActivity.error ? " is-error" : ""}${downloadActivity.attention ? " needs-attention" : ""}`,
				"data-kick-enhancer": "download-activity",
				onClick: () => openDownloadCenter(),
				type: "button",
				children: [downloadActivity.activeCount > 0 ? (0, preact_jsx_runtime.jsx)(LoadingSpinnerIcon, { class: "ke-icon kick-enhancer-download-button__icon ke-icon--spinner" }) : (0, preact_jsx_runtime.jsx)(DownloadIcon, { class: "ke-icon kick-enhancer-download-button__icon" }), downloadCount > 0 ? (0, preact_jsx_runtime.jsx)("span", {
					"aria-label": `${downloadCount} active or queued downloads`,
					className: "kick-enhancer-download-button__badge",
					children: downloadCount > 9 ? "9+" : downloadCount
				}) : null]
			}) : null,
			(0, preact_jsx_runtime.jsx)("button", {
				"aria-label": "Open KICK Enhancer settings",
				class: "kick-enhancer-button",
				"data-kick-enhancer": "top-nav-button",
				onClick: () => setSettingsOpen(true),
				type: "button",
				children: (0, preact_jsx_runtime.jsx)("img", {
					alt: "",
					class: "kick-enhancer-button__icon",
					draggable: false,
					src: icon_default
				})
			}),
			(0, preact_jsx_runtime.jsx)(SettingsModal, {
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
			(0, preact.render)(null, mountedHost);
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
		(0, preact.render)((0, preact_jsx_runtime.jsx)(App, {}), host);
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
				(0, preact.render)(null, host);
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
	async function start() {
		await initializeSettings();
		stopFeatures?.();
		stopFeatures = composeDisposers(startChatAppearance(), startClipDownloadActions(), startViewerEnhancements(), startFollowingRecommendationsVisibility(), startGamblingStreamsVisibility(), startHomepageCarouselVisibility(), startRecommendedChannelsVisibility(), startSidebarStateMemory(), startTopNavButton());
		log.info("Ready");
	}
	start();
})(preact, jsxRuntime, preactHooks, preactCompat);
