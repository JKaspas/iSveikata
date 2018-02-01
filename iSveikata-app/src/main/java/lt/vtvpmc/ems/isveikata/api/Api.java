package lt.vtvpmc.ems.isveikata.api;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class Api implements Serializable {

	@Id
	@GeneratedValue
	private long id;

	@Column(unique = true, nullable = false)
	private String title;
	private String description;
	private String measurements;

}