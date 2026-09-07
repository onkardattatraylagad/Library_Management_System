package com.library.management.controller;

import com.library.management.dto.DashboardSummaryDto;
import com.library.management.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/dashboard")
    public DashboardSummaryDto getDashboard() {
        return dashboardService.getDashboardSummary();
    }
}
