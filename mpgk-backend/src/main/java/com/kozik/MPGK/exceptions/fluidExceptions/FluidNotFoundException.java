package com.kozik.MPGK.exceptions.fluidExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class FluidNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public FluidNotFoundException(Long fluidId) {
        super("Fluid with id: " + fluidId + " not found.");
    }
}