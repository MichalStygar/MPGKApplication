package com.kozik.MPGK.controllers;

import java.util.ArrayList;
import java.util.List;

import com.kozik.MPGK.entities.Connection;
import com.kozik.MPGK.entities.Device;
import com.kozik.MPGK.entities.InspectionType;
import com.kozik.MPGK.entities.Person;
import com.kozik.MPGK.services.ConnectionService;
import com.kozik.MPGK.services.DeviceService;
import com.kozik.MPGK.services.InspectionTypeService;
import com.kozik.MPGK.services.PersonService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ConnectionController {

    @Autowired private ConnectionService connectionService;
    @Autowired private InspectionTypeService inspectionTypeService;
    @Autowired private DeviceService deviceService;
    @Autowired private PersonService personService;

    @GetMapping(value = "/connection/list")
    public String getAll(Model model){
        List<Connection> connections = connectionService.listAll();
        model.addAttribute("connections", connections);
        return "views/connection/list";
    }

    @GetMapping(value = "/connection/add")
    public String add(Model model){
        List<InspectionType> inspectionsType = inspectionTypeService.listAll();
        List<Device> devices = deviceService.listAll();
        List<Person> persons = personService.listAll();
        Connection connection = new Connection();
        model.addAttribute("connection", connection);
        model.addAttribute("inspectionsType", inspectionsType);
        model.addAttribute("devices", devices);
        model.addAttribute("persons", persons);
        return "views/connection/add";
    }

    @PostMapping(value = "/connection/add")
    public String add(@ModelAttribute("connection")Connection connection,
    @RequestParam(name = "inspectionType", required = false)InspectionType inspectionType,
    @RequestParam(name = "device", required = false)Device device,
    @RequestParam(name = "persons", required = false)ArrayList<Person> persons){
        connection.setInspectionType(inspectionType);
        connection.setDevice(device);
        connection.setPerson(persons);
        connectionService.save(connection);
        return "redirect:/connection/list";
    }

    @GetMapping(value = "/connection/edit/{id}")
    public String edit(@PathVariable("id")Long id, Model model){
        List<InspectionType> inspectionsType = inspectionTypeService.listAll();
        List<Device> devices = deviceService.listAll();
        List<Person> persons = personService.listAll();
        Connection connection = connectionService.get(id);
        model.addAttribute("connection", connection);
        model.addAttribute("inspectionsType", inspectionsType);
        model.addAttribute("devices", devices);
        model.addAttribute("persons", persons);
        return "views/connection/edit";
    }

    @PostMapping(value = "/connection/edit/{id}")
    public String edit(@PathVariable("id")Long id,
    @ModelAttribute("connection")Connection connection,
    @RequestParam(name = "inspectionType", required = false)InspectionType inspectionType,
    @RequestParam(name = "device", required = false)Device device,
    @RequestParam(name = "persons", required = false)ArrayList<Person> persons){
        connection.setConnectionId(id);
        connection.setInspectionType(inspectionType);
        connection.setDevice(device);
        connection.setPerson(persons);
        connectionService.save(connection);
        return "redirect:/connection/list";
    }

    @GetMapping(value = "/connection/delete/{id}")
    public String delete(@PathVariable("id")Long id){
        connectionService.delete(id);
        return "redirect:/connection/list";
    }
}