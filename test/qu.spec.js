window.redirect = function (rdr) {
    var url = window.location.origin + '/test/';
    if (rdr == 'webpack') {
        url += 'webpack/';
    } else if (rdr == 'angular') {
        url += 'live/angular/';
    } else if (rdr == 'live') {
        url += 'live/';
    } else if (rdr == 'minified') {
        url += 'min.html';
    }
    window.location.assign(url);
};
console.log('%c To see other tests, type in redirect(\'live\'), redirect(\'angular\'), redirect(\'webpack\'), redirect(), or redirect(\'minified\').' , 'color:#8124a0;font-size:22px;');

var errorurl = function (code, varone, vartwo, varthree) {
    return 'http://teamtofu.github.io/questionify/errors/?error=' + code + '&one=' + encodeURIComponent(varone) + '&two=' + encodeURIComponent(vartwo) + '&three=' + encodeURIComponent(varthree);
};

describe('questionify', function () {
    it('is bound to the window', function () {
        expect(typeof questionify).toEqual('object');
        expect(typeof qu).toEqual('object');
    });
    it('mirrors qu', function () {
        window.qid = questionify.addQuestion('Text?',['Just Because','Umm'],[0],'Here is why');
        expect(questionify.questions).toBe(qu.questions);
    });
});

describe('questionify questions', function () {
    it('is bound to the window', function () {
        expect(typeof questionify).toEqual('object');
        expect(typeof qu).toEqual('object');
    });
    it('mirrors qu', function () {
        window.qid = questionify.addQuestion('Text?',['Just Because','Umm'],[0],'Here is why');
        expect(questionify.questions).toBe(qu.questions);
    });
});