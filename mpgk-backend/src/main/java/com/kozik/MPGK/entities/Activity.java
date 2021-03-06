package com.kozik.MPGK.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.hibernate.validator.constraints.Length;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "activities")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "activity_id", nullable = false)
    private Long activityId;

    @NotBlank(message = "Nazwa czynnosci jest wymagana")
    @Column(name = "name", nullable = false, columnDefinition = "TEXT")
    private String name;

    @NotBlank(message = "Typ czynności jest wymagany")
    @Column(name = "type", nullable = false, length = 100)
    private String type;

    @Length(max = 100, message = "Możesz wprowadzić maksymalnie 100 znaków")
    @Column(name = "emsr", nullable = true, length = 100)
    private String emsr;

    @Length(max = 100, message = "Możesz wprowadzić maksymalnie 100 znaków")
    @Column(name = "setting", nullable = true, length = 100)
    private String setting;

    // If the type field value is list, then this field stores the list items
    @Length(max = 255, message = "Możesz wprowadzić maksymalnie 255 znaków")
    @Column(name = "list_items", nullable = true)
    private String listItems;

    @OneToMany(mappedBy = "activity")
    @JsonIgnore
    private List<Inspection> inspections;

    @ManyToOne
    @JoinColumn(name = "groupId", nullable = true)
    private ActivityGroup activityGroup;

    public Activity(String name, String type, String emsr, String setting, String listItems, List<Inspection> inspections, ActivityGroup activityGroup){
        this.name = name;
        this.type = type;
        this.emsr = emsr;
        this.setting = setting;
        this.listItems = listItems;
        this.inspections = inspections;
        this.activityGroup = activityGroup;
    }
}