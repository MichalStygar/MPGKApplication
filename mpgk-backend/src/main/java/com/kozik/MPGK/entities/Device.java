package com.kozik.MPGK.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "devices")
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "device_id", nullable = false)
    private Long deviceId;

    @NotBlank(message = "Nazwa urządzenia jest wymagana")
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull(message = "Status urządzenia jest wymagany")
    @Column(name = "status", nullable = false)
    private Boolean status;

    @OneToMany(mappedBy = "device")
    @JsonIgnore
    private List<Connection> connections;

    public Device(String name, Boolean status, List<Connection> connections) {
        this.name = name;
        this.status = status;
        this.connections = connections;
    }
}