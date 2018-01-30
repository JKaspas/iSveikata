package lt.vtvpmc.ems.isveikata.api;


import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
public class Api {

    @Id
    @GeneratedValue
    private long id;

    private String title;

    private String description;

    private String measurements;



}
