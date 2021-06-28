package com.bitboxer.recruitment.pablo.Trader.models.items;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.userdetails.User;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "ITEMS")
@Getter
@Setter
@NoArgsConstructor
public class Item {
    @Id
    @GeneratedValue
    private Long id;
    @Column(unique = true, nullable = false)
    private Long itemCode;
    @Column(unique = true, nullable = false)
    private String description;
    @Column(nullable = false)
    private Double price;
    @Column(nullable = false)
    private ItemStateEnum state;
    @ManyToMany(targetEntity = Supplier.class,
            cascade = {CascadeType.ALL})
    private List<Supplier> suppliers;
    @OneToMany(targetEntity = PriceReduction.class,
            cascade = {CascadeType.ALL},
            orphanRemoval = true)
    private List<PriceReduction> priceReductions;
    @Column(nullable = false)
    private Date creationDate;
}
