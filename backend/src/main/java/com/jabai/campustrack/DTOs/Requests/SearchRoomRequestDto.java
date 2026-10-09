package com.jabai.campustrack.DTOs.Requests;

import java.time.LocalDate;

import com.jabai.campustrack.Models.Enums.RoomCriticality;
import com.jabai.campustrack.Models.Enums.RoomType;
import org.springframework.format.annotation.DateTimeFormat;

public class SearchRoomRequestDto {
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private final LocalDate from;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private final LocalDate to;

    private final Long buildingId;
    private final String roomNumber;
    private final Integer capacity;
    private final RoomType roomType;
    private final RoomCriticality criticality;

    public SearchRoomRequestDto(
            Long buildingId,
            String roomNumber,
            Integer capacity,
            RoomType roomType,
            RoomCriticality criticality,
            LocalDate from,
            LocalDate to
    ) {
        this.buildingId = buildingId;
        this.roomNumber = roomNumber;
        this.capacity = capacity;
        this.roomType = roomType;
        this.criticality = criticality;
        this.from = from;
        this.to = to;
    }

    // Getters
    public Long getBuildingId() { return buildingId; }
    public String getRoomNumber() { return roomNumber; }
    public Integer getCapacity() { return capacity; }
    public RoomType getRoomType() { return roomType; }
    public RoomCriticality getCriticality() { return criticality; }
    public LocalDate getFrom() { return from; }
    public LocalDate getTo() { return to; }
}