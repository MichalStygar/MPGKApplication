package com.kozik.MPGK.entities;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "fluid_registries")
public class FluidRegistry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "registry_id", nullable = false)
    private Long registryId;

    @NotNull(message = "Ilość dolanego płynu jest wymagana")
    @Column(name = "quantity", nullable = false)
    private Long quantity;

    // @NotNull(message = "Data dolania płynu jest wymagana")
    @Column(name = "datetime", nullable = false)
    private LocalDateTime datetime;

    @ManyToOne
    @JoinColumn(name = "fluid_id", nullable = true)
    private Fluid fluid;

    @ManyToOne
    @JoinColumn(name = "person_id", nullable = true)
    private Person person;

    @ManyToOne
    @JoinColumn(name = "place_id", nullable = true)
    private FluidPlace fluidPlace;

    public String getDatetime() {
        if (datetime != null) {
            return datetime.toString();
        } else {
            return "";
        }
    }

    public void setDatetime(String datetime) {
        LocalDateTime formatted = LocalDateTime.parse(datetime, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        this.datetime = formatted;
    }

    public FluidRegistry(Long quantity, LocalDateTime dateTime, Fluid fluid, Person person, FluidPlace fluidPlace) {
        this.quantity = quantity;
        this.datetime = dateTime;
        this.fluid = fluid;
        this.person = person;
        this.fluidPlace = fluidPlace;
    }
}