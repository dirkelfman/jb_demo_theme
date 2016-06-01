define(
    ['modules/jquery-mozu', 'modules/api'],
    function($, api) {
        $(function() {
            api.request('GET', '/svc/b2blogins').then(function(resp) {
                var el = $('.jb-userlogins');
                if (resp.total === 0) {
                    el.append('<div>none found</div>');
                    return;
                }

                var form = document.getElementById('jb-b2bform');
                form.method = 'POST';
                var ul = $('<ul>');
                el.append(ul);
                var li;
                //jb-b2bform"
                resp.clients.forEach(function(user) {
                    li = $('<li>');
                    ul.append(li);

                    var a = $('<a style="cursor:pointer">' + user.description + '(' + user.segment + ')</a>');
                    var loginFn = function() {
                        form.username.value = 'test@test.com';
                        form.password.value = user.token;
                        form.action = 'https://' + (user.host || document.location.host) + '/user/login';
                        form.target = '_blank';
                        form.submit();
                    };
                    a.click(loginFn);
                    li.append(a);

                });

            });


        });
    }
);

