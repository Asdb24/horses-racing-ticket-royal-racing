package com.royalracing.api;

import com.royalracing.model.Race;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/races")
public class RaceController {
    @GetMapping
    public List<Race> getRaces() {
        Race race = new Race();
        race.setId(1L);
        race.setName("Kentucky Derby");
        race.setCountry("USA");
        race.setDate("2025-05-04");
        race.setHorseCount(20);
        race.setDistance("2000m");
        race.setPrice(180.0);
        race.setTotalSeats(3200);
        race.setAvailableSeats(842);
        return List.of(race);
    }
}
