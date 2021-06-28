package com.bitboxer.recruitment.pablo.Trader.models.items;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ItemStateEnum {
    ACTIVE("ACTIVE"),
    DISCONTINUED("DISCONTINUED");

    private final String name;
}
