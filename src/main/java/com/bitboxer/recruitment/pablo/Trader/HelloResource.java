package com.bitboxer.recruitment.pablo.Trader;

import com.bitboxer.recruitment.pablo.Trader.models.authentication.AuthenticationRequest;
import com.bitboxer.recruitment.pablo.Trader.models.authentication.AuthenticationResponse;
import com.bitboxer.recruitment.pablo.Trader.models.items.Item;
import com.bitboxer.recruitment.pablo.Trader.models.items.ItemStateEnum;
import com.bitboxer.recruitment.pablo.Trader.repositories.ItemRepository;
import com.bitboxer.recruitment.pablo.Trader.services.MyUserDetailsService;
import com.bitboxer.recruitment.pablo.Trader.utils.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@AllArgsConstructor
public class HelloResource {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private MyUserDetailsService userDetailsService;

    private final ItemRepository itemRepository;

    @Autowired
    private JwtUtil jwtTokenUtil;


    @GetMapping("/items")
    public List<Item> getItems() {
        return itemRepository.findAll();
    }

    @GetMapping("/items/{id}")
    public Item getItem(@PathVariable Long id) {
        return itemRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping("/items")
    public ResponseEntity createItem(@RequestBody Item item) throws URISyntaxException {
        Item savedItem =  itemRepository.save(item);
        return ResponseEntity.created(new URI("/items/" + savedItem.getId())).body(savedItem);
    }

    @PutMapping("/items/{id}")
    public ResponseEntity updateItem(@PathVariable Long id, @RequestBody Item item) {
        Item currentItem = itemRepository.findById(id).orElseThrow(RuntimeException::new);
        currentItem.setItemCode(item.getItemCode());
        currentItem.setDescription(item.getDescription());
        currentItem.setPrice(item.getPrice());
        currentItem.setState(item.getState());
        currentItem.setSuppliers(item.getSuppliers());
        currentItem.setPriceReductions(item.getPriceReductions());
        currentItem.setCreationDate(item.getCreationDate());
        currentItem = itemRepository.save(item);

        return ResponseEntity.ok(currentItem);
    }

    @PutMapping("/items/{id}/disable")
    public ResponseEntity disableItem(@PathVariable Long id) {
        Item currentItem = itemRepository.findById(id).orElseThrow(RuntimeException::new);
        currentItem.setState(ItemStateEnum.DISCONTINUED);
        currentItem = itemRepository.save(currentItem);

        return ResponseEntity.ok(currentItem);
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity deleteItem(@PathVariable Long id) {
        itemRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @RequestMapping("/hello")
    public String hello() {
        return "Hello World";
    }

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

        final String jwt = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }
}
