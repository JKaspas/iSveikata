package lt.vtvpmc.ems.isveikata.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Getter
@Setter
public class Api implements Serializable {

	@Id
	@GeneratedValue
	private long id;

	@Column(unique = true, nullable = false)
	private String title;
	private String description;
	private String measurements;

}