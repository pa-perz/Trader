package com.bitboxer.recruitment.pablo.Trader.models.items;

import com.bitboxer.recruitment.pablo.Trader.models.global.Country;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "SUPPLIERS")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Supplier {
    @Id
    @GeneratedValue
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(unique = true, nullable = false)
    private String emailAddress;
    @Column(unique = true, nullable = false)
    private String phoneNumber;
    @ManyToOne(targetEntity = Country.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "country")
    private Country country;
}
