package com.bitboxer.recruitment.pablo.Trader.models.global;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "COUNTRIES")
@Getter
@Setter
@NoArgsConstructor
public class Country {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String code;
}
