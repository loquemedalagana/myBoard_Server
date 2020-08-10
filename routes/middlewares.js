exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    }
    else{
        res.status(403).send('로그인 필요');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        next();
    }
    else{
        const message = encodeURIComponent('이미 로그인한 상태입니다.');
        res.redirect(`/?error=${message}`);
    }
};

//관리자 여부, 회원등급 여부 추가
//자동로그인 구현(나중에)