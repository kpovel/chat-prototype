drop table if exists user;
drop table if exists chat;

create table user (
    id       integer primary key autoincrement,
    login    varchar(50) not null unique,
    password char(60)    not null
);

create table chat (
    id      integer primary key autoincrement,
    message varchar(255)                        not null,
    user_id integer                             not null,
    sent_at timestamp default current_timestamp not null
);
