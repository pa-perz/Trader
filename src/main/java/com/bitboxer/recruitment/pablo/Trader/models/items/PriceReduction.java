package com.bitboxer.recruitment.pablo.Trader.models.items;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "PRICE_REDUCTIONS")
@Getter
@Setter
@NoArgsConstructor
public class PriceReduction {
    @Id
    @GeneratedValue
    private Long id;
    @Column(nullable = false)
    private Double reducedPrice;
    @Column(nullable = false)
    private Date startDate;
    private Date endDate;
}
