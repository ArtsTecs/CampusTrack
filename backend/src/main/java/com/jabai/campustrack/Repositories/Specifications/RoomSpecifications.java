package com.jabai.campustrack.Repositories.Specifications;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.jabai.campustrack.Models.Room;
import com.jabai.campustrack.Models.Enums.RoomCriticality;
import com.jabai.campustrack.Models.Enums.RoomType;

import jakarta.persistence.criteria.Predicate;

public class RoomSpecifications {

    public static Specification<Room> hasBuilding(Long buildingId) {
        return (root, query, cb) -> {
            if (buildingId == null)
                return null;
            return cb.equal(root.get("building").get("id"), buildingId);
        };
    }

    public static Specification<Room> hasCriticality(RoomCriticality criticality) {
        return (root, query, cb) -> {
            if (criticality == null)
                return null;
            return cb.equal(root.get("criticality"), criticality);
        };
    }

    public static Specification<Room> hasRoomType(RoomType roomType) {
        return (root, query, cb) -> {
            if (roomType == null)
                return null;
            return cb.equal(root.get("roomType"), roomType);
        };
    }

    public static Specification<Room> hasRoomNumber(String roomNumber) {
        return (root, query, cb) -> {
            if (roomNumber == null)
                return null;
            return cb.equal(root.get("roomNumber"), roomNumber);
        };
    }

    public static Specification<Room> hasCapacity(Integer capacity) {
        return (root, query, cb) -> {
            if (capacity == null)
                return null;
            return cb.equal(root.get("capacity"), capacity);
        };
    }

    public static Specification<Room> createdBetween(LocalDateTime from, LocalDateTime to) {
        return (root, query, cb) -> {
            if (from == null && to == null)
                return null;
            if (from == null)
                return cb.lessThanOrEqualTo(root.get("createdAt"), to);
            if (to == null)
                return cb.greaterThanOrEqualTo(root.get("createdAt"), from);
            return cb.between(root.get("createdAt"), from, to);
        };
    }
}