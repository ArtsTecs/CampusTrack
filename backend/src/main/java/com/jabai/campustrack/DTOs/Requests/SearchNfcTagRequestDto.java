package com.jabai.campustrack.DTOs.Requests;

import com.jabai.campustrack.Models.Enums.NfcTagStatus;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

public class SearchNfcTagRequestDto {
  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
  private final LocalDate from;

  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
  private final LocalDate to;

  private final Long assetId;
  private final String uid;
  private final NfcTagStatus status;

  public SearchNfcTagRequestDto(LocalDate from, LocalDate to, Long assetId, String uid, NfcTagStatus status) {
    this.from = from;
    this.to = to;
    this.assetId = assetId;
    this.uid = uid;
    this.status = status;
  }

  public LocalDate getFrom() { return from; }
  public LocalDate getTo() { return to; }
  public Long getAssetId() { return assetId; }
  public String getUid() { return uid; }
  public NfcTagStatus getStatus() { return status; }
}
