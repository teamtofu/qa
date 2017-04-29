/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/test/webpack/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports=__webpack_require__(1);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*!
 * Copyright (c) 2017 Russell Steadman
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
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */
;(function() {
"use strict";

// Version: 1.0.0
var bindto = ['questionify', 'qu'];

var type = {
    o: 'object',
    s: 'string',
    f: 'function',
    b: 'boolean',
    n: 'number',
    r: 'regex'
};

var has = {};

var check = function () {
    var items = {
        angular: typeof angular === type.o && !!angular,
        console: typeof console === type.o && !!console && !!console.log && !!console.error && !!console.info,
        alert: typeof alert === type.f && !!alert,
        document: typeof document === type.o && !!document,
        body: typeof document === type.o && !!document && typeof document.body === type.o && !!document.body,
        mutation: typeof MutationObserver === type.f && !!MutationObserver,
        interval: typeof setInterval === type.f && typeof clearInterval === type.f && !!setInterval && !!clearInterval,
        window: typeof window === type.o && !!window,
        module: typeof module !== 'undefined' && module.exports
    };
    for (var ze in items) has[ze] = items[ze];
    return has;
};

var errorurl = function (code, varone, vartwo, varthree) {
    return 'http://teamtofu.github.io/questionify/errors/?error=' + code + '&one=' + encodeURIComponent(varone) + '&two=' + encodeURIComponent(vartwo) + '&three=' + encodeURIComponent(varthree);
};

var uuid = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0;
        var v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

var shuffle = function (v) {
    for (var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
    return v;
};

var processHtml = function (str, enableMarkDown) {
    var clean = str.toString().replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    if (enableMarkDown) {
        clean = clean.replace(/\[([^\[]+)\]\(([^\)]+)\)/, '<a href="$2">$1</a>');
        clean = clean.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        clean = clean.replace(/\_\_(.*?)\_\_/g, '<em>$1</em>');
        clean = clean.replace(/\~\~(.*?)\~\~/g, '<del>$1</del>');
        clean = clean.replace(/\:\"(.*?)\"\:/g, '<q>$1</q>');
        clean = clean.replace(/\!\((.*?)\)\[(.*?)\]\!/g, '<div class="qu-markdown-image-bin"><img class="qu-markdown-image $2" src="$1" /></div>');
    }
    return clean;
}

var questionify = function () {

    this.version = '1.0.0';

    var options = {
        debugMode: false,
        removeQuizAnswers: false,
        shuffleQuizAnswers: false,
        shuffleQuizQuestions: false,
        enableMarkDown: true
    };

    var optionsTemplate = {
        debugMode: type.b,
        removeQuizAnswers: type.b,
        shuffleQuizAnswers: type.b,
        shuffleQuizQuestions: type.b,
        enableMarkDown: type.b
    };

    var verifyOptions = function () {
        if (optionsTemplate[zb].split('&').indexOf(typeof options[zb]) === -1) {
            throw new Error(errorurl('ah', zb, typeof options[zb], optionsTemplate[zb]));
        }
    };

    this.setOption = function (optionName, optionValue) {
        options[optionName] = optionValue;
        verifyOptions();
    };

    this.setOptions = function (newOptions) {
        if (typeof newOptions === type.o) {
            for (var za in newOptions) {
                options[za] = newOptions[za];
            }
        }
        verifyOptions();
    };

    var htmlEntities = function (a) {
        return processHtml(a, options.enableMarkDown);
    };

    this.events = [];

    var error = function (error) {
        if (check().console) {
            console.error('(Questionify) ' + error);
        } else if (typeof alert === type.f && options.developerMode) {
            alert(error);
        }
        this.events.push(error);
    }.bind(this);

    var log = function (log) {
        if (check().console && options.debugMode) {
            console.info('(Questionify) ' + log);
        }
        this.events.push(log);
    }.bind(this);

    this.questions = {};

    var appendQ = function (question, answers, correctAnswer, group) {
        if (typeof question !== type.s) return error('Question is not a string');
        if (typeof answers !== type.o) return error('Answers are not an array');
        if (typeof correctAnswer !== type.o) return error('Correct answer is not a array');
        if (typeof group !== type.s) {
            group = 'default';
        }
        var addition = {
            group: group,
            id: uuid(),
            question: {
                text: question
            },
            answers: [],
            correct: []
        };
        for (var i in answers) {
            var answer = {
                text: answers[i],
                id: uuid(),
                correct: correctAnswer.indexOf(Number(i)) !== -1
            };
            if (answer.correct) addition.correct.push(answer.id);
            addition.answers.push(answer);
        }
        if (!this.questions[group]) {
            this.addSet(group);
            log('The group ' + group + ' didn\'t exist, so it was autocreated.');
        }
        this.questions[encodeURIComponent(group)].questions.push(addition);
        return addition.id;

    }.bind(this);

    this.addQuestion = function (question, answers, correctAnswer, group) {
        return appendQ(question, answers, correctAnswer, group);
    };

    this.addQuestions = function (questionObject) {
        var response = [];
        for (var i in questionObject) {
            var question = questionObject[i].question;
            var answers = questionObject[i].answers;
            var correctAnswer = questionObject[i].correct;
            var group = questionObject[i].group;
            response.push(appendQ(question, answers, correctAnswer, group));
        }
        return response;
    };

    this.addSet = function (set) {
        var response = [];
        if (typeof set !== type.o) set = [set];
        for (var i in set) {
            var gid = uuid();
            this.questions[encodeURIComponent(set[i])] = {
                id: gid,
                questions: []
            };
            response.push(gid);
        }
        return (response[1] ? response : response[0]);
    };
    this.addSet('default');

    var getJson = function (json, type) {
        if (typeof json === type.s) {
            try {
                json = JSON.parse(json);
            } catch (e) {
                error(e);
            }
        }
        if (typeof json === type.o && json.type === type) {
            var schemaVersion = Number(json.schema.split('qu-')[1]);
            if (schemaVersion > 1) log('Update Questionify to support this schema version.');
            return json;
        }
        return null;
    };

    var putJson = function (content, type) {
        return JSON.stringify({
            content: content,
            version: '1.0.0',
            type: type,
            schema: 'qu-1.0',
            assetid: uuid()
        }, null, 4);
    };

    this.exportQuestions = function () {
        return putJson(this.questions, 'export');
    };

    this.importQuestions = function (json) {
        var questions = getJson(json);
        if (questions) {
            this.questions = questions;
            return true;
        }
        return false;
    };

    var makeQuiz = function (questions, metaQL, metaNM, metaLI) {
        var quiz = {
            questions: questions,
            meta: {
                quizLength: metaQL,
                quizName: metaNM
            }
        };
        if (metaLI) quiz.meta.linkedTo = metaLI;
        return quiz;
    };

    /**
     * @param {string} group The group from which to pull the questions
     * @param {string} quizName The name of the Quiz
     * @param {number} quizLength How many questions for each quiz instance
     * @property {string} key The key JSON object
     * @property {string} quiz The quiz JSON object
     */
    this.createQuiz = function (group, quizName, quizLength) {
        if (!this.questions[group]) return error('Group not found.');
        if (!quizLength) quizLength = this.questions[group].questions.length;
        var quest = JSON.stringify(this.questions[group].questions);
        quest = JSON.parse(quest);
        if (!options.removeQuizAnswers) {
            var response = {
                quiz: putJson(makeQuiz(quest, quizLength, quizName), 'quizCombo')
            };
            this.loadQuiz(response.quiz);
            return response;
        }
        var answerKey = [];
        for (var i in quest) {
            answerKey.push({
                id: quest[i].id,
                correct: quest[i].correct
            });
            delete quest[i].correct;
            for (var o in quest[i].answers) {
                delete quest[i].answers[o].correct;
            }
        }
        var linkId = uuid();
        var quiz = putJson(makeQuiz(quest, quizLength, quizName, linkId), 'quizBlind');
        var key = {
            key: answerKey,
            meta: {
                linkedTo: linkId
            }
        };
        key.meta.forAsset = JSON.parse(quiz).assetid;
        key = putJson(key, 'answerKey');
        this.loadQuiz(quiz);
        this.loadKey(key);
        return {
            quiz: quiz,
            key: key
        };
    };

    var quizStore = {};

    this.loadQuiz = function (quiz) {
        try {
            quizStore.quiz = JSON.parse(quiz);
        } catch (e) {
            return error(e);
        }
    };

    this.loadKey = function (key) {
        try {
            quizStore.key = JSON.parse(key);
        } catch (e) {
            return error(e);
        }
    };

    var quizCallback = {};

    this.getQuizTemplate = function (callback) {
        if (!quizStore.quiz) return error('No quiz loaded.');
        if (!check().document) return error('This action must be done it the client window.');
        var quizId = quizStore.quiz.assetid;
        quizCallback[quizId] = callback;

        var isBlind = quizStore.quiz.type === 'quizBlind';
        var quiz = quizStore.quiz.content;
        var qs = quiz.questions;
        if (quizStore.key && quizStore.key.content.meta.linkedTo === quiz.meta.linkedTo) var hasKey = true;

        var holder = document.createElement('div');
        holder.dataset.role = 'quiz';
        holder.dataset.type = quizStore.quiz.type;
        holder.id = quizId;
        holder.classList.add('questionify', 'qu-quiz', quizId);

        for (var i in qs) {

            if (options.shuffleQuizAnswers) qs[i].answers = shuffle(qs[i].answers);

            var question = document.createElement('div');
            question.dataset.role = 'question';
            question.id = qs[i].id;
            question.classList.add('qu-question', quizId, qs[i].id);
            holder.appendChild(question);

            var text = document.createElement('div');
            text.dataset.role = 'text';
            text.classList.add('qu-text', quizId, qs[i].id);
            text.innerHTML = '<strong>' + htmlEntities(qs[i].question.text) + '</strong>';
            question.appendChild(text);

            var answers = document.createElement('ul');
            answers.dataset.role = 'answer-group';
            answers.classList.add('qu-answer-group', quizId, qs[i].id);
            question.appendChild(answers);

            for (var o in qs[i].answers) {

                var answer = document.createElement('li');
                answer.dataset.role = 'answer';
                answer.id = qs[i].answers[o].id;
                answer.classList.add('qu-answer', 'qu-unselected-answer', quizId, qs[i].id);
                answer.setAttribute('onclick', 'questionify.dom.mark(this);');
                answer.innerHTML = htmlEntities(qs[i].answers[o].text);
                answers.appendChild(answer);

            }

            if (qs.length - 1 !== Number(i)) holder.appendChild(document.createElement('hr'));

        }

        holder.appendChild(document.createElement('br'));

        var submit = document.createElement('div');
        submit.dataset.role = 'submit';
        submit.classList.add('qu-submit', quizId);
        submit.setAttribute('onclick', 'questionify.dom.validate(this);');
        submit.innerHTML = 'Submit';
        holder.appendChild(submit);

        var response = document.createElement('div');
        response.appendChild(holder);

        return response.innerHTML;
    };

    this.style = {};

    this.style.roboto = function (a) {
        var font = document.getElementById('qu-font');
        if (font) document.head.removeChild(font);

        var css = document.createElement('style');
        css.type = 'text/css';
        css.id = 'qu-font';
        css.innerHTML = '@import url(\'https://fonts.googleapis.com/css?family=' + (!a ? 'Roboto' : 'Open+Sans') + '\');';

        document.head.appendChild(css);
    };

    this.style.opensans = function () {
        this.roboto(true);
    };

    this.style.set = function () {
        if (document.getElementById('qu-style')) return false;
        var css = document.createElement('style');
        css.type = 'text/css';
        css.id = 'qu-style';
        css.innerHTML = '\
        .questionify {\
            font-family: \'Roboto\', \'Open Sans\', Arial, Helvetica, sans-serif;\
            font-size: 1rem;\
            -webkit-tap-highlight-color: rgba(255, 255, 255, 0);\
        }\
        .qu-quiz {\
            width: inherit;\
            color: #000000;\
        }\
        .qu-question {\
            width: 100%;\
            cursor: default;\
        }\
        .qu-answer-group {\
            cursor: pointer;\
            list-style-type: upper-alpha;\
            margin-left: 5%;\
            outline: none;\
        }\
        .qu-answer {\
            transition: color 0.5s ease, text-decoration 0.5s ease;\
        }\
        .qu-unselected-answer {\
            color: #999999;\
        }\
        .qu-unselected-answer:hover, .qu-unselected-answer:focus {\
            color: #000000;\
        }\
        .qu-selected-answer {\
            color: #962171;\
            text-decoration: underline;\
        }\
        .qu-explanation-hide {\
            display: none;\
        }\
        .qu-submit {\
            background-color: #962171;\
            border: none;\
            color: #ffffff;\
            padding: .5rem 1rem;\
            text-align: center;\
            cursor: pointer;\
            border-radius: .5vh;\
        }\
        .qu-submit.qu-submitted {\
            background-color: #2acc93;\
        }\
        .qu-error {\
            color: #ce3737;\
            font-style: italic;\
        }\
        .qu-markdown-image {\
            max-height: 10rem;\
            max-width: 10rem;\
            display: inline-block;\
        }\
        .qu-markdown-image-bin {\
            display: inline-block;\
            width: 10rem;\
        }\
        ';
        document.head.appendChild(css);
        return true;
    }

    if (check().document) {
        this.style.set();
    }

    this.style.unset = function () {
        var style = document.getElementById('qu-style');
        if (style) document.head.removeChild(style);
        return true;
    };

    this.dom = {};

    this.dom.mark = function (dom) {
        if (dom && dom.setAttribute) {

            dom.dataset.press = new Date().getTime().toString();

            var question = dom.parentNode.parentNode;
            question.dataset.answer = dom.id;

            var text = document.getElementsByClassName('qu-text ' + question.id)[0];
            text.classList.remove('qu-error');

            var answers = dom.parentNode.childNodes;
            for (var i in answers) {
                if (typeof answers[i] !== type.o) continue;
                answers[i].classList.remove('qu-selected-answer');
                answers[i].classList.add('qu-unselected-answer');
            }

            dom.classList.remove('qu-unselected-answer');
            dom.classList.add('qu-selected-answer');

        }
    };

    this.dom.validate = function (dom) {
        var quizChildren = dom.parentNode.childNodes;

        for (var i in quizChildren) {
            if (typeof quizChildren[i] === type.o && quizChildren[i].dataset.role === 'question') {

                var text = document.getElementsByClassName('qu-text ' + quizChildren[i].id)[0];
                text.classList.remove('qu-error');

                if (!quizChildren[i].dataset.answer) {
                    var invalid = true;
                    text.classList.add('qu-error');
                }

            }
        }

        if (!invalid) {
            this.callback(dom.parentNode.id);
        }
    };

    this.dom.callback = function (quizId) {
        var quizChildren = document.getElementById(quizId).childNodes;
        var responseSet = {
            response: {},
            assetid: quizId
        };

        for (var i in quizChildren) {
            if (typeof quizChildren[i] === type.o && quizChildren[i].dataset.role === 'question') {
                responseSet.response[quizChildren[i].id] = quizChildren[i].dataset.answer || '';
            }
        }

        var cb = quizCallback[quizId];
        if (cb) {
            if (typeof cb === type.f) {
                cb(responseSet);
            } else if (typeof cb === type.o && typeof cb.resolve === type.f) {
                cb.resolve(responseSet);
            }

            var submit = document.getElementsByClassName('qu-submit ' + quizId)[0];
            if (submit) {
                submit.innerHTML = 'Submitted';
                submit.classList.add('qu-submitted');
                submit.removeAttribute('onclick');
            }

        } else {
            error('No callback was specified for quiz ' + quizId + '.');
        }
    };

    this.gradeQuiz = function (input) {
        var quizId = input.assetid;
        var quizResponse = input.response;

        var answerObject = null;

        if (quizStore.key && quizStore.key.meta.forAsset === quizId) {
            answerObject = quizStore.key.content.key;
        } else if (!!quizStore.quiz && quizStore.quiz.type === 'quizCombo' && quizId === quizStore.quiz.assetid) {
            answerObject = quizStore.quiz.content.questions;
        } else {
            return error('No key or quiz with answers loaded.');
        }

        var list = {};
        var listCorrect = 0;

        for (var i in quizResponse) {
            list[i] = false;
            for (var o in answerObject) {
                if (i === answerObject[o].id && answerObject[o].correct.indexOf(quizResponse[i]) !== -1) {
                    list[i] = true;
                    listCorrect++;
                }
            }
        }

        var listLength = Object.keys(list).length;
        var listPercent = listCorrect / (listLength >= 1 ? listLength : 1);
        return {
            answers: list,
            numberCorrect: listCorrect,
            numberAnswered: listLength,
            percentCorrect: listPercent
        };
    };

    this.getGroupByName = function (group) {
        if (this.questions[group]) {
            return this.questions[group].questions;
        }
        return null;
    };

    this.getGroupById = function (groupid) {
        for (var i in this.questions) {
            if (this.questions[i].id === groupid) {
                return this.questions[i].questions;
            }
        }
        return null;
    };

    this.getQuestionById = function (questionid) {
        for (var i in this.questions) {
            for (var o in this.questions[i].questions) {
                if (this.questions[i].questions[o].id === questionid) return this.questions[i].questions[o];
            }
        }
        return null;
    };

};

var binder = new questionify();

if (check().module) {
    module.exports = binder;
}

if (check().window) {
    for (var i in bindto) {
        window[bindto[i]] = binder;
    }
}
}());


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var init = __webpack_require__(0);
//use var init = require('onebang'); instead
init(/* settings */);

/* This also works...
 * require('onebang');
 * window.onebang(); //settings
 */

/***/ })
/******/ ]);