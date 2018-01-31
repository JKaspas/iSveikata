package lt.vtvpmc.ems.isveikata.api;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Api {

	@Id
	@GeneratedValue
	private long id;
	private String title;
	private String description;
	private String measurements;

}