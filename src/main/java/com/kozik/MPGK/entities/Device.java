package com.kozik.MPGK.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "devices")
@Data
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "device_id", nullable = false)
    private Long deviceId;

    @Column(name = "name", nullable = false, length = 40)
    private String name;

    @Column(name = "status", nullable = false)
    private Boolean status;

    @Column(name = "type", nullable = false)
    private String type;
    
    @OneToMany(mappedBy = "device")
    private List<FluidRegistry> fluidsRegistry;

    @OneToMany(mappedBy = "device")
    private List<Connection> connections;

    public Device() {}
}