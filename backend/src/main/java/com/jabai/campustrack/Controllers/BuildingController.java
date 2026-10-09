package com.jabai.campustrack.Controllers;

import com.jabai.campustrack.DTOs.Requests.CreateBuildingRequestDto;
import com.jabai.campustrack.DTOs.Requests.UpdateBuildingRequestDto;
import com.jabai.campustrack.DTOs.Responses.BuildingResponseDto;
import com.jabai.campustrack.Services.BuildingService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.format.annotation.DateTimeFormat;
import java.time.LocalDate;

/**
 * <h4>NOTE: DO NOT VIOLATE LAYERS STRUCTURE.</h4>
 *
 * <p>ART TECSON: Perform search by:</p>
 * <ul>
 *   <li>from (optional) Dapat naka format ha for example 2026-10-07 (CREATED AT)</li>
 *   <li>to (optional) Dapat naka format ha for example 2026-10-08 (CREATED AT)</li>
 *   <li>name (optional) -> Dapat naka keyword</li>
 * </ul>
 * <p>P.S.: And dapat naka paginate gihapon sya.</p>
 * <p>Expected URL: <code>/api/buildings/search?from=2026-10-07&to=2026-10-08&name=SHS+Building</code></p>
 */
@RestController
@RequestMapping("/api/buildings")
public class BuildingController {
    private final BuildingService buildingService;

    public BuildingController(BuildingService buildingService) {
        this.buildingService = buildingService;
    }

    // Create
    @PostMapping
    public ResponseEntity<BuildingResponseDto> createBuilding(@Valid @RequestBody CreateBuildingRequestDto request) {
        BuildingResponseDto createdBuilding = buildingService.createBuilding(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBuilding);
    }

    // Read all
    @GetMapping
    public ResponseEntity<Page<BuildingResponseDto>> getAllBuildings(@PageableDefault(size = 20) Pageable pageable) {
        Page<BuildingResponseDto> buildings = buildingService.getAllBuildings(pageable);
        return ResponseEntity.ok(buildings);
    }

    //Search
    @GetMapping("/search")
    public ResponseEntity<Page<BuildingResponseDto>> searchBuildings(
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate from,

            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate to,

            @RequestParam(required = false)
            String name,

            @PageableDefault(size = 20)
            Pageable pageable
    ) {
        Page<BuildingResponseDto> buildings =
                buildingService.searchBuildings(
                        from,
                        to,
                        name,
                        pageable
                );

        return ResponseEntity.ok(buildings);
    }

    // Read
    @GetMapping("/{id}")
    public ResponseEntity<BuildingResponseDto> getBuildingById(@PathVariable Long id) {
        BuildingResponseDto building = buildingService.getBuildingById(id);
        return ResponseEntity.ok(building);
    }

    // Update
    @PatchMapping("/{id}")
    public ResponseEntity<BuildingResponseDto> updateBuilding(@PathVariable Long id, @Valid @RequestBody UpdateBuildingRequestDto request) {
        BuildingResponseDto updatedBuilding = buildingService.updateBuilding(id, request);
        return ResponseEntity.ok(updatedBuilding);
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBuilding(@PathVariable Long id) {
        buildingService.deleteBuilding(id);
        return ResponseEntity.noContent().build();
    }
}