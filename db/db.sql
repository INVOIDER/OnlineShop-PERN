CREATE TABLE IF NOT EXISTS public.brand
(
    id smallint NOT NULL DEFAULT nextval('brand_id_seq'::regclass),
    name character varying,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.product
(
    id integer NOT NULL DEFAULT nextval('product_id_seq'::regclass),
    name character varying(50) NOT NULL,
    "typeID" smallint,
    "brandID" smallint,
    price smallint,
    amount smallint,
    img character varying(100),
    description text,
    PRIMARY KEY (id),
    FOREIGN KEY ("brandID")
        REFERENCES public.brand (id),
    FOREIGN KEY ("typeID")
        REFERENCES public.type (id)
);

CREATE TABLE IF NOT EXISTS public.type
(
    id smallint NOT NULL DEFAULT nextval('type_id_seq'::regclass),
    name character varying(25) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."user"
(
    id integer NOT NULL DEFAULT nextval('user_id_seq'::regclass),
    email character varying(40) NOT NULL,
    name character varying(15),
    surname character varying(30),
    role character varying(10) NOT NULL DEFAULT 'Customer',
    password character varying(100) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (email)
);