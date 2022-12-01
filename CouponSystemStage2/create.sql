create table companies (id integer not null auto_increment, email varchar(255), name varchar(255), password varchar(255), primary key (id)) engine=MyISAM;
create table coupons (id integer not null auto_increment, amount integer not null, category integer, description varchar(255), end_date date, image varchar(255), price double precision not null, start_date date, title varchar(255), company_id integer, primary key (id)) engine=MyISAM;
create table coupons_vs_customers (customer_id integer not null, coupon_id integer not null, primary key (customer_id, coupon_id)) engine=MyISAM;
create table customers (id integer not null auto_increment, email varchar(255), first_name varchar(255), last_name varchar(255), password varchar(255), primary key (id)) engine=MyISAM;
alter table coupons add constraint FKdcx0ovgcgvc3v9clxn2b9kvg9 foreign key (company_id) references companies (id);
alter table coupons_vs_customers add constraint FKlxbqybwkpvvaprxf35vh5aapw foreign key (coupon_id) references coupons (id);
alter table coupons_vs_customers add constraint FK1wisbwh9mq25wpdp6q7il95w5 foreign key (customer_id) references customers (id);
