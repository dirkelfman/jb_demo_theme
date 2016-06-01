define(
    ['modules/jquery-mozu', 'modules/api'],
    function($, api) {
        $(function() {
            api.request('GET', '/svc/b2blogins').then(function(resp) {
                var el = $('.jb-userlogins');
                if (resp.total === 0) {
                    el.append('<div>none found</div>');
                }
                el.append('<ul>');
                var form = document.getElementById('jb-b2bform');
                form.method = 'POST';
                //jb-b2bform"
                resp.clients.forEach(function(user) {
                    var li = $('<li style="cursor:pointer">' + user.description + '(' + user.segment + ')</li>');
                    var loginFn = function() {
                        form.username.value = 'test@test.com';
                        form.password.value = user.token;
                        ///set to domain of segmented server.
                        form.action = user.host ? ('https://' + user.host + '/user/login') :  '/user/login';
                        form.target = '_blank';
                        form.submit();
                    };
                    li.click(loginFn);
                    el.append(li);
                });
                el.append('</ul>');
            });


        });
    }
);

