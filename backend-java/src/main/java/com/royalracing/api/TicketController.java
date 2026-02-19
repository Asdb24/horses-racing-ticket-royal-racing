package com.royalracing.api;

import com.royalracing.model.Ticket;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {
    @PostMapping
    public ResponseEntity<Map<String, Object>> createTicket(@RequestBody Ticket ticket) {
        ticket.setId(999L);
        ticket.setPurchaseDate(LocalDate.now().toString());
        return ResponseEntity.ok(Map.of(
            "message", "Ticket booked",
            "ticket", ticket
        ));
    }
}
