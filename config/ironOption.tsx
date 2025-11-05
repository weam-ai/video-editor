const ironOption = {
    cookieName: 'weam', // Must match WEAM iron-session cookie
    password: process.env.NEXT_PUBLIC_COOKIE_PASSWORD || 'YczgOhDJQj0RRDR3ASnvOVoQUBV0PtSzYczgOhDJQj0RRDR3ASnvOVoQUBV0PtSz',
    cookieOptions: {
        httpOnly: true,
        secure: false,
    },
};

export default ironOption;
