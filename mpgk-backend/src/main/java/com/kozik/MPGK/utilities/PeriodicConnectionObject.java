package com.kozik.MPGK.utilities;

import com.kozik.MPGK.entities.Connection;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PeriodicConnectionObject {

    private Connection connection;
    private String status;
    private Integer overdudeCount;
    String startTime;
    String endTime;
}