package com.bitboxer.recruitment.pablo.Trader.repositories;

import com.bitboxer.recruitment.pablo.Trader.models.items.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
