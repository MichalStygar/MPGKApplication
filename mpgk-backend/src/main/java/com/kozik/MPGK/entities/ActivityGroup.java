package com.kozik.MPGK.entities;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "activities_groups")
public class ActivityGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "group_id", nullable = false)
    private Long groupId;

    @NotBlank(message = "Nazwa czynności jest wymagana")
    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @OneToMany(mappedBy = "activityGroup", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonProperty(access = Access.WRITE_ONLY)
    private List<Activity> activities;

    @ManyToOne
    @JoinColumn(name = "connection_id", nullable = true)
    private Connection connection;

    public ActivityGroup(String name, List<Activity> activities, Connection connection) {
        this.name = name;
        this.activities = activities;
        this.connection = connection;
    }
}