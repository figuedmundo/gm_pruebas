
create table dispositivos (
	id_dispositivo      int4            not null,
	nombre_dispositivo  varchar(200)    null,
	constraint pk_dispositivo primary key (id_dispositivo)
);

create table maps (
	id_map	            int4	not null,
	latitude            float   null,
	longitude           float	null,
	id_dispositivo      int4    not null,
	constraint pk_map primary key (id_map),
	constraint fk_map foreign key (id_dispositivo)
		references dispositivos (id_dispositivo)
		on delete restrict on update restrict

);


create table clientes (
	id_cliente
	nombre_cliente
	constraint pk_cliente primary key (id_cliente)
);

