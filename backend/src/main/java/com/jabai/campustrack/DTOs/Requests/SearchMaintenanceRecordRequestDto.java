package com.jabai.campustrack.DTOs.Requests;

import com.jabai.campustrack.Models.Enums.MaintenanceRecordStatus;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

public class SearchMaintenanceRecordRequestDto {
  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
  private final LocalDate completedFrom;

  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
  private final LocalDate completedTo;

  private final Long incidentId;
  private final Long userId;
  private final String action;
  private final String remarks;
  private final MaintenanceRecordStatus status;

  public SearchMaintenanceRecordRequestDto(
          Long incidentId,
          Long userId,
          String action,
          String remarks,
          MaintenanceRecordStatus status,
          LocalDate completedFrom,
          LocalDate completedTo
  ) {
    this.incidentId = incidentId;
    this.userId = userId;
    this.action = action;
    this.remarks = remarks;
    this.status = status;
    this.completedFrom = completedFrom;
    this.completedTo = completedTo;
  }

  // Getters
  public Long getIncidentId() { return incidentId; }
  public Long getUserId() { return userId; }
  public String getAction() { return action; }
  public String getRemarks() { return remarks; }
  public MaintenanceRecordStatus getStatus() { return status; }
  public LocalDate getCompletedFrom() { return completedFrom; }
  public LocalDate getCompletedTo() { return completedTo; }
}
