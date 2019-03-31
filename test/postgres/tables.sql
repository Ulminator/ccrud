CREATE SCHEMA IF NOT EXISTS test;

CREATE TABLE IF NOT EXISTS test.people (
    SSN TEXT NOT NULL,
    NAME TEXT NOT NULL,
    AGE SMALLINT NOT NULL,
    PHONE_NUMBER TEXT NOT NULL,
    COMPANY_ID UUID NOT NULL,
    PRIMARY KEY(SSN)
);

CREATE TABLE IF NOT EXISTS test.companies (
    ID UUID NOT NULL,
    NAME text NOT NULL,
    ADDRESS text NOT NULL,
    PRIMARY KEY(ID)
);