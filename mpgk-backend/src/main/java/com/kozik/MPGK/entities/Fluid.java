package com.kozik.MPGK.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
@Data
@NoArgsConstructor
@Table(name = "fluids")
public class Fluid {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "fluid_id", nullable = false)
    private Long fluidId;

    @NotNull(message = "Nazwa płynu jest wymagana")
    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @OneToMany(mappedBy = "fluid")
    private List<FluidRegistry> fluidRegistries;
}