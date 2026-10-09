package com.jabai.campustrack.Repositories.Specifications;

import com.jabai.campustrack.Models.Enums.NfcTagStatus;
import com.jabai.campustrack.Models.NfcTag;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;

public class NfcTagSpecifications {
  public static Specification<NfcTag> hasAssetId(Long assetId) {
    return (root, query, criteriaBuilder) -> {
      if (assetId == null)
        return null;
      return criteriaBuilder.equal(root.get("asset").get("id"), assetId);
    };
  }

  public static Specification<NfcTag> hasUid(String uid) {
    return (root, query, criteriaBuilder) -> {
      if (uid == null)
        return null;
      return criteriaBuilder.equal(root.get("uid"), uid);
    };
  }

  public static Specification<NfcTag> hasStatus(NfcTagStatus status) {
    return (root, query, criteriaBuilder) -> {
      if (status == null)
        return null;
      return criteriaBuilder.equal(root.get("status"), status);
    };
  }

  public static Specification<NfcTag> betweenCreated(LocalDateTime from, LocalDateTime to) {
    return (root, query, criteriaBuilder) -> {
      if (from == null && to == null)
        return null;
      if (from == null)
        return criteriaBuilder.lessThanOrEqualTo(root.get("createdAt"), to);
      if (to == null)
        return criteriaBuilder.greaterThanOrEqualTo(root.get("createdAt"), from);
      return criteriaBuilder.between(root.get("createdAt"), from, to);
    };
  }
}
