package com.jabai.campustrack.Controllers;

import com.jabai.campustrack.DTOs.Requests.CreateNfcTagRequestDto;
import com.jabai.campustrack.DTOs.Requests.SearchNfcTagRequestDto;
import com.jabai.campustrack.DTOs.Requests.UpdateNfcTagRequestDto;
import com.jabai.campustrack.DTOs.Responses.NfcTagResponseDto;
import com.jabai.campustrack.Services.NfcTagService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * <h1>CHARLES</h1>
 */
@RestController
@RequestMapping("/api/nfc-tags")
public class NfcTagController {
  private final NfcTagService nfcTagService;

  public NfcTagController(NfcTagService nfcTagService) {
    this.nfcTagService = nfcTagService;
  }

  // Create
  @PostMapping
  public ResponseEntity<NfcTagResponseDto> create(@Valid @RequestBody CreateNfcTagRequestDto createNfcTagRequestDto) {
    NfcTagResponseDto nfcTagResponseDto = nfcTagService.create(createNfcTagRequestDto);
    return ResponseEntity.status(HttpStatus.CREATED).body(nfcTagResponseDto);
  }

  // Read all
  @GetMapping
  public ResponseEntity<Page<NfcTagResponseDto>> readAll(@PageableDefault(size = 20) Pageable pageable) {
    Page<NfcTagResponseDto> nfcTagResponseDtoPage = nfcTagService.readAll(pageable);
    return ResponseEntity.ok(nfcTagResponseDtoPage);
  }

  // Read
  @GetMapping("/{id}")
  public ResponseEntity<NfcTagResponseDto> read(@PathVariable Long id) {
    NfcTagResponseDto nfcTagResponseDto = nfcTagService.read(id);
    return ResponseEntity.ok(nfcTagResponseDto);
  }

  // Search
  @GetMapping("/search")
  public ResponseEntity<Page<NfcTagResponseDto>> search(SearchNfcTagRequestDto searchNfcTagRequestDto, @PageableDefault(size = 20) Pageable pageable) {
    Page<NfcTagResponseDto> nfcTagResponseDtoPage = nfcTagService.search(searchNfcTagRequestDto, pageable);
    return ResponseEntity.ok(nfcTagResponseDtoPage);
  }

  // Update
  @PatchMapping("/{id}")
  public ResponseEntity<NfcTagResponseDto> update(@PathVariable Long id, @Valid @RequestBody UpdateNfcTagRequestDto updateNfcTagRequestDto) {
    NfcTagResponseDto nfcTagResponseDto = nfcTagService.update(updateNfcTagRequestDto, id);
    return ResponseEntity.ok(nfcTagResponseDto);
  }

  // Delete
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    nfcTagService.delete(id);
    return ResponseEntity.noContent().build();
  }
}
